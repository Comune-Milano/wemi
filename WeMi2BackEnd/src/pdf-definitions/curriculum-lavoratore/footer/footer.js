import { logoWemi } from './logo-wemi';

/**
 * Generates the footer of the pdf document.
 * @param {*} currentPage
 * @param {*} pageCount
 */
export function docFooter(currentPage, pageCount, pdfData) {
  const logoWemiContent = logoWemi(pdfData);

  return [
    {
      text:  `Pagina ${currentPage.toString()}/${pageCount}`,
      fontSize: 10,
      margin: [45, 5, 0, 0],
    },
    logoWemiContent,
  ];
}