/** @format */

export const inserisciModificaRichiestaServizioTcb = (args) => [
    'InserisciModificaRichiestaServizioTcb',
   `mutation{
    InserisciModificaRichiestaServizioTcb(input: {
      ${args.idRichiestaTcb ? `idRichiestaTcb: ${args.idRichiestaTcb},` : ``}
      id_utente_richiedente: ${args.idUtenteRichiedente},
      js_dati_richiesta: {},
      id_servizio_erogato_ente: ${args.idServizioErogato},
    })
  }`
];

const inserisciModificaRichiestaMutationName = 'InserisciRichiestaServizioTcb';

export const inserisciRichiestaTCB = [
'',
`mutation ${inserisciModificaRichiestaMutationName} (
  $idUtenteRichiedente: Int!,
  $tyRichiesta: Int!,
  $arrayConfig: [ArrayConfig]
  $id_servizio_erogato_ente: Int!
) {
  ${inserisciModificaRichiestaMutationName} (
    input: {
      id_utente_richiedente: $idUtenteRichiedente,
      ty_richiesta: $tyRichiesta
      arrayConfig: $arrayConfig
      id_servizio_erogato_ente: $id_servizio_erogato_ente
    }
  )
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

export const eliminaBeneficiarioTCB = (args) => [
  '',
 `mutation {
    EliminaBeneficiarioTCB(
        idRichiestaTcb: ${args.idRichiestaTcb},
        arrayPgBen: [${args.arrayPgBen}])
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

export const EstraiMaxOre = [
  '',
  `query EstraiMaxOre{
      EstraiMaxOre{
        cd_dominio_tcb
        tl_valore_testuale
        nr_valore_max_rif
      }
    }
  `,
];
