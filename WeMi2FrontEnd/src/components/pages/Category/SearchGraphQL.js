/** @format */
//OK
export const mansioneAll = () => [
  'listaMansioni',
  `{
    mansioneAll {
      idMansione,
      txTitoloMansione
    }
  }`,
];


//OK
export const fasciaOrariaAll = () => [
  'ORA_EROGAZIONE_SRV',
  `{
    dFasciaOrariaAll {
        id_periodo
        tl_valore_testuale
        pg_visualizzazione
    }
  }`,
];
//OK
export const listaDestinatari = () => [
  'listaDestinatari',
  `{
    destinatari{
      idDestinatario
      txDestinatario
      destinatariSecondoLivello{
        idDestinatario
        txDestinatario
      }
    }
  }`,
];
//OK
export const tipoOffertaAll = () => [
  'tipoOfferta',
  `{
    dTipoOffertaAll{
      cdOfferta
      tl_valore_testuale
    }
  }`,
];
//OK
export const tipoServizio = () => [
  'tipoServizio',
  `{
    dTipoServizioAll{
      cdServizio
      tl_valore_testuale
    }
  }`,
];


export const serviziByCategoria = idCategoria => [
  'servizi',
  `
  {
  serviziAll(idCategoria: ${idCategoria}){
    id_servizio
    tx_tags_ricerca
    txTitoloServizio
    categoriaPrincipaleServizio{
      idCategoria
      txTitoloCategoria
     	media{
        id_media
        oj_media
      }
    }
  }
}`
];
export const servizioPK = (service,categoria) => ['servizioSelezionato', ` {
servizioPK(idServizio:${service},idCategoria:${categoria}){
  id_servizio
  txTitoloServizio
  txDescrizioneServizio
  categoriaPrincipaleServizio{
    idCategoria
    txTitoloCategoria
  }
}
}
` ]
export const enteByServizio = (service,categoria) => [
  'EnteByServiceSearch',
 `
 {
     
  servizioPK(idServizio:${service},idCategoria:${categoria}){
      id_servizio
      txTitoloServizio
      txDescrizioneServizio
      categoriaPrincipaleServizio{
        idCategoria
        txTitoloCategoria
      }
  }
  dTipoServizioAll{
    cdServizio
    tl_valore_testuale
  }
  ${service === 999997 || service === 999998 || service === 999999 ?
  `RicercaEntiErogantiServizioSpaziWeMi(input: {service: ${service}}){
  id_servizio_ente
  id_servizio_riferimento
  numeroRecensioni
  spaziWeMi {
    idSpazioWeMi
    tlValoreTestuale
  }
  js_dati_prezzo
  im_prezzo_minimo
  im_prezzo_minimo_offerta_calc
  media_recensioni
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
  `RicercaEntiErogantiServizio(input:{service:${service}}){
id_servizio_ente
id_servizio_riferimento
numeroRecensioni
js_dati_prezzo
im_prezzo_minimo
im_prezzo_minimo_offerta_calc
media_recensioni
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
