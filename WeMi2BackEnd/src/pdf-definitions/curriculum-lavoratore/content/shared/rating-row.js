
import { FontAwesomeCharset } from 'assets/fonts/FontAwesome/charset';

// TODO: the above component should be based on the stacked row component!

export function ratingRow({
  label,
  rating,
  maxRating = 5,
  overflowLabel = '',
  overflowLabelSize = 8,
  overflowLabelBold = true,
  labelBold = false,
  labelFontSize = 9,
  showBorder = true,
  borderColor = '#929292',
  activeColor = '#77BC1F',
  idleColor = '#B8B8B8',
}) {
  const rowContent = {
    table: {
      widths: ['*', 'auto'],
      body: [
        [
          {
            text: `${label} `,
            bold: labelBold,
            fontSize: labelFontSize,
            border: [false, false, false, showBorder],
            borderColor: [borderColor, borderColor, borderColor, borderColor],
          },
        ],
      ]
    },
    layout: {
      paddingLeft: () => 0,
      paddingRight: () => 0,
      hLineWidth: (i, node) => 0.30,
      vLineWidth: (i, node) => 0.30
    },
  };

  // The rating is greater then the max allowed value,
  // we need to just render to "overflow label"
  if (rating > maxRating) {
    rowContent.table.body[0].push({
      text: `${overflowLabel} `,
      fontSize: overflowLabelSize,
      bold: overflowLabelBold,
      color: activeColor,
      margin: [0, 2, 0, 0],
      border: [false, false, false, showBorder],
      borderColor: [borderColor, borderColor, borderColor, borderColor],
    });
    
    return rowContent;
  }

  // Build the rating dots.
  const ratingDots = Array.from(new Array(maxRating)).reduce(
    (accumulator, item, index, originalArray) => {
      accumulator = accumulator.concat({
        style: 'icon',
        text: `${FontAwesomeCharset.get('circle')}`,
        color: index < rating ? activeColor : idleColor,
      });

      if (index < originalArray.length) {
        accumulator = accumulator.concat({ text: ' ', fontSize: 6 });
      }

      return accumulator;
    },
    []
  );

  rowContent.table.body[0].push({
    noWrap: true,
    border: [false, false, false, showBorder],
    margin: [0, 3, 0, 0],
    borderColor: [borderColor, borderColor, borderColor, borderColor],
    text: ratingDots,
  });

  return rowContent;
}