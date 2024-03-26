import { generatePdfByIdLavoratore } from 'utility/pdf/generatePdfByIdLavoratore';

export const estraiCurriculumLavoratore = async (parent, args, context) => {
	const { idUtenteLav, idServizio, brandColor = '#77BC1F', anonymous = false, logoWemi = false} = args;
	return generatePdfByIdLavoratore(idUtenteLav, idServizio, brandColor, anonymous, logoWemi);
};
