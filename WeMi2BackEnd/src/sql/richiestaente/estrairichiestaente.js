import tabelle from "tabelle";

export const estraiRichiestaEnte = `
      SELECT id_richiesta_servizio_ente, 
      ric.id_richiesta_servizio_base, 
      ric.id_servizio_erogato_ente, 
      id_interno_trans_pag, 
      im_costo_totale_calcolato,     
      im_prezzo_minimo,
      im_prezzo_minimo_offerta_calc,
      cd_tipo_offerta_srv,
      cd_tipo_servizio_erog,
      im_costo_totale_ente, 
      ric.js_dati_lavoratore, 
      erog.js_dati_prezzo,
      to_char(dt_periodo_proposto_dal,'DD/MM/YYYY') dt_periodo_proposto_dal,
      to_char(dt_periodo_proposto_al,'DD/MM/YYYY') dt_periodo_proposto_al, 
      cd_fascia_oraria_proposta, 
      ts_scadenza_acquisto, 
      tx_note_ente,
      id_preventivo_ente, 
      richiesta_servizio_base.ts_creazione, 
      id_utente_richiedente
      FROM ${tabelle.richiesta_servizio_ente} ric
      inner join ${tabelle.richiesta_servizio_base} ON ric.id_richiesta_servizio_base= ${tabelle.richiesta_servizio_base}.id_richiesta_servizio_base
      left join ${tabelle.servizio_erogato_ente} as erog ON ric.id_servizio_erogato_ente = erog.id_servizio_ente 
      WHERE id_richiesta_servizio_ente = $[idRichiestaEnte]
      `;