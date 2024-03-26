
export const EstraiRichiesta = [
    '',
    `query EstraiRichiesta ($id_richiesta_servizio_tcb: Int!){
            EstraiRichiesta(
              id_richiesta_servizio_tcb: $id_richiesta_servizio_tcb ){
                    nomeservizio
                    id_servizio_erogato_ente
                          }
        }
         `,
         'EstraiRichiesta'
];

export const EstraiRichiestaAdmin = [
  '',
  `query EstraiRichiestaAdmin ($id_richiesta_servizio_tcb: Int!){
    EstraiRichiestaAdmin(
      id_richiesta_servizio_tcb: $id_richiesta_servizio_tcb ){
        nomeservizio
        id_servizio_erogato_ente
                        }
      }
       `,
       'EstraiRichiestaAdmin'
];

export const EstraiRichiestaLavoratore = [
  '',
  `query EstraiRichiestaLavoratore ($id_richiesta_servizio_tcb: Int!){
    EstraiRichiestaLavoratore(
      id_richiesta_servizio_tcb: $id_richiesta_servizio_tcb ){
        nomeservizio
        id_servizio_erogato_ente
                        }
      }
       `,
       'EstraiRichiestaLavoratore'
];

export const EstraiDatiLavoratore = [
  "",
  `query EstraiDatiLavoratore($locale: String!, $codiceRichiesta: Int!) {
    EstraiDatiLavoratore(locale: $locale, codiceRichiesta: $codiceRichiesta) {
      codiceLavoratore
      nome
      cognome
      eta 
      nazionalita
      statoAssociazione
      codiceDominioTcb
      numeroDomandeRifiutate
      numeroDomandeAccettate
      notaRichiesta
      statoDisassociazione
    }
  }`,
  "EstraiDatiLavoratore"
];


export const ConfermaRecensione = [
    '',
    `mutation ConfermaRecensione ($id_rich_serv_rec:Int!,
         $qt_media_singola_recensione: Int!,
         $js_dati_recensione: JSON, 
         $JsonFiltro: JSON, 
         $cd_stato_rec: Int,
         $id_richiesta_servizio_tcb: Int,
         $cd_attributo: Int)
    {
        ConfermaRecensione(
             id_rich_serv_rec: $id_rich_serv_rec,
             qt_media_singola_recensione: $qt_media_singola_recensione,
             js_dati_recensione: $js_dati_recensione, 
             JsonFiltro: $JsonFiltro,
             cd_stato_rec: $cd_stato_rec,
             id_richiesta_servizio_tcb: $id_richiesta_servizio_tcb,
             cd_attributo: $cd_attributo,
            )   
    }
    `
];


export const EstraiRecensione = [
    '',
    `query EstraiRecensione ($id_rich_serv_rec:Int!, $pg_rich_serv_rec:Int){
        EstraiRecensione(
          id_rich_serv_rec:$id_rich_serv_rec, pg_rich_serv_rec: $pg_rich_serv_rec){
            id_rich_serv_rec
    qt_media_singola_recensione
    js_dati_recensione
    js_dati_recensione_wemi
    ts_creazione
    cd_stato_rec
    cd_stato_rec_wemi
        }
    }`,
    'EstraiRecensione'
];

export const EstraiRecensioneAdmin = [
  '',
  `query EstraiRecensioneAdmin ($id_rich_serv_rec:Int!, $pg_rich_serv_rec:Int){
    EstraiRecensioneAdmin(
      id_rich_serv_rec:$id_rich_serv_rec, pg_rich_serv_rec: $pg_rich_serv_rec){
          id_rich_serv_rec
  qt_media_singola_recensione
  js_dati_recensione
  js_dati_recensione_wemi
  ts_creazione
  cd_stato_rec
  cd_stato_rec_wemi
      }
  }`,
  'EstraiRecensioneAdmin'
];

export const EstraiRecensioneLavoratore = [
  '',
  `query EstraiRecensioneLavoratore ($id_rich_serv_rec:Int!){
    EstraiRecensioneLavoratore(
      id_rich_serv_rec:$id_rich_serv_rec){
          id_rich_serv_rec
  qt_media_singola_recensione
  js_dati_recensione
  js_dati_recensione_wemi
  ts_creazione
  cd_stato_rec
  cd_stato_rec_wemi
      }
  }`,
  'EstraiRecensioneLavoratore'
];

export const EstraiAllFeedbacks = [
  '',
  `query EstraiAllFeedbacks ($id_rich_serv_rec:Int!){
    EstraiAllFeedbacks(
      id_rich_serv_rec:$id_rich_serv_rec){
  pg_rich_serv_rec
  ts_creazione
  maxProgressivo
      }
  }`,
  'EstraiAllFeedbacks'
];



export const estraiEsperienzeLavoratore = [
    '',
    `
      query estraiEsperienzeLavoratore ($idUtenteLav: Int!) {
        estraiEsperienzeLavoratore(idUtenteLav: $idUtenteLav) {
          idRichiesta
          serviziPrestati
          inizioPeriodo
          finePeriodo
          descrizioneEsp
          attributi {
            cd_attributo
            cd_val_attributo
            tx_val
          }
        }
      }
    `,
    'estraiEsperienzeLavoratore',
  ];
  

export const ListaMansioni = [
    '',
    `query ListaMansioni ($id_richiesta_servizio_tcb: Int!){
        ListaMansioni(
            id_richiesta_servizio_tcb: $id_richiesta_servizio_tcb){
                tl_valore_testuale
                tx_nota
                cd_val_attributo
                cd_attributo
                fg_mansione_svolta
                cd_dominio_tcb
                      }
    }
     `,
     'ListaMansioni'
];

export const ListaMansioniAdmin = [
  '',
  `query ListaMansioniAdmin ($id_richiesta_servizio_tcb: Int!){
      ListaMansioniAdmin(
          id_richiesta_servizio_tcb: $id_richiesta_servizio_tcb){
              tl_valore_testuale
              tx_nota
              cd_val_attributo
              cd_attributo
              fg_mansione_svolta
              cd_dominio_tcb
                    }
  }
   `,
   'ListaMansioniAdmin'
];

export const ListaMansioniLavoratore = [
  '',
  `query ListaMansioniLavoratore ($id_richiesta_servizio_tcb: Int!){
    ListaMansioniLavoratore(
          id_richiesta_servizio_tcb: $id_richiesta_servizio_tcb){
              tl_valore_testuale
              tx_nota
              cd_val_attributo
              cd_attributo
              fg_mansione_svolta
              cd_dominio_tcb
                    }
  }
   `,
   'ListaMansioniLavoratore'
];

export const EstraiCarattereLavoratore= [
  ``,
  `{
      EstraiCarattereLavoratore{
        cdDominioTcb
        tlValoreTestuale
      }
    }`,
   `EstraiCarattereLavoratore`
  ];

  export const UpdateCdStatoRec = [
    '',
    `mutation UpdateCdStatoRec ($cd_stato_rec:Int!, $id_rich_serv_rec:Int!)
    {
      UpdateCdStatoRec (cd_stato_rec: $cd_stato_rec, id_rich_serv_rec: $id_rich_serv_rec)
    }`
    ]
    