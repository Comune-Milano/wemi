
export const enteByServizio = (service) => [
 'EnteByServiceSearch',
`
  {
    
    servizioPK(idServizio:${service}){
        id_servizio
        txTitoloServizio
        txDescrizioneServizio
    }
    dTipoServizioAll{
      cdServizio
      tl_valore_testuale
    }
    ${parseInt(service) === 999997 || parseInt(service) === 999998 || parseInt(service) === 999999 ? 
    `RicercaEntiErogantiServizioSpaziWeMi(input:{service:
          ${service}}){
    id_servizio_ente
    id_servizio_riferimento
    spaziWeMi {
      idSpazioWeMi
      tlValoreTestuale
    }
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
    im_prezzo_minimo_offerta_calc
    dt_inizio_val_offerta_prezzo
dt_fine_val_offerta_prezzo
    media_recensioni
    numeroRecensioni
    cd_tipo_offerta_srv
    cd_tipo_servizio_erog
    cd_modalita_erogazione
    ts_creazione
    ultimoStato{
      cd_stato_dati_servizio_ente
    }
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
    ente{
      id_ente
      nm_ente
      cd_stato_ente
      datiEnte{
        js_primo_contatto
      }
    }
}`
    : 
    `RicercaEntiErogantiServizio(input:{service:
      ${service}}){
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
im_prezzo_minimo
im_prezzo_minimo_offerta_calc
dt_inizio_val_offerta_prezzo
dt_fine_val_offerta_prezzo
media_recensioni
numeroRecensioni
cd_tipo_offerta_srv
cd_tipo_servizio_erog
cd_modalita_erogazione
ts_creazione
ultimoStato{
  cd_stato_dati_servizio_ente
}
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
ente{
  id_ente
  nm_ente
  cd_stato_ente
  datiEnte{
    js_primo_contatto
  }
}
}`
}
}`
];

export const getMinPersoneQuantita = [
  '',
  `query (
    $idServizio: Int!
  ) {
    filtriMinPersoneQuantita(
      idServizioRiferimento: $idServizio,
    ) {
      numeroMinimoPersone
      numeroMinimoUnita
      limiteMinimoPersoneAssoluto
      limiteMassimoPersoneAssoluto
    }
  }`,
  '',
];
export const getFilters = [
  '',
  `
    query (
      $idServizioRiferimento: Int!
    ) {
      tipologiaServizi(idServizioRiferimento: $idServizioRiferimento) {
        individuale
        condiviso
        misto
        gratuito
        pagamento
      }
      filtriMansioni (idServizioRiferimento: $idServizioRiferimento) {
        id
        label
      } 
      filtriDestinatari (idServizioRiferimento: $idServizioRiferimento) {
        id
        label
      }
      filtriFasceOrarie (idServizioRiferimento: $idServizioRiferimento) {
        id
        label
      }
      serviceData (idServizioRiferimento: $idServizioRiferimento) {
        serviceName
        cdUnitaPrezzo
        tipologiaAggettivo
        tipologiaSostantivo
        fgGenereMaschile
      }
    }
  `,
  '',
];

export const getServices = [
  '',
  `
  query (
    $idServizio: Int!,
    $page: Int,
    $itemsPerPage: Int,
    $filters: FiltriRicercaServizi,
    $withoutPriceRange: Boolean! = false,
    $is0_18: Boolean
  ) {
    filtriPrezzoMaxMin(
      idServizioRiferimento: $idServizio,
      filters: $filters
    ) @skip(if: $withoutPriceRange){
      prezzoMax
      prezzoMin
    }
    RicercaServizi(
      idServizioRiferimento: $idServizio,
      page: $page,
      itemsPerPage: $itemsPerPage,
      filters: $filters
      is0_18: $is0_18
    ) {
      itemsPerPage
      page
      totalItems
      data {
        idEnte
        tlTestoAggettivo
        nomeEnte
        nomeEnteCompleto
        idServizioEnte
        cdTipoOffertaServizio
        cdTipoServizioErog
        imPrezzoMinimo
        imPrezzoMinimoCond
        prezzoMinimoDaMostrare
        numeroRecensioni
        mediaRecensioni
        spaziWeMi {
          id
          label
        }
      }
    }
  }
  `,
  '',
];

export const EstraiAltreInfoEnte = [
  '',
  `
    query altreInfoEnte($id_ente: Int!) {
      altreInfoEnte(id_ente: $id_ente) {
        js_altre_info
      }
    }
  `,
  'altreInfoEnte',
];
