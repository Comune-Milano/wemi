import { gql } from 'apollo-server-express';

export default gql`
    type Carrello {
        id_carrello: UUID!
        js_dati_fatturazione: JSON
        js_dati_pagamento: JSON
        ts_creazione: Timestamp
    }

    extend type Query {
        carrelloAll: [Carrello] #Eliminare
        carrelloPK (id_carrello: UUID!): Carrello #Eliminare
    }

    extend type Mutation {
        carrelloAdd (input: CarrelloAddInput!): Carrello #Eliminare
        carrelloUpd (input: CarrelloUpdInput!): Boolean #Eliminare
        carrelloDel (id_carrello: UUID!): Boolean #Eliminare
    }

    input CarrelloAddInput {
        js_dati_fatturazione: JSON
        js_dati_pagamento: JSON
    }

    input CarrelloUpdInput {
        id_carrello: UUID!
        js_dati_fatturazione: JSON
        js_dati_pagamento: JSON
    }
`;
