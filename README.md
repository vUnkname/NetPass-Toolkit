<div align="center"><img src="https://raw.githubusercontent.com/vUnkname/Password-Generator/main/screenshot.png"></div>
<br>

# Password Generator - Chrome Extension

A secure and customizable password generator extension for Chrome that helps you create strong, random passwords with various options.

## Features

- Generate random passwords with customizable length (1-100 characters)
- Multiple character set options:
  - All characters (maximum security)
  - Easy to say (avoids numbers and special characters)
  - Easy to read (avoids ambiguous characters like l, 1, I, O, 0)
  - UUID generation
- Character type toggles:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Symbols
- Copy password to clipboard with one click
- Simple and intuitive interface

## Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore/) (coming soon)
2. Search for "Password Generator - LastPass v02"
3. Click "Add to Chrome"

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the extension directory
5. The extension should now appear in your toolbar

## Usage

1. Click the extension icon in your Chrome toolbar
2. The extension popup will open with a randomly generated password
3. Customize your password using the available options:
   - Adjust the password length using the slider or input field
   - Select a character set option (All characters, Easy to say, Easy to read, UUID)
   - Toggle specific character types (Uppercase, Lowercase, Numbers, Symbols)
4. Click the refresh button (🔄) to generate a new password with current settings
5. Click "Copy password" to copy the password to your clipboard

## Customization

### Password Types

- **All Characters**: Uses all character types for maximum security
- **Easy to Say**: Avoids numbers and special characters for easier verbal communication
- **Easy to Read**: Avoids ambiguous characters like l, 1, I, O, 0 that can be confused with each other
- **Generate UUID**: Creates a standard UUID (Universally Unique Identifier) in format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

### Character Options

- **Uppercase**: Include uppercase letters (A-Z)
- **Lowercase**: Include lowercase letters (a-z)
- **Numbers**: Include numbers (0-9)
- **Symbols**: Include special characters (!@#$%^&*()-_=+[]{}|;:,.<>?/~)

## Privacy

This extension:
- Does not collect or transmit your passwords
- Operates entirely locally in your browser
- Does not require an internet connection
- Generates passwords using secure random methods

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Developed by [vUnkname](https://github.com/vUnkname/Password-Generator/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
