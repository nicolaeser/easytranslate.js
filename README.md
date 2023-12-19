# EasyTranslate.js

EasyTranslate.js is a lightweight JavaScript library for easy message translation based on language and translation groups.

## Installation

You can install EasyTranslate.js via npm:

```bash
npm install easytranslate.js
```

## Usage
```js
const Translator = require('easytranslate.js');

// Create an instance of the Translator
const translator = new Translator();

// Set the directory containing translation files
translator.setDirectory('./translations');

// Optional: Set a custom message for when a translation is not found
translator.setNotFoundMessage('Translation not available!');

// Optional: Enable debug mode to log additional information
translator.setDebugMode(true);

// Get available languages
const availableLanguages = translator.getAvailableLanguages();
console.log('Available Languages:', availableLanguages);

// Translate a message
const translation = translator.translate('en', 'greetings.user.header.title1', { user: 'me', time: '10 pm' });
console.log('Translation:', translation);
```

# Translation Files
Place your translation files in the specified directory (e.g., ./translations). Each file should be named with the language code (e.g., en.json) and follow the JSON structure:
```json
{
  "greetings": {
    "user": {
      "header": {
        "title1": "Hey {user}, it is {time}?"
      }
    }
  }
}
```

# Maybe Important for you?
## `setDirectory(directory: string): void`

# Sets the directory containing translation files.
## `setNotFoundMessage(message: string): void`

# Sets a custom message to be returned when a translation is not found.
## `setDebugMode(debugMode: boolean): void`

# Enables or disables debug mode. When enabled, additional information is logged.
`getAvailableLanguages(): string[]`

# Returns an array of available language codes.
`translate(language: string, key: string, params?: object): string`

# Translates a message based on the specified language, translation key, and optional parameters.