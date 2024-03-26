
import { ratingRow } from '../../shared/rating-row';
import { unbreakableStack } from '../../shared/unbreakable-stack';

/**
 * Referenze.
 */
export function references(pdfData) {
	const { brandColor, recensioniLavoratore } = pdfData;

	const recensioniLavoratoreContent = recensioniLavoratore.map(
		(recensione, index) => {
			const stackRecensione = [];

			if (index === 0) {
				stackRecensione.push({
					text: 'REFERENZE',
					bold: true,
					fontSize: 9,
					color: brandColor,
					margin: [0, 20, 0, 0]
				});
			}

			const ratingRecensione = ratingRow({
				label: `${recensione.cognomeFamiglia || '-'}`,
				rating: recensione.mediaRecensione || 0,
				labelBold: true,
				activeColor: brandColor,
			});

			const notaRecensione = {
				text: recensione.txNotaRecensione || '-',
				fontSize: 9,
				margin: [0, 0, 0, 10]
			};

			stackRecensione.push(ratingRecensione);
			stackRecensione.push(notaRecensione);

			return unbreakableStack(stackRecensione);
		}
	);

	return recensioniLavoratoreContent;
}