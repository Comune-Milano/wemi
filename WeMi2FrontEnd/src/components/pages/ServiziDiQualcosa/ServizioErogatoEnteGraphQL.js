/** @format */

export const EnteServizioErogatoTable = (id) => [
    '',
    `{
        EnteServizioErogatoTable(id_ente:${id}){
          id_servizio_ente
          pg_versione
          nm_ente
          cat_accreditamento
          serv_offerto
          ts_variazione_stato
          cd_stato_dati_servizio_ente
          id_utente
         
        }
      }`,
];
