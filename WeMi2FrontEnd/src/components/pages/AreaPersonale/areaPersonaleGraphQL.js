export const estraiStatoCandidatura = [
  '',
  `query estraiStatoCandidatura($idUtenteLav: Int!){
    estraiStatoCandidatura(idUtenteLav: $idUtenteLav){
    cd_ultimo_stato_offerta
    }
  }`,
  'estraiStatoCandidatura',
];

export const countRichiesteLavoratore = [
  ``,
  `
    query CountRichiesteEnteByIdUtente {
      CountRichiesteEnteByIdUtente
    }
  `,
  'CountRichiesteEnteByIdUtente'
];

export const hasCitizenVoucher = [
  '',
  `
    query hasCitizenVoucher {
      hasCitizenVoucher
    }
  `,
  'hasCitizenVoucher',
];
