
/**
 * Hobby e interessi.
 */
export function hobbies(pdfData) {
  const { elencoHobby, brandColor } = pdfData;

  if (!elencoHobby?.length) {
    return [];
  }

  const elementiTestualiHobby = (elencoHobby || []).map(
    hobby => ({
      text: hobby,
      fontSize: 9,
      margin: [0, 0, 0, 3],
    })
  );


  return [
    {
      text: 'HOBBY E INTERESSI',
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 20, 0, 3],
    },
    ...elementiTestualiHobby,
  ];
}