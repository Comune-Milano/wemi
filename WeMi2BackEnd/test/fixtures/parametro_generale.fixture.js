import { gql } from "apollo-server";

export const fixtureParamGenerale = [
  {
   nomeParam:"MAIL_WEMI",
   valoreTx:"luca.amoroso@outlook.com",
   valoreDt:"2019-11-27"
  },
  {
    nomeParam:"NUMERO_VERDE_WEMI",
   valoreTx:"0000000000",
   valoreDt:"2019-11-27"
   },
   {
    nomeParam:"TEMPLATE_PROMEMORIA_DISPONIBILITA_CANDIDATURA_SUBJECT",
   valoreTx:"Richiesta disponibilità",
   valoreDt:"2019-11-27"
   },
   {
    nomeParam:"TEMPLATE_PROMEMORIA_DISPONIBILITA_CANDIDATURA_HEADER",
   valoreTx:"Gentile ${nomeDestinatario} ${cognomeDestinatario},",
   valoreDt:"2019-11-27"
   },
   {
    nomeParam:"TEMPLATE_PROMEMORIA_DISPONIBILITA_CANDIDATURA_BODY",
   valoreTx:"Le chiediamo cortesemente di inserire la tua disponibilita nel portale WeMi.",
   valoreDt:"2019-11-27"
   },
   {
    nomeParam:"TEMPLATE_PROMEMORIA_DISPONIBILITA_CANDIDATURA_SIGN",
   valoreTx:"Cordiali saluti,<br>Lo Staff WeMi",
   valoreDt:"2019-11-27"
   },
   {
    nomeParam:"TEMPLATE_PROMEMORIA_DISPONIBILITA_CANDIDATURA_FOOTER",
   valoreTx:"Questa &egrave; un'e-mail generata automaticamente e non avremo la possibilit&agrave; di leggere eventuali e-mail di risposta. Non rispondere a questo messaggio.",
   valoreDt:"2019-11-27"
   }
];