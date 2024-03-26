
export const richiediFeedback = [
  'richiediFeedback',
  ` 
    mutation RichiediFeedBackConMailRichiestaServizioEnte ($idRichiestaEnte: Int!){
      RichiediFeedBackConMailRichiestaServizioEnte(idRichiestaEnte:$idRichiestaEnte)
    }  
  `,
];


export const estraiRichiestaEnte = [
  '',
  `query EstraiRichiestaEnte($idRichiestaEnte: Int!) {
    EstraiRichiestaEnte(idRichiestaEnte: $idRichiestaEnte) {
      id_richiesta_servizio_ente
      id_richiesta_servizio_base
      id_servizio_erogato_ente
      id_interno_trans_pag
      ptx_username
      im_costo_totale_calcolato
      im_costo_totale_ente
      id_utente_richiedente
      js_dati_lavoratore
      dt_periodo_proposto_dal
      dt_periodo_proposto_al
      cd_fascia_oraria_proposta
      tx_note_ente
      ts_scadenza_acquisto
      ts_creazione    
      datiPagamento {
        id_interno_transazione
        js_dati_fatturazione
        js_dati_pagamento
        ts_creazione
        
      }
      recensione {
        qt_media_singola_recensione
        js_dati_recensione
        js_dati_recensione_wemi
        
      }
      servizioEnte {
        cd_tipo_offerta_srv
        cd_tipo_servizio_erog
        js_dati_prezzo {
          cdTipoOffertaServizio
          cdTipoServizioErog
          dataInizio
          dataFine
          txTitoloFinanziamento
          qtMinimaUnita
          txNoteAlPrezzo
          listinoPrezzi {
            qtPersoneDa
            qtPersoneA
            offerta {
              qtUnitaDa
              qtUnitaA
              valore
            }
          }
        }
        im_prezzo_minimo
        dt_inizio_val_offerta_prezzo
        dt_fine_val_offerta_prezzo
        service{
          txTitoloServizio
        }
        id_servizio_ente
        id_servizio_riferimento
        id_ente_erogatore
        tl_descrizione_serv_erog_ente
        listaPeriodiErogazione{
          id_periodo
          tl_valore_testuale
        }
        ente {
          nm_ente
        }
      }
      

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
          }
       }
  }
`,
];
