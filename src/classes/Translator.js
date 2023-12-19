const fs = require('fs');
const path = require('path');

/**
 * @class Translator
 * @description A class for translating messages based on language and translation group.
 */
class Translator {
  constructor() {
    this.directory = '';
    this.notFoundMessage = '... NOT FOUND ...';
    this.debugMode = false;
    this.availableLanguages = [];
    this.translations = {};
  }

  /**
   * @method setDirectory
   * @description Set the directory where translation files are stored.
   * @param {String} directory - The directory path.
   */
  setDirectory(directory) {
    this.directory = directory;
    this.loadTranslations();
  }

  /**
   * @method setNotFoundMessage
   * @description Set the Key not Found Message.
   * @param {String} message - The Not Found Message.
   */
  setNotFoundMessage(message) {
    this.notFoundMessage = message;
  }

  /**
   * @method setDebugMode
   * @description Set the directory where translation files are stored.
   * @param {boolean} debugMode - The Debug Mode State.
   */
  setDebugMode(debugMode) {
    this.debugMode = debugMode;
  }

  /**
   * @method getAvailableLanguages
   * @description Set the directory where translation files are stored.
   * @return {Array} - The available Languages
   */
  getAvailableLanguages() {
    return this.availableLanguages;
  }

  loadTranslations() {
    try {
      const files = fs.readdirSync(this.directory);
      this.availableLanguages = files.map(file => path.basename(file, '.json'));

      for (const language of this.availableLanguages) {
        const filePath = path.join(this.directory, `${language}.json`);
        const data = fs.readFileSync(filePath, 'utf8');
        this.translations[language] = JSON.parse(data);
      }

      if (this.debugMode) {
        console.log('Translations loaded:', this.translations);
      }
    } catch (error) {
      console.error('Error loading translations:', error.message);
    }
  }

  /**
   * @method translate
   * @description Translate a Key
   * @param {String} language - The Language.
   * @param {String} key - The Key.
   * @param {Object} params - The Params.
   */
  translate(language, key, params = {}) {
    const languageData = this.translations[language];

    if (!languageData) {
      const errorMessage = `Language not found: ${language}`;
      if (this.debugMode) {
        console.warn(errorMessage);
      }

      return this.notFoundMessage;
    }

    const keys = key.split('.');
    let current = languageData;

    for (const k of keys) {
      current = current[k];

      if (!current) {
        const errorMessage = `Key not found: ${key}`;
        if (this.debugMode) {
          console.warn(errorMessage);
        }

        return this.notFoundMessage;
      }
    }

    const translation = this.interpolate(current, params);

    if (this.debugMode) {
      console.log(`Translation for ${language}.${key}:`, translation);
    }

    return translation;
  }

  interpolate(text, params) {
    return text.replace(/{(\w+)}/g, (match, p1) => params[p1] || match);
  }
}

module.exports = Translator;
