
/**
 * Carattere.
 */
export function character(pdfData) {
  const { caratteristicheCarattere, brandColor } = pdfData;

  if (!caratteristicheCarattere?.length) {
    return [];
  }

  const elementiTestualiCaratteristiche = (caratteristicheCarattere || []).map(
    caratteristicaCarattere => ({
      text: caratteristicaCarattere,
      fontSize: 9,
      margin: [0, 0, 0, 3],
    })
  );

  return [
    {
      text: 'CARATTERE',
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 20, 0, 3],
    },
    ...elementiTestualiCaratteristiche,
  ];
}