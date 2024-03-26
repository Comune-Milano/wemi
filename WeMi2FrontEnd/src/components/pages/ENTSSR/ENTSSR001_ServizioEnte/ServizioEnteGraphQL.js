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
      js_note_adminwemi_su_servizio
      tl_descrizione_serv_erog_ente
      id_servizio_ente
      qt_min_pers
      qt_max_pers
      sedeErogazione{
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