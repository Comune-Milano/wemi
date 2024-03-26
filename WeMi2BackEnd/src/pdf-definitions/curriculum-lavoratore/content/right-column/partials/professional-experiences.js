import { unbreakableStack } from "../../shared/unbreakable-stack";

/**
 * Esperienze professionali.
 */
export function professionalExperiences(pdfData) {
	const { brandColor, esperienzeLavoratore } = pdfData;

	const esperienzeLavoratoreContent = esperienzeLavoratore.map(
		(esperienza, index) => {
			const esperienzaStack = [];

			if (index === 0) {
				esperienzaStack.push({
					text: 'ESPERIENZE PROFESSIONALI',
					bold: true,
					fontSize: 9,
					color: brandColor,
					margin: [0, 0, 0, 10]
				});
			}

			const nomeServizio = esperienza.nomeServizio ? 
				esperienza.nomeServizio.toUpperCase() : 
				'-';
			const annoInizio = esperienza.inizioPeriodo ? 
				(new Date(esperienza.inizioPeriodo).getFullYear()) :
				undefined;
			const annoFine = esperienza.finePeriodo ? 
				(new Date(esperienza.finePeriodo).getFullYear()) :
				undefined;
			const esperienzaDateRange = [
				...(annoInizio ? [annoInizio] : []),
				...(annoFine && annoFine !== annoInizio ? [annoFine] : []),
			].join(' - ');
			const infoServizio = {
				text: `${esperienzaDateRange} | ${nomeServizio}`,
				bold: true,
				fontSize: 8,
				color: brandColor,
				margin: [0, 0, 0, 3],
			};

			const infoFamiglia = {
				text: `${esperienza.nomeFamiglia || '-'}`,
				fontSize: 9,
				bold: true,
				margin: [0, 0, 0, 3],
			};

			const noteLavoratore = {
				text: esperienza.noteLavoratore || '-',
				fontSize: 9,
				margin: [0, 0, 0, 5],
			};

			esperienzaStack.push(
				infoServizio,
				infoFamiglia,
				noteLavoratore
			);
			return unbreakableStack(esperienzaStack);
		}
	);

	return esperienzeLavoratoreContent;
}