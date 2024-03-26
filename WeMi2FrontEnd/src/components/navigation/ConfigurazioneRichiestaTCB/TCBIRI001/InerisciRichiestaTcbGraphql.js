/** @format */

const jsonNoquotesOnKeys = (obj) => {
  if (typeof obj === "object")
      obj = JSON.stringify(obj);
  obj=obj.replace(/"(\w+)"\s*:/g, '$1:');
  return obj;
  }

export const inserisciModificaRichiestaServizioTcb = (args) => [
    'InserisciModificaRichiestaServizioTcb',
   `mutation{
    InserisciModificaRichiestaServizioTcb(input: {
      ${args.idRichiestaTcb ? `idRichiestaTcb: ${args.idRichiestaTcb},` : ``}
      id_utente_richiedente: ${args.idUtenteRichiedente},
      js_dati_richiesta: {},
      id_servizio_erogato_ente: ${args.idServizioErogato},
      ${args.numeroPersone ? `qt_beneficiari: ${args.numeroPersone},` : ``}
      arrayConfig: ${jsonNoquotesOnKeys(JSON.stringify(args.arrayConfig))}
    })
  }`
];


export const estraiDatiConfigurazioneRichiesta001 = (idRichiestaTcb) => [
  '',
  `{
    EstraiDatiConfigurazioneRichiesta001(idRichiestaTcb: ${idRichiestaTcb}) {
      idRichiestaTcb
      idServizio
      numeroPersone
      orario {
        cdAttributo
        tlValoreTestuale
        dominioTcb
        cdValAttributo
        tsModifica
        tsCreazione
      }
      benFlag {
        cdAttributo
        flag
        dominioTcb
        cdValAttributo
        tsModifica
        tsCreazione
      }
      casaFlag {
        cdAttributo
        flag
        dominioTcb
        cdValAttributo
        tsModifica
        tsCreazione
      }
    }
  }`
];

export const eliminaDatiRichiestaByAttributo = (args) => [
  'EliminaDatiRichiestaByAttributo',
 `mutation{
  EliminaDatiRichiestaByAttributo(input: {
    idRichiestaTcb: ${args.idRequest},
    arrayAttributi: [${args.arrayAttributi}]
  })
}`
];
