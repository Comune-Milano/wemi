import { gql } from 'apollo-server-express';

import scalar from './scalar';
import beneficiario from './beneficiario/beneficiario';
import candidatura_lavoratore_tcb from './candidaturalavoratoretcb';
import dominio from './dominio/dominio';
import lavoratoreTcb from './lavoratoreTcb/lavoratoreTcb';
import lavoratoreTcbCandidatura from './lavoratoreTcb/lavoratoreTcbCandidatura';
import lavoratoreTcbDomanda from './lavoratoreTcb/lavoratoreTcbDomanda';
import dominioTcb from './dominioTcb/dominioTcb';
import pagamento from './pagamento/pagamento';
import FeedbackLavoratoreTCB from './FeedbackLavoratoreTCB/FeedbackLavoratoreTCB';
import spazioWeMi from './spazioWeMi/spazioWeMi';
// import ente from './ente';
import servizio_erogato_ente from './servizioerogatoente/servizio_erogato_ente';
import ente from './ente/ente';
// import pagamento from './schemaente/pagamento';
import contenuto from './contenuto/contenuto';
import contenutoAssociato from './contenutoassociato/contenutoAssociato';
import tipologiaContenuto from './tipologiacontenuto/tipologiacontenuto';
import media from './media/media';
import carrello from './carrello/carrello';
import contenutoJOINContenutoAssociato from './contenuto/contenutoJOINContenutoAssociato';
import voucher from './voucher/voucher';
// import ente from './ente';
//SCHEMA ENTE

// import pagamento from './pagamento';
import recensione from './recensione/recensione';
import RecensioneWeMiTCB from './RecensioneServizioWeMiTCB/RecensioneWeMiTCB';
import richiesta_servizio_ente from './richiestaservizioente/richiesta_servizio_ente';
import richiesta_servizio_tcb from './richiestaserviziotcb/richiesta_servizio_tcb';

import servizio from './servizio/servizio';
import richiesta_servizio_base from './richiestaserviziobase/richiesta_servizio_base';
import conversazione_utente from './conversazione/conversazione';
import municipio from './municipio/municipio';
import mansione from './mansione/mansione';
import mansioneTcb from './mansioneTcb/mansioneTcb';

//NUOVI SCHEMA
import unitaPrezzoServizio from './unitaprezzoservizio/unitaprezzoservizio';
import area from './area/area';
import categoria from './categoria/categoria';
import destinatari from './destinatari/destinatari';
import d_tipo_offerta from './dtipoofferta/d_tipo_offerta';
import d_fascia_oraria from './dfasciaoraria/d_fascia_oraria';
import d_tipo_servizio from './dtiposervizio/d_tipo_servizio';
import minimo_contrattuale from './minimocontrattuale/minimocontrattuale';
import counter from './counter/counter';
import sostegni_economici from './sostegnieconomici/sostegni_economici';
import utility from './utility/utility';
import indennita from './indennita/indennita';
import contributoTCB from './contributotcb/contributotcb';
import attributo from './attributo/attributo';
import sede_ente from './sedeente/sede_ente';
import utente from './utente/utente';
import emailrichiestaservizio from './emailrichiestaservizio/emailrichiestaservizio';
import backofficeTcb from './backofficeTcb/backofficeTcb';
import disponibilitaLavoratoreTcb from './disponibilitaLavoratoreTcb/disponibilitaLavoratoreTcb';
import ricercaServizi from './ricercaservizi/ricercaservizi';
// Payment provider schemas.
import paymentAuthorizationToken from './payment-provider/token';
import createPaymentTransaction from './payment-provider/createTransaction';

//Scheda ente
import schedaEnteSchema from './schedaente';
import gestioneUtenze from './gestioneutenze';

//Content Management
import contentSections from './contenuto/sezioni';
import contentServices from './contenuto/servizi';
import contenutoslider from './contenuto/contenutoslider';
import contentAreas from './contenuto/area';
import contentSliders from './contenuto/slidereducazionefinanziaria';
// inizializza
const linkSchema = gql`
  type Query { _: String }
  type Mutation { _: Boolean }
  type Subscription { _: Boolean }
`;
export default [
  voucher,
  contentAreas,
  contentServices,
  contentSections,
  contentSliders,
  ricercaServizi,
  contenutoslider,
  linkSchema,
  scalar,
  carrello,
  lavoratoreTcb,
  lavoratoreTcbCandidatura,
  lavoratoreTcbDomanda,
  contenuto,
  FeedbackLavoratoreTCB,
  RecensioneWeMiTCB,
  tipologiaContenuto,
  media,
  schedaEnteSchema,
  //NUOVI SCHEMA -----
  unitaPrezzoServizio,
  emailrichiestaservizio,
  area,
  attributo,
  beneficiario,
  spazioWeMi,
  categoria,
  contenutoAssociato,
  contributoTCB,
  counter,
  destinatari,
  d_fascia_oraria,
  d_tipo_offerta,
  d_tipo_servizio,
  indennita,
  sostegni_economici,
  utility,
  backofficeTcb,
  disponibilitaLavoratoreTcb,
  //-------------
  dominio,
  dominioTcb,
  pagamento,
  contenutoJOINContenutoAssociato,
  ente,
  pagamento,
  recensione,
  richiesta_servizio_ente,
  richiesta_servizio_tcb,
  candidatura_lavoratore_tcb,
  servizio,
  richiesta_servizio_base,
  conversazione_utente,
  minimo_contrattuale,
  servizio_erogato_ente,
  municipio,
  mansione,
  mansioneTcb,
  tipologiaContenuto,
  media,
  sede_ente,
  utente,
  // User Manager schema
  gestioneUtenze,
  // Payment provider schemas.
  paymentAuthorizationToken,
  createPaymentTransaction,
];
