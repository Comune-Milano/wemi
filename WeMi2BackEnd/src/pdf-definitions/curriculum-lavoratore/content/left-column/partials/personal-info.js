
import { FontAwesomeCharset } from 'assets/fonts/FontAwesome/charset';
import { cdValAttributoSesso } from 'constants/cdValAttributoSesso';

/**
 * Dati personali.
 * @param pdfData
 */
export function personalInfo(pdfData) {
  // Skip il rendering delle informazioni personali in formato anonimo.
  const { anonymous } = pdfData;

  const {
    email,
    recapitoTelefonico,
    comuneDomicilio,
    dataNascitaUtente,
    statoNascitaUtente,
    cittadinanzaUtente,
    flagPatente,
    sessoUtente,
    utenteAutomunito,
    brandColor,
    inItaliaDal,
  } = pdfData;

  const sessoUomo = (sessoUtente === cdValAttributoSesso.UOMO);

  const annoSpostamentoInItalia = inItaliaDal ?
    (new Date(inItaliaDal).getFullYear()) :
    undefined;

  return [
    {
      text: 'DATI PERSONALI',
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 20, 0, 3],
    },
    {
      margin: [0, 0, 0, 3],
      text: [
        { text: 'ETÀ ', bold: true, fontSize: 8 },
        { text: dataNascitaUtente ? `${dataNascitaUtente} anni` : '-', fontSize: 9 },
      ],
    },
    {
      margin: [0, 0, 0, 3],
      text: [
        { text: sessoUomo ? 'NATO IN ' : 'NATA IN', bold: true, fontSize: 8 },
        { text: statoNascitaUtente || '-', fontSize: 9 },
      ],
    },
    {
      margin: [0, 0, 0, 3],
      text: [
        { text: 'CITTADINANZA ', bold: true, fontSize: 8 },
        { text: cittadinanzaUtente || '-', fontSize: 9 },
      ],
    },
    annoSpostamentoInItalia ?
    {
      margin: [0, 0, 0, 3],
      text: [
          { text: 'IN ITALIA DAL ', bold: true, fontSize: 8 },
          { text: annoSpostamentoInItalia || '-', fontSize: 9 },
      ],
    } : null,
    {
      margin: [0, 0, 0, 3],
      text: [
        { text: 'DOMICILIO ', bold: true, fontSize: 8 },
        { text: comuneDomicilio || '-', fontSize: 9 },
      ],
    },
    !anonymous ?
    {
      margin: [0, 0, 0, 3],
      text: [
          { text: 'TELEFONO ', bold: true, fontSize: 8 },
          { text: recapitoTelefonico || '-', fontSize: 9 },
      ],
    } : null,
    !anonymous ?
    {
      margin: [0, 0, 0, 3],
      text: [
          { text: 'EMAIL ', bold: true, fontSize: 8 },
          { text: email || '-', fontSize: 9 },
      ],
    } : null,
    {
      margin: [0, 3, 0, 3],
      text: [
        {
          text: FontAwesomeCharset.get(flagPatente ? 'ok' : 'cancel'),
          style: 'icon',
          color: flagPatente ? brandColor : '#8A8A8D',
        },
        {
          text: ' Patente',
          fontSize: 9,
          bold: true,
        },
      ],
    },
    {
      margin: [0, 0, 0, 3],
      text: [
        {
          text: FontAwesomeCharset.get(utenteAutomunito ? 'ok' : 'cancel'),
          style: 'icon',
          color: utenteAutomunito ? brandColor : '#8A8A8D',
        },
        {
          text: sessoUomo ? ' Automunito' : ' Automunita',
          fontSize: 9,
          bold: true,
        },
      ],
    },
  ];
}