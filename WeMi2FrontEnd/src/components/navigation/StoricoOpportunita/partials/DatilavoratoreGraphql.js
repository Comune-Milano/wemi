/** @format */
export const DatiLavoratoreCandidatura = [
    '',
    `query DatiLavoratoreCandidatura($id_utente:Int){
      DatiLavoratoreCandidatura (id_utente: $id_utente){
        id_utente
        cognome
        nome
        cd_stato_dati_lav
      }}`,
      'DatiLavoratoreCandidatura'
  ];

  export const StoricoLavoratoreFiltro = [
    '',
    `query StoricoLavoratoreFiltro ($id_utente: Int, $cd_stato_ric_serv_ente: String, $cd_stato_associazione: String, $dataOfferta: String, $locale: String){
      StoricoLavoratoreFiltro (
        id_utente: $id_utente,
        cd_stato_ric_serv_ente: $cd_stato_ric_serv_ente,
        cd_stato_associazione: $cd_stato_associazione,
        dataOfferta: $dataOfferta,
        locale: $locale) {
          id_richiesta
          id_richiesta_servizio_base
          cd_stato_associazione
          stato_associazione
          nota_richiesta
          stato_candidatura
          tipoServizio
          id_servizio
          ts_creazione
          recensioniEnte
      }
    }` 
  ];

  export const DominioTcbByTipoTcb = [
    "",
    `query dominioTcbByTipoTcb($ty_dominio_tcb: Float!) {
      dominioTcbByTipoTcb(ty_dominio_tcb: $ty_dominio_tcb) {
        value,
        textValue
      }
    }`,
    "dominioTcbByTipoTcb"
  ];