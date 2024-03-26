/** @format */

import { gql } from 'apollo-server-express';

export default gql`

type SelectUI {
value: Int
textValue: String
}

type Dominio {
ty_dominio: String!
cd_dominio: String!
tl_valore_testuale: JSON
tl_valore_testuale_lingua: String
pg_visualizzazione: Int
}

# type Destinatario {
#     id_destinatario: String!
#     tl_valore_testuale: String
#     pg_visualizzazione: String
# }


type PeriodoErogazione {
    id_periodo: Int!
    tl_valore_testuale: String
    pg_visualizzazione: String
}

# type Area {
#     idArea: String!
#     txTitoloArea: String
# }
# type Categoria {
#     idCategoria: String!
#     txTitoloCategoria: String
#     areeCategoria: [areeCategoria]
# }
type areeCategoria {
    id_contenuto_primario: Int!
    id_contenuto_associato: Int!
    nm_relazione: String
    ts_creazione: Timestamp
}

extend type Query {
dominioAll (language: String): [Dominio] #Libera
dominioPK(ty_dominio: String!, cd_dominio: String!, language: String): Dominio #Libera
dominioByTipo(ty_dominio: String!, language: String!): [Dominio] #Libera
dominioByTipoS(ty_dominio: String!, language: String): [SelectUI] #Libera

# Area(language: String!): [Area]
# Categoria(language: String!): [Categoria]
# destinatarioAll:[Destinatario]

periodoErogazioneAll:[PeriodoErogazione] #Libera
}
`;
