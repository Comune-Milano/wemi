/** @format */
export const EstraiRecensioni = (idEnte,idServizioRiferimento) => [
  '',
` {
  EstraiRecensioni(idEnte:${idEnte},idServizioRiferimento: ${idServizioRiferimento}){
  id_rich_serv_rec
  ts_creazione
  js_dati_recensione
  utente
  qt_media_singola_recensione
  ultimoStato{
    cd_stato_recensione
  }
  nm_ente
  tl_testo_1
}
}
 `];


export const EstraiDettaglioAmministrativoServizioEnte = (id_servizio,id) => [
  'EstraiDettaglioAmministrativoServizioEnte',
 `{
    dFasciaOrariaAll{
      id_periodo
      tl_valore_testuale
    }
    EstraiSostegniEconomici{
      idSostegno
      txSostegno
    }
    municipioAll{
      idMunicipio
      nmMunicipio
    }
    mansioneAll{
      idMansione
      txTitoloMansione
    }
    mansioneByService(id_servizio_ente:${id_servizio}){
      idMansione
      txTitoloMansione
     }
    destinatari{
      idDestinatario
      txDestinatario
      destinatariSecondoLivello{
        idDestinatario
        txDestinatario
        idDestinatarioPrimoLivello
      }
    }
    destinatariServizio(id_servizio:${id_servizio}){
      idDestinatario
      txDestinatario
      destinatariSecondoLivello{
        idDestinatario
        txDestinatario
        idDestinatarioPrimoLivello
      }
    }
    EstraiServizioErogatoEnte004(id_ente:${id}){
      cd_stato_dati_servizio_ente
      id_servizio_ente,
      id_servizio_riferimento

    }
    entePK(id_ente:${id}){
      cd_stato_ente
      datiEnte{
        sedeEnte{
          id_sede
          js_sede
        }
      }
    }

    contenutoByTy(ty_contenuto:18){
      tl_testo_1
      id_contenuto
    }
    EstraiDettaglioAmministrativoServizioEnte(id_servizio_ente:${id_servizio}){
      tx_note_al_prezzo
      js_note_adminwemi_su_servizio
      tl_descrizione_serv_erog_ente
      tl_procedura_attivazione
      id_servizio_ente
      im_prezzo_minimo
      dt_inizio_val_offerta_prezzo
      dt_fine_val_offerta_prezzo
      qt_min_pers
      qt_max_pers
      cd_modalita_erogazione
      sediErogatrici{
        js_sede
        id_sede
      }
    dt_inizio_erog_serv
    dt_fine_erog_serv
    tx_altre_mansioni
    tx_altra_sede
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
    qt_tempo_max_attivazione
    js_info_personale
    cd_tipo_offerta_srv
    cd_tipo_servizio_erog
    listaSostegniEconomiciSupportati{
      idSostegno
      txSostegno
    }
    listaMunicipiServiti{
      idMunicipio
      nmMunicipio
    }
    listaMansioniSvolte{
      idMansione
      txTitoloMansione
    }
    listaPeriodiErogazione{
      id_periodo
      tl_valore_testuale
    }
    service{
      txTitoloServizio
      tl_testo_aggettivo
      tl_testo_sostantivo
      id_servizio
      prezzo {
        cd_unita_prezzo,
        tl_testo_aggettivo,
        tl_testo_sostantivo,
      },
      categoriaAccreditamentoServizio{
        txTitoloCategoria
      }
      
    }
      ente{
        nm_ente
        id_ente
        nm_ente_completo
        datiEnte{
          note_per_cittadino
          js_primo_contatto
          js_altre_info
          js_note_adminwemi
          js_referente
        }
      }
    listaDestinatariPrimoLivello{
      idDestinatario
      txDestinatario
      destinatariSecondoLivello{
        idDestinatario
        idDestinatarioPrimoLivello
        txDestinatario
      }
    }
    listaDestinatariSecondoLivello{
      idDestinatario
      txDestinatario
      idDestinatarioPrimoLivello
    }
    }
  }`
];

export const EstraiDettaglioAmministrativoServizioEnteQ = [
  '',
 `
 query estraiDettaglioAmministrativoServizioEnte($id_servizio: Int!, $id: Int!) {
      dFasciaOrariaAll{
        id_periodo
        tl_valore_testuale
      }
      EstraiSostegniEconomici{
        idSostegno
        txSostegno
      }
      municipioAll{
        idMunicipio
        nmMunicipio
      }
      mansioneAll{
        idMansione
        txTitoloMansione
      }
      mansioneByService(id_servizio_ente: $id_servizio){
        idMansione
        txTitoloMansione
      }
      destinatari{
        idDestinatario
        txDestinatario
        destinatariSecondoLivello{
          idDestinatario
          txDestinatario
          idDestinatarioPrimoLivello
        }
      }
      destinatariServizio(id_servizio: $id_servizio){
        idDestinatario
        txDestinatario
        destinatariSecondoLivello{
          idDestinatario
          txDestinatario
          idDestinatarioPrimoLivello
        }
      }
      EstraiServizioErogatoEnte004(id_ente: $id){
        cd_stato_dati_servizio_ente
        id_servizio_ente,
        id_servizio_riferimento

      }
      entePK(id_ente: $id){
        cd_stato_ente
        datiEnte{
          sedeEnte{
            id_sede
            js_sede
          }
        }
      }

      contenutoByTy(ty_contenuto:18){
        tl_testo_1
        id_contenuto
      }
      EstraiDettaglioAmministrativoServizioEnte(id_servizio_ente: $id_servizio){
        tx_note_al_prezzo
        js_note_adminwemi_su_servizio
        tl_descrizione_serv_erog_ente
        tl_procedura_attivazione
        id_servizio_ente
        im_prezzo_minimo
        dt_inizio_val_offerta_prezzo
        dt_fine_val_offerta_prezzo
        qt_min_pers
        qt_max_pers
        cd_modalita_erogazione
      sediErogatrici{
        js_sede
        id_sede
        fg_accompagnamento_sede
      }

      
      dt_inizio_erog_serv
      dt_fine_erog_serv
      tx_altre_mansioni
      tx_altra_sede
      fg_accompagnamento_altra_sede
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
      qt_tempo_max_attivazione
      js_info_personale
      cd_tipo_offerta_srv
      cd_tipo_servizio_erog
      listaSostegniEconomiciSupportati{
        idSostegno
        txSostegno
      }
      listaMunicipiServiti{
        idMunicipio
        nmMunicipio
      }
      listaMansioniSvolte{
        idMansione
        txTitoloMansione
      }
      listaPeriodiErogazione{
        id_periodo
        tl_valore_testuale
      }
      service{
        txTitoloServizio
        cd_unita_prezzo
        prezzo {
          cd_unita_prezzo
          tl_testo_sostantivo
          tl_testo_aggettivo
        }
        id_servizio
        categoriaAccreditamentoServizio{
          txTitoloCategoria
        }
        
      }
        ente{
          nm_ente
          id_ente
          nm_ente_completo
          datiEnte{
            js_primo_contatto
            js_altre_info
            js_note_adminwemi
            js_referente
          }
        }
      listaDestinatariPrimoLivello{
        idDestinatario
        txDestinatario
        destinatariSecondoLivello{
          idDestinatario
          idDestinatarioPrimoLivello
          txDestinatario
        }
      }
      listaDestinatariSecondoLivello{
        idDestinatario
        txDestinatario
        idDestinatarioPrimoLivello
      }
    }
  }`
];


export const enteByServizioOrder = args => [
  'EnteByServiceSearch',
` {
      RicercaEntiErogantiServizio(input:{service:${args.service},
        tipologia:${args.filtri.tipologia.id!==undefined? args.filtri.tipologia.id: args.filtri.tipologia},
         mansione:${args.filtri.mansione.length > 0? args.filtri.mansione: JSON.stringify([])},
         municipio:${args.filtri.municipio}, 
        orario:${args.filtri.orario.length > 0? args.filtri.orario: JSON.stringify([])},
        destinatariLiv1:${args.filtri.destinatariLiv1.length > 0? args.filtri.destinatariLiv1: JSON.stringify([])},
         destinatariLiv2:${args.filtri.destinatariLiv2.length > 0? args.filtri.destinatariLiv2: JSON.stringify([])},
        costo: ${args.filtri.costo},
        offerta: ${args.filtri.offerta.length > 0? args.filtri.offerta: JSON.stringify([])},
      order: ${args.order}}){
        id_servizio_ente
        id_servizio_riferimento
    js_dati_prezzo        
        id_ente_erogatore
        im_prezzo_minimo
        ts_creazione
        listaDestinatariPrimoLivello{
          idDestinatario
          txDestinatario
        }
        listaDestinatariSecondoLivello{
          idDestinatario
          txDestinatario
          idDestinatarioPrimoLivello
        }
        listaMunicipiServiti{
          idMunicipio
          nmMunicipio
        }
        listaMansioniSvolte{
          idMansione
          txTitoloMansione
        }
        listaModalitaPagamento{
          cdOfferta
          tl_valore_testuale
        }
        listaPeriodiErogazione{
          id_periodo
          tl_valore_testuale
          pg_visualizzazione
        }
        media_recensioni
        ente{
          id_ente
          nm_ente
          cd_stato_ente
          datiEnte{
            js_primo_contatto
          }
        }
      }
      
    }
      
    `
];

export const entePK = idEnte => ['entePK',
`{
  entePK(id_ente:${idEnte}){
    nm_ente
    id_ente
    serviziAccreditati{
      txTitoloServizio
      id_servizio
      idServizioErogato
      categoriaPrincipaleServizio {
        idCategoria
      }
    }
    datiEnte{
      tl_descrizione_ente
      js_referente
      js_altre_info
      js_primo_contatto
      media{
          oj_media
        }
    sedeEnte{
      js_sede
    }
    }
  
  }
}`];

export const enteDatiPK = (id) => [
  '',
  `{
    enteDatiPK(id_ente_rif:${id}){
      id_ente_rif
      tl_descrizione_ente
      oj_media_logo
      id_img_logo
      js_referente
      js_primo_contatto
      js_altre_info
      js_note_adminwemi
      sede_principale
      sede_secondarie
      allegatiEnte {
        id_media
        cd_dominio
        tl_valore_testuale
        ty_mime_type_media
        nm_nome_media
      }
    }
  }`,
];

export const enteByServizio = args => [
  'EnteByServiceSearch',
` {
      RicercaEntiErogantiServizio(input:{service:${args.service},
        tipologia:${args.tipologia}, mansione:${args.mansione}, municipio:${args.municipio}, 
        orario:${args.orario},
        destinatariLiv1:${args.destinatariLiv1}, destinatariLiv2:${args.destinatariLiv2},
        costo: ${args.costo},
        offerta: ${args.offerta}
        
      }){
      id_servizio_ente
      id_servizio_riferimento
      id_ente_erogatore
      im_prezzo_minimo
      im_prezzo_minimo_offerta_calc
      ts_creazione
      listaDestinatariPrimoLivello{
        idDestinatario
        txDestinatario
      }
      listaDestinatariSecondoLivello{
        idDestinatario
        txDestinatario
        idDestinatarioPrimoLivello
      }
      listaMunicipiServiti{
        idMunicipio
        nmMunicipio
      }
      listaMansioniSvolte{
        idMansione
        txTitoloMansione
      }
      listaModalitaPagamento{
        cdOfferta
        tl_valore_testuale
      }
      listaPeriodiErogazione{
        id_periodo
        tl_valore_testuale
        pg_visualizzazione
      }
      media_recensioni
      ente{
        id_ente
        nm_ente
        cd_stato_ente
        datiEnte{
          js_primo_contatto
        }
      }
    }
  }
      
    `
];


export const EstraiServizioErogato = idServizio => [
  'ServizioErogato',
`{
  EstraiServizioErogatoEnte(idServizioErogato: ${idServizio}){
    id_servizio_ente
    id_servizio_riferimento
   id_ente_erogatore
    tl_descrizione_serv_erog_ente
    im_prezzo_minimo
    im_prezzo_minimo_offerta_calc
    dt_inizio_val_offerta_prezzo
    dt_fine_val_offerta_prezzo
    qt_min_pers
    qt_max_pers
    qt_tempo_max_attivazione
    dt_inizio_erog_serv
    dt_fine_erog_serv
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
     js_info_personale
     cd_tipo_offerta_srv
     cd_tipo_servizio_erog
     cd_modalita_erogazione   
    tx_altre_mansioni
    tl_descrizione_serv_erog_ente
    service{
      txTitoloServizio
      id_servizio
      idServizioErogato
      cd_unita_prezzo
      prezzo {
        cd_unita_prezzo
        tl_testo_sostantivo
        tl_testo_aggettivo
      }
      tl_testo_aggettivo
      tl_testo_sostantivo
      tx_tags_ricerca
      categoriaPrincipaleServizio {
        idCategoria
        txTitoloCategoria
      } 
    }
    listaDestinatariPrimoLivello{
      txDestinatario
      idDestinatario
    }
    listaDestinatariSecondoLivello{
      txDestinatario
      idDestinatarioPrimoLivello
    }
    listaMunicipiServiti{
      nmMunicipio
    }
    listaMansioniSvolte{
      txTitoloMansione
    }
    ente{
      nm_ente
      id_ente
      datiEnte{
        js_referente
        js_primo_contatto
        js_altre_info
        js_note_adminwemi
        sedeEnte{
          js_sede
          ty_sede
        }
      }
    }
  }
 
  }`];
