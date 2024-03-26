import { gql } from 'apollo-server-express';
/** @deprecated */
export default gql`
    type Ente {
        id_ente: Int!
        id_partita_iva_ente: String
        nm_ente: String
        tx_municipi_accreditati: String
        tx_email_referente: String
        js_dati_identificativi_ente: JSON
        dt_inizio_val: Date
        dt_fine_val: Date
        ts_creazione: Timestamp
      }

    extend type Query {
        entePK (id_ente: Int!): Ente
        enteAll: [Ente]
    }

   
`;
