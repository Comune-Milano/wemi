
import { docDefaultStyle, docStyles, pageProps } from './styles';
import { docBackground } from './background/background';
import { docFooter } from './footer/footer';
import { docHeader } from './header/header';
import { docContent } from './content/content';

/**
 * The definition of pdf doc. 
 */
export const pdfDocDefinition = async (pdfData) => {
	const content = [ await docContent(pdfData) ];

	return {
		header: () => docHeader(pdfData),
		footer: (currentPage, pageCount) => docFooter(currentPage, pageCount, pdfData),
		background: docBackground,
		content,
		defaultStyle: docDefaultStyle,
		styles: docStyles(pdfData),
		...pageProps,
	};
};