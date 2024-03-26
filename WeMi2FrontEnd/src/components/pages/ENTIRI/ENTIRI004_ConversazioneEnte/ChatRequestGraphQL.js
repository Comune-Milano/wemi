/** @format  */



export const estraiRichiestaEnte = idRichiestaEnte => 
   [
  'estraiRichiestaEnte',
`{EstraiRichiestaEnte(idRichiestaEnte:${idRichiestaEnte}){
    richiestaServizioBase {
      js_dati_richiesta
      ts_creazione
      idRichiestaBase
      dt_periodo_richiesto_dal
      dt_periodo_richiesto_al
      serviceName
      municipioName
          storiaStati {
            id_richiesta_servizio
          ts_variazione_stato
          cd_stato_richiesta_servizio
          id_utente
          }
          costo
          user {
            ptx_username
            id_utente
          }
          richiestaEnte {
            id_servizio_erogato_ente
            id_interno_trans_pag
            ptx_username
                    id_richiesta_servizio_ente
                    id_utente_richiedente
                    datiPagamento {
                              id_interno_transazione
                      js_dati_fatturazione
                      js_dati_pagamento
                      ts_creazione
                    }
                  im_costo_totale_calcolato
                  im_costo_totale_ente
                  js_dati_lavoratore
                  dt_periodo_proposto_dal
                  dt_periodo_proposto_al
                  cd_fascia_oraria_proposta
                  tx_note_ente
                  ts_scadenza_acquisto
                  allegato {
                  id_media
                  ty_mime_type_media
                  nm_nome_media
                  oj_media
                  ts_creazione
                  }
                  storiaStati {
                  ts_variazione_stato
                  cd_stato_ric_serv_ente
                  cd_stato_chat
                  }
                    servizioEnte {
                      id_servizio_ente
                      id_servizio_riferimento
                      id_ente_erogatore
                      dt_inizio_val_offerta_prezzo
                      dt_fine_val_offerta_prezzo
                      tl_descrizione_serv_erog_ente
                      #service {
                       #id_servizio
                        #categoriaPrincipaleServizio {
                         # idCategoria
                        #  txTitoloCategoria
                       # }
                      #}
                              ente {
                          nm_ente
                              }
                  }
                  recensione {
                    qt_media_singola_recensione
                    js_dati_recensione
                    js_dati_recensione_wemi
                  }
            }
  }
  }  
}
    `
];
  export const retrieveMessages = idRichiesta => [
    'messaggiUtenteEnte',
 ` 
 { 
    retrieveMessages(id_richiesta_servizio:${idRichiesta}){
      id_richiesta_servizio_ente
      tx_testo_messaggio 
      fg_msg_ente
      id_utente_autore_msg
      ts_creazione
    }
}
        
      `
  ]