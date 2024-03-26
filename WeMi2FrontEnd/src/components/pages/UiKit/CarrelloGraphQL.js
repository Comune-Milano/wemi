/** @format */

export const carrelloPK = id => [
  'carrelloUiKit',
  `{carrelloPK(id_carrello:"${id}"){
            id_carrello
         js_dati_fatturazione
         js_dati_pagamento
         ts_creazione
       }}`,
];
export const carrelloAll = () => [
  '',
  `{
        carrelloAll{
          id_carrello
          js_dati_pagamento
          js_dati_fatturazione
          ts_creazione
        }
      }`,
];

export const carrelloAdd = args => [
  '',
  `
    mutation{
        carrelloAdd(input:{js_dati_pagamento: ${args.js_dati_pagamento}, js_dati_fatturazione:${
    args.js_dati_fatturazione
  }}){
          id_carrello
          js_dati_pagamento
          js_dati_fatturazione
          ts_creazione
        }
      }`,
];

export const carrelloUpd = args => [
  '',
  `
    mutation{
        carrelloUpd(input:{id_carrello: "${args.id_carrello}", js_dati_pagamento:${
    args.js_dati_pagamento
  },js_dati_fatturazione:${args.js_dati_fatturazione}})
      }`,
];

export const carrelloDel = id => [
  '',
  `
    mutation{
        carrelloDel(id_carrello:"${id}")
      }`,
];
