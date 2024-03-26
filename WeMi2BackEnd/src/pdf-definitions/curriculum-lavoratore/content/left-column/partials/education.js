
/**
 * Istruzione e formazione.
 */
export function education(pdfData) {
  const { titoliDiStudio, corsi, brandColor } = pdfData;

  const elencoTestualeTitoliStudio = (titoliDiStudio || [])
    .map(titoloStudio => ({
      text: titoloStudio,
      fontSize: 9,
      margin: [0, 0, 0, 3]
    }));

  const elencoTestualeCorsi = (corsi || [])
    .map(corso => ({
      text: corso,
      fontSize: 9,
      margin: [0, 0, 0, 3]
    }));

  return [
    {
      text: 'ISTRUZIONE E FORMAZIONE',
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 20, 0, 3],
    },
    elencoTestualeTitoliStudio?.length ? 
    {
      margin: [0, 0, 0, 3],
      text: [
        { text: 'TITOLO DI STUDIO', bold: true, fontSize: 8, },
      ],
    } : null,
    ...elencoTestualeTitoliStudio,
    elencoTestualeCorsi?.length ? 
    {
      margin: [0, 0, 0, 3],
      text: [
        { text: 'CORSI DI FORMAZIONE', bold: true, fontSize: 8, },
      ],
    } : null,
    ...elencoTestualeCorsi,
  ];
}