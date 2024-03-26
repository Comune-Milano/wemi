
export const RimuoviRichiestaServizioTcb = [
  '',
  `
  mutation  RimuoviRichiestaServizioTcb($idRichiesta: ID!)
  {
      RimuoviRichiestaServizioTcb(idRichiesta: $idRichiesta)
    }
  
  `,
];

export const EstraiImportoDomandaTCB = [
  ''
  ,
  `  
  query EstraiImportoDomandaTCB ( $idRichiestaTcb: Int, $arrCdAttributi: [Int]) 
  {
    EstraiImportoDomandaTCB( idRichiestaTcb: $idRichiestaTcb, arrCdAttributi: $arrCdAttributi)
  }
`,
  'EstraiImportoDomandaTCB'
];

export const AggiornaDatiStepTCB = [
  '',
  `mutation AggiornaDatiStepTCB($idRichiesta: Int!, $steps: DatiStepTCBInput!)
  {
    AggiornaDatiStepTCB(
        idRichiesta:$idRichiesta,
        steps: $steps
        )
    }`,
];

export const InviaRichiestaTCB = [
  '',
  ` mutation InviaRichiestaTCB ( $idRichiestaTCB : Int, $idUtente: Int, $costoTCB: Float   )
  {
    InviaRichiestaTCB(idRichiestaTCB:$idRichiestaTCB, idUtente: $idUtente, costoTCB: $costoTCB)
  }`,
  'InviaRichiestaTCB',
];

export const InviaRichiestaImpersonificazione = [
  '',
  `mutation InviaRichiestaImpersonificazione ( $idRichiestaTCB : Int, $costoTCB: Float)
  {
    InviaRichiestaImpersonificazione(idRichiestaTCB:$idRichiestaTCB, costoTCB: $costoTCB)
  }`,
  'InviaRichiestaImpersonificazione'
];

export const EstraiStatoDomandaTCB = [
  '',
  `
  query  EstraiStatoDomandaTCB($idDomandaTCB: Int!)
  {
    EstraiStatoDomandaTCB(idDomandaTCB: $idDomandaTCB)
    }
  
  `,
  'EstraiStatoDomandaTCB'
];