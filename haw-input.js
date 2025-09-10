/**
 * hawInput
 * @param {*} element_id 
 * @returns 
 */
function hawInput(element_id) {
  // Set values for input.
  const HAWI_BACKTICK_KEYS = {"'":"ʻ", "a":"ā", "e":"ē", "i":"ī", "o":"ō", "u":"ū","A":"Ā", "E":"Ē", "I":"Ī", "O":"Ō", "U":"Ū"}
  // Set input element; maybe change this to work with classes?
  const text_input = document.getElementById(element_id);
  let backtick_flag = false;
  // Listen for keypresses to 
  text_input.addEventListener('keypress', (event) => {
    const key = event.key;
    // console.log(key);
    // Check and verify one of the keys is a chordkey if one is not set.
    // if( !backtick_flag && !backslash_flag ) {
    if( !backtick_flag ) {
      if(key === '`') {
        // Backtick chord key matched, do not type.
        // console.log("Match to chord key `!");
        event.preventDefault();
        backtick_flag = true;
        return false;
      } 
      // else if( key === '\\') {
      //   // Backslash chord key matched, do not type.
      //   // console.log("Match to chord key \\!");
      //   event.preventDefault();
      //   backslash_flag = true;
      //   return false;
      // }
    } else {
      // A chord key is set, so process the next key input.
      let replacement_character = '';
      if(backtick_flag) {
        replacement_character = haiCharacterReplace(key, HAWI_BACKTICK_KEYS);
      } 
      // else if (backslash_flag) {
      //   replacement_character = haiCharacterReplace(key, HAI_BACKSLASH_KEYS);
      // }
      // console.log(replacement_character);
      // If either flag is set, and if the character was replaced, use it in the text.
      // if( (backtick_flag || backslash_flag) && (replacement_character != key) ) {
      if( (backtick_flag) && (replacement_character != key) ) {
        // Prevent the default character from being typed.
        event.preventDefault();
        // Put the replacement character in place where it is being typed.
        let start = text_input.selectionStart;
        let end = text_input.selectionEnd;
        let val = text_input.value;
        text_input.value = val.slice(0, start) + replacement_character + val.slice(end);
        text_input.selectionStart = text_input.selectionEnd = start + 1;
        // Reset the flags
        // backtick_flag = backslash_flag = false;
        backtick_flag = false;
        return false;
      } else {
        // Reset the flags
        // backtick_flag = backslash_flag = false;
        backtick_flag = false;
      }
    }
    // console.log(backtick_flag);
    // console.log(backslash_flag);
  });

  function haiCharacterReplace(input_character, replacement_object) {
   return replacement_object[input_character] ? replacement_object[input_character] : input_character;
  }

  return true;
}

export { hawInput };