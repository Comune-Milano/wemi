
import { FontAwesomeCharset } from 'assets/fonts/FontAwesome/charset';

/**
 * Competenze - Cura dei bambini.
 */
export function childrenCare(pdfData) {
  const {
    brandColor,
    attributiCompetenzeCuraBambiniBabySitter
  } = pdfData;

  if (!attributiCompetenzeCuraBambiniBabySitter?.length) {
    return [];
  }
  
  return [
		{
			text: 'COMPETENZE - CURA DEI BAMBINI',
			bold: true,
			fontSize: 9,
			color: brandColor,
      margin: [
        0,
        !pdfData.esperienzeLavoratore?.length && !pdfData.recensioniLavoratore?.length ? 0 : 20,
        0,
        3
      ]
    },
    attributiCompetenzeCuraBambiniBabySitter.map(el => setPdfRowCompetenze(el, brandColor)),
	];
}

const pdfRowCompetenze = {
  text: [
    {
      text: '',
      style: 'icon',
      color: '',
    },
    {
      text: '',
      fontSize: 9,
    }
  ]
};

const setPdfRowCompetenze = (el, brandColor) => {
  const rowCopy = {...pdfRowCompetenze};
  const [rowIcon, rowText] = rowCopy.text.map(el => ({...el}));
  rowIcon.text = `${FontAwesomeCharset.get(el.checked ? 'ok' : 'cancel')}`;
  rowIcon.color = el.checked ? brandColor : '#8A8A8D';

  //Somministrazione terapie (specificare)
  //Altro (specificare)
  if(el.valoreAttributo === 14 || el.valoreAttributo === 0) {
    const testoAttributo = el.testoAttributo.substring(0, el.testoAttributo.indexOf('('));
    rowText.text = ` ${testoAttributo} ${el.testo ? '(' + el.testo + ')' : ''}`;
  }
  else {
    rowText.text = ` ${el.testoAttributo}`;
  }

  return {
    text: [
      rowIcon,
      rowText
    ],
    margin: [0, 3, 0, 3],
  };
}
