
export const EstraiPatologie = [
  '',
  `
  query{
    EstraiPatologie{
      tyDominioTcb
      cdDominioTcb
      tlValoreTestuale
    }
    EstraiPatologieGeneriche{
     tyDominioTcb
     cdDominioTcb
     tlValoreTestuale
   }
   }
   `,
];

export const inserisciDatiEsperienzeBadante = [
  '',
  `mutation inserisciDati0016 ($input: inputInserisciDati0016)
  {
    inserisciDati0016(input: $input )
  }`,
];


export const estraiDatiEsperienzeBadante = [
  '',
  `query estraiDati0016($input: inputEstraiDati0016) {
    estraiDati0016(input: $input ){
      cd_attributo
      cd_val_attributo
      tx_val
    }
  }`,
];