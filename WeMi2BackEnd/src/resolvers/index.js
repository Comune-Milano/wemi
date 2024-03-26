import scalarResolvers from './scalar';

import tipologiaContenutoResolvers from './tipologiaContenuto';
import candidatura_lavoratore_tcb_resolver from './candidaturalavoratoretcb';
import carrelloResolvers from './carrello/carrello';
import contenutoResolvers from './contenuto/contenuto';
import dominioResolvers from './dominio/dominio';
import dominioTcbResolvers from './dominioTcb/dominioTcb';
import pagamentoResolvers from './pagamento/pagamento';
import minimoContrattualeResolvers from './minimocontrattuale/minimocontrattuale';
import contenutoJOINContenutoAssociatoResolvers from './contenuto/contenutoJOINContenutoAssociato';
import conversazioneResolvers from './conversazione/conversazione';
import mansioneResolvers from './mansione/mansione';
import mansioneTcbResolvers from './mansioneTcb/mansioneTcb';
import municipiResolvers from './municipio/municipio';
import enteResolvers from './ente/ente';
import lavoratoreTcbResolvers from './lavoratoreTcb/lavoratoreTcb';
import lavoratoreTcbCandidaturaResolvers from './lavoratoreTcb/lavoratoreTcbCandidatura';
import lavoratoreTcbDomandaResolvers from './lavoratoreTcb/lavoratoreTcbDomanda';
import utenteResolvers from './utente/utente';
// NUOVI RESOLVERS
import areaResolvers from './area/area';
import categoriaResolvers from './categoria/categoria';
import destinatariResolvers from './destinatari/destinatari';
import d_fascia_orariaResolvers from './dfasciaoraria/d_fascia_oraria';
import d_tipo_offertaResolvers from './dtipoofferta/d_tipo_offerta';
import d_tipo_servizioResolvers from './dtiposervizio/d_tipo_servizio';
import municipiAPIResolvers from './municipio/municipioAPI';
import recensione_enteResolvers from './recensioneente/recensione_ente';
import ricercaServizioBaseResolvers from './richiestaserviziobase/richiesta_servizio_base';
import richiesta_servizio_enteResolvers from './richiestaservizioente/richiesta_servizio_ente';
import richiestaServizioTcbResolvers from './richiestaserviziotcb/richiesta_servizio_tcb';
import FeedbackLavoratoreTCBResolvers from './FeedbackLavoratoreTCB/FeedbackLavoratoreTCB';
import unitaPrezzoServizioResolvers from './unitaprezzoservizio/unitaprezzoservizio';

import sedeEnteResolvers from './sedeente/sede_ente';
import RecensioneWeMiTCB from './RecensioneServizioWeMiTCB/RecensioneWeMiTCB';
import servizioResolvers from './servizio/servizio';
//import servizioErEnteResolvers from './servizioerogatoente/servizio_erogato_ente';
import servizio_erogato_enteResolvers from './servizioerogatoente/servizio_erogato_ente';
// import utilityResolvers from './utility/utility';
import counterResolver from './counter/counter';
import tipologiaContenutiResolvers from './tipologiacontenuto/tipologiacontenuto';
import mediaResolvers from './media/media';
import indennitaResolvers from './indennita/indennita';
import contributoResolvers from './contributotcb/contributotcb';
import attributoResolvers from './attributo/attributo';
import beneficiarioResolvers from './beneficiario/beneficiario';
import sostegniEconomiciResolvers from './sostegnieconomici/sostegnieconomici';
import emailrichiestaservizioResolvers from './emailrichiestaservizio/emailrichiestaservizio';
import backofficeTcbResolvers from './backofficeTcb/backofficeTcb';
import disponibilitaLavoratoreTcbResolvers from './disponibilitaLavoratoreTcb/disponibilitaLavoratoreTcb';
import ricercaServizi from './ricercaservizi/ricercaservizi';
import spaziWemi from './spaziwemi/spaziwemi';
import categoriedomiciliarita from './categoriadomiciliarita/index';
// Payment provider resolvers.
import paymentAuthorizationToken from './payment-provider/token';
import createPaymentTransaction from './payment-provider/createTransaction';
import createPaymentFree from './payment-provider/createPaymentFree';
//Scheda ente resolver
import schedaEnte from './schedaente';

// Gestione utenze resolvers
import gestioneUtenze from './gestioneutenze';

//Content Management
import contentSections from './contenuto/sezioni';
import contenutoslider from './contenuto/contenutoslider';
import contentAreas from './contenuto/area';
import contentServices from './contenuto/servizi';
import contentSliders from './contenuto/slidereducazionefinanziaria';
import educazionefinanziaria from './educazionefinanziaria/educazionefinanziaria';
import voucherResolvers from './voucher/voucher';
import createVoucherTransaction from './payment-provider/createVoucherTransaction';
import otherPaymentMethodTransaction from './payment-provider/otherPaymentMethodTransaction';

export default [
  voucherResolvers,
  contentAreas,
  contentSections,
  contentSliders,
  contentServices,
  spaziWemi,
  contenutoslider,
  ricercaServizi,
  categoriedomiciliarita,
  educazionefinanziaria,
  scalarResolvers,
  FeedbackLavoratoreTCBResolvers,
  carrelloResolvers,
  contenutoResolvers,
  tipologiaContenutiResolvers,
  mediaResolvers,
  lavoratoreTcbResolvers,
  lavoratoreTcbCandidaturaResolvers,
  lavoratoreTcbDomandaResolvers,
  servizio_erogato_enteResolvers,
    //Nuovi resolvers-------
  emailrichiestaservizioResolvers,
  unitaPrezzoServizioResolvers,
  sostegniEconomiciResolvers,
  areaResolvers,
  attributoResolvers,
  beneficiarioResolvers,
  categoriaResolvers,
  contributoResolvers,
  counterResolver,
  RecensioneWeMiTCB,
  destinatariResolvers,
  d_fascia_orariaResolvers,
  d_tipo_offertaResolvers,
  d_tipo_servizioResolvers,
  indennitaResolvers,
  municipiAPIResolvers,
  recensione_enteResolvers,
  richiesta_servizio_enteResolvers,
  candidatura_lavoratore_tcb_resolver,
  richiestaServizioTcbResolvers,
  sedeEnteResolvers,
  servizioResolvers,
  minimoContrattualeResolvers,
  backofficeTcbResolvers,
  disponibilitaLavoratoreTcbResolvers,
    // utilityResolvers,
    //-----------------
  dominioResolvers,
  dominioTcbResolvers,    
  pagamentoResolvers,
  contenutoJOINContenutoAssociatoResolvers,
  municipiResolvers,
  contenutoResolvers,
  enteResolvers,
  mansioneResolvers,
  mansioneTcbResolvers,
  ricercaServizioBaseResolvers,
  conversazioneResolvers,
  tipologiaContenutoResolvers,
  utenteResolvers,
    // Payment provider resolvers.
  paymentAuthorizationToken,
  createPaymentTransaction,
  createVoucherTransaction,
  otherPaymentMethodTransaction,
  createPaymentFree,
  schedaEnte,
  gestioneUtenze,
];
