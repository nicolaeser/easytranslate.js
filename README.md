# EasyTranslate.js

EasyTranslate.js is a lightweight JavaScript library for easy message translation based on language and translation groups.

## Installation

You can install EasyTranslate.js via npm:

```bash
npm install easytranslate.js
```

## Usage
```js
const {Translator} = require('easytranslate.js');

// Create a Translator instance
const translator = new Translator('en', 'fallbackLanguage');

// Set the translation file directory
translator.setDirectory('./locales');

// Set the translation group
translator.setGroup('common');

// Change current Language
translator.setLanguage('de')



// Translate a message
const translatedMessage = translator.translate('hello', { name: 'John' });
console.log(translatedMessage);
```

## ./locales/en.json
```json
{
  "common": {
    "hello": "Hello {user}."
  }
}
```

## Features

- ### Simple and lightweight translation library.
- ### Support for language fallbacks in case translations are missing.
- ### Dynamic setting of language and translation group.
## API

### `Translator(language, [fallbackLanguage])`

Creates a new Translator instance.

- `language` (String): The target language.
- `fallbackLanguage` (String, optional): The fallback language in case the translation is not available in the target language. Defaults to 'en'.

### `setDirectory(directory)`

Sets the directory where translation files are stored.

- `directory` (String): The directory path.

### `setGroup(group)`

Sets the translation group dynamically.

- `group` (String): The translation group identifier.

### `setLanguage(language)`

Sets the target language dynamically.

- `language` (String): The target language to set.

### `translate(translationKey, [variables])`

Translates a given key using the loaded translations. If the key is missing in the current language, it falls back to the fallback language.

- `translationKey` (String): The key to be translated.
- `variables` (Object, optional): Variables to replace placeholders in the translated string.
