/** @format */
// export const inviaRecensione = args => [
//   'inviaRecensione',
// `
//   mutation{

//       scriviFeedBack(idRichiestaEnte:${args.idRichiestaEnte},
//         feedBack:{mediaRecensione: ${args.mediaRecensione},
//         puntualita:${args.puntualita},
//         professionalita:${args.professionalita},
//         velocita:${args.velocita},
//           noteRecensione:"${args.noteRecensione}"
//         })
//     }
//     `
// ];

export const confermaRecensione = (idRichiestaEnte) => [
  'confermaRecensione',
  ` 
mutation {
  ConfermaRecensioneServizioEnte(idRichiestaEnte:${idRichiestaEnte})
}
    `,
];

export const richiediRecensione = [
  'richiediRecensione',
  ` 
mutation RichiediRecensioneServizioEnte($idRichiestaEnte: Int!) {
  RichiediRecensioneServizioEnte(idRichiestaEnte: $idRichiestaEnte)
}
    `,
];

export const extractRating = [
  '',
  `
  query EstraiRecensioneRichiestaServizioEnte ($idRichiestaEnte: Int!){
  EstraiRecensioneRichiestaServizioEnte(idRichiestaEnte:$idRichiestaEnte){
    qt_media_singola_recensione
    js_dati_recensione
    ultimoStato{
      cd_stato_recensione
    }
  }
  }
        
      `,
  'EstraiRecensioneRichiestaServizioEnte',
];

export const estraiRecensione = (idRichiestaEnte) => [
  'EstraiRecensione',
  `
{
EstraiRecensioneRichiestaServizioEnte(idRichiestaEnte:${idRichiestaEnte}){
  qt_media_singola_recensione
  js_dati_recensione
  ultimoStato{
    cd_stato_recensione
  }
}
}
      
    `,
];

export const EstraiNomeUtente = (idRichiestaEnte) => [
  '',
  `
{
  EstraiNomeUtente(idRichiestaEnte:${idRichiestaEnte}){
  ptx_username
  tx_nome_utente
  tx_cognome_utente
  }
}    
    `,
];

export const EstraiEnteServizio = (idRichiestaEnte) => [
  '',
  `
{
  EstraiEnteServizio(idRichiestaEnte:${idRichiestaEnte}){
    nm_ente
    tl_testo_1
  } 
}
      
    `,
];

export const inserisciFeedbackServizioEnte = [
  '',
  `mutation (
    $id_rich_serv_rec: Int!,
    $qt_media_singola_recensione: Float!,
    $qtVelocita: Int,
    $qtCortesia: Int,
    $qtPuntualita: Int,
    $txNotaRecensione: String
   ) {
    inserisciFeedbackServizioEnte (input: {
      id_rich_serv_rec: $id_rich_serv_rec
      qt_media_singola_recensione:$qt_media_singola_recensione
      js_dati_recensione:{
        qtVelocita: $qtVelocita
        qtCortesia: $qtCortesia
        qtPuntualita: $qtPuntualita
        txNotaRecensione: $txNotaRecensione
      }
    })
  }`,
  '',
];

export const estraiRichiestePerIdEnte = (idEnteErogatore, numeroElementi) => [
  'estraiRichiestePerIdEnte',
  `{
    EstraiRichiesteServizioEntePerIdEnte(
      input: {
        idEnteErogatore:${idEnteErogatore}, 
        numeroElementi:${numeroElementi}
      }) {
          count
          result {
            idRichiestaServizioEnte
            idRichiestaServizioBase
            username
            idUtente
            cognomeUtente
            nomeUtente
            timestampCreazione
            anagraficaUtente
            datiLavoratore
            nomeServizio
            statoRecensione
            statoRichiestaBase
            statoRichiestaEnte
            statoChat
            servizioEnte {
              id_servizio_ente
              listaPeriodiErogazione {
                tl_valore_testuale
                id_periodo
              }
            }
          }
        }
    }
`,
];
