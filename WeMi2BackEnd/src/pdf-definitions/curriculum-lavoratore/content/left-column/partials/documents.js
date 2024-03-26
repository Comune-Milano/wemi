
import { FontAwesomeCharset } from 'assets/fonts/FontAwesome/charset';

/**
 * Documenti.
 */
export function documents(pdfData) {
  const {
    nrCartaDiIdentita,
    numeroPermessoDiSoggiorno,
    brandColor,
  } = pdfData;

  return [
    {
      text: 'DOCUMENTI',
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 20, 0, 3]
    },
    {
      margin: [0, 3, 0, 3],
      text: [
        {
          text: FontAwesomeCharset.get(nrCartaDiIdentita ? 'ok' : 'cancel'),
          style: 'icon',
          color: nrCartaDiIdentita ? brandColor : '#8A8A8D',
        },
        {
          text: ' Carta di identità',
          fontSize: 9,
          bold: true,
        }
      ],
    },
    {
      margin: [0, 0, 0, 3],
      text: [
        {
          text: FontAwesomeCharset.get(numeroPermessoDiSoggiorno ? 'ok' : 'cancel'),
          style: 'icon',
          color: numeroPermessoDiSoggiorno ? brandColor : '#8A8A8D',
        },
        {
          text: ' Permesso di soggiorno',
          fontSize: 9,
          bold: true,
        }
      ],
    },
  ];
}