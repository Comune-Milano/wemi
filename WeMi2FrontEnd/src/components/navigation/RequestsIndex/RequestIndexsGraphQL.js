/** @format */

export const serviziByUtente = (args) => [
  'RequestIndexByUtente',
  
`{
  EstraiListaRichiesteServizio_Base(
    ${args.from? args.from!=='' ? `,from: "${args.from}" ` : ` ` : ` `} 
    ${args.to? args.to!=='' ? `,to: "${args.to}" ` : ` ` : ` `},
    numeroElementi: ${args.numElementi}
    ${args.statoRichiesta? args.statoRichiesta!==''?   `,statoRichiesta: "${args.statoRichiesta}" `:  ` `:  ` `}
    ${args.tipologia? args.tipologia!==''?   `,tipologia: "${args.tipologia}" `:  ` `:  ` `}
 ){
   stato
  idRichiestaBase
  dt_periodo_richiesto_dal
  dt_periodo_richiesto_al
  id_utente_richiedente
  js_dati_richiesta
  dt_inizio_val
  dt_fine_val
  ts_variazione_stato
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
      cd_tipo_offerta_srv
      cd_tipo_servizio_erog
      id_servizio_ente
      id_servizio_riferimento
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

const getBaseRequestsQueryName = 'EstraiListaRichiesteServizio_Base';

export const getBaseRequests = [
  '',
  `query ${getBaseRequestsQueryName}(
      $from: String,
      $to: String,
      $statoRichiesta: [String],
      $tipologiaServizio: String,
      $numeroElementi: Int!
    ){
    ${getBaseRequestsQueryName}(
      from: $from,
      to: $to,
      statoRichiesta: $statoRichiesta,
      numeroElementi: $numeroElementi,
      tipologia: $tipologiaServizio
    ) {
        messaggi
        serviziAcquistabili
        recensioni
        stato
        idRichiestaBase
        dt_periodo_richiesto_dal
        dt_periodo_richiesto_al
        id_utente_richiedente
        requestType
        count
        serviceName
        ts_creazione
        ts_variazione_stato
        ts_creazione_inoltro
        js_dati_richiesta
        statoRecensione
        tipologiaAssuzione
        user{
          ptx_username
        }
    }
  }
  `,
  getBaseRequestsQueryName,
];

const getEntiRequestsQueryName = 'EstraiListaRichiesteServizioEntePerIdRichiesta_Cittadino';

export const getEntiRequests = [
  '',
  `query ${getEntiRequestsQueryName}(
    $idRichiestaServizioBase: Int!,
    ){
    ${getEntiRequestsQueryName}(
      idRichiestaServizioBase: $idRichiestaServizioBase
    ) {
      id_richiesta_servizio_ente
      id_richiesta_servizio_base
      id_servizio_erogato_ente
      im_costo_totale_calcolato
      im_costo_totale_ente
      im_prezzo_minimo
      cd_stato_recensione
      im_prezzo_minimo_offerta_calc
      cd_tipo_offerta_srv
      cd_tipo_servizio_erog
      id_utente_richiedente 
      dt_periodo_proposto_dal
      dt_periodo_proposto_al
      ts_scadenza_acquisto
      ts_creazione
      recensione{
        id_rich_serv_rec
        ultimoStato{
          cd_stato_recensione
        }
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
        ente {
          nm_ente
        }
      }
      ultimoStato {
        cd_stato_chat
        cd_stato_ric_serv_ente
      }
    }
  }
  `,
  getEntiRequestsQueryName,
];


const getTCBRequestQueryName = 'EstraiRichiestaTCBPerIdRichiesta_Cittadino';

export const getTCBRequest = [
  '',
  `query ${getTCBRequestQueryName}(
    $idRichiestaServizioBase: Int!
    ){
    ${getTCBRequestQueryName}(
      idRichiestaServizioBase: $idRichiestaServizioBase
    ) {
      idRichiestaTCB
      nomeServizio 
      statoRichiestaTCB
      prezzo
      conteggioLavoratoriAssociati
      idLavoratore
      nomeLavoratore
      cognomeLavoratore
      dataInizio
      dataFine
      curriculum
      idServizio
    }
  }
  `,
  getTCBRequestQueryName,
];
