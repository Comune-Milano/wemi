/** @format */

import React, { useEffect, useState } from 'react';
import { AddClientError } from 'redux-modules/actions/errorActions';
import { AddParameters } from 'redux-modules/actions/goi003Actions';
import { withRouter } from 'react-router';
import Loader from 'components/ui/Loader';
import Accordion from 'components/ui/Accordion';
import TextArea from 'components/ui/TextArea';
import { graphqlRequest, resetField } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import { datiScheda } from 'mocks/DatiSchedaEnte';
import Button from 'components/ui/Button';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Switch from 'components/ui/Switch';
import media from 'utils/media-queries';
import styled from 'styled-components';
import Navlink from 'components/router/NavLink';
import {
  enteDatiPK as enteDatiPKQ,
  utenteAdd as utenteAddQ,
  utenteRemove as utenteRemoveQ,
  usersAddedEntePK as usersAddedEntePKQ,
  usersCollegatiEnte as usersCollegatiEnteQ,
} from 'components/pages/ENT_GDI/enteGraphQL';
import {
  EstraiDatiPropriEnteR as EstraiDatiPropriEnteQ,
  InserisciDatiIPropriEnte as InserisciDatiIPropriEnteQ,
  InserisciDatiIPropriEnteNewVersione as InserisciDatiIPropriEnteNewVersioneQ,
  InserisciDatiIPropriEnteStatless as InserisciDatiIPropriEnteStatlessQ,
  AltraSedeEntePK as AltraSedeEntePKQ,
  sedeRemove as sedeRemoveQ,
  sedeInsert as sedeInsertQ,
  sedeUpdate as sedeUpdateQ,
  contenutoByTyS as contenutoByTySQ,
  modificaNoteEnte as modificaNoteEnteQ,
  inserisciDatiMerchant as inserisciDatiMerchantMutation,
} from 'components/pages/DatiEnte/enteGraphQL';
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import checkEnte from 'utils/functions/checkEnte';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { convertFasceOrarieToObj, convertObjectToIntervals } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import Modal from 'components/ui2/Modal';
import SchedaEnteModal from 'components/shared/ModaleSchedaEnte';
import { OPERATORE_ENTE, AMMINISTRATORE } from 'types/userRole';
import AccordionBodyWrapper from './partial/AccordionBodyWrapper';
import ReperibilitaSection from './partial/ReperibilitaSection';
import ContattiSection from './partial/ContattiSection';
import AltreSediSection from './partial/AltreSediSection';
import SedeLegaleSection from './partial/SedeLegaleSection';
import SocialSection from './partial/SocialSection';
import MerchantSection from './partial/MerchantSection';
import DescriptionSection from './partial/DescriptionSection';
import OperatorSection from './partial/OperatorSection';
import EnteSection from './partial/EnteSection';

const MyButton = styled(Button)`
width: auto;
`;

const AccordionSchedaEnte = ({
  goi003,
  userProfile,
  AddParameters,
  locale,
  spazi,
  categorie,
  AddClientError,
  idEnte,
  login,
  enteDatiPK,
  EstraiDatiPropriEnte,
  usersAddedEntePK,
  AltraSedeEntePK,
  graphqlRequest,
  usersCollegatiEnte,
  match,
  resetField,
}) => {
  const isAmministratore = checkAdmin(userProfile.datiLogin);
  const isEnte = checkEnte(userProfile.datiLogin);
  const [sezioneEnte, setSezioneEnte] = useState({});
  const [sezioneOperatori, setSezioneOperatori] = useState({});
  const [sezioneDescrizione, setSezioneDescrzione] = useState({});
  const [sezioneSocial, setSezioneSociale] = useState({});
  const [sezioneSedePrincipale, setSezioneSedePrincipale] = useState({});
  const [sezioneSedi, setSezioneSedi] = useState({});
  const [sezioneContatti, setSezioneContatti] = useState({});
  const [sezioneReperibilita, setSezioneReperibilita] = useState({});
  const [sezioneAltro, setSezioneAltro] = useState({});
  const [modalSalvataggio, setOpenModalSalvataggio] = useState(false);
  const [modaleRiepilogo, setOpenModaleRiepilogo] = useState(false);
  const [sezioneMerchant, setSezioneMerchant] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [controllo, setControllo] = useState(false);
  // da cancellare
  const [listaOperatori, setListaOperatori] = useState();

  // const[logo, setLogo] = useState()

  // const [testoChiave, setTestoChiave] = useState('');
  // const [otherSede, setOtherSede] = useState('');
  let [Key, setKey] = useState();
  const [argSedi, setArgSedi] = useState();
  const [finalNotes, setFinaNotes] = useState({});
  // const [files1, setFiles1] = useState();
  // const [files2, setFiles2] = useState();
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  const { datiLogin } = userProfile;
  const DatiLogin = datiLogin;

  const inserisciDatiMerchant = useStatelessGraphQLRequest(inserisciDatiMerchantMutation);

  const [spaziW, setSpaziW] = useState();
  const [categorieA, setCategorieA] = useState();
  const [stato, setStato] = useState();

  const InserisciDatiIPropriEnte = useStatelessGraphQLRequest(InserisciDatiIPropriEnteStatlessQ);

  const createInserisciDatiIPropriEnteInput = (json, status, flag) => {
    return {
      input: {
        gestisciMedia: json.gestisciMedia,
        id_ente_rif: json.id_ente_rif,
        tl_descrizione_ente: json.tl_descrizione_ente,
        js_referente: json.js_referente,
        js_primo_contatto: json.js_primo_contatto,
        note_per_cittadino: json.notePerCittadino,
        js_altre_info: json.js_altre_info,
        js_sede: json.sede_principale,
        cd_stato_ente: status,
        operatori: json.operatori,
        eliminaUsers: json.eliminaUsers,
        operazione: flag,
        js_note: json.js_note_adminwemi,
        js_sede_secondaria: json.sede_secondarie,
        eliminaSedi: json.eliminaSedi
      }
    };
  };

  useEffect(() => {
    AddParameters({ controllo: false, errore: '' });
    setLoaded(false);

    graphqlRequest(contenutoByTySQ('spazi', 7));
    graphqlRequest(contenutoByTySQ('categorie', 13));
    graphqlRequest(usersCollegatiEnteQ(idEnte));
    graphqlRequest(enteDatiPKQ(idEnte));
    graphqlRequest(EstraiDatiPropriEnteQ(idEnte));
    graphqlRequest(usersAddedEntePKQ(idEnte));
    graphqlRequest(AltraSedeEntePKQ(idEnte));

    return () => {
      resetField('EstraiDatiPropriEnte');
    };
  }, []);

  useEffect(() => {
    // inizializzazione spazi e categorie
    const arr1 = [];
    const arr2 = [];
    if (spazi && spazi.contenutoByTyS && EstraiDatiPropriEnte) {
      for (let i = 0; i < spazi.contenutoByTyS.length; i++) {
        EstraiDatiPropriEnte.id_spazio_wemi.map((el) => {
          if (el == spazi.contenutoByTyS[i].value) { arr1.push(spazi.contenutoByTyS[i].textValue); }
        });
      }

      setSpaziW(arr1);
    }
    if (categorie && categorie.contenutoByTyS && EstraiDatiPropriEnte) {
      for (let i = 0; i < categorie.contenutoByTyS.length; i++) {
        EstraiDatiPropriEnte.id_cat_accreditamento.map((el) => { if (el == categorie.contenutoByTyS[i].value) arr2.push(categorie.contenutoByTyS[i].textValue); });
      }
      setCategorieA(arr2);
    }

    if (EstraiDatiPropriEnte && EstraiDatiPropriEnte.tl_valore_testuale) setStato(EstraiDatiPropriEnte.tl_valore_testuale.it);
  }, [EstraiDatiPropriEnte, spazi && spazi.contenutoByTyS, categorie && categorie.contenutoByTyS]);

  useEffect(() => {
    const arr = [];
    const operatori = [];
    if (enteDatiPK &&
      enteDatiPK.sede_secondarie &&
      enteDatiPK.sede_secondarie.sedi &&
      EstraiDatiPropriEnte && usersCollegatiEnte
    ) {
      enteDatiPK.sede_secondarie.sedi.forEach(sede => {
        arr.push({
          id_sede: sede.f2,
          nomeSede: sede.f1.nomeSede,
          indirizzo: {
            indirizzo: sede.f1.indirizzo.txIndirizzo ? sede.f1.indirizzo.txIndirizzo : sede.f1.indirizzo.indirizzo,
            cap: sede.f1.indirizzo.txCAP ? sede.f1.indirizzo.txCAP : sede.f1.indirizzo.cap,
            citta: sede.f1.indirizzo.txCitta ? sede.f1.indirizzo.txCitta : sede.f1.indirizzo.citta,
            provincia: sede.f1.indirizzo.txProvincia ? sede.f1.indirizzo.txProvincia : sede.f1.indirizzo.provincia,
          },
        });
      });
      usersCollegatiEnte.usersCollegatiEnte.forEach((el) => {
        operatori.push({ email: el.email, idEnte: Key && Key.appJson ? Key.appJson.id_ente_rif : Key.id_ente_rif, idUtente: el.id_utente });
      });

      AddParameters({
        ...goi003,
        operatori,
        sedi: arr,
        note: enteDatiPK.js_note_adminwemi.note6 || '',
        stato: EstraiDatiPropriEnte.cd_stato_ente,
        disabilitaPerSalvare: !(EstraiDatiPropriEnte.cd_stato_ente !== 31 &&
          EstraiDatiPropriEnte.cd_stato_ente !== 22 &&
          EstraiDatiPropriEnte.cd_stato_ente !== 4),
        controllo: true,
      });
    } else if (enteDatiPK &&
      EstraiDatiPropriEnte && usersCollegatiEnte
    ) {
      usersCollegatiEnte.usersCollegatiEnte.forEach((el) => {
        operatori.push({ email: el.email, idEnte: Key && Key.appJson ? Key.appJson.id_ente_rif : Key.id_ente_rif, idUtente: el.id_utente });
      });

      AddParameters({
        ...goi003,
        operatori,
        note: enteDatiPK.js_note_adminwemi.note6 || '',
        stato: EstraiDatiPropriEnte.cd_stato_ente,
        disabilitaPerSalvare: !(EstraiDatiPropriEnte.cd_stato_ente !== 31 &&
          EstraiDatiPropriEnte.cd_stato_ente !== 22 &&
          EstraiDatiPropriEnte.cd_stato_ente !== 4),
        controllo: true,
      });
    }
  }, [enteDatiPK, EstraiDatiPropriEnte]);

  // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  // inizializzazione campi
  let disableModify = false;
  let disableNotes = false;
  if (EstraiDatiPropriEnte) {
    const stato = EstraiDatiPropriEnte.cd_stato_ente;
    disableModify = (isEnte && ['1', '22', '31', '4'].indexOf(stato) >= 0) ||
      (isAmministratore && ['1', '2', '21', '30'].indexOf(stato) >= 0);
    disableNotes = (isEnte || (isAmministratore && ['1', '2', '21', '30'].indexOf(stato) >= 0));
  }
  const operatoriIniziali = () => {
    const arr = [];
    const arr2 = [];

    if (usersCollegatiEnte && usersCollegatiEnte.usersCollegatiEnte && Key) {
      usersCollegatiEnte.usersCollegatiEnte.map(el => {
        arr.push(el.email);
        arr2.push({
          email: el.email,
          idEnte: Key && Key.appJson ? Key.appJson.id_ente_rif : Key.id_ente_rif,
          idUtente: el.id_utente,
        });
      });
    }
    if (Key) {
      if (!Key.operatori || Key.operatori.length == 0) {
        if (arr2.length == 0) {
          Key.operatori = [];
        } else {
          Key.operatori = arr2;
        }
      }
      Key.eliminaUsers = [];
    }

    if (Key && Key.appJson) Key.appJson.eliminaSedi = [];

    if (Key && Key.sede_secondarie) Key.sede_secondarie.sedi = [];
    return arr;
  };

  // if(Key){
  //   if(!Key.operatori)
  //   Key.operatori=[];}

  if (EstraiDatiPropriEnte && sezioneEnte.nome_chiave_ente != EstraiDatiPropriEnte.nm_ente) {
    // è messo due volte per farlo fare anche quando passi da un ente ad un altro
    sezioneEnte.titolo = datiScheda.accordion.ente.title[0].label;
    sezioneEnte.ente_id = EstraiDatiPropriEnte.id_ente;
    sezioneEnte.nome_chiave_ente = EstraiDatiPropriEnte.nm_ente;
    sezioneEnte.nr_operatori_servizi_wemi = EstraiDatiPropriEnte.nr_operatori_servizi_wemi;
    sezioneEnte.partita_iva = EstraiDatiPropriEnte.id_partita_iva_ente;
    sezioneEnte.ragione_sociale = EstraiDatiPropriEnte.nm_ente_completo;

    sezioneOperatori.titolo = datiScheda.accordion.operatore.title[0].label;
    // sezioneOperatori.listaOperatori = [...usersAddedEntePK]
    sezioneOperatori.listaOperatori = operatoriIniziali();

    sezioneOperatori.note = enteDatiPK && enteDatiPK.js_note_adminwemi && enteDatiPK.js_note_adminwemi.note2 ? enteDatiPK.js_note_adminwemi.note2 : '';

    sezioneDescrizione.titolo = datiScheda.accordion.descrizione.title[0].label;
    sezioneDescrizione.tooltip = datiScheda.accordion.descrizione.tooltip[0].label;
    sezioneDescrizione.descrizione = enteDatiPK && enteDatiPK && enteDatiPK.tl_descrizione_ente ? enteDatiPK.tl_descrizione_ente[locale] : '';
    sezioneDescrizione.nota = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note3 : '';

    sezioneSocial.titolo = datiScheda.accordion.logo.title[0].label;
    sezioneSocial.logo = enteDatiPK && enteDatiPK.oj_media_logo;
    sezioneSocial.nm_nome_media = enteDatiPK && enteDatiPK.nm_nome_media;
    sezioneSocial.ty_mime_type_media = enteDatiPK && enteDatiPK.ty_mime_type_media;
    sezioneSocial.id_img_logo = enteDatiPK && enteDatiPK.id_img_logo;
    sezioneSocial.allegatiEnte = enteDatiPK && enteDatiPK.allegatiEnte;
    sezioneSocial.sito = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txWeb;
    sezioneSocial.facebook = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txFacebook;
    sezioneSocial.instagram = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txInstagram;
    sezioneSocial.twitter = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txTwitter;
    sezioneSocial.youtube = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txYoutube;
    sezioneSocial.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note4 : '';
    sezioneSocial.iw_path_logo = enteDatiPK && enteDatiPK.iw_path_logo;

    sezioneSedePrincipale.titolo = datiScheda.accordion.indirizzoPrincipale.title[0].label;
    sezioneSedePrincipale.sottoTitolo = datiScheda.accordion.indirizzoPrincipale.title[1].label;
    sezioneSedePrincipale.indirizzo = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txIndirizzo;
    sezioneSedePrincipale.cap = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txCAP;
    sezioneSedePrincipale.città = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txCitta;
    sezioneSedePrincipale.provincia = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txProvincia;
    sezioneSedePrincipale.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note5 : '';

    sezioneSedi.titolo = datiScheda.accordion.indirizzoSecondario.title[0].label;


    sezioneContatti.titolo = datiScheda.accordion.contattiReferente.title[0].label;
    sezioneContatti.tooltip = datiScheda.accordion.contattiReferente.tooltip;
    sezioneContatti.referente = enteDatiPK && enteDatiPK.js_referente && enteDatiPK.js_referente.txReferente;
    sezioneContatti.telefono = enteDatiPK && enteDatiPK.js_referente && enteDatiPK.js_referente.txTelefono;
    sezioneContatti.telefono_secondario = enteDatiPK && enteDatiPK.js_referente && enteDatiPK.js_referente.txTelefonoSecondario;
    sezioneContatti.email = enteDatiPK && enteDatiPK.js_referente && enteDatiPK.js_referente.txEmail;
    sezioneContatti.email_secondaria = enteDatiPK && enteDatiPK.js_referente && enteDatiPK.js_referente.txEmailSecondaria;
    sezioneContatti.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note7 : '';


    sezioneReperibilita.titolo = datiScheda.accordion.primoContatto.title[0].label;
    sezioneReperibilita.sottotitolo1 = datiScheda.accordion.primoContatto.title[1].label;
    sezioneReperibilita.sottotitolo2 = datiScheda.accordion.primoContatto.title[2].label;
    sezioneReperibilita.tooltip = datiScheda.accordion.primoContatto && datiScheda.accordion.primoContatto.tooltip;
    sezioneReperibilita.telefono = datiScheda.accordion.primoContatto && enteDatiPK && enteDatiPK.js_primo_contatto && enteDatiPK.js_primo_contatto.txTelefono;
    sezioneReperibilita.email = datiScheda.accordion.primoContatto && enteDatiPK && enteDatiPK.js_primo_contatto && enteDatiPK.js_primo_contatto.txEmail;
    sezioneReperibilita.notePerCittadino = datiScheda.accordion.primoContatto && enteDatiPK && enteDatiPK.note_per_cittadino;
    sezioneReperibilita.disponibilitaDiContatto = datiScheda.accordion.primoContatto && enteDatiPK && enteDatiPK.js_primo_contatto && convertFasceOrarieToObj(enteDatiPK.js_primo_contatto.disponibilitaDiContatto);

    sezioneReperibilita.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note8 : '';

    sezioneMerchant.data = !EstraiDatiPropriEnte.datiMerchant ? null : {
      ...EstraiDatiPropriEnte.datiMerchant,
      dataInizio: EstraiDatiPropriEnte.datiMerchant.dataInizio,
      dataFine: EstraiDatiPropriEnte.datiMerchant.dataFine,
    };
    setLoaded(true);
  } else if (EstraiDatiPropriEnte && sezioneEnte.nome_chiave_ente == EstraiDatiPropriEnte.nm_ente) {
    sezioneEnte.titolo = datiScheda.accordion.ente.title[0].label;
    sezioneEnte.ente_id = EstraiDatiPropriEnte.id_ente;
    sezioneEnte.nome_chiave_ente = EstraiDatiPropriEnte.nm_ente;
    sezioneEnte.nr_operatori_servizi_wemi = EstraiDatiPropriEnte.nr_operatori_servizi_wemi;
    sezioneEnte.partita_iva = EstraiDatiPropriEnte.id_partita_iva_ente;
    sezioneEnte.ragione_sociale = EstraiDatiPropriEnte.nm_ente_completo;

    sezioneOperatori.titolo = datiScheda.accordion.operatore.title[0].label;
    // sezioneOperatori.listaOperatori = [...usersAddedEntePK]
    sezioneOperatori.listaOperatori = operatoriIniziali();

    sezioneOperatori.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note2 : '';

    sezioneDescrizione.titolo = datiScheda.accordion.descrizione.title[0].label;
    sezioneDescrizione.tooltip = datiScheda.accordion.descrizione.tooltip[0].label;
    sezioneDescrizione.descrizione = enteDatiPK && enteDatiPK.tl_descrizione_ente ? enteDatiPK.tl_descrizione_ente[locale] : '';
    sezioneDescrizione.nota = enteDatiPK && enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note3 : '';

    sezioneSocial.titolo = datiScheda.accordion.logo.title[0].label;
    sezioneSocial.logo = enteDatiPK && enteDatiPK.oj_media_logo;
    sezioneSocial.nm_nome_media = enteDatiPK && enteDatiPK.nm_nome_media;
    sezioneSocial.ty_mime_type_media = enteDatiPK && enteDatiPK.ty_mime_type_media;
    sezioneSocial.id_img_logo = enteDatiPK && enteDatiPK.id_img_logo;
    sezioneSocial.allegatiEnte = enteDatiPK && enteDatiPK.allegatiEnte;
    sezioneSocial.sito = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txWeb;
    sezioneSocial.facebook = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txFacebook;
    sezioneSocial.instagram = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txInstagram;
    sezioneSocial.twitter = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txTwitter;
    sezioneSocial.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note4 : '';
    sezioneSocial.iw_path_logo = enteDatiPK && enteDatiPK.iw_path_logo;

    sezioneSedePrincipale.titolo = datiScheda.accordion.indirizzoPrincipale.title[0].label;
    sezioneSedePrincipale.sottoTitolo = datiScheda.accordion.indirizzoPrincipale.title[1].label;
    sezioneSedePrincipale.indirizzo = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txIndirizzo;
    sezioneSedePrincipale.cap = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txCAP;
    sezioneSedePrincipale.citta = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txCitta;
    sezioneSedePrincipale.provincia = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txProvincia;
    sezioneSedePrincipale.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note5 : '';

    sezioneSedi.titolo = datiScheda.accordion.indirizzoSecondario.title[0].label;


    sezioneContatti.titolo = datiScheda.accordion.contattiReferente.title[0].label;
    sezioneContatti.tooltip = datiScheda.accordion.contattiReferente.tooltip;
    sezioneContatti.referente = enteDatiPK && enteDatiPK.js_referente && enteDatiPK && enteDatiPK.js_referente.txReferente;
    sezioneContatti.telefono = enteDatiPK && enteDatiPK.js_referente && enteDatiPK && enteDatiPK.js_referente.txTelefono;
    sezioneContatti.telefono_secondario = enteDatiPK && enteDatiPK.js_referente && enteDatiPK && enteDatiPK.js_referente.txTelefonoSecondario;
    sezioneContatti.email = enteDatiPK && enteDatiPK.js_referente && enteDatiPK && enteDatiPK.js_referente.txEmail;
    sezioneContatti.email_secondaria = enteDatiPK && enteDatiPK.js_referente && enteDatiPK && enteDatiPK.js_referente.txEmailSecondaria;
    sezioneContatti.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note7 : '';


    sezioneReperibilita.titolo = datiScheda.accordion.primoContatto.title[0].label;
    sezioneReperibilita.sottotitolo1 = datiScheda.accordion.primoContatto.title[1].label;
    sezioneReperibilita.sottotitolo2 = datiScheda.accordion.primoContatto.title[2].label;
    sezioneReperibilita.tooltip = datiScheda.accordion.primoContatto && datiScheda.accordion.primoContatto.tooltip;
    sezioneReperibilita.telefono = datiScheda.accordion.primoContatto && enteDatiPK && enteDatiPK.js_primo_contatto && enteDatiPK.js_primo_contatto.txTelefono;
    sezioneReperibilita.email = datiScheda.accordion.primoContatto && enteDatiPK && enteDatiPK.js_primo_contatto && enteDatiPK.js_primo_contatto.txEmail;
    sezioneReperibilita.notePerCittadino = datiScheda.accordion.primoContatto && enteDatiPK && enteDatiPK.note_per_cittadino;
    sezioneReperibilita.disponibilitaDiContatto = datiScheda.accordion.primoContatto && enteDatiPK && enteDatiPK.js_primo_contatto &&
      enteDatiPK.js_primo_contatto.disponibilitaDiContatto
      && enteDatiPK.js_primo_contatto.disponibilitaDiContatto.calendario
      && convertFasceOrarieToObj(enteDatiPK.js_primo_contatto.disponibilitaDiContatto.calendario)
      || convertFasceOrarieToObj(null);
    sezioneReperibilita.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note8 : '';
  }


  if (enteDatiPK && EstraiDatiPropriEnte && usersAddedEntePK && !loaded) {
    sezioneEnte.titolo = datiScheda.accordion.ente.title[0].label;
    sezioneEnte.ente_id = EstraiDatiPropriEnte.id_ente;
    sezioneEnte.nome_chiave_ente = EstraiDatiPropriEnte.nm_ente;
    sezioneEnte.nr_operatori_servizi_wemi = EstraiDatiPropriEnte.nr_operatori_servizi_wemi;
    sezioneEnte.partita_iva = EstraiDatiPropriEnte.id_partita_iva_ente;
    sezioneEnte.ragione_sociale = EstraiDatiPropriEnte.nm_ente_completo;

    sezioneOperatori.titolo = datiScheda.accordion.operatore.title[0].label;
    // sezioneOperatori.listaOperatori = [...usersAddedEntePK]
    sezioneOperatori.listaOperatori = operatoriIniziali();

    sezioneOperatori.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note2 : '';

    sezioneDescrizione.titolo = datiScheda.accordion.descrizione.title[0].label;
    sezioneDescrizione.tooltip = datiScheda.accordion.descrizione.tooltip[0].label;
    sezioneDescrizione.descrizione = enteDatiPK && enteDatiPK.tl_descrizione_ente ? enteDatiPK.tl_descrizione_ente[locale] : '';
    sezioneDescrizione.nota = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note3 : '';

    sezioneSocial.titolo = datiScheda.accordion.logo.title[0].label;
    sezioneSocial.logo = enteDatiPK && enteDatiPK.oj_media_logo;
    sezioneSocial.nm_nome_media = enteDatiPK && enteDatiPK.nm_nome_media;
    sezioneSocial.ty_mime_type_media = enteDatiPK && enteDatiPK.ty_mime_type_media;
    sezioneSocial.id_img_logo = enteDatiPK && enteDatiPK.id_img_logo;
    sezioneSocial.allegatiEnte = enteDatiPK && enteDatiPK.allegatiEnte;
    sezioneSocial.sito = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txWeb;
    sezioneSocial.facebook = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txFacebook;
    sezioneSocial.instagram = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txInstagram;
    sezioneSocial.twitter = enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.txTwitter;
    sezioneSocial.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note4 : '';
    sezioneSocial.iw_path_logo = enteDatiPK && enteDatiPK.iw_path_logo;

    sezioneSedePrincipale.titolo = datiScheda.accordion.indirizzoPrincipale.title[0].label;
    sezioneSedePrincipale.sottoTitolo = datiScheda.accordion.indirizzoPrincipale.title[1].label;
    sezioneSedePrincipale.indirizzo = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txIndirizzo;
    sezioneSedePrincipale.cap = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txCAP;
    sezioneSedePrincipale.citta = enteDatiPK && enteDatiPK.sede_principale.indirizzo.txCitta;
    sezioneSedePrincipale.provincia = enteDatiPK.sede_principale.indirizzo.txProvincia;
    sezioneSedePrincipale.note = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note5 : '';

    sezioneSedi.titolo = datiScheda.accordion.indirizzoSecondario.title[0].label;


    sezioneContatti.titolo = datiScheda.accordion.contattiReferente.title[0].label;
    sezioneContatti.tooltip = datiScheda.accordion.contattiReferente.tooltip;
    sezioneContatti.referente = enteDatiPK.js_referente && enteDatiPK.js_referente.txReferente;
    sezioneContatti.telefono = enteDatiPK.js_referente && enteDatiPK.js_referente.txTelefono;
    sezioneContatti.telefono_secondario = enteDatiPK.js_referente && enteDatiPK.js_referente.txTelefonoSecondario;
    sezioneContatti.email = enteDatiPK.js_referente && enteDatiPK.js_referente.txEmail;
    sezioneContatti.email_secondaria = enteDatiPK.js_referente && enteDatiPK.js_referente.txEmailSecondaria;
    sezioneContatti.note = enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note7 : '';


    sezioneReperibilita.titolo = datiScheda.accordion.primoContatto.title[0].label;
    sezioneReperibilita.sottotitolo1 = datiScheda.accordion.primoContatto.title[1].label;
    sezioneReperibilita.sottotitolo2 = datiScheda.accordion.primoContatto.title[2].label;
    sezioneReperibilita.tooltip = datiScheda.accordion.primoContatto && datiScheda.accordion.primoContatto.tooltip;
    sezioneReperibilita.telefono = datiScheda.accordion.primoContatto && enteDatiPK.js_primo_contatto && enteDatiPK.js_primo_contatto.txTelefono;
    sezioneReperibilita.email = datiScheda.accordion.primoContatto && enteDatiPK.js_primo_contatto && enteDatiPK.js_primo_contatto.txEmail;
    sezioneReperibilita.notePerCittadino = datiScheda.accordion.primoContatto && enteDatiPK && enteDatiPK.note_per_cittadino;
    sezioneReperibilita.disponibilitaDiContatto = datiScheda.accordion.primoContatto && enteDatiPK.js_primo_contatto &&
      enteDatiPK.js_primo_contatto.disponibilitaDiContatto
      && enteDatiPK.js_primo_contatto.disponibilitaDiContatto.calendario
      && convertFasceOrarieToObj(enteDatiPK.js_primo_contatto.disponibilitaDiContatto.calendario)
      || convertFasceOrarieToObj(null);
    sezioneReperibilita.note = enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note8 : '';

    setLoaded(true);
  } else {
    sezioneOperatori.listaOperatori = operatoriIniziali();
  }

  // per cancellazione -> da cancellare utenti che ci sono nella lista iniziale, ma non finale
  // per aggiunta -> utenti che ci sono nella lista finale, ma non iniziale


  if (EstraiDatiPropriEnte && sezioneEnte.nome_chiave_ente != EstraiDatiPropriEnte.nm_ente) {
    setListaOperatori([...usersAddedEntePK]);
    const appJson = enteDatiPK;


    if (!appJson.tl_descrizione_ente) appJson.tl_descrizione_ente = {};
    if (!appJson.tl_descrizione_ente.it) appJson.tl_descrizione_ente.it = null;

    if (!appJson.js_altre_info) appJson.js_altre_info = {};
    if (!appJson.js_altre_info.txFacebook) appJson.js_altre_info.txFacebook = null;
    if (!appJson.js_altre_info.txInstagram) appJson.js_altre_info.txInstagram = null;
    if (!appJson.js_altre_info.txTwitter) appJson.js_altre_info.txTwitter = null;
    if (!appJson.js_altre_info.txWeb) appJson.js_altre_info.txWeb = null;
    if (!appJson.js_altre_info.fgDisponibileVolontari) appJson.js_altre_info.fgDisponibileVolontari = false;
    if (!appJson.js_altre_info.fgDisponibileWelfare) appJson.js_altre_info.fgDisponibileWelfare = false;

    if (!appJson.sede_principale.nomeSede) appJson.sede_principale.nomeSede = 'Sede Legale';
    if (!appJson.sede_principale.indirizzo) appJson.sede_principale.indirizzo = {};
    if (!appJson.sede_principale.indirizzo.txCAP) appJson.sede_principale.indirizzo.txCAP = null;
    if (!appJson.sede_principale.indirizzo.txCitta) appJson.sede_principale.indirizzo.txCitta = null;
    if (!appJson.sede_principale.indirizzo.txIndirizzo) appJson.sede_principale.indirizzo.txIndirizzo = null;
    if (!appJson.sede_principale.indirizzo.txProvincia) appJson.sede_principale.indirizzo.txProvincia = null;

    if (!appJson.js_referente) appJson.js_referente = {};
    if (!appJson.js_referente.txEmail) appJson.js_referente.txEmail = null;
    if (!appJson.js_referente.txEmailSecondaria) appJson.js_referente.txEmailSecondaria = null;
    if (!appJson.js_referente.txReferente) appJson.js_referente.txReferente = null;
    if (!appJson.js_referente.txTelefono) appJson.js_referente.txTelefono = null;
    if (!appJson.js_referente.txTelefonoSecondario) appJson.js_referente.txTelefonoSecondario = null;
    if (!appJson.notePerCittadino) appJson.notePerCittadino = appJson.note_per_cittadino;

    if (!appJson.js_primo_contatto) appJson.js_primo_contatto = {};
    if (!appJson.js_primo_contatto.txEmail) appJson.js_primo_contatto.txEmail = null;
    if (!appJson.js_primo_contatto.txTelefono) appJson.js_primo_contatto.txTelefono = null;

    // predisposizione per confluire tutto in unico grande json da passare al button valida_scheda/salva
    if (!appJson.js_note_adminwemi) appJson.js_note_adminwemi = {};
    if (!appJson.js_note_adminwemi.note2) appJson.js_note_adminwemi.note2 = null;
    if (!appJson.js_note_adminwemi.note3) appJson.js_note_adminwemi.note3 = null;
    if (!appJson.js_note_adminwemi.note4) appJson.js_note_adminwemi.note4 = null;
    if (!appJson.js_note_adminwemi.note5) appJson.js_note_adminwemi.note5 = null;
    if (!appJson.js_note_adminwemi.note6) appJson.js_note_adminwemi.note6 = null;
    if (!appJson.js_note_adminwemi.note7) appJson.js_note_adminwemi.note7 = null;
    if (!appJson.js_note_adminwemi.note8) appJson.js_note_adminwemi.note8 = null;
    if (!appJson.js_note_adminwemi.note9) appJson.js_note_adminwemi.note9 = null;
    setKey({ appJson });
    const appJson1 = AltraSedeEntePK;

    if (!appJson1.altra_sede) appJson1.altra_sede = {};
    if (!appJson1.altra_sede.nomeSede) appJson1.altra_sede.nomeSede = null;
    if (!appJson1.altra_sede.indirizzo) appJson1.altra_sede.indirizzo = {};
    if (!appJson1.altra_sede.indirizzo.txCAP) appJson1.altra_sede.indirizzo.txCAP = null;
    if (!appJson1.altra_sede.indirizzo.txCitta) appJson1.altra_sede.indirizzo.txCitta = null;
    if (!appJson1.altra_sede.indirizzo.txIndirizzo) appJson1.altra_sede.indirizzo.txIndirizzo = null;
    if (!appJson1.altra_sede.indirizzo.txProvincia) appJson1.altra_sede.indirizzo.txProvincia = null;
  }

  if (usersAddedEntePK && !listaOperatori) {
    setListaOperatori([...usersAddedEntePK]);
  }


  if (enteDatiPK && !Key) {
    const appJson = enteDatiPK;


    if (!appJson.tl_descrizione_ente) appJson.tl_descrizione_ente = {};
    if (!appJson.tl_descrizione_ente.it) appJson.tl_descrizione_ente.it = null;

    if (!appJson.js_altre_info) appJson.js_altre_info = {};
    if (!appJson.js_altre_info.txFacebook) appJson.js_altre_info.txFacebook = null;
    if (!appJson.js_altre_info.txYoutube) appJson.js_altre_info.txYoutube = null;
    if (!appJson.js_altre_info.txInstagram) appJson.js_altre_info.txInstagram = null;
    if (!appJson.js_altre_info.txTwitter) appJson.js_altre_info.txTwitter = null;
    if (!appJson.js_altre_info.txWeb) appJson.js_altre_info.txWeb = null;
    if (!appJson.js_altre_info.fgDisponibileVolontari) appJson.js_altre_info.fgDisponibileVolontari = false;
    if (!appJson.js_altre_info.fgDisponibileWelfare) appJson.js_altre_info.fgDisponibileWelfare = false;

    if (!appJson.sede_principale.nomeSede) appJson.sede_principale.nomeSede = 'Sede Legale';
    if (!appJson.sede_principale.indirizzo) appJson.sede_principale.indirizzo = {};
    if (!appJson.sede_principale.indirizzo.txCAP) appJson.sede_principale.indirizzo.txCAP = null;
    if (!appJson.sede_principale.indirizzo.txCitta) appJson.sede_principale.indirizzo.txCitta = null;
    if (!appJson.sede_principale.indirizzo.txIndirizzo) appJson.sede_principale.indirizzo.txIndirizzo = null;
    if (!appJson.sede_principale.indirizzo.txProvincia) appJson.sede_principale.indirizzo.txProvincia = null;

    if (!appJson.js_referente) appJson.js_referente = {};
    if (!appJson.js_referente.txEmail) appJson.js_referente.txEmail = null;
    if (!appJson.js_referente.txEmailSecondaria) appJson.js_referente.txEmailSecondaria = null;
    if (!appJson.js_referente.txReferente) appJson.js_referente.txReferente = null;
    if (!appJson.js_referente.txTelefono) appJson.js_referente.txTelefono = null;
    if (!appJson.js_referente.txTelefonoSecondario) appJson.js_referente.txTelefonoSecondario = null;

    if (!appJson.js_primo_contatto) appJson.js_primo_contatto = {};
    if (!appJson.js_primo_contatto.txEmail) appJson.js_primo_contatto.txEmail = null;
    if (!appJson.js_primo_contatto.txTelefono) appJson.js_primo_contatto.txTelefono = null;
    if (!appJson.notePerCittadino) appJson.notePerCittadino = appJson.note_per_cittadino;

    // predisposizione per confluire tutto in unico grande json da passare al button valida_scheda/salva
    if (!appJson.js_note_adminwemi) appJson.js_note_adminwemi = {};
    if (!appJson.js_note_adminwemi.note2) appJson.js_note_adminwemi.note2 = null;
    if (!appJson.js_note_adminwemi.note3) appJson.js_note_adminwemi.note3 = null;
    if (!appJson.js_note_adminwemi.note4) appJson.js_note_adminwemi.note4 = null;
    if (!appJson.js_note_adminwemi.note5) appJson.js_note_adminwemi.note5 = null;
    if (!appJson.js_note_adminwemi.note6) appJson.js_note_adminwemi.note6 = null;
    if (!appJson.js_note_adminwemi.note7) appJson.js_note_adminwemi.note7 = null;
    if (!appJson.js_note_adminwemi.note8) appJson.js_note_adminwemi.note8 = null;
    if (!appJson.js_note_adminwemi.note9) appJson.js_note_adminwemi.note9 = null;
    setKey({ appJson });
  }

  if (AltraSedeEntePK && !argSedi) {
    const appJson = AltraSedeEntePK;

    if (!appJson.altra_sede) appJson.altra_sede = {};
    if (!appJson.altra_sede.nomeSede) appJson.altra_sede.nomeSede = null;
    if (!appJson.altra_sede.indirizzo) appJson.altra_sede.indirizzo = {};
    if (!appJson.altra_sede.indirizzo.txCAP) appJson.altra_sede.indirizzo.txCAP = null;
    if (!appJson.altra_sede.indirizzo.txCitta) appJson.altra_sede.indirizzo.txCitta = null;
    if (!appJson.altra_sede.indirizzo.txIndirizzo) appJson.altra_sede.indirizzo.txIndirizzo = null;
    if (!appJson.altra_sede.indirizzo.txProvincia) appJson.altra_sede.indirizzo.txProvincia = null;

    setArgSedi({ ...appJson });
  }


  let flag = true;
  const noteMerchant = enteDatiPK && enteDatiPK.js_note_adminwemi ? enteDatiPK.js_note_adminwemi.note10 : '';

  if (login == 'ente') flag = false;

  const Media = () => {
    if (goi003.eliminaMedia) {
      Key.eliminaMedia = goi003.eliminaMedia;
    }
  };

  const CatchNotes = (value) => {
    finalNotes[value.id] = value.value;
    setFinaNotes({ ...finalNotes });
  };

  const handleNotes = async() => {
    Key.gestisciMedia = sezioneSocial.gestisciMedia || [];
    Key.js_note_adminwemi = {
      note2: finalNotes.note2 ? finalNotes.note2 : Key.js_note_adminwemi.note2 ? Key.js_note_adminwemi.note2 : '',
      note3: finalNotes.note3 ? finalNotes.note3 : Key.js_note_adminwemi.note3 ? Key.js_note_adminwemi.note3 : '',
      note4: finalNotes.note4 ? finalNotes.note4 : Key.js_note_adminwemi.note4 ? Key.js_note_adminwemi.note4 : '',
      note5: finalNotes.note5 ? finalNotes.note5 : Key.js_note_adminwemi.note5 ? Key.js_note_adminwemi.note5 : '',
      note6: goi003.note ? goi003.note : '',
      note7: finalNotes.note7 ? finalNotes.note7 : Key.js_note_adminwemi.note7 ? Key.js_note_adminwemi.note7 : '',
      note8: finalNotes.note8 ? finalNotes.note8 : Key.js_note_adminwemi.note8 ? Key.js_note_adminwemi.note8 : '',
      note9: finalNotes.note9 ? finalNotes.note9 : Key.js_note_adminwemi.note9 ? Key.js_note_adminwemi.note9 : '',
      note10: finalNotes.note10 ? finalNotes.note10 : Key.js_note_adminwemi.note10 ? Key.js_note_adminwemi.note10 : '',
    };
    Key.sede_secondarie = sediSecondarie();
    Key.js_primo_contatto.disponibilitaDiContatto = {
      calendario: convertObjectToIntervals(goi003.disponibilitaDiContatto ? goi003.disponibilitaDiContatto : sezioneReperibilita.disponibilitaDiContatto ? sezioneReperibilita.disponibilitaDiContatto : null),
    };

    await InserisciDatiIPropriEnte(createInserisciDatiIPropriEnteInput(Key, 21, false));
 
    if (sezioneMerchant.data) {
      inserisciDatiMerchant({
        merchant: {
          ...sezioneMerchant.data,
          idEnte: EstraiDatiPropriEnte.id_ente,
          idUtente: userProfile.datiLogin.idCittadino,
        },
      });
    }
    graphqlRequest(modificaNoteEnteQ(idEnte, Key.js_note_adminwemi, 30, datiLogin.idCittadino));
  };

  const handleDraft = async() => {
    Key.gestisciMedia = sezioneSocial.gestisciMedia || [];
    Key.js_note_adminwemi = {
      note2: !isNullOrUndefined(finalNotes.note2) ? finalNotes.note2 : Key.js_note_adminwemi.note2 ? Key.js_note_adminwemi.note2 : '',
      note3: !isNullOrUndefined(finalNotes.note3) ? finalNotes.note3 : Key.js_note_adminwemi.note3 ? Key.js_note_adminwemi.note3 : '',
      note4: !isNullOrUndefined(finalNotes.note4) ? finalNotes.note4 : Key.js_note_adminwemi.note4 ? Key.js_note_adminwemi.note4 : '',
      note5: !isNullOrUndefined(finalNotes.note5) ? finalNotes.note5 : Key.js_note_adminwemi.note5 ? Key.js_note_adminwemi.note5 : '',
      note6: !isNullOrUndefined(goi003.note) ? goi003.note : '',
      note7: !isNullOrUndefined(finalNotes.note7) ? finalNotes.note7 : Key.js_note_adminwemi.note7 ? Key.js_note_adminwemi.note7 : '',
      note8: !isNullOrUndefined(finalNotes.note8) ? finalNotes.note8 : Key.js_note_adminwemi.note8 ? Key.js_note_adminwemi.note8 : '',
      note9: !isNullOrUndefined(finalNotes.note9) ? finalNotes.note9 : Key.js_note_adminwemi.note9 ? Key.js_note_adminwemi.note9 : '',
      note10: finalNotes.note10 ? finalNotes.note10 : Key.js_note_adminwemi.note10 ? Key.js_note_adminwemi.note10 : '',
    };
    Key.js_note_adminwemi.note2 = finalNotes.note2 ? finalNotes.note2 : Key.js_note_adminwemi.note2;
    Key.js_primo_contatto.disponibilitaDiContatto = {
      calendario: convertObjectToIntervals(goi003.disponibilitaDiContatto ? goi003.disponibilitaDiContatto : sezioneReperibilita.disponibilitaDiContatto ? sezioneReperibilita.disponibilitaDiContatto : null),
    };

    Key.sede_secondarie = sediSecondarie();

    // per adesso al terzo parametro, ovvero l'id utente, viene assegnato di default valore pari a 1
    Media();

    await InserisciDatiIPropriEnte(createInserisciDatiIPropriEnteInput(Key, 21, false));

    if (sezioneMerchant.data) {
      await inserisciDatiMerchant({
        merchant: {
          ...sezioneMerchant.data,
          idEnte: EstraiDatiPropriEnte.id_ente,
          idUtente: userProfile.datiLogin.idCittadino,
        },
      });
    }
  };


  const handleValida = async() => {
    Key.gestisciMedia = sezioneSocial.gestisciMedia || [];
    Key.js_note_adminwemi = {
      note2: finalNotes.note2 ? finalNotes.note2 : Key.js_note_adminwemi.note2 ? Key.js_note_adminwemi.note2 : '',
      note3: finalNotes.note3 ? finalNotes.note3 : Key.js_note_adminwemi.note3 ? Key.js_note_adminwemi.note3 : '',
      note4: finalNotes.note4 ? finalNotes.note4 : Key.js_note_adminwemi.note4 ? Key.js_note_adminwemi.note4 : '',
      note5: finalNotes.note5 ? finalNotes.note5 : Key.js_note_adminwemi.note5 ? Key.js_note_adminwemi.note5 : '',
      note6: goi003.note ? goi003.note : '',
      note7: finalNotes.note7 ? finalNotes.note7 : Key.js_note_adminwemi.note7 ? Key.js_note_adminwemi.note7 : '',
      note8: finalNotes.note8 ? finalNotes.note8 : Key.js_note_adminwemi.note8 ? Key.js_note_adminwemi.note8 : '',
      note9: finalNotes.note9 ? finalNotes.note9 : Key.js_note_adminwemi.note9 ? Key.js_note_adminwemi.note9 : '',
      note10: finalNotes.note10 ? finalNotes.note10 : Key.js_note_adminwemi.note10 ? Key.js_note_adminwemi.note10 : '',
    };
    Key.js_primo_contatto.disponibilitaDiContatto = {
      calendario: convertObjectToIntervals(goi003.disponibilitaDiContatto ? goi003.disponibilitaDiContatto : sezioneReperibilita.disponibilitaDiContatto ? sezioneReperibilita.disponibilitaDiContatto : null),
    };

    Key.sede_secondarie = sediSecondarie();
    // per adesso al terzo parametro, ovvero l'id utente, viene assegnato di default valore pari a 1
    Media();
    await InserisciDatiIPropriEnte(createInserisciDatiIPropriEnteInput(Key, 31, true));
    if (sezioneMerchant.data) {
      inserisciDatiMerchant({
        merchant: {
          ...sezioneMerchant.data,
          idEnte: EstraiDatiPropriEnte.id_ente,
          idUtente: userProfile.datiLogin.idCittadino,
        },
      });
    }
  };

  const handleDisattiva = async() => {
    Key.gestisciMedia = sezioneSocial.gestisciMedia || [];
    Key.js_note_adminwemi = {
      note2: finalNotes.note2 ? finalNotes.note2 : Key.js_note_adminwemi.note2 ? Key.js_note_adminwemi.note2 : '',
      note3: finalNotes.note3 ? finalNotes.note3 : Key.js_note_adminwemi.note3 ? Key.js_note_adminwemi.note3 : '',
      note4: finalNotes.note4 ? finalNotes.note4 : Key.js_note_adminwemi.note4 ? Key.js_note_adminwemi.note4 : '',
      note5: finalNotes.note5 ? finalNotes.note5 : Key.js_note_adminwemi.note5 ? Key.js_note_adminwemi.note5 : '',
      note6: goi003.note ? goi003.note : '',
      note7: finalNotes.note7 ? finalNotes.note7 : Key.js_note_adminwemi.note7 ? Key.js_note_adminwemi.note7 : '',
      note8: finalNotes.note8 ? finalNotes.note8 : Key.js_note_adminwemi.note8 ? Key.js_note_adminwemi.note8 : '',
      note9: finalNotes.note9 ? finalNotes.note9 : Key.js_note_adminwemi.note9 ? Key.js_note_adminwemi.note9 : '',
    };
    Key.js_primo_contatto.disponibilitaDiContatto = {
      calendario: convertObjectToIntervals(goi003.disponibilitaDiContatto ? goi003.disponibilitaDiContatto : sezioneReperibilita.disponibilitaDiContatto ? sezioneReperibilita.disponibilitaDiContatto : null),
    };

    Key.sede_secondarie = sediSecondarie();
    Media();

    // per adesso al terzo parametro, ovvero l'id utente, viene assegnato di default valore pari a 1
    await InserisciDatiIPropriEnte(createInserisciDatiIPropriEnteInput(Key, 4, true));
    if (sezioneMerchant.data) {
      inserisciDatiMerchant({
        merchant: {
          ...sezioneMerchant.data,
          idEnte: EstraiDatiPropriEnte.id_ente,
          idUtente: userProfile.datiLogin.idCittadino,
        },
      });
    }
  };

  const handleSave = async() => {
    Key.gestisciMedia = sezioneSocial.gestisciMedia || [];
    Key.js_note_adminwemi = {
      note2: finalNotes.note2 ? finalNotes.note2 : Key.js_note_adminwemi.note2 ? Key.js_note_adminwemi.note2 : '',
      note3: finalNotes.note3 ? finalNotes.note3 : Key.js_note_adminwemi.note3 ? Key.js_note_adminwemi.note3 : '',
      note4: finalNotes.note4 ? finalNotes.note4 : Key.js_note_adminwemi.note4 ? Key.js_note_adminwemi.note4 : '',
      note5: finalNotes.note5 ? finalNotes.note5 : Key.js_note_adminwemi.note5 ? Key.js_note_adminwemi.note5 : '',
      note6: goi003.note ? goi003.note : '',
      note7: finalNotes.note7 ? finalNotes.note7 : Key.js_note_adminwemi.note7 ? Key.js_note_adminwemi.note7 : '',
      note8: finalNotes.note8 ? finalNotes.note8 : Key.js_note_adminwemi.note8 ? Key.js_note_adminwemi.note8 : '',
      note9: finalNotes.note9 ? finalNotes.note9 : Key.js_note_adminwemi.note9 ? Key.js_note_adminwemi.note9 : '',
      note10: finalNotes.note10 ? finalNotes.note10 : Key.js_note_adminwemi.note10 ? Key.js_note_adminwemi.note10 : '',
    };
    // per adesso al terzo parametro, ovvero l'id utente, viene assegnato di default valore pari a 2
    Key.js_primo_contatto.disponibilitaDiContatto = {
      calendario: convertObjectToIntervals(goi003.disponibilitaDiContatto ? goi003.disponibilitaDiContatto : sezioneReperibilita.disponibilitaDiContatto ? sezioneReperibilita.disponibilitaDiContatto : null),
    };
    Key.sede_secondarie = sediSecondarie();
    Media();

    await InserisciDatiIPropriEnte(createInserisciDatiIPropriEnteInput(Key, 21, true));
    if (sezioneMerchant.data) {
      inserisciDatiMerchant({
        merchant: {
          ...sezioneMerchant.data,
          idEnte: EstraiDatiPropriEnte.id_ente,
          idUtente: userProfile.datiLogin.idCittadino,
        },
      });
    }
  };

  const handleInoltra = async() => {
    Key.gestisciMedia = sezioneSocial.gestisciMedia || [];
    Key.js_primo_contatto.disponibilitaDiContatto =
    {
      calendario: convertObjectToIntervals(goi003.disponibilitaDiContatto ? goi003.disponibilitaDiContatto : sezioneReperibilita.disponibilitaDiContatto ? sezioneReperibilita.disponibilitaDiContatto : null),
    };
    Key.js_note_adminwemi = {
      note2: finalNotes.note2 ? finalNotes.note2 : Key.js_note_adminwemi.note2 ? Key.js_note_adminwemi.note2 : '',
      note3: finalNotes.note3 ? finalNotes.note3 : Key.js_note_adminwemi.note3 ? Key.js_note_adminwemi.note3 : '',
      note4: finalNotes.note4 ? finalNotes.note4 : Key.js_note_adminwemi.note4 ? Key.js_note_adminwemi.note4 : '',
      note5: finalNotes.note5 ? finalNotes.note5 : Key.js_note_adminwemi.note5 ? Key.js_note_adminwemi.note5 : '',
      note6: goi003.note ? goi003.note : '',
      note7: finalNotes.note7 ? finalNotes.note7 : Key.js_note_adminwemi.note7 ? Key.js_note_adminwemi.note7 : '',
      note8: finalNotes.note8 ? finalNotes.note8 : Key.js_note_adminwemi.note8 ? Key.js_note_adminwemi.note8 : '',
      note9: finalNotes.note9 ? finalNotes.note9 : Key.js_note_adminwemi.note9 ? Key.js_note_adminwemi.note9 : '',
      note10: finalNotes.note10 ? finalNotes.note10 : Key.js_note_adminwemi.note10 ? Key.js_note_adminwemi.note10 : '',
    };

    Key.sede_secondarie = sediSecondarie();
    Media();
    // per adesso al terzo parametro, ovvero l'id utente, viene assegnato di default valore pari a 2
    await InserisciDatiIPropriEnte(createInserisciDatiIPropriEnteInput(Key, 22, true));
    if (sezioneMerchant.data) {
      inserisciDatiMerchant({
        merchant: {
          ...sezioneMerchant.data,
          idEnte: EstraiDatiPropriEnte.id_ente,
          idUtente: userProfile.datiLogin.idCittadino,
        },
      });
    }
  };
  const sediSecondarie = () => {
    Key.operatori = goi003.operatori;
    Key.eliminaUsers = goi003.eliminaUsers ? goi003.eliminaUsers.filter((el) => { if (el.idUtente) return el; }) : [];
    if (goi003.eliminaSedi) {
      Key.eliminaSedi = goi003.eliminaSedi;
    }
    if (goi003.sedi) return goi003.sedi;
    return [];
  };


  const controlloSedi = () => {
    let numero = -1;
    if (goi003 && goi003.sedi) {
      if (goi003.sedi.length > 0) {
        goi003.sedi.map((el, i) => {
          if (el.indirizzo.indirizzo && el.indirizzo.indirizzo != '' && el.indirizzo.cap && el.indirizzo.cap != '' && el.indirizzo.citta && el.indirizzo.citta != '' && el.indirizzo.provincia && el.indirizzo.provincia != '') { } else { numero = i; }
        });
      }
    }
    if (numero === -1) return true;
    return false;
  };
  const controlloOre = () => {
    let risultato = false;
    if (goi003 && goi003.disponibilitaDiContatto && goi003.disponibilitaDiContatto.LUNEDI) {
      const arr = goi003 && goi003.disponibilitaDiContatto;
      const result = [];
      for (const i in arr) {
        result.push([i, arr[i]]);
      }
      for (let i = 0; i < result.length; i++) {
        if (result[i][1].length > 0) {
          risultato = true;
          break;
        }
      }
      return risultato;
    } if (enteDatiPK &&
      enteDatiPK.js_primo_contatto &&
      enteDatiPK.js_primo_contatto.disponibilitaDiContatto &&
      enteDatiPK.js_primo_contatto.disponibilitaDiContatto.calendario) {
      const arr = enteDatiPK.js_primo_contatto.disponibilitaDiContatto.calendario ?
        enteDatiPK.js_primo_contatto.disponibilitaDiContatto.calendario : [];
      for (let i = 0; i < arr.length; i++) {
        if (enteDatiPK &&
          enteDatiPK.js_primo_contatto &&
          enteDatiPK.js_primo_contatto.disponibilitaDiContatto &&
          enteDatiPK.js_primo_contatto.disponibilitaDiContatto.calendario &&
          enteDatiPK.js_primo_contatto.disponibilitaDiContatto.calendario[i].disponibilita.length > 0) {
          risultato = true;
          break;
        }
      }
      return risultato;
    }
  };


  const JsonDisponibilita = (disponibilita) => {
    const calendario = [];
    calendario.push({
      disponibilita,
    });
    return disponibilita;
  };

  const faKey = () => {
    let js;
    js = Key.appJson;
    js.eliminaUsers = Key.eliminaUsers;
    js.operatori = Key.operatori;


    return js;
  };


  const ruolo = !!(DatiLogin && DatiLogin.Ruolo == 'Amministratore WeMi');

  if (Key && Key.appJson) {
    Key = faKey();
  }
  const clientError = () => {
    AddClientError(
      {
        message: 'Non è possibile caricare la pagina di configurazione perché l’ente non è stato ancora attivato',
        modal: true,
        goBack: true,
      }
    );
    return null;
  };

  return (

    <>


      {!ruolo && EstraiDatiPropriEnte && EstraiDatiPropriEnte.cd_stato_ente == 1 ?
        clientError() :
        !loaded ? <Row fluid><Loader size="2em" margin="auto"></Loader></Row> :
          EstraiDatiPropriEnte && enteDatiPK ? (
            <>
              <Column>

                <EnteSection
                  spazi={spaziW}
                  categorie={categorieA}
                  email={EstraiDatiPropriEnte && EstraiDatiPropriEnte.ptx_email}
                  ruolo={ruolo}
                  statoScheda={stato}
                  stato={EstraiDatiPropriEnte.cd_stato_ente}
                  Data={sezioneEnte}
                >
                </EnteSection>
              </Column>
              <Column>
                <OperatorSection
                  disabilitaModificaCampi={disableModify}
                  ruolo={ruolo}
                  stato={EstraiDatiPropriEnte.cd_stato_ente}
                  id={Key && Key.id_ente_rif ? Key.id_ente_rif : null}
                  Key={Key}
                  Data={sezioneOperatori}
                  CatchNotes={CatchNotes}
                  disableNotes={disableNotes}
                  FlagEnte={DatiLogin.Profilo == 'E'}
                >
                </OperatorSection>
              </Column>
              <Column>

                <DescriptionSection
                  disabilitaModificaCampi={disableModify}
                  setControllo={setControllo.bind(this)}
                  controllo={controllo}
                  disabilitaPerSalvare={!(EstraiDatiPropriEnte.cd_stato_ente != 31 && EstraiDatiPropriEnte.cd_stato_ente != 22 &&
                    EstraiDatiPropriEnte.cd_stato_ente != 4)}
                  ruolo={ruolo}
                  stato={EstraiDatiPropriEnte.cd_stato_ente}
                  locale={locale}
                  Key={Key}
                  Data={sezioneDescrizione}
                  CatchNotes={CatchNotes}
                  disableNotes={disableNotes}
                  FlagEnte={DatiLogin.Profilo == 'E'}
                >
                </DescriptionSection>
              </Column>
              <Column>

                <SocialSection
                  disabilitaModificaCampi={disableModify}
                  setControllo={setControllo.bind(this)}
                  controllo={controllo}
                  disabilitaPerSalvare={!(EstraiDatiPropriEnte.cd_stato_ente != 31 && EstraiDatiPropriEnte.cd_stato_ente != 22 &&
                    EstraiDatiPropriEnte.cd_stato_ente != 4)}
                  ruolo={ruolo}
                  stato={EstraiDatiPropriEnte.cd_stato_ente}
                  Key={Key}
                  Data={sezioneSocial}
                  CatchNotes={CatchNotes}
                  disableNotes={disableNotes}
                  FlagEnte={DatiLogin.Profilo == 'E'}
                >
                </SocialSection>
              </Column>

              <Column>

                <SedeLegaleSection
                  disabilitaModificaCampi={disableModify}
                  setControllo={setControllo.bind(this)}
                  controllo={controllo}
                  disabilitaPerSalvare={!(EstraiDatiPropriEnte.cd_stato_ente != 31 && EstraiDatiPropriEnte.cd_stato_ente != 22 &&
                    EstraiDatiPropriEnte.cd_stato_ente != 4)}
                  ruolo={ruolo}
                  stato={EstraiDatiPropriEnte.cd_stato_ente}
                  Key={Key}
                  Data={sezioneSedePrincipale}
                  CatchNotes={CatchNotes}
                  disableNotes={disableNotes}
                  FlagEnte={DatiLogin.Profilo == 'E'}
                >
                </SedeLegaleSection>
              </Column>
              <Column>


                <AltreSediSection
                  disabilitaModificaCampi={disableModify}
                  disableNotes={disableNotes}
                />
              </Column>

              <Column>
                <ContattiSection
                  disabilitaModificaCampi={disableModify}
                  setControllo={setControllo.bind(this)}
                  controllo={controllo}
                  disabilitaPerSalvare={!(EstraiDatiPropriEnte.cd_stato_ente != 31 && EstraiDatiPropriEnte.cd_stato_ente != 22 &&
                    EstraiDatiPropriEnte.cd_stato_ente != 4)}
                  ruolo={ruolo}
                  stato={EstraiDatiPropriEnte.cd_stato_ente}
                  Key={Key}
                  Data={sezioneContatti}
                  CatchNotes={CatchNotes}
                  disableNotes={disableNotes}
                  FlagEnte={DatiLogin.Profilo == 'E'}
                >
                </ContattiSection>
              </Column>


              <Column>


                <ReperibilitaSection
                  disabilitaModificaCampi={disableModify}
                  setControllo={setControllo.bind(this)}
                  controllo={controllo}
                  disabilitaPerSalvare={!(EstraiDatiPropriEnte.cd_stato_ente != 31 && EstraiDatiPropriEnte.cd_stato_ente != 22 &&
                    EstraiDatiPropriEnte.cd_stato_ente != 4)}
                  ruolo={ruolo}
                  stato={EstraiDatiPropriEnte.cd_stato_ente}
                  Key={Key}
                  Data={sezioneReperibilita}
                  CatchNotes={CatchNotes}
                  disableNotes={disableNotes}
                  FlagEnte={DatiLogin.Profilo == 'E'}
                >
                </ReperibilitaSection>
              </Column>


              <Column>

                <Accordion
                  headerBgColorOpen="blue"
                  headerBgColor="grey"
                  maxHeight="none"
                  headerColorOpen="white"
                  headerColor="blue"
                  arrowOpenColor="white"
                  arrowClosedColor="blue"
                  arrowSize="f1"
                  headerPadding="0.75rem 1.25rem"
                  aperto={false}
                  AccordionHeader={() => (
                    <div>
                      <Text weight="bold" value={datiScheda.accordion.altro.title[0].label} intlFormatter size="f4" />
                    </div>
                  )}
                  children={(
                    <>
                      <AccordionBodyWrapper>

                        <Row style={{ marginLeft: '20em' }}>
                          <Column lg="5" lgShift={1}>
                            <Switch
                              label={datiScheda.accordion.altro.options[0].label}
                              size="f7"
                              disable={disableModify}
                              defaultvalue={enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.fgDisponibileWelfare}
                              color="darkGrey"
                              coloractive="primary"
                              getSwitchValue={(value) => {
                                Key.js_altre_info.fgDisponibileWelfare = value;
                                setKey(Key);
                              }}
                            />
                          </Column>
                          <Column lg="5" lgShift={1}>
                            <Switch
                              label={datiScheda.accordion.altro.options[1].label}
                              disable={disableModify}
                              defaultvalue={enteDatiPK && enteDatiPK.js_altre_info && enteDatiPK.js_altre_info.fgDisponibileVolontari}
                              color="darkGrey"
                              coloractive="primary"
                              size="f7"
                              getSwitchValue={(value) => {
                                Key.js_altre_info.fgDisponibileVolontari = value;
                                setKey(Key);
                              }}
                            />
                          </Column>
                        </Row>

                        <Row>
                          <Column lg="12">
                            {
                              isAmministratore || (enteDatiPK && enteDatiPK.js_note_adminwemi && enteDatiPK.js_note_adminwemi.note9) ? (
                                <TextArea
                                  material
                                  readOnly={disableNotes ? 'true' : 'false'}
                                  preserveLineBreaks
                                  backgroundColor="yellow"
                                  disabledBackgroundColor="yellow"
                                  id="note9"
                                  name="Indicazioni della redazione WeMi"
                                  // initialValue={(EstraiDatiPropriEnte.cd_stato_ente==30||EstraiDatiPropriEnte.cd_stato_ente==21) && !ruolo ?enteDatiPK && enteDatiPK.js_note_adminwemi && enteDatiPK.js_note_adminwemi.note9: ruolo ? enteDatiPK && enteDatiPK.js_note_adminwemi && enteDatiPK.js_note_adminwemi.note9 : ''}
                                  initialValue={enteDatiPK && enteDatiPK.js_note_adminwemi && enteDatiPK.js_note_adminwemi.note9}
                                  getValue={CatchNotes}
                                >
                                </TextArea>
                              )
                                : null
                            }

                          </Column>
                        </Row>
                      </AccordionBodyWrapper>

                    </>
                  )}
                />

              </Column>
              <Column xs="12">
                <MerchantSection
                  data={sezioneMerchant.data}
                  setData={(data) => setSezioneMerchant({ data })}
                  disableModify={disableModify}
                  note={noteMerchant}
                  handleNotes={CatchNotes}
                  disableNotes={disableNotes}
                />
              </Column>

              <Row fluid justifycontent="space-around">
              {DatiLogin && DatiLogin.Profilo == AMMINISTRATORE ? (
                  <>
                    <Column xs="12" sm="4" md="2">
                      <Navlink to="/gestioneEnti" margin="auto" width="auto">
                        <Button type="cancel" value="Annulla" />
                      </Navlink>
                    </Column>
                    {
                      EstraiDatiPropriEnte.cd_stato_ente != 21 && EstraiDatiPropriEnte.cd_stato_ente != 2 &&
                      EstraiDatiPropriEnte.cd_stato_ente != 30 && (
                        <Column xs="12" sm="4" md="2">
                          <Navlink to="/gestioneEnti" margin="auto" width="auto">
                            <Button type="primary" value="Salva ed esci" onClick={handleDraft} />
                          </Navlink>
                        </Column>
                      )}
                    <Column xs="3">
                      <Button
                        type="primary"
                        margin="auto"
                        value="Riepilogo Scheda"
                        onClick={() => {
                          const statoSchedaValida = EstraiDatiPropriEnte.cd_stato_ente != 22 &&
                           EstraiDatiPropriEnte.cd_stato_ente != 4 &&
                          EstraiDatiPropriEnte.cd_stato_ente != 31;
                          if (statoSchedaValida) {
                            setOpenModaleRiepilogo(true);
                          } else {
                            setOpenModalSalvataggio(true);

                          }
                        }}
                      />
                    </Column>

                    {EstraiDatiPropriEnte.cd_stato_ente != 21 && EstraiDatiPropriEnte.cd_stato_ente != 2 &&
                      EstraiDatiPropriEnte.cd_stato_ente != 30 && EstraiDatiPropriEnte.cd_stato_ente != 4 &&
                      EstraiDatiPropriEnte.cd_stato_ente != 31 && (
                        <Column xs="12" sm="4" md="3">
                          <Navlink to="/gestioneEnti" margin="auto">
                            <Button type="primary" value="Inoltra Note ad Ente" onClick={handleNotes} />
                          </Navlink>
                        </Column>
                      )}
                    {
                      EstraiDatiPropriEnte.cd_stato_ente != 31 && EstraiDatiPropriEnte.cd_stato_ente != 21 && EstraiDatiPropriEnte.cd_stato_ente != 2 &&
                      EstraiDatiPropriEnte.cd_stato_ente != 30 && (
                        <Column xs="12" sm="4" md="2">
                          <Navlink to="/gestioneEnti" margin="auto">
                            <Button type="primary" value="Valida Scheda" onClick={handleValida} />
                          </Navlink>
                        </Column>
                      )}
                    {EstraiDatiPropriEnte.cd_stato_ente != 4 && (
                      <Column xs="12" sm="4" md="3">
                        <Navlink to="/gestioneEnti" margin="auto">
                          <Button type="primary" value="Disattiva Scheda" onClick={handleDisattiva} />
                        </Navlink>
                      </Column>
                    )}
                  </>
                ) : null}

                {DatiLogin && DatiLogin.Profilo == OPERATORE_ENTE ? (
                  <>
                    {
                      EstraiDatiPropriEnte.cd_stato_ente == 31 && EstraiDatiPropriEnte.cd_stato_ente == 22 &&
                      EstraiDatiPropriEnte.cd_stato_ente == 4 && (
                        <Column xs="12" sm="4" md="4">

                        </Column>
                      )}

                    <Column xs="12" sm="2" md="4">
                      <Navlink to="/AreaPersonale" margin="auto" width="auto">
                        <Button type="cancel" value="Annulla" />
                      </Navlink>
                    </Column>
                    {EstraiDatiPropriEnte.cd_stato_ente != 31 && EstraiDatiPropriEnte.cd_stato_ente != 22 &&
                      EstraiDatiPropriEnte.cd_stato_ente != 4 && (
                        <Column xs="12" sm="2" md="4">
                          <Navlink to="/AreaPersonale" margin="auto" width="auto">
                            <Button type="primary" value="Salva ed esci" onClick={handleSave} />
                          </Navlink>
                        </Column>
                      )}
                    <Column xs="12" sm="2" md="4">
                      <Button
                        type="primary"
                        margin="auto"
                        value="Riepilogo Scheda"
                        onClick={() => {
                          const statoSchedaValida = EstraiDatiPropriEnte.cd_stato_ente != 31 && EstraiDatiPropriEnte.cd_stato_ente != 22 &&
                          EstraiDatiPropriEnte.cd_stato_ente != 4;

                          if (!statoSchedaValida) {
                            setOpenModaleRiepilogo(true);
                          } else {
                            setOpenModalSalvataggio(true);

                          }
                        }}
                      />
                    </Column>
                    {EstraiDatiPropriEnte.cd_stato_ente != 31 && EstraiDatiPropriEnte.cd_stato_ente != 22 &&
                      EstraiDatiPropriEnte.cd_stato_ente != 4 && (
                        <Column xs="12" sm="2" md="4">
                          {controllo ?
                            Key && Key.tl_descrizione_ente && (Key.tl_descrizione_ente.it != '' && !isNullOrUndefined(Key.tl_descrizione_ente.it)) &&
                              Key && Key.sede_principale && (Key.sede_principale.indirizzo.txCAP != '' && Key.sede_principale.indirizzo.txCitta != '' && Key.sede_principale.indirizzo.txIndirizzo != '' && Key.sede_principale.indirizzo.txProvincia != '') &&
                              Key && (Key.js_referente.txEmail != '' && !isNullOrUndefined(Key.js_referente.txEmail)) &&
                              Key && (Key.js_referente.txTelefono != '' && !isNullOrUndefined(Key.js_referente.txTelefono)) &&
                              Key && (Key.js_referente.txReferente != '' && !isNullOrUndefined(Key.js_referente.txReferente)) &&
                              controlloSedi() &&
                              // !isNullOrUndefined( goi003.validita)&& goi003.sedi.length>0?goi003.validita:controlloSedi()  &&
                              Key && Key.js_primo_contatto && (Key.js_primo_contatto.txEmail !== '' && !isNullOrUndefined(Key.js_primo_contatto.txEmail)) &&
                              Key && Key.js_primo_contatto && (Key.js_primo_contatto.txTelefono !== '' && !isNullOrUndefined(Key.js_primo_contatto.txTelefono)) &&
                              controlloOre()

                              ? (
                                <Navlink to="/AreaPersonale" margin="auto" width="auto">
                                  <Button type="primary" value="Inoltra Compilazione" onClick={handleInoltra} />
                                </Navlink>
                              )

                              : (
                                <>
                                  <MyButton type="disabled" value="Inoltra Compilazione" />
                                </>
                              )
                            : controllo &&
                              Key && Key.tl_descrizione_ente && (Key.tl_descrizione_ente.it != '' && !isNullOrUndefined(Key.tl_descrizione_ente.it)) &&
                              Key && Key.sede_principale && (Key.sede_principale.indirizzo.txCAP != '' && Key.sede_principale.indirizzo.txCitta != '' && Key.sede_principale.indirizzo.txIndirizzo != '' && Key.sede_principale.indirizzo.txProvincia != '') &&
                              Key && (Key.js_referente.txEmail != '' && !isNullOrUndefined(Key.js_referente.txEmail)) &&
                              Key && (Key.js_referente.txTelefono != '' && !isNullOrUndefined(Key.js_referente.txTelefono)) &&
                              Key && (Key.js_referente.txReferente != '' && !isNullOrUndefined(Key.js_referente.txReferente)) &&
                              controlloSedi() &&
                              //! isNullOrUndefined( goi003.validita)&& goi003.sedi.length>0?goi003.validita:controlloSedi()  &&
                              Key && Key.js_primo_contatto && (Key.js_primo_contatto.txEmail !== '' && !isNullOrUndefined(Key.js_primo_contatto.txEmail)) &&
                              Key && Key.js_primo_contatto && (Key.js_primo_contatto.txTelefono !== '' && !isNullOrUndefined(Key.js_primo_contatto.txTelefono)) &&
                              controlloOre()
                              ? (
                                <Navlink to="/AreaPersonale" margin="auto">

                                  <Button type="primary" value="Inoltra Compilazione" onClick={handleInoltra} />
                                </Navlink>
                              )
                              :
                              <MyButton type="disabled" value="Inoltra Compilazione" />
                          }

                        </Column>
                      )}
                  </>
                ) : null}
              </Row>

            </>
          ) : null
      }

      {modaleRiepilogo ? (
        <SchedaEnteModal
          idEnte={Number.parseInt(idEnte, 10)}
          open={modaleRiepilogo}
          setOpen={setOpenModaleRiepilogo}
          locale={locale}
        />
      ) : null}
      {modalSalvataggio ? (
        <Modal
          open={modalSalvataggio}
          setOpenModal={setOpenModalSalvataggio}
          title="ATTENZIONE"
          color="blue"
        >
          <Row>
            <Column>
              <Text
                value="Il riepilogo ignora le modifiche non ancora salvate; vuoi salvare prima di vedere il riepilogo?"
                size="f6"
                color="red"
              />
            </Column>
          </Row>
          <Row fluid flex justifycontent="space-between">
            <Column xs="4">
              <Button
                value="Si"
                onClick={async () => {
                  await handleDraft(true);
                  setOpenModalSalvataggio(false);
                  setOpenModaleRiepilogo(true);
                }}
              />
            </Column>
            <Column xs="4">
              <Button
                value="No"
                onClick={() => {
                  setOpenModalSalvataggio(false);
                  setOpenModaleRiepilogo(true);
                }}
              />
            </Column>
          </Row>

        </Modal>
)
        : null}

    </>

  );
};


const mapDispatchToProps = {
  graphqlRequest,
  AddClientError,
  AddParameters,
  resetField,
};

function mapStateToProps(state) {
  const { graphql, locale } = state;
  const {
    loaded,
    spazi,
    categorie,
    enteDatiPK,
    EstraiDatiPropriEnte,
    InserisciDatiIPropriEnte,
    usersAddedEntePK,
    utenteAdd,
    utenteRemove,
    modificaNoteEnte,
    AltraSedeEntePK,
    sedeInsert,
    sedeUpdate,
    sedeRemove,
    usersCollegatiEnte,

    error } = graphql;
  const { datiLogin } = state;
  return {
    locale,
    goi003: state.goi003,
    spazi,
    categorie,
    loaded,
    enteDatiPK,
    EstraiDatiPropriEnte,
    InserisciDatiIPropriEnte,
    usersAddedEntePK,
    utenteAdd,
    utenteRemove,
    modificaNoteEnte,
    AltraSedeEntePK,
    sedeInsert,
    sedeUpdate,
    sedeRemove,
    error,
    usersCollegatiEnte,
    datiLogin,
  };
}

AccordionSchedaEnte.displayName = 'AccordionSchedaEnte';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAuthentication(AccordionSchedaEnte)));
