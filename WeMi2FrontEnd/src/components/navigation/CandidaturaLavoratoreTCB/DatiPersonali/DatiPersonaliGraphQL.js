export const EstraiDatiCheckbox = [
  '',
  `
  query{
    EstraiInteressi{
      tyDominioTcb
      cdDominioTcb
      tlValoreTestuale
    }
    EstraiCarattereLavoratore{
      tyDominioTcb
      cdDominioTcb
      tlValoreTestuale
    }
    EstraiAltezza{
      tyDominioTcb
      cdDominioTcb
      tlValoreTestuale
    }
    EstraiCorporatura{
      tyDominioTcb
      cdDominioTcb
      tlValoreTestuale
    }
  }`,
];

export const inserisciDatiPersonali = [
  '',
  `mutation inserisciDati005 ($input: inputInserisciDati005)
  {
    inserisciDati005(input: $input )
  }`,
];

export const estraiDatiPersonali = [
  '',
  `query estraiDati005($input: inputEstraiDati005) {
    estraiDati005(input: $input ){
      cd_attributo
      cd_val_attributo
      tx_val
      nr_val
      fg_val
      id_allegato
      oj_allegato_off
    }
  }`,
];

export const inserisciModificaFototessera = [
  '',
  `mutation inserisciModificaFototessera ($input: inputInserisciModificaFototessera)
  {
    inserisciModificaFototessera(input: $input)
  }`,
  'inserisciModificaFototessera',
];
