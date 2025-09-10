/**
 * hawInput
 * 
 * Binds a listener to an input element specified by the ID of that element.
 * When the chord key ` is typed, allows output of an ʻokina or kahakō.
 * 
 * @param {String} element_id The ID of the input or textarea to bind to.
 * @returns {boolean} True if the binding succeeds (currently it always should)
 */
function hawInput(element_id) {
  // Set hash of values for input replacement.
  const HAWI_BACKTICK_KEYS = {"'":"ʻ", "a":"ā", "e":"ē", "i":"ī", "o":"ō", "u":"ū","A":"Ā", "E":"Ē", "I":"Ī", "O":"Ō", "U":"Ū"}
  // Set input element; maybe change this to work with classes?
  const text_input = document.getElementById(element_id);
  // Flag for whether the backtick key has been pressed.
  let backtick_flag = false;
  // Listen for keypresses within the provided element.
  text_input.addEventListener('keypress', (event) => {
    const key = event.key;
    // Check and verify one of the keys is a chordkey if one is not set.
    if( !backtick_flag ) {
      if(key === '`') {
        // Backtick chord key matched, do not type.
        event.preventDefault();
        backtick_flag = true;
        return false;
      } 
    } else {
      // A chord key is set, so process the next key input.
      let replacement_character = '';
      if(backtick_flag) {
        replacement_character = hawiCharacterReplace(key, HAWI_BACKTICK_KEYS);
      } 
      // If the flag is set, and if the character was replaced, use it in the text.
      if( (backtick_flag) && (replacement_character != key) ) {
        // Prevent the default character from being typed.
        event.preventDefault();
        // Put the replacement character in place where it is being typed.
        let start = text_input.selectionStart;
        let end = text_input.selectionEnd;
        let val = text_input.value;
        text_input.value = val.slice(0, start) + replacement_character + val.slice(end);
        text_input.selectionStart = text_input.selectionEnd = start + 1;
        // Reset the flag
        backtick_flag = false;
        return false;
      } else {
        // Reset the flag and allow normal character typing.
        backtick_flag = false;
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