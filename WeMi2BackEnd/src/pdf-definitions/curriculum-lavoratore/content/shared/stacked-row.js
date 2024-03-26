
export function stackedRow({
  label,
  labelValue,
  labelBold = false,
  labelFontSize = 9,
  showBorder = true,
  borderColor = '#929292',
}) {
  const rowContent = {
    table: {
      widths: ['*', 'auto'],
      body: [
        [
          {
            text: label,
            bold: labelBold,
            fontSize: labelFontSize,
            border: [false, false, false, showBorder],
            borderColor: [borderColor, borderColor, borderColor, borderColor],
          },
          {
            noWrap: true,
            border: [false, false, false, showBorder],
            margin: [0, 0, 0, 0],
            borderColor: [borderColor, borderColor, borderColor, borderColor],
            text: labelValue,
          }
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

  return rowContent;
}