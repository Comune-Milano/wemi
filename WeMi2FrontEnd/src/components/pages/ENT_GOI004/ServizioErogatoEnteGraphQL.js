/** @format */

export const EstraiServizioErogatoEnte004 = (id) => [
  '',
  `{
    EstraiServizioErogatoEnte004(id_ente:${id}){
            id_servizio_ente
            id_servizio_riferimento
            pg_versione
            nm_ente
            ptx_username
            cat_accreditamento
            serv_offerto
            ts_creazione
            ts_variazione_stato
            cd_stato_dati_servizio_ente
            tl_valore_testuale
            id_utente
    }
    }`,
];

export const EstraiServizioErogatoEnte004Admin = (id) => [
  '',
  `{
    EstraiServizioErogatoEnte004Admin(id_ente:${id}){
            id_servizio_ente
            id_servizio_riferimento
            pg_versione
            nm_ente
            ptx_username
            cat_accreditamento
            serv_offerto
            ts_creazione
            ts_variazione_stato
            cd_stato_dati_servizio_ente
            tl_valore_testuale
            id_utente
    }
    }`,
];

export const EstraiListaEnte = (status) => [
  '',
  `{
    EstraiListaEnte{
      id_ente
      nm_ente
    }
  }`
];

export const EstraiDatiEnte = (id_ente)=>[
  'EstraiDatiEnte',
 `{
    entePK(id_ente:${id_ente}){
    nm_ente,
    nm_ente_completo
  }
  }`
]

export const EstraiDettaglioAmministrativoServizioEnte = (id_servizio) => [
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
    destinatari{
      idDestinatario
      txDestinatario
      destinatariSecondoLivello{
        idDestinatario
        txDestinatario
      }
    }
    EstraiDettaglioAmministrativoServizioEnte(id_servizio_ente:${id_servizio}){
      tl_descrizione_serv_erog_ente
      id_servizio_ente
    sedeErogazione{
      js_sede
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
        txDestinatario
      }
    }
    }
  }`
];

export const InserisciServizioEnte004 = (servizi, ente) => [
  '',
  `mutation{InserisciServizioEnte004(input:{id_servizio_riferimento:[${servizi}],id_ente_erogatore:${ente}})}`
];

export const inserisciServizioEnte004Mutation = [
  '',
  `mutation InserisciServizioEnte004($input: InserisciServizioEnteInput) {
    InserisciServizioEnte004(input: $input)
  }`,
  '',
];

export const dominioByTipoS = (id) => [
  '',
  `{
    dominioByTipoS(ty_dominio:"${id}"){
      textValue
      value
    }
  }`,
];

export const EstraiCategorieAccreditamento = (id) => [
  '',
  `{
    EstraiCategorieAccreditamento(id_ente:${id}){
      value textValue
    }
  }`,
];