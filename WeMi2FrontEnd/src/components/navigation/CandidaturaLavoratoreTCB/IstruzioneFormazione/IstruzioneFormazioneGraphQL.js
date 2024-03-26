
export const EstraiCorsi = [
  '',
  `
  query{
    EstraiCorsiTata{
      tyDominioTcb
      cdDominioTcb
      tlValoreTestuale
      pgVisualizzazione
    }
    EstraiCorsiBadante{
      tyDominioTcb
      cdDominioTcb
      tlValoreTestuale
    }
    EstraiLingueParlate{
      tyDominioTcb
      cdDominioTcb
      tlValoreTestuale
    }
  }`,
];

export const inserisciDatiIstruzioneFormazione = [
  '',
  `mutation inserisciDati003 ($input: inputInserisciDati003)
  {
    inserisciDati003(input: $input )
  }`,
];

export const inserisciLingueEstereIstruzioneFormazione = [
  '',
  `mutation inserisciLingueEstere003 ($input: inputInserisciLingueEstere003)
  {
    inserisciLingueEstere003(input: $input )
  }`,
];

export const inserisciItalianoIstruzioneFormazione = [
  '',
  `mutation inserisciItalianoIstruzioneFormazione ($input: inputItalianoIstruzioneFormazione)
  {
    inserisciItalianoIstruzioneFormazione(input: $input )
  }`,
];

export const deleteLingueEstereIstruzioneFormazione = [
  '',
  `mutation deleteLingueEstere003 ($input: inputDeleteLingueEstere003)
  {
    deleteLingueEstere003(input: $input )
  }`,
];

export const estraiDatiIstruzioneFormazione = [
  '',
  `query estraiDati003($input: inputEstraiDati003) {
    estraiDati003(input: $input ){
      cd_attributo
      cd_val_attributo
      tx_val
      nr_val
      fg_val
      tx_nota
    }
  }`,
];
