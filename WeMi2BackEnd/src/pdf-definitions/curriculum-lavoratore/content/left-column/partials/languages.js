
import { ratingRow } from '../../shared/rating-row';

/**
 * Lingue.
 */
export function languages(pdfData) {
  const {
    livConoscenzaItaliano,
    livConoscenzaLingue = [],
    brandColor,
  } = pdfData;

  const languages = [
    ...livConoscenzaLingue, 
    { labelLingua: 'Italiano', livello: livConoscenzaItaliano || 0 }
  ].filter(el => el.livello);

  const languagesContent = languages?.sort((a, b) => a.labelLingua.localeCompare(b.labelLingua))
  .sort((a,b)=> b.livello - a.livello)
  .map(
    linguaConosciuta => ratingRow({
      label: linguaConosciuta.labelLingua,
      activeColor: brandColor,
      rating: linguaConosciuta.livello,
      overflowLabel: 'MADRELINGUA'
    })
  );
  return [
    {
      text: 'LINGUE',
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 20, 0, 3],
    },
    ...languagesContent,
  ];
}