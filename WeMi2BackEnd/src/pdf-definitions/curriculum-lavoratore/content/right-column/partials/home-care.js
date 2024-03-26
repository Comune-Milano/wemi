
import { FontAwesomeCharset } from 'assets/fonts/FontAwesome/charset';

/**
 * Competenze - Cura della casa.
 */
export function homeCare(pdfData) {
  const {
    brandColor,
    attributiCompetenzeCuraDellaCasaColf,
    serviziTcb
  } = pdfData;

  if (attributiCompetenzeCuraDellaCasaColf?.length
      && attributiCompetenzeCuraDellaCasaColf.every(el => !el.checked)
      && serviziTcb.some(el => el.servizio === 'BABY-SITTER' || el.servizio === 'BADANTE')) {
    return [];
  }

  return [
		{
			text: 'COMPETENZE - CURA DELLA CASA',
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
    attributiCompetenzeCuraDellaCasaColf.map(el => setPdfRowCompetenze(el, brandColor)),
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

  //Altro (specificare)
  if(el.valoreAttributo === 0) {
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
