/** @format */

import { gql } from 'apollo-server-express';

export default gql`
 type Servizio {
  id_servizio: Int!
  idCategoria: Int!
  idServizioErogato: Int
  id_categoria_accreditamento: Int
  cd_unita_prezzo: Int
  tx_tags_ricerca: String
  tl_testo_aggettivo: JSON
  tl_testo_sostantivo: JSON
  txTitoloServizio: JSON
  txDescrizioneServizio: JSON
  #dominioUtilizzoServizio: [Dominio]
  #dominioTipoErogazioneServizio: [Dominio]
  prezzo: Prezzo
  categoriaPrincipaleServizio:[Categoria]
  categoriaAccreditamentoServizio: [Categoria]
}
type Prezzo{
  cd_unita_prezzo: Int
  tl_testo_aggettivo: JSON
  tl_testo_sostantivo: JSON
  fg_genere_maschile: Boolean
}


  type Service {
    serviceId: Int
    name: String
    categoryId: Int
    tag: String
    categoria: ServiceCategory
  }

  type ServiceCategory {
    categoryId: Int
    name: String
    description: String
    media: String
  }

  input ServiceFilter {
    tag: String
    idCategoria: Int
    is0_18: Boolean
  }
  extend type Query {
    servizioPK(idServizio: Int!, idCategoria: Int): Servizio #Libera
    serviziAll(idCategoria: Int!, stt:Boolean): [Servizio] #Libera
    matchParoleRicerca (text:String):[Servizio] #Libera
    services(filters: ServiceFilter): [Service] #Libera
    category(idCategoria: Int): ServiceCategory #Libera
  }
 
`;
