
import path from 'path';

/**
 * Immagine del profilo.
 */
export async function profileImage(pdfData) {
  const { base64ImmagineProfilo } = pdfData;

  return {
    image: base64ImmagineProfilo || path.join(__dirname, 'assets/images/user-placeholder.png'),
    fit: [130, 130],
    alignment: 'left',
    margin: [10, 0, 0, 0]
  };
}