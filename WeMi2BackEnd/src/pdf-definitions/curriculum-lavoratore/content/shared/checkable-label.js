
import { FontAwesomeCharset } from 'assets/fonts/FontAwesome/charset';

export function checkableLabel({
  checked,
  checkedColor = '#77BC1F',
  uncheckedColor = '#8A8A8D',
  label,
  labelFontSize = 10,
  margin = [0, 3, 0, 3]
}) {
  const iconCode = checked ? 'ok' : 'cancel';

  return {
    text: [
      {
        text: `${FontAwesomeCharset.get(iconCode)}`,
        style: 'icon',
        color: checked ? checkedColor : uncheckedColor,
      },
      {
        text: label,
        fontSize: labelFontSize,
      }
    ],
    margin,
  };
}