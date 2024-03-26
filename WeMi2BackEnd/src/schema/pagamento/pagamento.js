/** @format */

import { gql } from 'apollo-server-express';
import { CITTADINO, LAVORATORE } from 'constants/usercode';

export default gql`
  type Pagamento {
    id_interno_transazione: Int!
    js_dati_fatturazione: JSON
    js_dati_pagamento: JSON
    ts_creazione: Timestamp
    storiaStati: StoriaPagamento
  }

  type Payment {
    idInternoTransazione: Int
    jsDatiFatturazione: JSON
    jsDatiPagamento: JSON
    tsCreazione: Timestamp
  }

  type StoriaPagamento {
    id_interno_trans_pag: Int!
    ts_variazione_stato: Timestamp
    cd_stato_pagamento: String
    id_utente: Int
  }

  extend type Query {
    pagamentoPK (id_interno_transazione: Int!): Pagamento @auth @protect(roles: [${CITTADINO},${LAVORATORE}])
    latestSuccessfullPayment: Payment @auth @protect(roles: [${CITTADINO},${LAVORATORE}])
  }

  extend type Mutation {
    storePayment (input: PagamentoAddInput): Pagamento #Eliminare
    storeSttPayment (input: PagamentoSttAddInput): JSON #Eliminare
    aggiungiAlCarrello (input: PagamentoAddInput!): Pagamento #Eliminare
    updateDatiFatturazione(datiFatturazione: JSON!,idPagamento: Int!): Boolean #Eliminare
    updateDatiPagamento(datiPagamento: JSON!,idPagamento: Int!): Boolean #Eliminare
    updateStatoPagamento(idPagamento: Int!, cdStatoPagamento: String!, idUtente: Int!): Pagamento #Eliminare
    rimuoviDalCarrello(idPagamento: Int!): Boolean #Eliminare
  }

  input PagamentoAddInput {
    jsDatiFatturazione: JSON
    jsDatiPagamento: JSON
  }

  input PagamentoSttAddInput {
    idInternoTransazionePagamento: Int!
    cdStatoPagamento: Int!
    idUtente: Int!
  }
`;
