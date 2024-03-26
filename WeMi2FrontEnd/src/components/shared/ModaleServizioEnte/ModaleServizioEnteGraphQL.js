export const getModalData = [
  '',
  `query EstraiDettaglioAmministrativoServizioEnte($idServizioEnte: Int!, $idEnte: Int!) {
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
    mansioneByService(id_servizio_ente:$idServizioEnte){
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
    destinatariServizio(id_servizio:$idServizioEnte){
      idDestinatario
      txDestinatario
      destinatariSecondoLivello{
        idDestinatario
        txDestinatario
        idDestinatarioPrimoLivello
      }
    }
    EstraiServizioErogatoEnte004(id_ente:$idEnte){
      cd_stato_dati_servizio_ente
      id_servizio_ente,
      id_servizio_riferimento

    }
    entePK(id_ente:$idEnte){
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
    contenutoPerQualifiche{
      tl_testo_1
      id_contenuto
    }
    EstraiDettaglioAmministrativoServizioEnte(id_servizio_ente:$idServizioEnte){
      qualifiche_interne
      qualifiche_esterne
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
      nomeServizio
      ulterioriInformazioni
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
        order
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
      ente {
        nm_ente
        id_ente
        nm_ente_completo
        datiEnte {
          note_per_cittadino
          js_primo_contatto
          js_altre_info
          js_note_adminwemi
          js_referente
          oj_media_logo
          media {
            oj_media
          }
        }
      }
      listaDestinatariPrimoLivello {
        idDestinatario
        txDestinatario
        destinatariSecondoLivello{
          idDestinatario
          idDestinatarioPrimoLivello
          txDestinatario
        }
      }
      listaDestinatariSecondoLivello {
        idDestinatario
        txDestinatario
        idDestinatarioPrimoLivello
      }
    }
  }`,
];

export const EstraiAllegatiServizioEnte = [
  '',
  `query EstraiAllegatiServizioEnte ($idServizioEnte: Int!){
    EstraiAllegatiServizioEnte(
      idServizioEnte: $idServizioEnte
      ) {
        id_media
        oj_media
      }
  }`,
];

export const EstraiDescrittoriBenessere = [
  '',
  `query EstraiDescrittoriBenessere ($idServizioEnte: Int!){
    EstraiDescrittoriBenessere(
      idServizioEnte: $idServizioEnte
      ) {
        nm_descrittore_movimento
        nm_descrittore_relazioni
        nm_descrittore_competenze
        nm_descrittore_creativita
        nm_descrittore_autodeterm
      }
  }`,
];
