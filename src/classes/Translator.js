const fs = require('fs');

/**
 * @class Translator
 * @description A class for translating messages based on language and translation group.
 */
class Translator {
  /**
   * @constructor
   * @param {String} language - The target language.
   * @param {String} [fallbackLanguage='en'] - The fallback language in case the translation is not available in the target language.
   */
  constructor(language, fallbackLanguage = 'en') {
    this.language = language;
    this.fallbackLanguage = fallbackLanguage;
    this.directory = './locales';
    this.translations = this.loadTranslations();
    this.group = null; // Group is initially set to null
  }

  /**
   * @method setDirectory
   * @description Set the directory where translation files are stored.
   * @param {String} directory - The directory path.
   */
  setDirectory(directory) {
    this.directory = directory;
  }

  /**
   * @method setGroup
   * @description Set the translation group dynamically.
   * @param {String} group - The translation group identifier.
   */
  setGroup(group) {
    this.group = group;
    this.translations = this.loadTranslations(); // Reload translations when the group is set
  }

  /**
   * @method setLanguage
   * @description Set the target language dynamically.
   * @param {String} language - The target language to set.
   */
  setLanguage(language) {
    this.language = language;
    this.translations = this.loadTranslations(); // Reload translations when the language is set
  }

  /**
   * @method loadTranslations
   * @description Load translations for the specified language and translation group.
   * @returns {Object} - The translations object.
   */
  loadTranslations() {
    if (!this.group) {
      return {};
    }

    const filePath = `${this.directory}/${this.language}.json`;

    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const translations = JSON.parse(data);

      if (translations[this.group]) {
        return translations[this.group];
      } else {
        console.error(`Group "${this.group}" not found in translations for language "${this.language}"`);
        return this.loadFallbackTranslations();
      }
    } catch (err) {
      console.error(`Error loading translations for language "${this.language}": ${err.message}`);
      return {};
    }
  }

  /**
   * @method loadFallbackTranslations
   * @description Load translations from the fallback language.
   * @returns {Object} - The translations object from the fallback language.
   */
  loadFallbackTranslations() {
    const filePath = `${this.directory}/${this.fallbackLanguage}.json`;

    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const fallbackTranslations = JSON.parse(data);

      if (fallbackTranslations[this.group]) {
        console.warn(`Using translations from fallback language "${this.fallbackLanguage}"`);
        return fallbackTranslations[this.group];
      } else {
        console.error(`Group "${this.group}" not found in translations for fallback language "${this.fallbackLanguage}"`);
        return {};
      }
    } catch (err) {
      console.error(`Error loading translations for fallback language "${this.fallbackLanguage}": ${err.message}`);
      return {};
    }
  }

  /**
   * @method translate
   * @description Translate a given key using the loaded translations. If the key is missing in the current language, it falls back to the fallback language.
   * @param {String} translationKey - The key to be translated.
   * @param {Object} [variables] - Variables to replace placeholders in the translated string.
   * @returns {String} - The translated string.
   */
  translate(translationKey, variables) {
    let translation = this.translations[translationKey] || this.loadFallbackTranslations()[translationKey] || translationKey;

    if (variables) {
      for (const variable in variables) {
        const regex = new RegExp(`{${variable}}`, 'g');
        translation = translation.replace(regex, variables[variable]);
      }
    }

    return translation;
  }
}

module.exports = Translator;
