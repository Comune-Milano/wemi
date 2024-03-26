
export const EstraiStatoOccupazionale = [
  '',
  `
  {
      EstraiStatoOccupazionale{
        tyDominioTcb,
        cdDominioTcb,
        tlValoreTestuale
      }
    
  }`,
];


export const inserisciModificaDatiStatoOccupazionale = [
  '',
  `mutation inserisciModificaDati002($input: inputInserisciModificaDati002)
  {
    inserisciModificaDati002(input: $input)
   }`,
];

export const estraiDatiStatoOccupazionale = [
  '',
  `query estraiDati002($idUtente: Int!, $cdAttributo: Int) {
    estraiDati002(
      idUtente: $idUtente,
      cdAttributo: $cdAttributo
    ) {
      dt_disponibile_dal
      cd_val_attributo
    }
  }`,
  '',
];
