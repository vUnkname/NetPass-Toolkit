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
  
  // String Length Counter
  const strlenInput = document.getElementById('strlen-input');
  const strlenTelegramMode = document.getElementById('strlen-telegram-mode');
  const strlenCodepoints = document.getElementById('strlen-codepoints');
  const strlenUtf16 = document.getElementById('strlen-utf16');
  const strlenUtf8 = document.getElementById('strlen-utf8');
  const strlenGraphemes = document.getElementById('strlen-graphemes');
  const strlenLines = document.getElementById('strlen-lines');
  const strlenWords = document.getElementById('strlen-words');
  const strlenScriptInfo = document.getElementById('strlen-script-info');
  const strlenTelegramInfo = document.getElementById('strlen-telegram-info');
  const strlenStats = document.querySelectorAll('.strlen-stat');

  const PERSIAN_ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const LATIN_REGEX = /[a-zA-Z]/;
  const EMOJI_REGEX = /\p{Extended_Pictographic}/u;
  const graphemeSegmenter = typeof Intl !== 'undefined' && Intl.Segmenter
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : null;

  strlenInput.addEventListener('input', updateStrlen);
  strlenTelegramMode.addEventListener('change', updateStrlen);

  function countCodePoints(text) {
    return [...text].length;
  }

  function countUtf16Units(text) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code >= 0xD800 && code <= 0xDBFF) {
        count += 2;
        i++;
      } else {
        count += 1;
      }
    }
    return count;
  }

  function countUtf8Bytes(text) {
    return new TextEncoder().encode(text).length;
  }

  function countGraphemes(text) {
    if (graphemeSegmenter) {
      return [...graphemeSegmenter.segment(text)].length;
    }
    return countCodePoints(text);
  }

  function countWords(text) {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  function countEmojis(text) {
    const matches = text.match(new RegExp(EMOJI_REGEX.source, 'gu'));
    return matches ? matches.length : 0;
  }

  function countEmojiUtf16Units(text) {
    let count = 0;
    const emojiRegex = new RegExp(EMOJI_REGEX.source, 'gu');
    let match;
    while ((match = emojiRegex.exec(text)) !== null) {
      count += countUtf16Units(match[0]);
    }
    return count;
  }

  function detectScriptInfo(text) {
    const hasPersianArabic = PERSIAN_ARABIC_REGEX.test(text);
    const hasLatin = LATIN_REGEX.test(text);
    const persianArabicCount = (text.match(new RegExp(PERSIAN_ARABIC_REGEX.source, 'g')) || []).length;
    const latinCount = (text.match(new RegExp(LATIN_REGEX.source, 'g')) || []).length;

    if (!hasPersianArabic && !hasLatin) {
      return null;
    }

    let scriptLabel = '';
    if (hasPersianArabic && hasLatin) {
      scriptLabel = persianArabicCount >= latinCount ? 'Mixed (Persian/Arabic dominant)' : 'Mixed (Latin dominant)';
    } else if (hasPersianArabic) {
      scriptLabel = 'Persian / Arabic (RTL)';
    } else {
      scriptLabel = 'Latin (LTR)';
    }

    const utf8PerChar = hasPersianArabic && !hasLatin
      ? 'Persian/Arabic chars use ~2 bytes each in UTF-8'
      : hasPersianArabic
        ? 'Persian/Arabic chars use ~2 bytes, ASCII uses 1 byte in UTF-8'
        : null;

    return { scriptLabel, utf8Note: utf8PerChar, isRtl: hasPersianArabic && persianArabicCount >= latinCount };
  }

  function updateStrlen() {
    const text = strlenInput.value;
    const codePoints = countCodePoints(text);
    const utf16Units = countUtf16Units(text);
    const utf8Bytes = countUtf8Bytes(text);
    const graphemes = countGraphemes(text);
    const lines = text ? text.split('\n').length : 0;
    const words = countWords(text);

    strlenCodepoints.textContent = codePoints;
    strlenUtf16.textContent = utf16Units;
    strlenUtf8.textContent = utf8Bytes;
    strlenGraphemes.textContent = graphemes;
    strlenLines.textContent = lines;
    strlenWords.textContent = words;

    strlenStats.forEach(stat => stat.classList.remove('highlight'));

    const scriptInfo = detectScriptInfo(text);
    if (scriptInfo) {
      strlenScriptInfo.classList.add('visible');
      strlenScriptInfo.textContent = scriptInfo.utf8Note
        ? `${scriptInfo.scriptLabel} — ${scriptInfo.utf8Note}`
        : scriptInfo.scriptLabel;
      strlenInput.classList.toggle('rtl-text', scriptInfo.isRtl);
    } else {
      strlenScriptInfo.classList.remove('visible');
      strlenInput.classList.remove('rtl-text');
    }

    if (strlenTelegramMode.checked) {
      strlenTelegramInfo.style.display = 'block';
      const emojiCount = countEmojis(text);
      const emojiUtf16 = countEmojiUtf16Units(text);
      const isOverLimit = codePoints > 4096;
      const remaining = 4096 - codePoints;

      strlenTelegramInfo.innerHTML =
        `<div class="telegram-limit${isOverLimit ? ' over-limit' : ''}">` +
        `Message: ${codePoints} / 4096` +
        `${isOverLimit ? ' (over limit!)' : ` (${remaining} remaining)`}` +
        `</div>` +
        `<div class="telegram-detail">` +
        `UTF-16 units (for formatting/entities): ${utf16Units}` +
        (emojiCount > 0 ? `<br>Emojis: ${emojiCount} (${emojiUtf16} UTF-16 units)` : '') +
        `<br>Persian/Arabic chars count as 1 code point and 1 UTF-16 unit each` +
        `</div>`;

      document.querySelector('.strlen-stat:nth-child(1)').classList.add('highlight');
      document.querySelector('.strlen-stat:nth-child(2)').classList.add('highlight');
    } else {
      strlenTelegramInfo.style.display = 'none';
    }
  }

  updateStrlen();

  // Data Size Converter
  const dataConvertInput = document.getElementById('data-convert-input');
  const dataConvertFrom = document.getElementById('data-convert-from');
  const dataConvertTo = document.getElementById('data-convert-to');
  const dataConvertOutput = document.getElementById('data-convert-output');
  const dataConvertText = document.getElementById('data-convert-text');
  const copyDataConvertButton = document.getElementById('copy-data-convert');

  const DATA_UNIT_BYTES = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5
  };

  const DATA_UNIT_LABELS = {
    B: 'Bytes (B)',
    KB: 'Kilobytes (KB)',
    MB: 'Megabytes (MB)',
    GB: 'Gigabytes (GB)',
    TB: 'Terabytes (TB)',
    PB: 'Petabytes (PB)'
  };

  dataConvertInput.addEventListener('input', updateDataConverter);
  dataConvertFrom.addEventListener('change', updateDataConverter);
  dataConvertTo.addEventListener('change', updateDataConverter);
  copyDataConvertButton.addEventListener('click', () => {
    if (dataConvertOutput.value) {
      navigator.clipboard.writeText(dataConvertOutput.value).then(() => {
        const originalText = copyDataConvertButton.textContent;
        copyDataConvertButton.textContent = 'Copied!';
        setTimeout(() => {
          copyDataConvertButton.textContent = originalText;
        }, 1500);
      }).catch(err => {
        console.error('Error copying text: ', err);
      });
    }
  });

  function parseDataValue(str) {
    const cleaned = str.trim().replace(/,/g, '');
    if (!cleaned) return null;
    const num = Number(cleaned);
    if (!isFinite(num)) return null;
    return num;
  }

  function formatDataNumber(num) {
    if (num === 0) return '0';
    const abs = Math.abs(num);
    if (abs >= 1e18) return num.toExponential(4);
    if (abs >= 1000) {
      return num.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
    }
    if (abs >= 1) {
      return num.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 0 });
    }
    if (abs >= 0.000001) {
      return num.toLocaleString('en-US', { maximumFractionDigits: 8, minimumFractionDigits: 0 });
    }
    return num.toExponential(4);
  }

  function getUnitLabel(unit) {
    return DATA_UNIT_LABELS[unit] || unit;
  }

  function updateDataConverter() {
    const value = parseDataValue(dataConvertInput.value);
    const fromUnit = dataConvertFrom.value;
    const toUnit = dataConvertTo.value;

    if (value === null) {
      dataConvertOutput.value = '';
      dataConvertText.textContent = '';
      return;
    }

    const bytes = value * DATA_UNIT_BYTES[fromUnit];
    const result = bytes / DATA_UNIT_BYTES[toUnit];
    const formattedInput = formatDataNumber(value);
    const formattedResult = formatDataNumber(result);

    dataConvertOutput.value = formattedResult;
    dataConvertText.textContent =
      `${formattedInput} ${getUnitLabel(fromUnit)} = ${formattedResult} ${getUnitLabel(toUnit)}`;
  }

  // Timestamp Converter
  const timestampInput = document.getElementById('timestamp-input');
  const timestampUnitDetected = document.getElementById('timestamp-unit-detected');
  const timestampGregorian = document.getElementById('timestamp-gregorian');
  const timestampShamsiText = document.getElementById('timestamp-shamsi-text');
  const timestampShamsiIso = document.getElementById('timestamp-shamsi-iso');

  const gregorianFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const shamsiFormatter = new Intl.DateTimeFormat('fa-IR', {
    calendar: 'persian',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const shamsiIsoFormatter = new Intl.DateTimeFormat('fa-IR', {
    calendar: 'persian',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });

  timestampInput.addEventListener('input', updateTimestampConverter);

  function parseTimestampValue(str) {
    const cleaned = str.trim().replace(/,/g, '');
    if (!cleaned) return null;

    const num = Number(cleaned);
    if (!isFinite(num) || num < 0) return null;

    const isMilliseconds = cleaned.length >= 13 || num >= 1e12;
    const ms = isMilliseconds ? num : num * 1000;
    const date = new Date(ms);

    if (isNaN(date.getTime())) return null;

    return {
      raw: num,
      ms,
      unit: isMilliseconds ? 'milliseconds' : 'seconds',
      date
    };
  }

  function formatGregorian(date) {
    return gregorianFormatter.format(date);
  }

  function formatShamsiText(date) {
    try {
      const parts = shamsiFormatter.formatToParts(date);
      const getPart = (type) => parts.find(part => part.type === type)?.value || '';

      const weekday = normalizePersianWeekday(getPart('weekday'));
      const day = getPart('day');
      const month = getPart('month');
      const year = getPart('year');
      const hour = getPart('hour');
      const minute = getPart('minute');
      const second = getPart('second');
      const daySuffix = getPersianDaySuffix(day);

      return `${weekday}، ${day}${daySuffix} ${month} ${year}، ساعت ${hour}:${minute}:${second}`;
    } catch (error) {
      return 'Persian calendar not supported in this browser';
    }
  }

  function formatShamsiIso(date) {
    const parts = shamsiIsoFormatter.formatToParts(date);
    const getPart = (type) => toLatinDigits(parts.find(part => part.type === type)?.value || '');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

    return `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}:${getPart('second')}.${milliseconds}Z`;
  }

  function getPersianDaySuffix(dayStr) {
    const dayNum = parseInt(toLatinDigits(dayStr), 10);
    if (dayNum >= 1 && dayNum <= 9) return 'م';
    return 'ام';
  }

  function toLatinDigits(str) {
    return str.replace(/[۰-۹]/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit));
  }

  function normalizePersianWeekday(weekday) {
    return weekday
      .replace('پنجشنبه', 'پنج\u200Cشنبه')
      .replace('سهشنبه', 'سه\u200Cشنبه')
      .replace('چهارشنبه', 'چهار\u200Cشنبه');
  }

  function updateTimestampConverter() {
    const parsed = parseTimestampValue(timestampInput.value);

    if (!parsed) {
      timestampUnitDetected.textContent = '';
      timestampGregorian.textContent = '';
      timestampShamsiText.textContent = '';
      timestampShamsiIso.textContent = '';
      return;
    }

    const gregorian = formatGregorian(parsed.date);
    const shamsiText = formatShamsiText(parsed.date);
    const iso = parsed.date.toISOString();

    timestampUnitDetected.textContent = `Detected: ${parsed.unit} (${parsed.raw.toLocaleString('en-US')})`;
    timestampGregorian.textContent = `${gregorian}\n${iso} UTC`;
    timestampShamsiText.textContent = shamsiText;
    timestampShamsiIso.textContent = `${formatShamsiIso(parsed.date)} UTC`;
  }

  // Percentage Calculator
  const percentValue = document.getElementById('percent-value');
  const percentBase = document.getElementById('percent-base');
  const percentResult = document.getElementById('percent-result');
  const percentRemaining = document.getElementById('percent-remaining');
  const percentText = document.getElementById('percent-text');

  percentValue.addEventListener('input', updatePercentCalculator);
  percentBase.addEventListener('input', updatePercentCalculator);

  function parsePercentNumber(str) {
    const cleaned = str.trim().replace(/,/g, '');
    if (!cleaned) return null;
    const num = Number(cleaned);
    if (!isFinite(num)) return null;
    return num;
  }

  function formatPercentNumber(num) {
    if (num === 0) return '0';
    const abs = Math.abs(num);
    if (abs >= 1000) {
      return num.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
    }
    if (abs >= 1) {
      return num.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 0 });
    }
    return num.toLocaleString('en-US', { maximumFractionDigits: 8, minimumFractionDigits: 0 });
  }

  function updatePercentCalculator() {
    const percent = parsePercentNumber(percentValue.value);
    const base = parsePercentNumber(percentBase.value);

    if (percent === null || base === null) {
      percentResult.textContent = '—';
      percentRemaining.textContent = '—';
      percentText.textContent = '';
      return;
    }

    const result = (percent / 100) * base;
    const remaining = base - result;

    percentResult.textContent = formatPercentNumber(result);
    percentRemaining.textContent = formatPercentNumber(remaining);
    percentText.textContent =
      `${formatPercentNumber(percent)}% of ${formatPercentNumber(base)} = ${formatPercentNumber(result)}; ` +
      `remaining: ${formatPercentNumber(remaining)}`;
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

