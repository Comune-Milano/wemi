/** @format */

export const riepilogoRichiestaDrawer = (idRichiesta) => [
  'RichiestaServizioDrawer',
  `{
    EstraiListaRichiesteServizioEntePerIdRichiesta_Cittadino(idRichiestaServizioBase:${idRichiesta}){
      id_richiesta_servizio_ente
      id_richiesta_servizio_base
      ts_scadenza_acquisto
      id_servizio_erogato_ente
      id_interno_trans_pag
      im_costo_totale_ente
      servizioEnte{
        id_servizio_ente
        id_servizio_riferimento
        ente {
          nm_ente
          nm_ente_completo
        }
        id_ente_erogatore
        im_prezzo_minimo
        im_prezzo_minimo_offerta_calc
        dt_inizio_val_offerta_prezzo
        dt_fine_val_offerta_prezzo
      }
      richiestaServizioBase{
        idRichiestaBase
        dt_periodo_richiesto_dal
        dt_periodo_richiesto_al
        id_utente_richiedente
        js_dati_richiesta
        dt_inizio_val
        dt_fine_val
        ts_creazione
        storiaStati{
          id_richiesta_servizio
          ts_variazione_stato
          cd_stato_richiesta_servizio
          id_utente
        }
        user{
          ptx_username
          id_utente
        }
      }
      storiaStati{
        id_richiesta_servizio_ente
        ts_variazione_stato
        cd_stato_ric_serv_ente
      }
    }
  }`,
];

export const serviziByUtenteFilter = args => [
  'RequestIndexByUtente',
`{
      EstraiListaRichiesteServizio_Base(${args.from? args.from!==''?  
      `,from: "${args.from}" `:  ` `:  ` `} 
      ${args.to? args.to!==''?  `,to: "${args.to}" `:  ` `:  ` `},
       numeroElementi: ${args.numElementi},
       ${args.statoRichiesta? args.statoRichiesta!==''?  `,statoRichiesta: "${args.statoRichiesta}" `:  ` `:  ` `}
       ){
        idRichiestaBase
        dt_periodo_richiesto_dal
        dt_periodo_richiesto_al
        id_utente_richiedente
        js_dati_richiesta
        dt_inizio_val
        dt_fine_val
        count
        serviceName
        municipioName
        richiestaEnte {
          id_richiesta_servizio_ente
          id_utente_richiedente
          
          datiPagamento {
            
            id_interno_transazione
            js_dati_fatturazione
            js_dati_pagamento
          
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
        ente {
          nm_ente
          nm_ente_completo
        }
        id_ente_erogatore
        im_prezzo_minimo
        im_prezzo_minimo_offerta_calc
        dt_inizio_val_offerta_prezzo
        dt_fine_val_offerta_prezzo
      }
      }
      costo
       ts_creazione
       storiaStati{
         id_richiesta_servizio
         ts_variazione_stato
         cd_stato_richiesta_servizio
         id_utente
       }
       user{
         ptx_username
       }
      }
      }`
];


export const entePK = (id_ente_erogatore) => [
  id_ente_erogatore,
  `{
        entePK(id_ente: ${id_ente_erogatore}) {
        id_ente
        id_partita_iva_ente
        nm_ente
        tx_email_referente
        js_dati_identificativi_ente
        dt_inizio_val
        dt_fine_val
        ts_creazione
        }
    }`,
];
