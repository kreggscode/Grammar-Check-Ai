<div align="center">

# 🎯 Grammar Check Pro

### AI-Powered Grammar & Writing Assistant for Chrome

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue.svg)](https://chrome.google.com/webstore)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-orange.svg)](https://kreggscode.github.io/Grammar-Check-Ai/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green.svg)](https://kreggscode.github.io/Grammar-Check-Ai/)
[![Privacy Policy](https://img.shields.io/badge/Privacy-Policy-blue.svg)](https://kreggscode.github.io/Grammar-Check-Ai/privacy-policy.html)

**Transform your writing with AI-powered grammar checking, anywhere on the web!**

![Grammar Check Pro Demo](https://raw.githubusercontent.com/kreggscode/Grammar-Check-Ai/main/landing-page-full.png)

</div>

---

## ✨ Features

### 🚀 **Smart AI Analysis**
- **Advanced Grammar Checking**: Powered by OpenAI GPT models via Pollinations.AI
- **Comprehensive Coverage**: Grammar, spelling, punctuation, style, and clarity
- **Quality Scoring**: Get detailed writing quality scores (1-10)
- **Intelligent Suggestions**: Context-aware corrections with explanations

### 🎨 **Seamless User Experience**
- **One-Click Activation**: Select text and get instant AI feedback
- **Context Menu Integration**: Right-click for quick grammar checking
- **Non-Intrusive Design**: Clean overlay that doesn't interfere with web content
- **Beautiful Animations**: Smooth loading animations with glowing effects

### 📋 **Powerful Copy Features**
- **Copy Individual Fixes**: Click to copy corrected text directly
- **Copy All Corrections**: Bulk copy all suggested fixes
- **Copy Quality Scores**: Save your writing analysis
- **One-Click Copy**: No manual text selection needed

### 🔧 **Developer-Friendly**
- **Open Source**: Fully transparent codebase
- **Modular Architecture**: Easy to extend and customize
- **Comprehensive Logging**: Debug-friendly console output
- **Cross-Browser Ready**: Chrome extension format

## 📸 Screenshots

### 🌟 Landing Page Preview
<div align="center">
  <img src="https://raw.githubusercontent.com/kreggscode/Grammar-Check-Ai/main/landing-hero.png" alt="Landing Page Hero" width="80%">
  <p><em>Beautiful landing page with gradient hero section and feature overview</em></p>
</div>

### 🎨 Landing Page Features
<div align="center">
  <img src="https://raw.githubusercontent.com/kreggscode/Grammar-Check-Ai/main/features-section.png" alt="Features Section" width="80%">
  <p><em>Comprehensive features showcase with icons and descriptions</em></p>
</div>

### 📱 Landing Page How It Works
<div align="center">
  <img src="https://raw.githubusercontent.com/kreggscode/Grammar-Check-Ai/main/how-it-works.png" alt="How It Works" width="80%">
  <p><em>Step-by-step user guide with numbered process</em></p>
</div>

### 💬 Landing Page Testimonials
<div align="center">
  <img src="https://raw.githubusercontent.com/kreggscode/Grammar-Check-Ai/main/testimonials.png" alt="Testimonials" width="80%">
  <p><em>User testimonials and social proof</em></p>
</div>

### 🔧 Extension Features

#### Loading Animation
<div align="center">
  <img src="https://raw.githubusercontent.com/kreggscode/Grammar-Check-Ai/main/extension-loading-animation.png" alt="Loading Animation" width="70%">
  <p><em>Stunning loading animation with pulsing effects and progress indicators</em></p>
  <small><em>✨ Beautiful animated feedback while AI processes your text</em></small>
</div>

#### Grammar Results
<div align="center">
  <img src="https://raw.githubusercontent.com/kreggscode/Grammar-Check-Ai/main/extension-grammar-results.png" alt="Grammar Results" width="70%">
  <p><em>Comprehensive AI analysis with quality scores and detailed corrections</em></p>
  <small><em>🎯 Detailed grammar analysis with actionable suggestions</em></small>
</div>

#### Copy Features
<div align="center">
  <img src="https://raw.githubusercontent.com/kreggscode/Grammar-Check-Ai/main/extension-copy-features.png" alt="Copy Features" width="70%">
  <p><em>Easy copy functionality for all corrections and suggestions</em></p>
  <small><em>📋 One-click copying of corrections and writing tips</em></small>
</div>

---

## 🚀 Installation

### From Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore)
2. Search for "Grammar Check Pro"
3. Click **Add to Chrome**
4. Grant permissions when prompted

### From Source (Development)
```bash
# Clone the repository
git clone https://github.com/kreggscode/Grammar-Check-Ai.git
cd Grammar-Check-Ai

# Create required icons (see icons/README.md)
# Add icon files to icons/ directory

# Load in Chrome
1. Open chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select this folder
```

### 🌐 Live Documentation
- **[🏠 Landing Page](https://kreggscode.github.io/Grammar-Check-Ai/)** - Full feature overview and demo
- **[🔒 Privacy Policy](https://kreggscode.github.io/Grammar-Check-Ai/privacy-policy.html)** - Complete privacy information

---

## 🎯 Usage

### Method 1: Right-Click (Recommended)
1. **Select any text** on any webpage
2. **Right-click** on the selected text
3. **Choose "Check Grammar"** from the context menu
4. **Watch the beautiful loading animation**
5. **Review AI suggestions** with copy buttons

### Method 2: Manual Selection
1. **Select text** on any webpage
2. **Extension icon appears** (if enabled)
3. **Click the icon** to check grammar
4. **View results** in the overlay

### Copy Features
- **"Copy Fix"**: Copy individual corrected text
- **"Copy Tip"**: Copy writing suggestions
- **"Copy All Fixes"**: Copy all corrections at once
- **"Copy Score"**: Copy quality rating

---

## 🛠️ Technical Details

### Architecture
```
├── manifest.json          # Extension configuration
├── background.js          # API communication & context menus
├── content.js            # Text selection & UI injection
├── popup.html/js         # Settings interface
├── landing-page.html     # Project homepage
├── privacy-policy.html   # Privacy information
└── icons/                # Extension icons
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

### API Configuration
- **Provider**: Pollinations.AI (OpenAI GPT proxy)
- **Endpoint**: `https://text.pollinations.ai/openai`
- **Temperature**: `1.0` (balanced creativity/consistency)
- **Rate Limiting**: Automatic retry with exponential backoff

### Permissions
```json
{
  "permissions": ["activeTab", "storage", "contextMenus", "scripting"],
  "host_permissions": ["https://text.pollinations.ai/*"]
}
```

---

## 🔒 Privacy & Security

### Data Handling
- ✅ **No Data Storage**: Text is never stored or logged
- ✅ **Secure Transmission**: HTTPS-only API communication
- ✅ **Local Processing**: All UI rendering happens in your browser
- ✅ **On-Demand Only**: Text sent to API only when you explicitly request checking

### Chrome Web Store Compliance
- ✅ **No Malicious Code**: Fully transparent open-source
- ✅ **No Data Collection**: Respects user privacy
- ✅ **CSP Compliant**: No unsafe script execution
- ✅ **Manifest V3**: Latest Chrome extension standards

---

## 🐛 Troubleshooting

### Extension Not Loading
```bash
# Check console for errors
1. Press F12 → Console tab
2. Look for "Grammar Check Pro" messages
3. Check for CSP violations or network errors
```

### API Issues
- **429 Error**: Rate limited - wait 60 seconds
- **500 Error**: Service temporarily unavailable
- **Network Error**: Check internet connection

### Animation Not Showing
- Loading animation shows for minimum 3 seconds
- Check browser performance settings
- Ensure JavaScript is enabled

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

```bash
# Fork and clone
git clone https://github.com/yourusername/Grammar-Check-Ai.git
cd Grammar-Check-Ai

# Create feature branch
git checkout -b feature/amazing-improvement

# Make changes and test
# Submit pull request
```

### Development Setup
1. **Install Dependencies**: None required (vanilla JS)
2. **Test Extension**: Load unpacked in Chrome
3. **Debug**: Use browser DevTools and console logs
4. **Build**: No build process needed

---

## 📄 License

```text
MIT License - feel free to use, modify, and distribute
This project uses Pollinations.AI API - see their terms of service
```

---

## 🙏 Acknowledgments

- **Pollinations.AI** - AI text analysis API
- **OpenAI** - GPT models powering the analysis
- **Chrome Extensions** - Platform for seamless integration
- **Contributors** - Community improvements

---

## 📞 Support & Documentation

### 📖 Documentation
- **[🏠 Live Landing Page](https://kreggscode.github.io/Grammar-Check-Ai/)** - Interactive feature overview
- **[🔒 Privacy Policy](https://kreggscode.github.io/Grammar-Check-Ai/privacy-policy.html)** - Complete privacy information
- **[📚 GitHub Wiki](https://github.com/kreggscode/Grammar-Check-Ai/wiki)** - Extended documentation

### 🆘 Support Channels
- **🐛 Issues**: [GitHub Issues](https://github.com/kreggscode/Grammar-Check-Ai/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/kreggscode/Grammar-Check-Ai/discussions)
- **📧 Email**: For business inquiries

---

<div align="center">

### ⭐ **Star this repo if you find it useful!**

**Made with ❤️ for writers, students, and professionals worldwide**

[🌐 Live Demo](https://kreggscode.github.io/Grammar-Check-Ai/) •
[🔒 Privacy Policy](https://kreggscode.github.io/Grammar-Check-Ai/privacy-policy.html) •
[📥 Download](https://chrome.google.com/webstore) •
[🐛 Report Bug](https://github.com/kreggscode/Grammar-Check-Ai/issues)

</div>
