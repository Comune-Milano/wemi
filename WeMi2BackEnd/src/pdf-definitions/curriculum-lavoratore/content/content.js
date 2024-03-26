
import { leftColumn } from './left-column/left-column';
import { rightColumn } from './right-column/right-column'

/**
 * The content of the pdf document.
 */
export const docContent = async (pdfData) => {
	const leftColumnContent = await leftColumn(pdfData);
	const rightColumnContent = rightColumn(pdfData);

	return {
		table: {
			widths: [ '40%', '60%' ],
			body: [
				[
					leftColumnContent,
					rightColumnContent,
				],
			]
		}
	};
};