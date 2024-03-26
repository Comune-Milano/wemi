export const estraiRichiestaEnte = idUtente => 
   [
  'estraiRichiesteEnte',
` 
{
  EstraiCarrello(idUtente:${idUtente}){
    id_richiesta_servizio_ente
    id_richiesta_servizio_base
    id_interno_trans_pag
    recensione{
      id_rich_serv_rec
      storiaStati{
        id_rich_serv_rec
      }
    }
    datiPagamento{
      id_interno_transazione
      js_dati_fatturazione
      storiaStati{
        id_interno_trans_pag
        ts_variazione_stato
        cd_stato_pagamento
        id_utente
      }
    }
    servizioEnte{
      id_servizio_ente
      im_prezzo_minimo_offerta_calc
      media_recensioni
      numeroRecensioni
      ente{
        nm_ente
        datiEnte{
        media{
          oj_media
        }
      }
      }
      service{
        txDescrizioneServizio
      }
    }
    storiaStati{
      id_richiesta_servizio_ente
      ts_variazione_stato
    }
  }
}
      
    `
];
export const RichiestaEnteUtile = idRichiestaEnte => 
   [
  'RichiestaEnteUtile',
` 
{
  EstraiRichiestaEnte(idRichiestaEnte:${idRichiestaEnte}){
    id_richiesta_servizio_ente
    ts_creazione
    im_costo_totale_ente
    ts_scadenza_acquisto
  }  
 } `
];

