// Background script for Grammar Check Pro extension
// Handles API calls to Pollinations.AI

const API_BASE_URL = 'https://text.pollinations.ai/openai';

// Grammar checking system prompt
const GRAMMAR_SYSTEM_PROMPT = `You are an expert grammar and writing assistant. Your task is to analyze the provided text and provide corrections and suggestions for:

1. Grammar errors
2. Spelling mistakes
3. Punctuation issues
4. Style improvements
5. Clarity enhancements

Format your response as a JSON object with this structure:
{
  "corrections": [
    {
      "original": "original text with error",
      "corrected": "corrected text",
      "explanation": "brief explanation of the correction",
      "type": "grammar|spelling|punctuation|style|clarity"
    }
  ],
  "overall_score": "A number from 1-10 indicating writing quality",
  "suggestions": ["Array of general writing tips if applicable"]
}

If the text is already well-written, return an empty corrections array and a high score.

Be precise and helpful. Only suggest real improvements.`;

// Function to check grammar using Pollinations.AI API with retry logic
async function checkGrammar(text, retryCount = 0) {
  const maxRetries = 3;
  const baseDelay = 2000; // 2 seconds

  try {
    const payload = {
      model: 'openai',
      messages: [
        {
          role: 'system',
          content: GRAMMAR_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: `Please check the following text for grammar, spelling, and style issues:\n\n"${text}"`
        }
      ],
      temperature: 1, // As requested by user
      max_tokens: 1000,
      response_format: { type: "json_object" }
    };

    console.log('Making API request to Pollinations.AI...');
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Handle rate limiting with retry
    if (response.status === 429) {
      if (retryCount < maxRetries) {
        const delay = baseDelay * Math.pow(2, retryCount); // Exponential backoff
        console.log(`Rate limited. Retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return checkGrammar(text, retryCount + 1);
      } else {
        throw new Error('Rate limit exceeded. Please wait a few minutes before trying again.');
      }
    }

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('Server error. The API might be temporarily unavailable.');
      } else if (response.status === 400) {
        throw new Error('Invalid request. Please check your text and try again.');
      } else {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from API');
    }

    // Parse the JSON response
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse API response as JSON:', content);
      throw new Error('Invalid response format from API');
    }

    console.log('Grammar check completed successfully');
    return result;

  } catch (error) {
    console.error('Grammar check failed:', error);
    return {
      error: error.message,
      corrections: [],
      overall_score: 0,
      suggestions: []
    };
  }
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkGrammar') {
    checkGrammar(request.text)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ error: error.message }));

    return true; // Keep the message channel open for async response
  }
});

// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'checkGrammar',
    title: 'Check Grammar with AI',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'checkGrammar' && info.selectionText) {
    chrome.tabs.sendMessage(tab.id, {
      action: 'showGrammarCheck',
      text: info.selectionText
    });
  }
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'check-selection') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'checkSelection'
      });
    });
  }
});
