export const contenutoByTyS = [
  '',
  `query contenutoByTyS ($type: Int!){
    contenutoByTyS(ty_contenuto:$type){
      value
      textValue
    }
  }`,
  'contenutoByTyS',
];

export const dominioByTipoS = [
  '',
  `query dominioByTipoS ($type: String!){
    dominioByTipoS(ty_dominio: $type){
      value
      textValue
    }
  }`,
  'dominioByTipoS',
];

export const EstraiDatiPropriEnte = [
  '',
  `query EstraiDatiPropriEnte($id_ente: Int!) {
    EstraiDatiPropriEnte(id_ente: $id_ente){
        id_ente
        id_partita_iva_ente
        nr_operatori_servizi_wemi
        nm_ente
        nm_ente_completo
        ptx_email
        cd_stato_ente
        tl_valore_testuale
        id_utente
        ts_variazione_stato
        cd_stato_ente
        id_spazio_wemi
        id_cat_accreditamento
        pg_versione
        datiMerchant {
          idEnte
          merchantId
          publicKey
          privateKey
          dataInizio
          dataFine
        }
    }
  }`,
  'EstraiDatiPropriEnte',
];

export const ModificaDatiIdentificativiEnte = [
  '',
  `
    mutation ModificaDatiIdentificativiEnte ($input: ModificaDatiIdentificativiEnteInput) {
        ModificaDatiIdentificativiEnte(input: $input)
    }`,
  'ModificaDatiIdentificativiEnte',
];

export const InserisciDatiIdentificativiEnte = [
  '',

  `mutation InserisciDatiIdentificativiEnte($input:InserisciDatiIdentificativiEnteInput) {
    InserisciDatiIdentificativiEnte(input:$input)
  }`,
];
