import { capitalizeString } from "utility/type-extensions/stringExtensions";

/**
 * Generates the header of the pdf document.
 * @param {*} currentPage
 * @param {*} pageCount
 */
export function docHeader(pdfData) {
	const { nomeUtente, cognomeUtente, brandColor } = pdfData;
	const nominativoLavoratore = capitalizeString(
    `${nomeUtente ? nomeUtente + ' ' : ''}${cognomeUtente || ''}`
	);

	return {
		table: {
			widths: ['100%'],
			body: [
				[
					{
						text: [
							{
                text: 'CV | ',
                bold: true,
                fontSize: 8,
              },
							{
                text: nominativoLavoratore,
                color: brandColor,
                bold: true,
                fontSize: 8,
              }
						],
						alignment: 'right',
						border: [false, false, false, false],
						margin: [0, 38, 45, 0],
					},
				],
			]
		},
		layout: {
			paddingLeft: () => 0,
			paddingRight: () => 0,
		},
	};
}