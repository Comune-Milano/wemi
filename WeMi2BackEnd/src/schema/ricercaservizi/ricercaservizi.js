import { gql } from 'apollo-server-express';

export default gql`

  type ServiziResult {
    itemsPerPage: Int
    page: Int
    totalItems: Int
    data: [ServiziPayload]
  }

  type ServiziPayload {
    idEnte: Int
    nomeEnte: String
    nomeEnteCompleto: String
    idServizioRiferimento: Int
    idServizioEnte: Int
    cdTipoOffertaServizio: Int
    cdTipoServizioErog: Int
    imPrezzoMinimo: Float
    imPrezzoMinimoCond: Float
    prezzoMinimoDaMostrare: Float
    mediaRecensioni: Float
    numeroRecensioni: Int
    tlTestoAggettivo:JSON
    spaziWeMi: [FiltriLabel]
  }

  input FiltriRicercaServizi {
    gratuito: Boolean
    prezzo: Float
    cdStatoServizi: [Int]
    mansioni: [Int]
    destinatari: [Int]
    fasceOrarie: [Int]
    quantitaPersone: Int
    quantitaUnita: Int
    municipio: Int
    orderBy: Int
    indirizzo: String
  }

  type FiltriLabel {
    id: Int
    label: String
  }

  type PrezzoMaxMin {
    prezzoMax: Float
    prezzoMin: Float
  }
  
  type ServiceData {
    serviceName: String
    cdUnitaPrezzo: Int
    tipologiaAggettivo: String
    tipologiaSostantivo: String
    fgGenereMaschile: Boolean
  }

  type PersoneQuantita {
    numeroMinimoPersone: Int
    numeroMinimoUnita: Int
    limiteMinimoPersoneAssoluto: Int
    limiteMassimoPersoneAssoluto: Int
  }

  type TipologiaServizi {
    individuale: Boolean
    condiviso: Boolean
    misto: Boolean
    gratuito: Boolean
    pagamento: Boolean
  }

  input GetTokenType {
    page: Int!
    idService: Int!
    services: [JSON]!
    filters: FiltriRicercaServizi! 
    fromDay: Timestamp
    infoDisp: Int
    messaggioAgliEnti: String
    toDay: Timestamp
  }

  extend type Query {
    getTokenService(input: GetTokenType!): String
    verifyTokenService(token: String!): JSON
    RicercaServizi(
      idServizioRiferimento: Int!
      page: Int
      itemsPerPage: Int
      filters: FiltriRicercaServizi
      is0_18: Boolean
    ): ServiziResult!

    filtriMinPersoneQuantita(idServizioRiferimento: Int!): PersoneQuantita
    filtriMansioni(idServizioRiferimento: Int!): [FiltriLabel]
    filtriDestinatari(idServizioRiferimento: Int!): [FiltriLabel]
    filtriFasceOrarie(idServizioRiferimento: Int!): [FiltriLabel]
    filtriCdStatoServizi(idServizioRiferimento: Int!): [FiltriLabel]
    filtriPrezzoMaxMin(idServizioRiferimento: Int!, filters: FiltriRicercaServizi ): PrezzoMaxMin
    serviceData(idServizioRiferimento: Int!): ServiceData
    listiniPrezzi(idServiziEnte: [Int]!): [JsonDatiPrezzo]
    tipologiaServizi(idServizioRiferimento: Int!): TipologiaServizi
  }
`;
