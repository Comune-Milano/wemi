
/** @format */

const jsonNoquotesOnKeys = (obj) => {
    if (typeof obj === "object")
        obj = JSON.stringify(obj);
    obj=obj.replace(/"(\w+)"\s*:/g, '$1:');
    return obj;
    }
  
  export const inserisciModificaDatiRichiesta009 = (args) => [
      '',
    `mutation {
        InserisciModificaAttributo(input: {
          idRichiestaTcb: ${args.idRichiestaTcb},
          arrayConfig:  ${jsonNoquotesOnKeys(JSON.stringify(args.arrayConfig))}
        })
      }`
  ];

