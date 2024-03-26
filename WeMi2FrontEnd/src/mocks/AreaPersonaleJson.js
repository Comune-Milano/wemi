/** @format */

import DisponibilitaIcon from 'images2/icone_areaPersonaleCittadino/disponibilita.png';
import PrivacyIcon from 'images2/icone_areaPersonaleCittadino/privacy.png';
import ProfiloIcon from 'images2/icone_areaPersonaleCittadino/profilo.png';
import ProposteLavoroIcon from 'images2/icone_areaPersonaleCittadino/proposte-lavoro.png';
import StoricoRichiesteIcon from 'images2/icone_areaPersonaleCittadino/storico-richieste.png';
import gestioneEnte from 'images2/icone_areaPersonaleEnte/gestioneEnte.png';
import serviziErogatiEnte from 'images2/icone_areaPersonaleEnte/serviziErogatiEnte.png';
import gestioneRichiesteServizi from 'images2/icone_areaPersonaleEnte/gestioneRichiesteServizi.png';
import gestioneFeedback from 'images2/icone_areaPersonaleEnte/gestioneFeedback.png';
import gestioneEnti from 'images2/icone_areaPersonaleAdmin/gestioneEnti.png';
import gestioneVoucher from 'images2/icone_areaPersonaleAdmin/gestioneVoucher.png';
import elencoVoucher from 'images2/icone_areaPersonaleCittadino/elencoVoucher.png';
import gestioneProfili from 'images2/icone_areaPersonaleAdmin/gestione-profili.png';
import gestioneContenuti from 'images2/icone_areaPersonaleAdmin/gestioneContenuti.png';
import gestioneRichiesteServiziAdmin from 'images2/icone_areaPersonaleAdmin/gestioneRichiesteServizi.png';
import gestioneRichiesteTCB from 'images2/icone_areaPersonaleAdmin/gestioneRichiesteTCB.png';
import gestioneCandidatureTCB from 'images2/icone_areaPersonaleAdmin/gestioneCandidatureTCB.png';
import { UNDER_AUTHORIZATIONS_LIST } from 'types/authorizations/underAuthorizationsList';

export const getAreaPersonaleCittadino = (statoCandidatura, openModaleRiepilogoCand, openModalCV, DatiLogin) => {
  const statoOffertaBozza = statoCandidatura && statoCandidatura.cd_ultimo_stato_offerta === 0;
  const statoOffertaInoltrata = statoCandidatura && statoCandidatura.cd_ultimo_stato_offerta === 1;
  const statoOffertaValidataIdonea = statoCandidatura && statoCandidatura.cd_ultimo_stato_offerta === 2;
  const statoOffertaValidataNonIdonea = statoCandidatura && statoCandidatura.cd_ultimo_stato_offerta === 3;
  const statoOffertaSospesa = statoCandidatura && statoCandidatura.cd_ultimo_stato_offerta === 4;

  const MIO_PROFILO_DESCRIPTION = statoOffertaBozza ?
    'Se vuoi proporti per lavorare con noi, inserisci le tue caratteristiche e chiedi di accreditarti.' :
    'Visualizza Il riepilogo dei dati della tua candidatura come assistente familiare.';

  const MIO_PROFILO_PATH = statoOffertaBozza ? '/MenuTCB/candidaturaLavoratoreTCB' : undefined;
  const MIO_PROFILO_ONCLICK = !statoOffertaBozza ? () => openModaleRiepilogoCand(true) : undefined;
  const SCARICA_CV_ONCLICK = () => openModalCV(true);


  const areaPersonaleCittadino = {
    Title: 'Area riservata',
    Card: {
      profiloOperatoreWeMi: [
        {
          title: 'Il mio profilo',
          description: MIO_PROFILO_DESCRIPTION,
          image: ProfiloIcon,
          path: MIO_PROFILO_PATH,
          onClick: MIO_PROFILO_ONCLICK,
        },
        {
          title: 'Le mie disponibilità',
          description: 'Visualizza e modifica le tue disponibilità e preferenze lavorative.',
          image: DisponibilitaIcon,
          disabled: !statoOffertaBozza && !statoOffertaInoltrata,
          path: '/disponibilitaLavoratore',
        },
        {
          title: 'Proposte di lavoro',
          description:
            'Visualizza, accetta o rifiuta le proposte di lavoro selezionate per te.',
          image: ProposteLavoroIcon,
          path: `/r/StoricoLavoratore/${DatiLogin && DatiLogin.idCittadino}`,
          disabled: !statoOffertaValidataIdonea && !statoOffertaValidataNonIdonea && !statoOffertaSospesa,
        },
      ],
      cv: {
        title: 'Personalizza e scarica il tuo curriculum',
        description:
          'Visualizza e scarica il tuo CV in formato pdf.',
        disabled: statoOffertaBozza,
        onClick: SCARICA_CV_ONCLICK,
        tooltipValue: statoOffertaBozza ? 'Compila il tuo profilo per poter scaricare il tuo curriculum' : null,
      },
      serviziWeMiRichiesti: [
        {
          title: 'Storico delle richieste',
          description:
            'Verifica lo stato delle tue richieste e valuta la tua esperienza.',
          image: StoricoRichiesteIcon,
          path: '/r/idRequestsIndex',
        },
      ],
      privacy: [
        {
          title: 'Informativa',
          description: 'Visualizza l’informativa sul trattamento dei dati.',
          image: PrivacyIcon,
          download: {
            _blank: true,
          },
        },
      ],
      voucher: [
        {
          title: 'ELENCO VOUCHER',
          description: 'Verifica i tuoi voucher, la loro scadenza e il credito ancora disponibile',
          image: elencoVoucher,
          path: '/elenco-voucher',
        },
      ],
    },
  };
  return areaPersonaleCittadino;
};

export const getAreaPersonaleEnte = (DatiLogin) => {
  // const { userProfile } = useContext(context);
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  // const DatiLogin = userProfile;
  const areaPersonaleEnte = {
    Title: 'Area personale Ente',
    Card: [
      {
        title: 'INFORMAZIONI ENTE',
        description: 'Visualizza e modifica la tua scheda ente',
        image: gestioneEnte,
        path: '/gestioneEnte/SchedaEnte',

      },
      {
        title: 'SERVIZI EROGATI DALL’ENTE',
        description: 'Visualizza e modifica i servizi che il tuo ente offre ai cittadini',
        image: serviziErogatiEnte,
        path: `/gestioneEnte/${DatiLogin && DatiLogin.idEnte}/SchedaServiziEnte`,
      },
      {
        title: 'GESTIONE RICHIESTE SERVIZI',
        description: 'Visualizza le richieste effettuate dai cittadini ai servizi del tuo ente',
        image: gestioneRichiesteServizi,
        path: `/e/${DatiLogin && DatiLogin.idEnte}/handleRequests`,
      },
      // {
      //   title: "GESTIONE ORDINI",
      //   description: "Visualizza le richieste di servizi in elaborazione o di servizi già erogati ai cittadini",
      //   image: gestioneOrdini,
      //   path: `/e/${DatiLogin && DatiLogin.idEnte}/handleOrders`,
      // },
      {
        title: 'GESTIONE FEEDBACK',
        description: 'Visualizza e gestisci le valutazioni che i cittadini hanno dato ai tuoi servizi',
        image: gestioneFeedback,
        path: `/e/${DatiLogin && DatiLogin.idEnte}/handleFeedbacks`,
      },
    ],
  };

  return areaPersonaleEnte;
};


export const getAreaPersonaleAmministratore = (DatiLogin) => {
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);


  const areaPersonaleAmministratore = {
    Title: 'Area personale Amministratore',
    Card: [
      {
        title: 'GESTIONE ENTI',
        description: 'Gestisci gli stati di accreditamento degli enti e le relative schede di offerta dei servizi',
        image: gestioneEnti,
        path: '/gestioneEnti',
        authorizationsList: UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_MANAGEMENT,
      },
      {
        title: 'Gestione contenuti',
        description: 'Modifica i contenuti del portale WeMi',
        image: gestioneContenuti,
        path: `/admin/${DatiLogin && DatiLogin.idCittadino}/cnt`,
        authorizationsList: UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CONTENT_MANAGEMENT,
      },
      {
        title: 'GESTIONE RICHIESTE DI SERVIZI ENTI',
        description: 'Visualizza e gestisci le richieste dei cittadini rivolte ai servizi erogati dagli enti',
        image: gestioneRichiesteServiziAdmin,
        path: `/admin/${DatiLogin && DatiLogin.idCittadino}/handlerequests`,
        authorizationsList: UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_CORPORATE_REQUEST_SERVICES,
      },
      {
        title: 'GESTIONE RICHIESTE DI SERVIZI TCB',
        description: 'Visualizza e gestisci le richieste dei cittadini rivolte ai servizi di baby-sitter, colf e badanti',
        image: gestioneRichiesteTCB,
        path: `/admin/${DatiLogin && DatiLogin.idCittadino}/richiesteTcb`,
        authorizationsList: UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_QUESTION_MANAGEMENT,
      },
      {
        title: 'GESTIONE CANDIDATURE TCB',
        description: 'Visualizza le candidature dei cittadini per diventare baby-sitter, colf e badanti accreditati dal portale WeMi',
        image: gestioneCandidatureTCB,
        path: `/admin/${DatiLogin && DatiLogin.idCittadino}/candidatureLavoratoriTcb`,
        authorizationsList: UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT,
      },
      {
        title: 'GESTIONE PROFILI',
        description: 'Gestisci le autorizzazioni degli amministratori della piattaforma',
        image: gestioneProfili,
        path: '/admin/gestione-utenze',
        authorizationsList: UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_USER_MANAGEMENT,
      },
      {
        title: 'GESTIONE VOUCHER',
        description: 'Gestisci le funzionalità relative ai voucher e visualizza lo storico di tutte le azioni correlate',
        image: gestioneVoucher,
        path: '/admin/gestione-voucher',
        authorizationsList: UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT,
      },
    ],
  };

  return areaPersonaleAmministratore;
};


export const getAreaPersonaleLavoratore = (statoCandidatura, openModaleRiepilogoCand, openModalCV, DatiLogin) => {
  const statoOffertaBozza = statoCandidatura.cd_ultimo_stato_offerta === 0;
  // const statoOffertaInoltrata = statoCandidatura.cd_ultimo_stato_offerta === 1;
  const statoOffertaValidataIdonea = statoCandidatura.cd_ultimo_stato_offerta === 2;
  const statoOffertaValidataNonIdonea = statoCandidatura.cd_ultimo_stato_offerta === 3;
  const statoOffertaSospesa = statoCandidatura.cd_ultimo_stato_offerta === 4;

  const MIO_PROFILO_DESCRIPTION = statoOffertaBozza ? 'Se vuoi proporti per lavorare con noi, inserisci le tue caratteristiche e chiedi di accreditarti.' :
    'Visualizza Il riepilogo dei dati della tua candidatura come assistente familiare”. Al click aprire la popup modale di riepilogo candidatura lavoratore TCB.';

  const MIO_PROFILO_PATH = statoOffertaBozza ? '/MenuTCB/candidaturaLavoratoreTCB' : undefined;
  const MIO_PROFILO_ONCLICK = !statoOffertaBozza ? () => openModaleRiepilogoCand(true) : null;
  const SCARICA_CV_ONCLICK = () => openModalCV(true);

  const areaPersonaleLavoratore = {
    Title: 'Area riservata Lavoratore',
    Card: [
      {
        title: 'Il mio profilo',
        description: MIO_PROFILO_DESCRIPTION,
        image: '\f0b1',
        path: MIO_PROFILO_PATH,
        onClick: MIO_PROFILO_ONCLICK,
      },
      {
        title: 'La mia disponibilità',
        description: 'visualizza modifica la tua disponibilità settimanale.',
        image: '\f073',
        disabled: !statoOffertaValidataIdonea && !statoOffertaValidataNonIdonea && !statoOffertaSospesa,
        path: '/disponibilitaLavoratore',
      },
      {
        title: 'Le richieste di lavoro per me',
        description:
          'Visualizza, accetta o rifiuta le richieste di lavoro che WeMI ha selezionato per te.',
        image: '\f0ae',
        path: `/r/StoricoLavoratore/${DatiLogin && DatiLogin.idCittadino}`,
        disabled: !statoOffertaValidataIdonea && !statoOffertaValidataNonIdonea && !statoOffertaSospesa,
      },
      {
        title: 'La mia sicurezza su WeMI',
        description:
          'Modifica le opzioni di utilizzo dei servizi WeMI. Gestisci il tuo consenso al trattamento dati.',
        image: '\f023',
        path: '/ALL_GDP',
      },
      {
        title: 'Log Attività su WeMI',
        description:
          'Visualizza le attività effettuate sui dati personali.',
        image: '\f023',
        path: '/ALL_GDP',
      },
      {
        title: 'Scarica il tuo CV',
        description: 'Visualizza e scarica il tuo CV in formato pdf.',
        image: '\f023',
        path: undefined,
        disabled: statoOffertaBozza,
        onClick: SCARICA_CV_ONCLICK,
      },
    ],
  };
  return areaPersonaleLavoratore;
};
