/** @format */

import { gql } from 'apollo-server-express';

export default gql`

type ContributoTCB{
    tyContributoTcb: Int
    contributoOrarioDipendente: Float
    contributoSicuaf: Float
}

input ContributiInput{
    retribuzioneOrariaEffettiva: Float
    oreSettimanali: Int
    tyContributo: [Int]
}

extend type Query {
    EstraiContributi(input: ContributiInput!) : [ContributoTCB] 
}
`;
