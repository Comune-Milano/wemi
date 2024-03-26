import { gql } from 'apollo-server-express';

export default gql`
    type ContenutoJOINContenutoAssociato {
        id_contenuto: Int!
        ty_contenuto: Int
        ty_sottotipo_contenuto: Int
        nr_ordine_visualizzazione: Int
        pg_versione: Int
        tl_testo_1: JSON
        tl_testo_2: JSON
        tl_testo_3: JSON
        tl_testo_4: JSON
        tl_testo_5: JSON
        ln_link_1: String
        ln_link_2: String
        id_media1: Int
        id_media2: Int
        dt_inizio_val: Date
        dt_fine_val: Date
        js_dati_contenuto: JSON
        ts_creazione: Timestamp
        id_contenuto_primario: Int
        id_contenuto_associato: Int
        nm_relazione: String
        ts_creazione1: Timestamp
      }

    extend type Query {
        ContenutoJOINContenutoAssociatoByPK (id_contenuto_primario: ID!): [ContenutoJOINContenutoAssociato] #Eliminare
    }
`;
