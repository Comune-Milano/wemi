/** @format */

import { gql } from 'apollo-server-express';

export default gql`
 
  
    input InputMail{
      sendername: String
      senderemail: String
      bcc: String
      attach: Boolean
      mails: [JSON]
    }
    extend type Query {
      loginAPI(input: InputLogin!): User #Eliminare
      prepareEmail(input: InputMail!, authToken: String!): Boolean #Eliminare
  }
`;
