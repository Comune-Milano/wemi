/** @format */
import { DEFAULT_LOCALE } from 'i18n';
import { __BASE_URL__ } from 'utils/environment/variables';

export const PUBLIC_URL = __BASE_URL__;

export const PAGE_HOME_URL = '/';
export const PAGE_LOGIN_ADMIN = '/AutenticazioneAmministratore';
export const PAGE_HOMEPREVIEW_URL = '/admin/preview=:tyCnt';
export const PAGE_FORWARD_URL = '/r/invia';
export const PAGE_REQUESTSINDEX_URL = '/r/idRequestsIndex';
export const PAGE_CART_URL = '/r/idRequestsIndex/cart';
export const PAGE_ORDER_URL = '/r/idRequestsIndex/:idRichiestaServizio/Order';
export const PAGE_ORDERBILLING_URL = `${PAGE_ORDER_URL}/billing`;
export const PAGE_ORDERSUMMARY_URL = `${PAGE_ORDER_URL}/orderSummary`;
export const PAGE_CHAT_URL = '/chat/:idRichiestaEnte';
export const PAGE_AREAPERSONALECITTADINO_URL = '/AreaPersonaleCittadino';
export const PAGE_AREAPERSONALE_URL = '/AreaPersonale';
export const PAGE_AREAPERSONALELAVORATORE_URL = '/AreaPersonaleLavoratore';
export const PAGE_AREAPERSONALEAMMINISTRATORE_URL = '/AreaPersonaleAmministratore';
export const PAGE_FUNZIONALITADIRICERCA_URL = '/FunzionalitaDiRicerca';
export const PAGE_GESTIONEENTE_URL = '/gestioneEnti';
export const PAGE_SCHEDAENTE_URL = '/gestioneEnte/SchedaEnte';
export const PAGE_ADMIN_SCHEDAENTE_URL = '/admin/gestioneEnte/:idEnte/SchedaEnte';
export const PAGE_SCHEDAOP_URL = '/SchedaOp';
export const PAGE_DATIENTE_URL = '/gestioneEnte/:idEnte/SchedaServiziEnte/DatiEnte';
export const PAGE_ADMIN_DATIENTE_URL = '/admin/gestioneEnte/:idEnte/SchedaServiziEnte/DatiEnte';
export const PAGE_ENTE_GOI_005_URL = '/gestioneEnte/:idEnte/SchedaServiziEnte/:idServizio/ServizioAccreditato';
export const PAGE_ADMIN_ENTE_GOI_005_URL = '/admin/gestioneEnte/:idEnte/SchedaServiziEnte/:idServizio/ServizioAccreditato';
export const PAGE_VISUALIZZA_ENTE_GOI_005_URL = '/gestioneEnte/:idEnte/SchedaServiziEnte/:idServizio/ServizioAccreditato/visualizza';
export const PAGE_ADMIN_VISUALIZZA_ENTE_GOI_005_URL = '/admin/gestioneEnte/:idEnte/SchedaServiziEnte/:idServizio/ServizioAccreditato/visualizza';
export const PAGE_ENTE_GOI_004_URL = '/gestioneEnte/:idEnte/SchedaServiziEnte';
export const PAGE_ADMIN_ENTE_GOI_004_URL = '/admin/gestioneEnte/:idEnte/SchedaServiziEnte';
export const PAGE_FEEDBACK_URL = '/Feedback/:idRichiesta';
export const PAGE_FEEDBACK_LAVORATORE_URL = '/feedbackLavoratoreCitt/:idRichiesta';
export const PAGE_FEEDBACK_LAVORATORE_ADMIN_URL = '/feedbackLavoratoreAdmin/:idRichiesta';
export const PAGE_FEEDBACK_OLD_LAVORATORE_ADMIN_URL = '/feedbackLavoratoreAdmin/:idRichiesta/:pgRichServRec';
export const PAGE_FEEDBACK_OLD_LAVORATORE_CITTADINO_URL = '/feedbackLavoratoreCitt/:idRichiesta/:pgRichServRec';
export const PAGE_FEEDBACK_LAVORATORE_LAVORATORE_URL = '/feedbackLavoratore/:idRichiesta';
export const PAGE_FEEDBACK_TCB_URL = '/FeedbackTCB/:idRichiesta';
export const PAGE_ADMIN_FEEDBACK_TCB_URL = '/admin/FeedbackTCB/:idRichiesta';
export const PAGE_ENTSSE_URL = '/c/:idCategory/r/:idServiceSearch/ente/:idEnte';
export const PAGE_ENTSSEHANDLEREQUEST_URL = '/e/:idEnte/handleRequests/:idRichiesta/:AccettazioneORifiuto/s/:idServizio/:idEnte';
export const PAGE_ENTSSEREQUEST_URL = '/r/idRequestsIndex/s/:idServizio/:idEnte';
export const PAGE_ENTSSESCHEDA_URL = '/c/:idCategory/r/:idServiceSearch/ente/:idEnte/s/:idServizioErogato';
export const PAGE_ENTSERVICE_URL = '/s/:idServizio/:idEnte';
export const PAGE_SEARCHENTSERVICE_URL = '/c/:idCategory/r/:idServiceSearch/scheda/:idServizioErogato';
export const PAGE_ENTEVR_URL = '/EntEVR';
export const PAGE_MENUTCB_URL = '/MenuTCB';
export const PAGE_CANDIDATURA_LAVORATORE_TCB_URL = '/MenuTCB/candidaturaLavoratoreTCB';
export const PAGE_MODIFICA_CANDIDATURA_TCB_ADMIN_URL = '/admin/ModificaCandidaturaLavoratore/:idLavoratore';
export const PAGE_CANDIDATURA_IMPERSONIFICAZIONE_TCB_ADMIN_URL = '/admin/CandidaturaLavoratore/Impersonificazione/:idLavoratore';
export const PAGE_MODIFICA_DOMANDA_TCB_ADMIN_URL = '/admin/ModificaDomandaTCB/:idDomandaTCB/:idServizioTCB';
export const PAGE_FINALIZZA_CANDIDATURA_TCB_ADMIN_URL = '/admin/finalizzaCandidaturaLavoratoreTCB/:idLavoratore';
export const PAGE_MODIFICA_CANDIDATURA_LAVORATORE_TCB_URL = '/MenuTCB/candidaturaLavoratoreTCB';
export const PAGE_TCBMEN002_URL = '/MenuTCB/cittadino';
export const PAGE_TCBMEN003_URL = '/MenuTCB/lavoratore';
export const PAGE_TCB_ECA_002_URL = '/r/StoricoLavoratore/:idLavoratore';
export const PAGE_TCB_ADMIN_ECA_002_URL = '/admin/r/StoricoLavoratore/:idLavoratore';
export const PAGE_TCB_IDO_URL = '/r/InserimentoDomandaCittadino';
export const PAGE_TCB_IOO_URL = '/r/InserimentoCandidatura';
export const PAGE_TCBIRI001_URL = '/RichiestaServizioTCB/:tcb';
export const PAGE_TCBIRI002_URL = '/ConfigurazioneRichiestaTCB/:tcb';
export const PAGE_TCBIRI002MODIFICA_URL = '/ConfigurazioneRichiestaTCB/:tcb/:idRichiesta';
export const PAGE_TCBIRISUMMARY_URL = '/ConfigurazioneRichiestaTCB/:tcb/Riepilogo';
export const PAGE_ADMIN_CNT_01_URL = '/admin/:idOp/cnt';
export const PAGE_ADMIN_CNT_02_URL = '/admin/:idOp/cnt/:tyCnt';
export const PAGE_ADMIN_CNT_03_URL = '/admin/:idOp/cnt/:tyCnt/crud/:idCnt';
export const PAGE_CHATADMIN_URL = '/admin/chat/:idRichiestaEnte';
export const PAGE_ENTERI001_URL = '/e/:idEnte/handleRequests';
export const PAGE_ENTERI001FEEDBACKS_URL = '/e/:idEnte/handleFeedbacks';
export const PAGE_ENTERI001ORDERS_URL = '/e/:idEnte/handleOrders';
export const PAGE_ENTERI002_URL = '/admin/:idOperatore/handleRequests';
export const PAGE_TCB_ADMIN_ERI_001 = '/admin/:idOperatore/richiesteTcb';
export const PAGE_TCB_ADMIN_ERI_002 = '/admin/associaDomandaOfferta/:idRichiesta';
export const PAGE_TCB_ADMIN_ECA_001 = '/admin/:idOperatore/candidatureLavoratoriTcb';
export const PAGE_TCB_DISPONIBILITA_LAVORATORE = '/disponibilitaLavoratore';
export const PAGE_MODALEACCETTAZIONEENTERI001_URL = '/e/:idEnte/handleRequests/:idRichiesta/AccettaRichiesta';
export const PAGE_MODALERIFIUTOENTERI001_URL = '/e/:idEnte/handleRequests/:idRichiesta/ChiudiRichiesta';
export const PAGE_RECENSIONE_URL = '/e/rec/:idRichiesta';
export const PAGE_RECENSIONE_FROM_GESTIONE_FEEDBACK_URL = '/e/rec/:idRichiesta/feed';
export const PAGE_RECENSIONE_ADMIN_URL = '/admin/rec/:idRichiesta';
export const PAGE_ADMIN_CNT_04_URL = '/adminCnt004';
export const PROVA = '/prova';
export const PAGE_PROVACALENDARIO_URL = '/provaCalendario';

export const PAGE_GESTRICSERVIZIO_URL = '/GestioneRicServizio';
export const PAGE_TCB_SIM_URL = '/tcb_sim/:idServizio';
export const PAGE_TCB_SIM_PRINT_URL = '/tcb_sim/print/printerds';
export const PAGE_MATCHING_DOMANDA_LAVORATORE_URL = '/admin/matchingDomandaLavoratore/:idDomanda';

export const PAGE_PAGINA_INFORMATIVA_URL = '/PaginaInformativa/:idCnt';
export const PAGE_HOME_SPAZIWEMI_URL = '/spazi-wemi';
export const PAGE_SPAZIWEMI_URL = '/pinfsw/:idSpazioWeMI';
export const PAGE_DATICHIUSURA_URL = '/DatiChiusura';

export const PAGE_NOT_FOUND_URL = '/404';
export const DEFAULT_URL = `/${DEFAULT_LOCALE}`;

export const valuesUrl = [PAGE_HOME_URL, DEFAULT_URL, PAGE_NOT_FOUND_URL];

export const PAGE_QUERY_SERVICES = '/services';
export const PAGE_ENTI_SERVICE_FLOW = '/services/:idServizio/:idCategoria?';
export const PAGE_ENTI_SERVICES_SEARCH_URL = `${PAGE_ENTI_SERVICE_FLOW}/search`;
export const PAGE_REQUESTSERVICE_URL = `${PAGE_ENTI_SERVICE_FLOW}/forward`;

export const PAGE_GESTIONE_UTENZE = '/admin/gestione-utenze';
export const PAGE_MODIFICA_UTENZA = '/admin/gestione-utenze/modifica/:idUtente';

export const PAGE_HOME_INCLUSIONE = '/inclusione';
export const PAGE_COME_FUNZIONA_APPRENDIMENTO_LINGUA = '/inclusione/apprendimento-lingua-italiana/voglio-sapere-di-piu';
export const PAGE_RICONGIUNGIMENTO_PARENTE = '/inclusione/ricongiungimento-familiare/parente';
export const PAGE_RICONGIUNGIMENTO_COME_FUNZIONA = '/inclusione/ricongiungimento-come-funziona';
export const PAGE_INCLUSIONE_RICONGIUNGIMENTO = '/inclusione/ricongiungimento-familiare';
export const PAGE_INCLUSIONE_LAB_IMPACT = '/inclusione/lab-impact';
export const PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA = '/inclusione/orientamento-scolastico-ed-extra';
export const PAGE_INCLUSIONE_APPRENDIMENTO_ITALIANO = '/inclusione/apprendimento-lingua-italiana';
export const PAGE_INCLUSIONE_CONOSCERE_INTEGRARSI = '/inclusione/conoscere-integrarsi';
export const PAGE_INCLUSIONE_CORSO_ITALIANO = '/inclusione/corso-italiano';
export const PAGE_ORIENTAMENTO_SCOLASTICO_COME_FUNZIONA = '/inclusione/orientamento-scolastico-ed-extra/ho-bisogno-di-orientamento';
export const PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_EXTRASCOLASTICO = '/inclusione/extrascolastico/voglio-saperne-di-piu';
export const PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_SERVIZIO = '/inclusione/consulenza-sociale-giuridica/voglio-saperne-di-piu-sul-servizio';
export const PAGE_CONSULENZA_HO_BISOGNO_DI_CONSULENZA = '/inclusione/consulenza-sociale-giuridica/ho-bisogno-di-consulenza';
export const PAGE_CONSULENZA_SOCIALE_GIURIDICA = '/inclusione/consulenza-sociale-giuridica';
export const PAGE_INCLUSIONE_MILANO_L2 = '/inclusione/ricongiungimento-familiare/milano-l2';
export const PAGE_INCLUSIONE_GUIDA_MILANO = '/inclusione/guida-nuovi-arrivati';
export const PAGE_HOME_018 = '/0-18';

// url educazione finanziaria
export const PAGE_EDUCAZIONE_FINANZIARIA = '/educazione-finanziaria';
export const PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE = '/educazione-finanziaria/protezione';
export const PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING = '/educazione-finanziaria/budgeting';
export const PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO = '/educazione-finanziaria/investimento';
export const PAGE_EDUCAZIONE_FINANZIARIA_DEBITI = '/educazione-finanziaria/debiti';
export const PAGE_EDUCAZIONE_FINANZIARIA_PENSIONE = '/educazione-finanziaria/pensione';

// New url for contents
export const PAGE_CONTENT_SECTION_LIST = '/admin/contents/sections';
export const PAGE_CONTENT_SERVICE_LIST = '/admin/contents/services';
export const PAGE_CONTENUTO_SLIDER_0_18 = '/admin/contents/slider0-18';
export const PAGE_CONTENT_SECTION_NEW = `${PAGE_CONTENT_SECTION_LIST}/new`;
export const PAGE_CONTENT_SERVICE_NEW = `${PAGE_CONTENT_SERVICE_LIST}/new`;
export const PAGE_CONTENT_SLIDER_NEW = `${PAGE_CONTENUTO_SLIDER_0_18}/new`;
export const PAGE_CONTENT_SECTION_EDIT = `${PAGE_CONTENT_SECTION_LIST}/edit/:idContent`;
export const PAGE_CONTENT_SERVICE_EDIT = `${PAGE_CONTENT_SERVICE_LIST}/edit/:idContent`;
export const PAGE_CONTENT_SLIDER_EDIT = `${PAGE_CONTENUTO_SLIDER_0_18}/edit/:idContent`;
export const PAGE_CONTENT_AREA_LIST = '/admin/contents/areas';
export const PAGE_CONTENT_AREA_NEW = `${PAGE_CONTENT_AREA_LIST}/new`;
export const PAGE_CONTENT_AREA_EDIT = `${PAGE_CONTENT_AREA_LIST}/edit/:idContent`;
export const PAGE_DOMICILIARITA = '/domiciliarita';
export const PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST = '/admin/contents/sliderfinancialeducation';
export const PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_EDIT = `${PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST}/edit/:idContent`;
export const PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_NEW = `${PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST}/new`;

// New url for Vouchers
export const PAGE_GESTIONE_VOUCHER = '/admin/gestione-voucher';
export const PAGE_LISTA_TRANSAZIONI_VOUCHER = '/admin/lista-transazioni-voucher/:idVoucher';
export const PAGE_LISTA_TRANSAZIONI = '/admin/lista-transazioni';
export const PAGE_DETTAGLIO_TRANSAZIONE = '/admin/lista-transazioni/:idTransazione';
export const PAGE_ELENCO_VOUCHER = '/elenco-voucher';
