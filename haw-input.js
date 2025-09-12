/**
 * hawInput
 * 
 * Binds a listener to an input element specified by the ID of that element.
 * When the chord key ` is typed, allows output of an ʻokina or lower case kahakō.
 * When the chord key \ is typed, allows output of upper case kahakō.
 * 
 * @param {object} element The DOM element to bind the script to, should be a text input or textarea.
 * @returns {boolean} True if the binding succeeds (currently it always should)
 */
function hawInput(element) {
  // Set hash of values for input replacement.
  const HAWI_BACKTICK_KEYS = {"'":"ʻ", "a":"ā", "e":"ē", "i":"ī", "o":"ō", "u":"ū"}
  const HAWI_BACKSLASH_KEYS = {"a":"Ā", "e":"Ē", "i":"Ī", "o":"Ō", "u":"Ū"}
  // Flag for whether the backtick or backslash key has been pressed.
  let backtick_flag = false;
  let backslash_flag = false;
  // Listen for keypresses within the provided element.
  element.addEventListener('keypress', (event) => {
    const key = event.key;
    // Check and verify the key pressed if no flags are set.
    if(!backtick_flag && !backslash_flag) {
      if(key === '`') {
        // Backtick chord key matched, do not type.
        event.preventDefault();
        backtick_flag = true;
        return false;
      }
      if(key === '\\') {
        // Backslash chord key matched, do not type.
        event.preventDefault();
        backslash_flag = true;
        return false;
      } 
    } else {
      // A chord key is set, so process the next key input.
      let replacement_character = '';
      if(backtick_flag) {
        replacement_character = hawiCharacterReplace(key, HAWI_BACKTICK_KEYS);
      }
      if(backslash_flag) {
        replacement_character = hawiCharacterReplace(key, HAWI_BACKSLASH_KEYS);
      }
      // If the flag is set, and if the character was replaced, use it in the text.
      if( (backtick_flag || backslash_flag) && (replacement_character != key) ) {
        // Prevent the default character from being typed.
        event.preventDefault();
        // Insert the replacement character where the cursor is.
        let start = element.selectionStart;
        let end = element.selectionEnd;
        let val = element.value;
        element.value = val.slice(0, start) + replacement_character + val.slice(end);
        element.selectionStart = element.selectionEnd = start + 1;
        // Reset the flags
        backtick_flag = backslash_flag = false;
        return false;
      } else {
        // Reset the flags and allow normal character typing.
        backtick_flag = backslash_flag = false;
      }
    }
  });

  /**
   * hawiCharacterReplace
   * 
   * Checks an input character against a hash.  If there is a match, returns the replacement character.
   * If not, returns the original character.
   * 
   * @param {String} input_character A single character to be checked if it should be replaced
   * @param {Object} replacement_object An object of the key:replacement pairs to be checked.
   * @returns {String} Either the original single character or the replacement if a match was found.
   */
  function hawiCharacterReplace(input_character, replacement_object) {
   return replacement_object[input_character] ? replacement_object[input_character] : input_character;
  }

  return true;
}

export { hawInput };