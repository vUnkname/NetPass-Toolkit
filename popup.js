document.addEventListener('DOMContentLoaded', function() {
  // Tooltip handling
  const tooltipContainer = document.getElementById('tooltip-container');
  const infoIcons = document.querySelectorAll('.info-icon');
  
  infoIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('tooltip-title');
      if (tooltipText) {
        tooltipContainer.textContent = tooltipText;
        tooltipContainer.style.display = 'block';
      }
    });
    
    icon.addEventListener('mouseleave', function() {
      tooltipContainer.style.display = 'none';
    });
  });
  
  // Collapsible section handling
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
  
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const toggleIcon = this.querySelector('.toggle-icon');
      
      // Toggle content visibility
      if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        toggleIcon.classList.add('open');
      } else {
        content.style.display = 'none';
        toggleIcon.classList.remove('open');
      }
    });
  });
  
  // Tab switching functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
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
    fetch('https://raw.githubusercontent.com/vUnkname/Password-Generator/master/assets/sponsor-messsage.json')
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
  
  // Network Tools Functionality
  // Port Generator
  const portMin = document.getElementById('port-min');
  const portMax = document.getElementById('port-max');
  const portResult = document.getElementById('port-result');
  const generatePortButton = document.getElementById('generate-port');
  const copyPortButton = document.getElementById('copy-port');
  
  // Add event listeners for automatic updating
  portMin.addEventListener('input', generateRandomPort);
  portMax.addEventListener('input', generateRandomPort);
  
  generatePortButton.addEventListener('click', generateRandomPort);
  copyPortButton.addEventListener('click', () => copyText(portResult, copyPortButton));
  
  function generateRandomPort() {
    const min = parseInt(portMin.value) || 1;
    const max = parseInt(portMax.value) || 65535;
    
    // Validate input range
    if (min < 1) portMin.value = min = 1;
    if (max > 65535) portMax.value = max = 65535;
    if (min > max) {
      portMin.value = 1;
      portMax.value = 65535;
      return generateRandomPort();
    }
    
    const randomPort = Math.floor(Math.random() * (max - min + 1)) + min;
    portResult.textContent = randomPort;
  }
  
  // IPv4 Generator
  const ipv4Class = document.getElementById('ipv4-class');
  const ipv4Result = document.getElementById('ipv4-result');
  const generateIPv4Button = document.getElementById('generate-ipv4');
  const copyIPv4Button = document.getElementById('copy-ipv4');
  
  // Add event listener for automatic updating
  ipv4Class.addEventListener('change', generateIPv4);
  
  generateIPv4Button.addEventListener('click', generateIPv4);
  copyIPv4Button.addEventListener('click', () => copyText(ipv4Result, copyIPv4Button));
  
  function generateIPv4() {
    let ip = '';
    const selectedClass = ipv4Class.value;
    
    switch(selectedClass) {
      case 'A':
        ip = '10.';
        for (let i = 0; i < 3; i++) {
          ip += Math.floor(Math.random() * 256);
          if (i < 2) ip += '.';
        }
        break;
      case 'B':
        ip = '172.';
        ip += (Math.floor(Math.random() * 16) + 16) + '.'; // 16-31
        for (let i = 0; i < 2; i++) {
          ip += Math.floor(Math.random() * 256);
          if (i < 1) ip += '.';
        }
        break;
      case 'C':
      default:
        ip = '192.168.';
        for (let i = 0; i < 2; i++) {
          ip += Math.floor(Math.random() * 256);
          if (i < 1) ip += '.';
        }
        break;
    }
    
    ipv4Result.textContent = ip;
  }
  
  // IPv6 Generator
  const ipv6Type = document.getElementById('ipv6-type');
  const ipv6Prefix = document.getElementById('ipv6-prefix');
  const ipv6GlobalId = document.getElementById('ipv6-global-id');
  const ipv6SubnetId = document.getElementById('ipv6-subnet-id');
  const ipv6ManualMode = document.getElementById('ipv6-manual-mode');
  const ipv6ManualFields = document.querySelector('.ipv6-manual-fields');
  const ipv6Result = document.getElementById('ipv6-result');
  const ipv6SimpleOptions = document.querySelector('.ipv6-simple-options');
  const ipv6UniqueOptions = document.querySelector('.ipv6-unique-options');
  const generateIPv6Button = document.getElementById('generate-ipv6');
  const copyIPv6Button = document.getElementById('copy-ipv6');
  
  // Initial setup based on defaults
  if (ipv6Type.value === 'simple') {
    ipv6SimpleOptions.style.display = 'flex';
    ipv6UniqueOptions.style.display = 'none';
    ipv6ManualFields.style.display = 'none';
  } else {
    ipv6SimpleOptions.style.display = 'none';
    ipv6UniqueOptions.style.display = 'flex';
    updateManualFieldsVisibility();
  }
  
  // Function to update manual fields visibility
  function updateManualFieldsVisibility() {
    ipv6ManualFields.style.display = ipv6ManualMode.checked ? 'flex' : 'none';
    generateIPv6();
  }
  
  // Event listeners for IPv6 options
  ipv6Type.addEventListener('change', function() {
    if (this.value === 'simple') {
      ipv6SimpleOptions.style.display = 'flex';
      ipv6UniqueOptions.style.display = 'none';
      ipv6ManualFields.style.display = 'none';
    } else {
      ipv6SimpleOptions.style.display = 'none';
      ipv6UniqueOptions.style.display = 'flex';
      updateManualFieldsVisibility();
    }
    generateIPv6();
  });
  
  // Manual mode toggle event listener
  ipv6ManualMode.addEventListener('change', updateManualFieldsVisibility);
  
  // Add event listeners for automatic updating
  ipv6Prefix.addEventListener('change', generateIPv6);
  ipv6GlobalId.addEventListener('input', generateIPv6);
  ipv6SubnetId.addEventListener('input', generateIPv6);
  
  generateIPv6Button.addEventListener('click', generateIPv6);
  copyIPv6Button.addEventListener('click', () => copyText(ipv6Result, copyIPv6Button));
  
  function generateIPv6() {
    let ip = '';
    
    if (ipv6Type.value === 'simple') {
      // Simple IPv6 generation
      const prefix = ipv6Prefix.value;
      ip = prefix + ':';
      
      // Generate 7 more groups of hexadecimal digits
      for (let i = 0; i < 7; i++) {
        const group = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
        ip += group;
        if (i < 6) ip += ':';
      }
    } else {
      // RFC 4193 Unique Local Address (ULA) format
      // fd00::/8 prefix + 40-bit Global ID + 16-bit Subnet ID + 64-bit Interface ID
      
      // Generate random Global ID (40 bits = 10 hex digits) if needed
      let globalId = '';
      for (let i = 0; i < 10; i++) {
        globalId += Math.floor(Math.random() * 16).toString(16);
      }
      
      // Use manual Global ID if provided and in manual mode
      if (ipv6ManualMode.checked && ipv6GlobalId.value.trim() !== '') {
        globalId = ipv6GlobalId.value.trim();
      }
      
      // Use provided Subnet ID or default
      const subnetId = ipv6ManualMode.checked ? (ipv6SubnetId.value.trim() || '0000') : '0000';
      
      // Format the first part of the address (fd + global ID)
      ip = 'fd';
      
      // Format with proper grouping (4 characters per group)
      const combinedId = globalId + subnetId;
      
      if (!ipv6ManualMode.checked) {
        // Show only the network prefix format: fd<global-id>:<subnet-id>::/48
        ip += combinedId.slice(0, 2) + ':';
        ip += combinedId.slice(2, 6) + ':';
        ip += combinedId.slice(6, 10) + '::' + '/48';
      } else {
        // Full IPv6 address with interface ID
        ip += combinedId.slice(0, 2) + ':';
        ip += combinedId.slice(2, 6) + ':';
        ip += combinedId.slice(6, 10) + ':';
        ip += combinedId.slice(10, 14) + '::';
        
        // Generate the interface ID (auto-generated)
        const interfaceId = Math.floor(Math.random() * 0xFFFFFFFFFFFFFFFF).toString(16).padStart(16, '0');
        ip += interfaceId.slice(0, 4) + ':';
        ip += interfaceId.slice(4, 8) + ':';
        ip += interfaceId.slice(8, 12) + ':';
        ip += interfaceId.slice(12, 16);
      }
    }
    
    ipv6Result.textContent = ip;
  }
  
  // MAC Address Generator
  const macFormat = document.getElementById('mac-format');
  const macVendor = document.getElementById('mac-vendor');
  const macResult = document.getElementById('mac-result');
  const generateMacButton = document.getElementById('generate-mac');
  const copyMacButton = document.getElementById('copy-mac');
  
  // Vendor OUI (Organizationally Unique Identifier) prefixes
  const vendorPrefixes = {
    'apple': ['00:03:93', '00:05:02', '00:0A:27', '00:0A:95', '00:1E:52', '00:A0:40', '34:15:9E', '58:B0:35', '60:FB:42', '68:09:27', 'AC:BC:32', 'DC:2B:61'],
    'cisco': ['00:00:0C', '00:01:42', '00:01:43', '00:01:97', '00:03:6B', '00:07:0E', '00:0E:08', '00:0F:23', '00:13:C4', '00:15:F9'],
    'dell': ['00:06:5B', '00:08:74', '00:0D:56', '00:12:3F', '00:14:22', '00:18:8B', '00:21:9B', '00:24:E8', '00:26:B9', '14:FE:B5'],
    'intel': ['00:02:B3', '00:03:47', '00:04:23', '00:07:E9', '00:0C:F1', '00:0E:0C', '00:11:11', '00:12:F0', '00:13:CE', '00:15:17'],
    'microsoft': ['00:03:FF', '00:0D:3A', '00:12:5A', '00:15:5D', '00:17:FA', '00:1D:D8', '00:50:F2', '28:18:78', '50:1A:C5', 'BC:83:85'],
    'samsung': ['00:00:F0', '00:07:AB', '00:12:47', '00:15:99', '00:17:C9', '00:17:D5', '00:18:AF', '00:1B:98', '00:1C:43', '00:21:19'],
    'sony': ['00:01:4A', '00:13:A9', '00:1A:80', '00:1D:0D', '00:1F:E4', '00:24:BE', '00:EB:2D', '30:F9:ED', '54:42:49', '78:84:3C'],
    'netgear': ['00:09:5B', '00:0F:B5', '00:14:6C', '00:18:4D', '00:1B:2F', '00:1E:2A', '00:24:B2', '00:26:F2', 'C0:3F:0E', 'E0:91:F5'],
    'tp-link': ['00:19:E0', '00:1D:0F', '00:21:27', '00:23:CD', '00:25:86', '00:TP:55', '14:CC:20', '14:E6:E4', '18:D6:C7', 'D8:5D:4C'],
    'huawei': ['00:18:82', '00:1E:10', '00:25:68', '00:25:9E', '00:34:FE', '00:46:4B', '00:5A:13', '00:66:4B', '00:9A:CD', '00:E0:FC']
  };
  
  generateMacButton.addEventListener('click', generateMAC);
  copyMacButton.addEventListener('click', () => copyText(macResult, copyMacButton));
  
  // Add event listeners for automatic updating
  macFormat.addEventListener('change', generateMAC);
  macVendor.addEventListener('change', generateMAC);
  
  function generateMAC() {
    const vendor = macVendor.value;
    const format = macFormat.value;
    let bytes = [];
    
    if (vendor !== 'random') {
      // Use vendor-specific OUI
      const vendorList = vendorPrefixes[vendor];
      const selectedOUI = vendorList[Math.floor(Math.random() * vendorList.length)];
      
      // Parse the OUI and convert to bytes
      const ouiBytes = selectedOUI.split(':');
      
      // Add OUI bytes
      bytes = [...ouiBytes];
      
      // Add 3 random bytes for the device-specific part
      for (let i = 0; i < 3; i++) {
        bytes.push(Math.floor(Math.random() * 256).toString(16).padStart(2, '0'));
      }
    } else {
      // Generate 6 random bytes
      for (let i = 0; i < 6; i++) {
        bytes.push(Math.floor(Math.random() * 256).toString(16).padStart(2, '0'));
      }
    }
    
    // Format according to selection
    let mac = '';
    switch(format) {
      case 'colon':
        mac = bytes.join(':');
        break;
      case 'dash':
        mac = bytes.join('-');
        break;
      case 'dot':
        mac = [
          bytes[0] + bytes[1],
          bytes[2] + bytes[3],
          bytes[4] + bytes[5]
        ].join('.');
        break;
    }
    
    macResult.textContent = mac;
  }
  
  // Generic function to copy text
  function copyText(element, button) {
    const text = element.textContent;
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        // Visual feedback for copy action
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 1500);
      }).catch(err => {
        console.error('Error copying text: ', err);
      });
    }
  }
  
  // Generate initial values for network tools
  generateRandomPort();
  generateIPv4();
  generateIPv6();
  generateMAC();
  
  updateControlsVisibility();
  generatePassword();
});

