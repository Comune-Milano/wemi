import path from 'path';

/**
 * Immagine del logo WeMi.
 */
export function logoWemi(pdfData) {
  const { logoWemi } = pdfData;

  if(!logoWemi) {
    return {}
  }

  return {
    image: path.join(__dirname, 'assets/images/logo-wemi-tcb.png'),
    fit: [300, 300],
    alignment: 'right',
    margin: [0, -20, 15, 0]
  };
}
