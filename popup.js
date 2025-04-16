document.addEventListener('DOMContentLoaded', function() {
  const passwordText = document.getElementById('password-text');
  const passwordLength = document.getElementById('password-length');
  const lengthSlider = document.getElementById('length-slider');
  const refreshButton = document.getElementById('refresh-password');
  const copyButton = document.getElementById('copy-password');
  const copySmallButton = document.getElementById('copy-password-small');
  const sponsorMessageElement = document.getElementById('sponsor-message');
  
  const easyToSay = document.getElementById('easy-to-say');
  const easyToRead = document.getElementById('easy-to-read');
  const allCharacters = document.getElementById('all-characters');
  const uuidOption = document.getElementById('uuid');
  
  const uppercaseCheckbox = document.getElementById('uppercase');
  const lowercaseCheckbox = document.getElementById('lowercase');
  const numbersCheckbox = document.getElementById('numbers');
  const symbolsCheckbox = document.getElementById('symbols');
  
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?/~';
  
  const ambiguousChars = 'Il1O0';
  
  // Fetch and display sponsor message
  fetchSponsorMessage();
  
  function fetchSponsorMessage() {
    fetch('https://raw.githubusercontent.com/vUnkname/Password-Generator/main/assets/sponsor-messsage.json')
      .then(response => response.text())
      .then(text => {
        // Only display if content is not empty
        if (text && text.trim() !== '') {
          sponsorMessageElement.innerHTML = text;
          sponsorMessageElement.style.display = 'block';
        } else {
          sponsorMessageElement.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error fetching sponsor message:', error);
        sponsorMessageElement.style.display = 'none';
      });
  }
  
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  function generatePassword() {
    if (uuidOption.checked) {
      passwordText.textContent = generateUUID();
      return;
    }
    
    let availableChars = '';
    let length = parseInt(passwordLength.value);
    
    if (isNaN(length) || length < 1) {
      length = 20;
      passwordLength.value = length;
      lengthSlider.value = length;
    }
    
    if (easyToSay.checked) {
      if (uppercaseCheckbox.checked) availableChars += upperChars;
      if (lowercaseCheckbox.checked) availableChars += lowerChars;
    } 
    else if (easyToRead.checked) {
      if (uppercaseCheckbox.checked) {
        availableChars += upperChars.split('').filter(char => !ambiguousChars.includes(char)).join('');
      }
      if (lowercaseCheckbox.checked) {
        availableChars += lowerChars.split('').filter(char => !ambiguousChars.includes(char)).join('');
      }
      if (numbersCheckbox.checked) {
        availableChars += numberChars.split('').filter(char => !ambiguousChars.includes(char)).join('');
      }
      if (symbolsCheckbox.checked) availableChars += symbolChars;
    } 
    else {
      if (uppercaseCheckbox.checked) availableChars += upperChars;
      if (lowercaseCheckbox.checked) availableChars += lowerChars;
      if (numbersCheckbox.checked) availableChars += numberChars;
      if (symbolsCheckbox.checked) availableChars += symbolChars;
    }
    
    if (availableChars === '') {
      availableChars = lowerChars;
      lowercaseCheckbox.checked = true;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      password += availableChars[randomIndex];
    }
    
    passwordText.textContent = password;
    updateSliderBackground();
  }
  
  function updateSliderBackground() {
    const percentage = (lengthSlider.value - lengthSlider.min) / (lengthSlider.max - lengthSlider.min) * 100;
    lengthSlider.style.background = `linear-gradient(to right, #dc3545 0%, #dc3545 ${percentage}%, #e9ecef ${percentage}%, #e9ecef 100%)`;
  }
  
  function copyPassword() {
    const password = passwordText.textContent;
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        // Visual feedback for copy action
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy password';
        }, 1500);
      }).catch(err => {
        console.error('Error copying password: ', err);
      });
    }
  }
  
  function updateControlsVisibility() {
    const isUUIDSelected = uuidOption.checked;
    
    passwordLength.disabled = isUUIDSelected;
    lengthSlider.disabled = isUUIDSelected;
    uppercaseCheckbox.disabled = isUUIDSelected;
    lowercaseCheckbox.disabled = isUUIDSelected;
    numbersCheckbox.disabled = isUUIDSelected;
    symbolsCheckbox.disabled = isUUIDSelected;
    
    if (easyToSay.checked && !isUUIDSelected) {
      numbersCheckbox.disabled = true;
      symbolsCheckbox.disabled = true;
    }
  }
  
  refreshButton.addEventListener('click', generatePassword);
  copyButton.addEventListener('click', copyPassword);
  copySmallButton.addEventListener('click', copyPassword);
  
  passwordLength.addEventListener('input', function() {
    lengthSlider.value = this.value;
    generatePassword();
  });
  
  lengthSlider.addEventListener('input', function() {
    passwordLength.value = this.value;
    generatePassword();
  });
  
  easyToSay.addEventListener('change', function() {
    updateControlsVisibility();
    generatePassword();
  });
  
  easyToRead.addEventListener('change', function() {
    updateControlsVisibility();
    generatePassword();
  });
  
  allCharacters.addEventListener('change', function() {
    updateControlsVisibility();
    generatePassword();
  });
  
  uuidOption.addEventListener('change', function() {
    updateControlsVisibility();
    generatePassword();
  });
  
  uppercaseCheckbox.addEventListener('change', generatePassword);
  lowercaseCheckbox.addEventListener('change', generatePassword);
  numbersCheckbox.addEventListener('change', generatePassword);
  symbolsCheckbox.addEventListener('change', generatePassword);
  
  updateControlsVisibility();
  generatePassword();
}); 