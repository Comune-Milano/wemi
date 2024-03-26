const getDetailsDomandaTCBQueryName = 'estraiRichiestaServizioTCB';

export const getDetailsDomandaTCB = [
  '',
  `query ${getDetailsDomandaTCBQueryName}($idRichiestaTcb: Int!){
      ${getDetailsDomandaTCBQueryName}(idRichiestaTcb: $idRichiestaTcb){
        idRichiesta
        nomeUtente
        cognomeUtente
        dataRichiesta
        dataCreazione
        tipoRichiesta
        statoRichiesta
        periodoDal
        periodoAl
        calendario
        idServizio
        idTipologiaOrario
        idRichiestaBase
      }
    }
`,
  getDetailsDomandaTCBQueryName,
];
