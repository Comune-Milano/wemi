
import { FontAwesomeCharset } from 'assets/fonts/FontAwesome/charset';
import { ratingRow } from '../../shared/rating-row';

/**
 * Capacità comunicative.
 */
export function communicationAbility(pdfData) {
  const {
    livCapacitaComunicative,
    livCompetenzeRelazionali,
    livCapacitaGestioneTempo,
    brandColor,
  } = pdfData;

  return [
    {
      text: 'CAPACITÀ COMUNICATIVE',
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 20, 0, 3],
    },
    {
      ...ratingRow({
        label: 'Comunicative',
        activeColor: brandColor,
        rating: livCapacitaComunicative,
      }),
    },
    {
      ...ratingRow({
        label: 'Relazionali',
        activeColor: brandColor,
        rating: livCompetenzeRelazionali,
      }),
    },
    {
      ...ratingRow({
        label: 'Di gestione del tempo',
        activeColor: brandColor,
        rating: livCapacitaGestioneTempo,
      }),
    },
  ];
}