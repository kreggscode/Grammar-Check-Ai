// Popup script for Grammar Check Pro extension

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const extensionToggle = document.getElementById('extension-toggle');
  const temperatureInput = document.getElementById('temperature');
  const saveButton = document.getElementById('save-settings');
  const errorMessage = document.getElementById('error-message');

  // Load saved settings
  loadSettings();

  // Event listeners
  extensionToggle.addEventListener('click', toggleExtension);
  saveButton.addEventListener('click', saveSettings);
  temperatureInput.addEventListener('input', validateTemperature);

  // Functions
  function loadSettings() {
    chrome.storage.sync.get(['enabled', 'temperature'], function(result) {
      // Extension enabled by default
      const enabled = result.enabled !== false;
      extensionToggle.classList.toggle('active', enabled);

      // Temperature setting
      const temperature = result.temperature || 1;
      temperatureInput.value = temperature;
    });
  }

  function toggleExtension() {
    const isActive = extensionToggle.classList.contains('active');
    extensionToggle.classList.toggle('active', !isActive);

    // Save the toggle state
    chrome.storage.sync.set({ enabled: !isActive }, function() {
      // Send message to content scripts about the change
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, {
            action: 'toggleExtension',
            enabled: !isActive
          }).catch(() => {
            // Ignore errors for tabs that don't have content script
          });
        });
      });
    });
  }

  function validateTemperature() {
    const value = parseFloat(temperatureInput.value);
    if (isNaN(value) || value < 0 || value > 3) {
      temperatureInput.style.borderColor = '#ea4335';
      saveButton.disabled = true;
    } else {
      temperatureInput.style.borderColor = '#dadce0';
      saveButton.disabled = false;
    }
  }

  function saveSettings() {
    const temperature = parseFloat(temperatureInput.value);

    if (isNaN(temperature) || temperature < 0 || temperature > 3) {
      showError('Temperature must be between 0 and 3');
      return;
    }

    chrome.storage.sync.set({ temperature: temperature }, function() {
      showSuccess('Settings saved successfully!');

      // Send updated settings to background script
      chrome.runtime.sendMessage({
        action: 'updateSettings',
        temperature: temperature
      });
    });
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000);
  }

  function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.background = '#e6f4ea';
    errorMessage.style.color = '#137333';
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.style.background = '#fce8e6';
      errorMessage.style.color = '#c5221f';
    }, 2000);
  }

  // Check extension status
  chrome.runtime.sendMessage({ action: 'getStatus' }, function(response) {
    if (chrome.runtime.lastError) {
      console.log('Extension status check failed:', chrome.runtime.lastError);
      return;
    }

    if (response && response.status === 'ready') {
      // Extension is working
      document.querySelector('.status-dot').style.background = '#34a853';
      document.querySelector('.status-text').textContent = 'Extension Active';
    } else {
      // Extension has issues
      document.querySelector('.status-dot').style.background = '#ea4335';
      document.querySelector('.status-text').textContent = 'Extension Error';
    }
  });
});
