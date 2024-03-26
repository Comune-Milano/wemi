export const entePK = idEnte => ['entePK',
`{
  entePK(id_ente:${idEnte}){
    nm_ente
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
    js_dati_prezzo
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
