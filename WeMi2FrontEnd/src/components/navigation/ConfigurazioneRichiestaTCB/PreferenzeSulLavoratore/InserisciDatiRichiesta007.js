
/** @format */

const jsonNoquotesOnKeys = (obj) => {
  if (typeof obj === "object")
    obj = JSON.stringify(obj);
  obj=obj.replace(/"(\w+)"\s*:/g, '$1:');
  return obj;
};

export const inserisciModificaDatiRichiesta007 =  [
  '',
  `mutation InserisciModificaAttributo ($input: AttributoInput!)
  {
     InserisciModificaAttributo(input: $input )
   }`,
];

export const estraiDatiRichiesta007 = (args) => {
  const mutationName = 'EstraiDatiReferenzaLavoratore';
  return [
    '',
    `
    {
      ${mutationName}(input: {
        idRichiestaTcb: ${args.idRichiestaTcb},
        arrayConfig: ${jsonNoquotesOnKeys(JSON.stringify(args.arrayConfig))}
      }) {
        cd_attributo,
        cd_val_attributo,
        tx_val,
        dt_val,
        tx_nota,
        tx_nota_op,
        nr_val,
        fg_val,
        fg_mansione_svolta,
      }
    }
    `,
    mutationName,
  ];
};

const datiRefLavQueryName = 'EstraiDatiReferenzaLavoratore';

export const estraiDatiReferenzeLavoratore = [
  '',
  `query EstraiDatiReferenzaLavoratore($idRichiestaTcb: Int!, $arrayConfig: [Int]) {
    EstraiDatiReferenzaLavoratore(
      idRichiestaTcb: $idRichiestaTcb,
      arrayConfig: $arrayConfig
    ) {
      cd_attributo,
      cd_val_attributo,
      tx_val,
      dt_val,
      tx_nota,
      tx_nota_op,
      nr_val,
      fg_val,
      fg_mansione_svolta,
      tl_valore_testuale
    }
  }`,
  datiRefLavQueryName,
];
