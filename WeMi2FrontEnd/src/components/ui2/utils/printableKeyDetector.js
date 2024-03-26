
/**
 * Detect if the keyboard-event was originated by a press
 * on a printable char.
 * @param {*} event A KeyboardEvent.
 */
export const isPrintableCharKeypress = event => {
  const isPrintableChar = event.key.length === 1 && event.key !== ' ';
  const isModifierKey = event.ctrlKey || event.metaKey || event.altKey;

  return isPrintableChar && !isModifierKey;
};
