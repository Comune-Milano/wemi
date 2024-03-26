/** @format */

import { gql } from 'apollo-server-express';

export default gql`

type Categoria{
    idCategoria: Int!
    txTitoloCategoria: JSON 
    ordineVisualizzazioneCategoria: Int
    media: Media
    sottotipo: Int
    areeCategoria: [Area]
    categorie: [Categoria]
}

type ServiceData {
    idServizio: String!
    tipoArea: String
    nomeServizio: String
    datiSezione: JSON
}

type CategoryService {
    id: Int!
    title: String 
    description: String
    idServizio: Int
    tipoArea: String
    progressive: Int
    image: Image
    sottotipo: Int
    areeCategoria: [Area]
    services: [ServiceData]
    categories: [CategoryService]
}



extend type Query {
    allCategorie (stt: Int): [Categoria] #Libera
    getAllCategories018 : CategoryService #Libera
    getAllCategoriesByTag (tag: String!): CategoryService #Libera
    getAllCategoriesDom : CategoryService #Libera
    getAllCategories018Cross: CategoryService #Libera
    categoriaPK(idCategoria: Int!): Categoria #Eliminare
    Categoria(language: String!): [Categoria] #Eliminare
}
`;
