
import PdfPrinter from 'pdfmake';
import path from 'path';

// The fonts path.
const fontsPath = path.join(__dirname, 'assets/fonts/');

// The set of fonts used by the pdf doc.
const fonts = {
  Montserrat: {
    normal: `${fontsPath}/Montserrat/Montserrat-Medium.ttf`,
    italics: `${fontsPath}/Montserrat/Montserrat-Italic.ttf`,
    bold: `${fontsPath}/Montserrat/Montserrat-Bold.ttf`,
		bolditalics: `${fontsPath}/Montserrat/Montserrat-BoldItalic.ttf`,
  },
  FontAwesome: {
    normal: `${fontsPath}/FontAwesome/FontAwesome.ttf`,
    italics: `${fontsPath}/FontAwesome/FontAwesome.ttf`,
    bold: `${fontsPath}/FontAwesome/FontAwesome.ttf`,
    bolditalics: `${fontsPath}/FontAwesome/FontAwesome.ttf`
  },
};

/**
 * Converts the pdf doc definition to a base64 string.
 * @param {*} pdfDoc
 * @param {*} options
 */
export function getPdfBase64(pdfDocDefinition, options = {}) {
  return new Promise((resolve, reject) => {
    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(pdfDocDefinition, options);

    const pdfChunks = [];

    // Stores each chunk of data.
    pdfDoc.on('data', function(chunk) {
      pdfChunks.push(chunk);
    });

    // Resolve the promise with tha base64 encoding of the image.
    pdfDoc.on('end', function () {
      const base64Output = Buffer.concat(pdfChunks);
      resolve('data:application/pdf;base64,' + base64Output.toString('base64'));
    });

    // Reject the promise on error.
    pdfDoc.on('error', reject);

    pdfDoc.end();
  });
}