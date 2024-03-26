
/** @format */

const jsonNoquotesOnKeys = (obj) => {
    if (typeof obj === "object")
        obj = JSON.stringify(obj);
    obj=obj.replace(/"(\w+)"\s*:/g, '$1:');
    return obj;
    }
  

    export const inserisciModificaDatiRichiesta003 = [
      '',
      `mutation InserisciModificaAttributo($input: AttributoInput!){
        InserisciModificaAttributo(
        input: $input
        )
      }`,
      'InserisciModificaAttributo'
    ];

    export const inserisciModificaAttributoBeneficiarioTCB = [
      '',
      `mutation InserisciModificaAttributoBeneficiarioTCB($input: AttributoBeneficiarioInput!){
        InserisciModificaAttributoBeneficiarioTCB(
        input: $input
        )
      }`,
      'InserisciModificaAttributoBeneficiarioTCB'
    ];