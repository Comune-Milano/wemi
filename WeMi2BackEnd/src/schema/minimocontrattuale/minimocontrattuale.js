/** @format */

import { gql } from 'apollo-server-express';

export default gql`
    type MinimoContrattuale{
        nr_anno_rif:  Int!
        dominioTcb: Float!
        cd_tipo_orario_lavoro: Float!
        cd_categoria_contrattuale: String! 
        im_importo_contributo: Float
        im_importo_indennita: Float
        paga_minima_contrattuale: Float
        LivelloContrattuale: LivelloContrattuale
        im_importo_indennita_tata: Float
        im_importo_indennita_badante: Float
    }

    type LivelloContrattuale{
        cdLivelloContrattuale: Int!
        idServizio: Int!
        livpg: Int
        txLivelloBreve: JSON
        txLivelloLungo: JSON
    }

    extend type Query {
        estraiConfigurazioniLivelliContrattuali(idServizio: Int!): [MinimoContrattuale] #Libera
  }
`;
