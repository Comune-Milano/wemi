
import { FontAwesomeCharset } from 'assets/fonts/FontAwesome/charset';

/**
 * Disponibilità aggiuntive.
 */
export function additionalAvailabilities(pdfData) {
  const { attributiDisponibilita, brandColor } = pdfData;

  if (!attributiDisponibilita?.length) {
    return [];
  }

  const elementiDisponibilita = (attributiDisponibilita || []).map(
    attDisp => ({
      text: [
        {
          text: FontAwesomeCharset.get(attDisp.checked ? 'ok' : 'cancel'),
          style: 'icon',
          color: attDisp.checked ? brandColor : '#8A8A8D',
        },
        {
          text: ` ${attDisp.text}`,
          fontSize: 9,
        }
      ],
      fontSize: 9,
      margin: [0, 0, 0, 3],
    })
  );

  return [
    {
      text: 'DISPONIBILITÀ AGGIUNTIVE',
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 20, 0, 3],
    },
    ...elementiDisponibilita,
  ];
}
