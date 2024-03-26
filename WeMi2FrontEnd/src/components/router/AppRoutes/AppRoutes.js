
import React from 'react';
import {
  PAGE_AREAPERSONALELAVORATORE_URL,
  PAGE_HOME_URL,
  PAGE_HOMEPREVIEW_URL,
  PAGE_REQUESTSINDEX_URL,
  PAGE_CART_URL,
  PAGE_TCB_IOO_URL,
  PAGE_ORDER_URL,
  PAGE_CHAT_URL,
  PAGE_CHATADMIN_URL,
  PAGE_NOT_FOUND_URL,
  PAGE_FEEDBACK_TCB_URL,
  PAGE_AREAPERSONALE_URL,
  PAGE_FUNZIONALITADIRICERCA_URL,
  PAGE_REQUESTSERVICE_URL,
  PAGE_GESTIONEENTE_URL,
  PAGE_DATIENTE_URL,
  PAGE_ADMIN_DATIENTE_URL,
  PAGE_FEEDBACK_LAVORATORE_URL,
  PAGE_SCHEDAENTE_URL,
  PAGE_ADMIN_SCHEDAENTE_URL,
  PAGE_ENTE_GOI_005_URL,
  PAGE_ADMIN_ENTE_GOI_005_URL,
  PAGE_VISUALIZZA_ENTE_GOI_005_URL,
  PAGE_ADMIN_VISUALIZZA_ENTE_GOI_005_URL,
  PAGE_ENTE_GOI_004_URL,
  PAGE_HOME_INCLUSIONE,
  PAGE_ADMIN_ENTE_GOI_004_URL,
  PAGE_SCHEDAOP_URL,
  PAGE_FEEDBACK_URL,
  PAGE_ENTEVR_URL,
  PAGE_ENTSSE_URL,
  PAGE_ENTSERVICE_URL,
  PAGE_SEARCHENTSERVICE_URL,
  PAGE_MODALEACCETTAZIONEENTERI001_URL,
  PAGE_MODALERIFIUTOENTERI001_URL,
  PAGE_MENUTCB_URL,
  PAGE_CANDIDATURA_LAVORATORE_TCB_URL,
  PAGE_TCBMEN002_URL,
  PAGE_TCBMEN003_URL,
  PAGE_TCBIRI001_URL,
  PAGE_TCBIRI002_URL,
  PAGE_TCBIRI002MODIFICA_URL,
  PAGE_TCBIRISUMMARY_URL,
  PAGE_ADMIN_CNT_01_URL,
  PAGE_ADMIN_CNT_02_URL,
  PAGE_ADMIN_CNT_03_URL,
  PAGE_TCB_ADMIN_ECA_002_URL,
  PAGE_TCB_IDO_URL,
  PAGE_ENTERI001_URL,
  PAGE_ENTERI002_URL,
  PAGE_TCB_ADMIN_ERI_001,
  PAGE_TCB_ADMIN_ECA_001,
  PAGE_ENTERI001FEEDBACKS_URL,
  PAGE_ENTERI001ORDERS_URL,
  PAGE_RECENSIONE_URL,
  PAGE_RECENSIONE_FROM_GESTIONE_FEEDBACK_URL,
  PAGE_PAGINA_INFORMATIVA_URL,
  PAGE_SPAZIWEMI_URL,
  PAGE_TCB_SIM_URL,
  PAGE_TCB_SIM_PRINT_URL,
  PAGE_DATICHIUSURA_URL,
  PAGE_ENTSSESCHEDA_URL,
  PAGE_ENTSSEREQUEST_URL,
  PAGE_ENTSSEHANDLEREQUEST_URL,
  PAGE_RECENSIONE_ADMIN_URL,
  PAGE_LOGIN_ADMIN,
  PAGE_TCB_DISPONIBILITA_LAVORATORE,
  PAGE_MATCHING_DOMANDA_LAVORATORE_URL,
  PAGE_QUERY_SERVICES,
  PAGE_MODIFICA_CANDIDATURA_TCB_ADMIN_URL,
  PAGE_CANDIDATURA_IMPERSONIFICAZIONE_TCB_ADMIN_URL,
  PAGE_MODIFICA_DOMANDA_TCB_ADMIN_URL,
  PAGE_FINALIZZA_CANDIDATURA_TCB_ADMIN_URL,
  PAGE_HOME_SPAZIWEMI_URL,
  PAGE_TCB_ECA_002_URL,
  PAGE_ADMIN_FEEDBACK_TCB_URL,
  PAGE_FEEDBACK_LAVORATORE_ADMIN_URL,
  PAGE_FEEDBACK_LAVORATORE_LAVORATORE_URL,
  PAGE_FEEDBACK_OLD_LAVORATORE_ADMIN_URL,
  PAGE_TCB_ADMIN_ERI_002,
  PAGE_FEEDBACK_OLD_LAVORATORE_CITTADINO_URL,
  PAGE_ENTI_SERVICE_FLOW,
  PAGE_GESTIONE_UTENZE,
  PAGE_MODIFICA_UTENZA,
  PAGE_INCLUSIONE_RICONGIUNGIMENTO,
  PAGE_INCLUSIONE_APPRENDIMENTO_ITALIANO,
  PAGE_RICONGIUNGIMENTO_COME_FUNZIONA,
  PAGE_INCLUSIONE_LAB_IMPACT,
  PAGE_COME_FUNZIONA_APPRENDIMENTO_LINGUA,
  PAGE_INCLUSIONE_CORSO_ITALIANO,
  PAGE_RICONGIUNGIMENTO_PARENTE,
  PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA,
  PAGE_INCLUSIONE_CONOSCERE_INTEGRARSI,
  PAGE_CONTENUTO_SLIDER_0_18,
  PAGE_CONSULENZA_SOCIALE_GIURIDICA,
  PAGE_ORIENTAMENTO_SCOLASTICO_COME_FUNZIONA,
  PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_EXTRASCOLASTICO,
  PAGE_CONSULENZA_HO_BISOGNO_DI_CONSULENZA,
  PAGE_INCLUSIONE_MILANO_L2,
  PAGE_INCLUSIONE_GUIDA_MILANO,
  PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_SERVIZIO,
  PAGE_HOME_018,
  PAGE_DOMICILIARITA,
  PAGE_CONTENT_SERVICE_LIST,
  PAGE_CONTENT_SECTION_NEW,
  PAGE_CONTENT_SLIDER_NEW,
  PAGE_CONTENT_SECTION_LIST,
  PAGE_CONTENT_SECTION_EDIT,
  PAGE_GESTIONE_VOUCHER,
  PAGE_LISTA_TRANSAZIONI_VOUCHER,
  PAGE_LISTA_TRANSAZIONI,
  PAGE_DETTAGLIO_TRANSAZIONE,
  PAGE_ELENCO_VOUCHER,
  PAGE_CONTENT_SLIDER_EDIT,
  PAGE_CONTENT_AREA_LIST,
  PAGE_CONTENT_AREA_EDIT,
  PAGE_CONTENT_AREA_NEW,
  PAGE_EDUCAZIONE_FINANZIARIA_DEBITI,
  PAGE_EDUCAZIONE_FINANZIARIA_PENSIONE,
  PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST,
  PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_EDIT,
  PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_NEW,
  PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING,
  PAGE_EDUCAZIONE_FINANZIARIA,
  PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE,
  PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO,
  PAGE_CONTENT_SERVICE_EDIT,
  PAGE_CONTENT_SERVICE_NEW,

} from 'types/url';
import { Switch, Route } from 'react-router-dom';
import { NotFoundRoute } from 'components/router';
import Page from 'components/ui/Page';
import HomePage from 'components/pages/Home';
import ServiceCartPage from 'components/pages/ENTCAR/ENTCAR001_CarrelloServizi';
// import RequestServicePage from 'components/pages/ENTIRI/ENTIRI002_RichiestaServizio';
import RequestsIndexPage from 'components/pages/ENTIRI/ENTIRI003_IndiceRichieste';
import EntChatPage from 'components/pages/ENTIRI/ENTIRI004_ConversazioneEnte';
import EntCGH from 'components/pages/ENTGCH/ENTGCH002_ChatEnte';
import HandleOrderPage from 'components/pages/ENTIRI/ENTIRI005_GestioneOrdine';
import NotFoundPage from 'components/pages/NotFound';
import AreaPersonale from 'components/pages/AreaPersonale';
import FunzionalitaRicerca from 'components/pages/FunzionalitaRicerca';
import GestioneEnte from 'components/pages/ENT_GDI';
import DatiEnte from 'components/pages/DatiEnte';
import DatiEnteAdmin from 'components/pages/DatiEnte/indexadmin';
import ServiziAccreditati from 'components/pages/EntGDI_serviziACC';
import ServiziAccreditatiAdmin from 'components/pages/EntGDI_serviziACC/indexadmin';
import EnteGoi004 from 'components/pages/ENT_GOI004';
import EnteGoi004Admin from 'components/pages/ENT_GOI004/indexadmin';
import Feedback from 'components/pages/EntIfe';
import LavoratoreFeedbackCittadino from 'components/pages/LavoratoreFeedback';
import LavoratoreFeedbackCittadinoOld from 'components/pages/LavoratoreFeedback/indexOldFeedback';
import LavoratoreFeedbackAdmin from 'components/pages/LavoratoreFeedbackAdmin';
import LavoratoreFeedbackAdminOld from 'components/pages/LavoratoreFeedbackAdmin/indexOldFeedback';
import LavoratoreFeedback from 'components/pages/LavoratoreFeedbackLavoratore';
import RecensioneTCB from 'components/pages/RecensioneTCB';
import SchedaEntePage from 'components/pages/ENTSSE/ENTSSE001_SchedaEnte';
import InstitutionCardPage from 'components/pages/SchedaEntePage';
import InstitutionCardPageAdmin from 'components/pages/SchedaEntePage/indexAdmin';
import SchedaOp from 'components/pages/EntGoiGomSchedaOp';
import ServizioEntePage from 'components/pages/ENTSSR/ENTSSR001_ServizioEnte';
import EntEVR from 'components/navigation/ENT_EVR';
import MenuTCB from 'components/pages/TCB/TCBMEN001_MenuTCB';
import TCBMEN002 from 'components/pages/TCB/TCBMEN002_Cittadino';
import TCBMEN003 from 'components/pages/TCB/TCBMEN003_Lavoratore';
import ConfigurazioneRichiestaTCBPage from 'components/pages/TCB/TCBIRI002_ConfigurazioneRichiesta';
import TCBRequestSummary from 'components/pages/TCB/TCBIRI002_ConfigurazioneRichiesta/riepilogo';
import HomeAgentPage from 'components/pages/AdminCnt1';
import AgentListPage from 'components/pages/AdminCnt2';
import AgentCUDPage from 'components/pages/AdminCnt3';
import TCB_IDO from 'components/pages/TCB/TCB_IDO';
import TCB_IOO from 'components/pages/TCB/TCB_IOO';
import WeMiStoricoOpportunita from 'components/pages/TCB/TCB_ADMIN_ECA_002';
import WeMiStoricoOpportunitaAdmin from 'components/pages/TCB/TCB_ADMIN_ECA_002/indexadmin';
import EntHandleRequestsPage from 'components/pages/ENTERI/ENTERI001_GestioneRichiesteEnte';
import EntHandleRequestsPageFeedback from 'components/pages/ENTERI/ENTERI001_GestioneRichiesteEnte/indexFeedback';
import WeMiHandleRequestsPage from 'components/pages/ENTERI/ENTERI002_GestioneRichiesteOperatore';
import FormAccettazione from 'components/pages/ENTERI/ENTERI001_GestioneRichiesteEnte/FormAccettazione';
import FormRifiuto from 'components/pages/ENTERI/ENTERI001_GestioneRichiesteEnte/FormRifiuto';
import RichiestaServizioTCBPage from 'components/pages/TCB/TCBIRI001_AcquistoServizioTCB';
import EntRecensionePage from 'components/pages/ENTEGF/ENTEGF_003';
import EntRecensionePageFromGestioneFeedback from 'components/pages/ENTEGF/ENTEGF_003/ENTEGF_003_FROM_GESTIONE_FEEDBACK';
import AdminRecensionePage from 'components/pages/ENTEGF/ENTEGF_003';
import PaginaInformativa from 'components/pages/PaginaInformativa';
import HomePageInclusione from 'components/pages/HomeInclusione';
import SpaziWemi from 'components/pages/SpaziWemi';
import DatiChiusura from 'components/pages/DatiChiusura';
import SimulatoreCostoTCBPage from 'components/pages/TCB/TCB_SIM';
import StampaHTMLPage from 'components/pages/TCB/TCB_SIM/StampaHTML';
import BackofficeTcbRichiestePage from 'components/navigation/BackofficeTcbRichieste';
import BackofficeTcbCandidatureLavoratoriPage from 'components/navigation/BackofficeTcbCandidatureLavoratori/index';
import LoginPage from 'components/pages/LoginAmministratore';
import DisponibilitaLavoratoreTcbPage from 'components/navigation/DisponibilitaLavoratore/index';
import MatchingDomandaLavoratore from 'components/pages/MatchingDomandaLavoratore';
import ModificaCandidaturaAdmin from 'components/pages/TCB/ModificaCandidatura/ModificaCandidaturaAdmin';
import ModificaDomandaAdmin from 'components/pages/TCB/modificaDomandaTCB/ModificaDomandaAdmin';
import ModificaCandidaturaLavoratore from 'components/pages/TCB/ModificaCandidatura/ModificaCandidaturaLavoratore';
import FinalizzaCandidatura from 'components/pages/TCB/FinalizzaCandidatura';
import AreaPersonaleLavoratore from 'components/pages/AreaPersonale/AreaPersonaleLavoratore';
import SearchServices from 'components/pages/SearchServices';
import { HomeSpaziWeMiPage } from 'components/pages/HomeSpaziWeMi';
import { checkLoginHoc } from 'hoc/checklogin';
import RecensioneWeMiTCBAdmin from 'components/pages/RecensioneTCB/indexAdmin';
import BackofficeTcbAssociaLavoratoriRichiestaPage from 'components/navigation/BackofficeTcbAssociaLavoratoriRichiesta/index';
import RequestServiceFlow from 'components/pages/ENTIRI/RequestServiceFlow';
import GestioneUtenze from 'components/pages/GestioneUtenze';
import ModificaUtenza from 'components/pages/ModificaUtenza';
import RicongiungimentoParentePage from 'components/pages/RicongiungimentoParentePage';
import RicongiungimentoFamiliarePage from 'components/pages/RicongiungimentoFamiliarePage';
import LabImpact from 'components/pages/LabImpact';
import ConoscereIntegrarsi from 'components/pages/ConoscereIntegrarsi';
import CorsoItaliano from 'components/pages/CorsoItaliano';
import VoglioSaperneDiPiuExtrascolatico from 'components/pages/VoglioSaperneDiPiuExtrascolatico';
import VoglioSaperneDiPiuSulServizio from 'components/pages/VoglioSaperneDiPiuSulServizio';
import withAuthorization from 'hoc/withAuthorization';
import RicongiungimentoComeFunziona from 'components/pages/RicongiungimentoComeFunziona';
import OrientamentoScolasticoEdExtraPage from 'components/pages/OrientamentoScolasticoEdExtraPage';
import ApprendimentoLinguaItalianaPage from 'components/pages/ApprendimentoLinguaItalianaPage';
import InfoApprendimentoLinguaItalianaPage from 'components/pages/InfoApprendimentoLinguaPage';
import ConsulenzaSocialeGiuridicaPage from 'components/pages/ConsulenzaSocialeGiuridicaPage';
import ComeFunzionaOrientamentoScolastico from 'components/pages/ComeFunzionaOrientamentoScolasticoPage';
import ComeFunzionaConsulenzaPage from 'components/pages/ComeFunzionaConsulenzaPage';
import MilanoL2Page from 'components/pages/MilanoL2Page';
import GuidaNuoviArrivatiPage from 'components/pages/GuidaNuoviArrivatiPage';
import BudgetingEducazioneFinanziaria from 'components/pages/BudgetingEducazioneFinanziaria';
import ContentListSectionPage from 'components/pages/ListaSezioneContenuti';
import ContentListAreaPage from 'components/pages/ListaAreaContenuti';
import { UNDER_AUTHORIZATIONS_LIST } from 'types/authorizations/underAuthorizationsList';
import { HomePage018 } from 'components/pages/Home018';
import NewSectionPage from 'components/pages/NuovaSezioneContenuti';
import NewSlider018Page from 'components/pages/NuovoSlider018Contenuti';
import EditSectionPage from 'components/pages/ModificaSezioneContenuti';
import GestioneVoucher from 'components/pages/GestioneVoucher';
import EditSlider018Page from 'components/pages/ModificaSlider018Contenuti';
import ContentListSlider018Page from 'components/pages/ListaSlider018Contenuti';
import ContentListServicePage from 'components/pages/ListaServiziContenuti';
import EditServicePageComponent from 'components/pages/ModificaServizioContenuti';
import NewServicePageComponent from 'components/pages/NuovoServizioContenuti';
import NewAreaPage from 'components/pages/NuovaAreaContenuti';
import EditAreaPage from 'components/pages/ModificaAreaContenuti';
import DomiciliaritaPageComponent from 'components/pages/HomeDomiciliarita';
import DebitiEducazioneFinanziariaPage from 'components/pages/DebitiEducazioneFinanziaria';
import PensioneEducazioneFinanziariaPage from 'components/pages/PensioneEducazioneFinanziaria';
import ContentListSliderEdFinanziariaPage from 'components/pages/ListaSliderEdFinanziariaContenuti';
import EditSliderPageComponent from 'components/pages/ModificaSliderEdFinanziariaContenuti';
import NewSliderPageComponent from 'components/pages/NuovoSliderEdFinanziaria';
import HomePageEducazioneFinanziaria from 'components/pages/EducazioneFinanziaria';
import ProtezioneEducazioneFinanziaria from 'components/pages/ProtezioneEducazioneFinanziaria';
import InvestimentoEducazioneFinanziaria from 'components/pages/InvestimentoEducazioneFinanziaria';
import DettaglioTransazioniVoucher from 'components/pages/DettaglioTransazioniVoucher';
import GestioneTransazioni from 'components/pages/GestioneTransazioni';
import DettaglioTransazionePage from 'components/pages/DettaglioTransazione';
import ElencoVoucher from 'components/pages/ElencoVoucher';


/**
 * The set of app routes.
 */
export const AppRoutes = () => (
  <Page>
    <Switch>
      <Route exact path={PAGE_AREAPERSONALELAVORATORE_URL} component={props => <AreaPersonaleLavoratore {...props} />} />
      <Route exact path={PAGE_LOGIN_ADMIN} component={props => <LoginPage {...props} />} />
      <Route exact path={PAGE_HOME_URL} render={props => <HomePage {...props} />} />
      <Route exact path={PAGE_HOMEPREVIEW_URL} component={props => <HomePage {...props} />} />
      <Route
        exact
        path={PAGE_REQUESTSINDEX_URL}
        component={checkLoginHoc(RequestsIndexPage)}
      />
      <Route
        exact
        path={PAGE_RECENSIONE_URL}
        component={checkLoginHoc(EntRecensionePage)}
      />
      <Route
        exact
        path={PAGE_RECENSIONE_FROM_GESTIONE_FEEDBACK_URL}
        component={checkLoginHoc(EntRecensionePageFromGestioneFeedback)}
      />
      <Route
        exact
        path={PAGE_HOME_INCLUSIONE}
        component={HomePageInclusione}
      />
      <Route
        exact
        path={PAGE_RECENSIONE_ADMIN_URL}
        component={checkLoginHoc(withAuthorization(AdminRecensionePage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_REQUEST_SERVICES, true), true)}
      />
      <Route
        path={PAGE_ORDER_URL}
        component={HandleOrderPage}
      />
      <Route
        exact
        path={PAGE_CART_URL}
        component={props => <ServiceCartPage {...props} />}
      />
      <Route
        path={PAGE_TCB_ADMIN_ERI_001}
        component={checkLoginHoc(withAuthorization(BackofficeTcbRichiestePage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_QUESTION_MANAGEMENT, true), true)}
      />
      <Route
        path={PAGE_TCB_ADMIN_ERI_002}
        component={checkLoginHoc(withAuthorization(BackofficeTcbAssociaLavoratoriRichiestaPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_QUESTION_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_TCB_ADMIN_ECA_001}
        component={checkLoginHoc(withAuthorization(BackofficeTcbCandidatureLavoratoriPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_NOT_FOUND_URL}
        component={props => <NotFoundPage {...props} />}
      />
      <Route
        exact
        path={PAGE_AREAPERSONALE_URL}
        component={props => <AreaPersonale {...props} />}
      />
      <Route
        exact
        path={PAGE_FUNZIONALITADIRICERCA_URL}
        component={props => <FunzionalitaRicerca {...props} />}
      />
      <Route
        path={PAGE_ENTI_SERVICE_FLOW}
        component={RequestServiceFlow}
      />
      <Route
        exact
        path={PAGE_GESTIONEENTE_URL}
        component={checkLoginHoc(withAuthorization(GestioneEnte, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_ENTE_GOI_004_URL}
        component={checkLoginHoc(EnteGoi004)}
      />
      <Route
        exact
        path={PAGE_ADMIN_ENTE_GOI_004_URL}
        component={checkLoginHoc(withAuthorization(EnteGoi004Admin, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_ENTERI001_URL}
        component={checkLoginHoc(EntHandleRequestsPage)}
      />
      <Route
        exact
        path={PAGE_ENTERI001FEEDBACKS_URL}
        component={checkLoginHoc(EntHandleRequestsPageFeedback)}
      />
      <Route
        exact
        path={PAGE_ENTERI001ORDERS_URL}
        component={checkLoginHoc(EntHandleRequestsPage)}
      />
      <Route
        exact
        path={PAGE_ENTERI002_URL}
        component={checkLoginHoc(withAuthorization(WeMiHandleRequestsPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_REQUEST_SERVICES, true), true)}
      />
      <Route
        exact
        path={PAGE_MODALEACCETTAZIONEENTERI001_URL}
        component={checkLoginHoc(FormAccettazione)}
      />
      <Route
        exact
        path={PAGE_MODALERIFIUTOENTERI001_URL}
        component={checkLoginHoc(FormRifiuto)}
      />
      <Route
        exact
        path={PAGE_DATIENTE_URL}
        component={checkLoginHoc(withAuthorization(DatiEnte, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT, true))}
      />
      <Route
        exact
        path={PAGE_ADMIN_DATIENTE_URL}
        component={checkLoginHoc(DatiEnteAdmin, true)}
      />
      <Route
        exact
        path={PAGE_ENTE_GOI_005_URL}
        component={checkLoginHoc(ServiziAccreditati)}
      />
      <Route
        exact
        path={PAGE_ADMIN_ENTE_GOI_005_URL}
        component={checkLoginHoc(withAuthorization(ServiziAccreditatiAdmin, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_VISUALIZZA_ENTE_GOI_005_URL}
        component={checkLoginHoc(() => <ServiziAccreditati ReadOnly />, false)}
      />
      <Route
        exact
        path={PAGE_ADMIN_VISUALIZZA_ENTE_GOI_005_URL}
        component={checkLoginHoc(withAuthorization(() => <ServiziAccreditatiAdmin ReadOnly />, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_SCHEDAENTE_URL}
        component={checkLoginHoc(InstitutionCardPage)}
      />
      <Route
        exact
        path={PAGE_ADMIN_SCHEDAENTE_URL}
        component={checkLoginHoc(withAuthorization(InstitutionCardPageAdmin, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_SCHEDAOP_URL}
        component={props => <SchedaOp {...props} />}
      />
      <Route
        exact
        path={PAGE_FEEDBACK_URL}
        component={checkLoginHoc(Feedback)}
      />
      <Route
        exact
        path={PAGE_FEEDBACK_LAVORATORE_URL}
        component={checkLoginHoc(LavoratoreFeedbackCittadino)}
      />
      <Route
        exact
        path={PAGE_FEEDBACK_LAVORATORE_ADMIN_URL}
        component={checkLoginHoc(withAuthorization(LavoratoreFeedbackAdmin, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_FEEDBACK_LAVORATORE_LAVORATORE_URL}
        component={checkLoginHoc(LavoratoreFeedback)}
      />
      <Route
        exact
        path={PAGE_FEEDBACK_OLD_LAVORATORE_ADMIN_URL}
        component={checkLoginHoc(withAuthorization(LavoratoreFeedbackAdminOld, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_FEEDBACK_OLD_LAVORATORE_CITTADINO_URL}
        component={checkLoginHoc(LavoratoreFeedbackCittadinoOld)}
      />
      <Route
        exact
        path={PAGE_FEEDBACK_TCB_URL}
        component={checkLoginHoc(RecensioneTCB)}
      />
      <Route
        exact
        path={PAGE_ADMIN_FEEDBACK_TCB_URL}
        component={checkLoginHoc(withAuthorization(RecensioneWeMiTCBAdmin, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_ENTSSE_URL}
        component={props => <SchedaEntePage {...props} />}
      />
      <Route
        exact
        path={PAGE_ENTSSESCHEDA_URL}
        component={props => <ServizioEntePage {...props} />}
      />
      <Route
        exact
        path={PAGE_ENTSSEHANDLEREQUEST_URL}
        component={props => <ServizioEntePage {...props} />}
      />
      <Route
        exact
        path={PAGE_ENTSSEREQUEST_URL}
        component={props => <ServizioEntePage {...props} />}
      />
      <Route
        exact
        path={PAGE_ENTSERVICE_URL}
        component={props => <ServizioEntePage {...props} />}
      />
      <Route
        exact
        path={PAGE_SEARCHENTSERVICE_URL}
        component={props => <ServizioEntePage {...props} />}
      />
      <Route
        exact
        path={PAGE_ENTEVR_URL}
        component={props => <EntEVR {...props} />}
      />
      <Route
        exact
        path={PAGE_MENUTCB_URL}
        component={props => <MenuTCB {...props} />}
      />
      <Route
        exact
        path={PAGE_TCBMEN002_URL}
        component={props => <TCBMEN002 {...props} />}
      />
      <Route
        exact
        path={PAGE_TCBMEN003_URL}
        component={props => <TCBMEN003 {...props} />}
      />
      <Route
        exact
        path={PAGE_CANDIDATURA_LAVORATORE_TCB_URL}
        component={checkLoginHoc(ModificaCandidaturaLavoratore)}
      />
      <Route
        exact
        path={PAGE_MODIFICA_CANDIDATURA_TCB_ADMIN_URL}
        component={checkLoginHoc(withAuthorization(ModificaCandidaturaAdmin, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CANDIDATURA_IMPERSONIFICAZIONE_TCB_ADMIN_URL}
        component={checkLoginHoc(withAuthorization(ModificaCandidaturaAdmin, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_MODIFICA_DOMANDA_TCB_ADMIN_URL}
        component={checkLoginHoc(withAuthorization(ModificaDomandaAdmin, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_QUESTION_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_FINALIZZA_CANDIDATURA_TCB_ADMIN_URL}
        component={checkLoginHoc(withAuthorization(FinalizzaCandidatura, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_TCBIRI001_URL}
        component={props => <RichiestaServizioTCBPage {...props} />}
      />
      <Route
        exact
        path={PAGE_TCBIRI002_URL}
        component={props => <ConfigurazioneRichiestaTCBPage {...props} />}
      />
      <Route
        exact
        path={PAGE_TCBIRI002MODIFICA_URL}
        component={checkLoginHoc(ConfigurazioneRichiestaTCBPage)}
      />
      <Route
        exact
        path={PAGE_TCBIRISUMMARY_URL}
        component={props => <TCBRequestSummary {...props} />}
      />
      <Route
        exact
        path={PAGE_TCB_SIM_URL}
        component={props => <SimulatoreCostoTCBPage {...props} />}
      />
      <Route
        exact
        path={PAGE_TCB_SIM_PRINT_URL}
        component={props => <StampaHTMLPage {...props} />}
      />
      <Route
        exact
        path={PAGE_CHAT_URL}
        component={props => {
          const datiLogin =
            sessionStorage.getItem('DatiLogin') &&
              sessionStorage.getItem('DatiLogin') !== 'null'
              ? sessionStorage.getItem('DatiLogin')
              : undefined;
          if (datiLogin && JSON.parse(datiLogin).profilo == 'E') return <EntCGH {...props} />;
          if (datiLogin && JSON.parse(datiLogin).profilo == 'C') return <EntChatPage {...props} />;
        }}
      />
      <Route
        exact
        path={PAGE_CHATADMIN_URL}
        component={props => <EntChatPage {...props} />}
      />
      <Route
        exact
        path={PAGE_CONTENT_SECTION_LIST}
        component={checkLoginHoc(withAuthorization(ContentListSectionPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SECTION_NEW}
        component={checkLoginHoc(withAuthorization(NewSectionPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SERVICE_LIST}
        component={checkLoginHoc(withAuthorization(ContentListServicePage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SERVICE_EDIT}
        component={checkLoginHoc(withAuthorization(EditServicePageComponent, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SERVICE_NEW}
        component={checkLoginHoc(withAuthorization(NewServicePageComponent, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SLIDER_NEW}
        component={checkLoginHoc(withAuthorization(NewSlider018Page, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SECTION_EDIT}
        component={checkLoginHoc(withAuthorization(EditSectionPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SLIDER_EDIT}
        component={checkLoginHoc(withAuthorization(EditSlider018Page, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_AREA_LIST}
        component={checkLoginHoc(withAuthorization(ContentListAreaPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_AREA_NEW}
        component={checkLoginHoc(withAuthorization(NewAreaPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_AREA_EDIT}
        component={checkLoginHoc(withAuthorization(EditAreaPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST}
        component={checkLoginHoc(withAuthorization(ContentListSliderEdFinanziariaPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_EDIT}
        component={checkLoginHoc(withAuthorization(EditSliderPageComponent, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_NEW}
        component={checkLoginHoc(withAuthorization(NewSliderPageComponent, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_ADMIN_CNT_01_URL}
        component={checkLoginHoc(withAuthorization(HomeAgentPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_CONTENUTO_SLIDER_0_18}
        component={checkLoginHoc(withAuthorization(ContentListSlider018Page, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_ADMIN_CNT_02_URL}
        component={checkLoginHoc(withAuthorization(AgentListPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_ADMIN_CNT_03_URL}
        component={checkLoginHoc(withAuthorization(AgentCUDPage, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_PAGINA_INFORMATIVA_URL}
        component={props => <PaginaInformativa {...props} />}
      />
      <Route
        exact
        path={PAGE_SPAZIWEMI_URL}
        component={props => <SpaziWemi {...props} />}
      />
      <Route
        exact
        path={PAGE_DATICHIUSURA_URL}
        component={props => <DatiChiusura {...props} />}
      />
      <Route
        exact
        path={PAGE_TCB_ECA_002_URL}
        component={checkLoginHoc(WeMiStoricoOpportunita)}
      />
      <Route
        exact
        path={PAGE_TCB_ADMIN_ECA_002_URL}
        component={checkLoginHoc(withAuthorization(WeMiStoricoOpportunitaAdmin, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_TCB_IDO_URL}
        component={checkLoginHoc(withAuthorization(TCB_IDO, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_QUESTION_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_TCB_IOO_URL}
        component={checkLoginHoc(withAuthorization(TCB_IOO, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_TCB_DISPONIBILITA_LAVORATORE}
        component={checkLoginHoc(DisponibilitaLavoratoreTcbPage)}
      />
      <Route
        exact
        path={PAGE_MATCHING_DOMANDA_LAVORATORE_URL}
        component={checkLoginHoc(withAuthorization(MatchingDomandaLavoratore, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_QUESTION_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_QUERY_SERVICES}
        component={props => <SearchServices {...props} />}
      />
      <Route
        exact
        path={PAGE_HOME_SPAZIWEMI_URL}
        component={props => <HomeSpaziWeMiPage {...props} />}
      />
      <Route
        exact
        path={PAGE_GESTIONE_UTENZE}
        component={checkLoginHoc(withAuthorization(GestioneUtenze, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_USER_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_DOMICILIARITA}
        component={DomiciliaritaPageComponent}
      />
      <Route
        exact
        path={PAGE_MODIFICA_UTENZA}
        component={checkLoginHoc(withAuthorization(ModificaUtenza, UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_USER_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_COME_FUNZIONA_APPRENDIMENTO_LINGUA}
        component={InfoApprendimentoLinguaItalianaPage}
      />
      <Route
        exact
        path={PAGE_RICONGIUNGIMENTO_COME_FUNZIONA}
        component={RicongiungimentoComeFunziona}
      />
      <Route
        exact
        path={PAGE_INCLUSIONE_RICONGIUNGIMENTO}
        component={RicongiungimentoFamiliarePage}
      />
      <Route
        exact
        path={PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA}
        component={OrientamentoScolasticoEdExtraPage}
      />
      <Route
        exact
        path={PAGE_INCLUSIONE_APPRENDIMENTO_ITALIANO}
        component={ApprendimentoLinguaItalianaPage}
      />
      <Route
        exact
        path={PAGE_RICONGIUNGIMENTO_PARENTE}
        component={RicongiungimentoParentePage}
      />
      <Route
        exact
        path={PAGE_INCLUSIONE_LAB_IMPACT}
        component={LabImpact}
      />
      <Route
        exact
        path={PAGE_INCLUSIONE_CONOSCERE_INTEGRARSI}
        component={ConoscereIntegrarsi}
      />
      <Route
        exact
        path={PAGE_INCLUSIONE_CORSO_ITALIANO}
        component={CorsoItaliano}
      />
      <Route
        exact
        path={PAGE_ORIENTAMENTO_SCOLASTICO_COME_FUNZIONA}
        component={ComeFunzionaOrientamentoScolastico}
      />
      <Route
        exact
        path={PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_EXTRASCOLASTICO}
        component={VoglioSaperneDiPiuExtrascolatico}
      />
      <Route
        exact
        path={PAGE_CONSULENZA_HO_BISOGNO_DI_CONSULENZA}
        component={ComeFunzionaConsulenzaPage}
      />
      <Route
        exaxt
        path={PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_SERVIZIO}
        component={VoglioSaperneDiPiuSulServizio}
      />
      <Route
        exact
        path={PAGE_CONSULENZA_SOCIALE_GIURIDICA}
        component={ConsulenzaSocialeGiuridicaPage}
      />
      <Route
        exact
        path={PAGE_INCLUSIONE_MILANO_L2}
        component={MilanoL2Page}
      />
      <Route
        exact
        path={PAGE_INCLUSIONE_GUIDA_MILANO}
        component={GuidaNuoviArrivatiPage}
      />
      <Route
        exact
        path={PAGE_GESTIONE_VOUCHER}
        component={checkLoginHoc(withAuthorization(GestioneVoucher, UNDER_AUTHORIZATIONS_LIST.VOUCHER_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_LISTA_TRANSAZIONI_VOUCHER}
        component={checkLoginHoc(withAuthorization(DettaglioTransazioniVoucher, UNDER_AUTHORIZATIONS_LIST.VOUCHER_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_LISTA_TRANSAZIONI}
        component={checkLoginHoc(withAuthorization(GestioneTransazioni, UNDER_AUTHORIZATIONS_LIST.VOUCHER_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_DETTAGLIO_TRANSAZIONE}
        component={checkLoginHoc(withAuthorization(DettaglioTransazionePage, UNDER_AUTHORIZATIONS_LIST.VOUCHER_MANAGEMENT, true), true)}
      />
      <Route
        exact
        path={PAGE_ELENCO_VOUCHER}
        component={ElencoVoucher}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA}
        component={HomePageEducazioneFinanziaria}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_DEBITI}
        component={DebitiEducazioneFinanziariaPage}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_PENSIONE}
        component={PensioneEducazioneFinanziariaPage}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING}
        component={BudgetingEducazioneFinanziaria}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO}
        component={InvestimentoEducazioneFinanziaria}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE}
        component={ProtezioneEducazioneFinanziaria}
      />
      <Route
        exact
        path={PAGE_HOME_018}
        component={props => <HomePage018 {...props} />}
      />
      <Route
       exact
        path={PAGE_EDUCAZIONE_FINANZIARIA}
        component={HomePageEducazioneFinanziaria}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_DEBITI}
        component={DebitiEducazioneFinanziariaPage}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_PENSIONE}
        component={PensioneEducazioneFinanziariaPage}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING}
        component={BudgetingEducazioneFinanziaria}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO}
        component={InvestimentoEducazioneFinanziaria}
      />
      <Route
        exact
        path={PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE}
        component={ProtezioneEducazioneFinanziaria}
      />
      <NotFoundRoute />
    </Switch>
  </Page>
);

AppRoutes.displayName = 'AppRoutes';
