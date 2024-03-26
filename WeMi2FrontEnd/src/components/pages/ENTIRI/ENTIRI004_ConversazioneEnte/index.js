/** @format */

import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {graphqlRequest} from 'redux-modules/actions/authActions';
import Header from 'components/navigation/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import EntChat from 'components/navigation/EntChat';
import Text from 'components/ui/Text';
import {Row} from 'components/ui/Grid';
import EntChatPagetPropTypes from './propTypes';
import {
  retrieveMessages as retrieveMessagesQ,
  estraiRichiestaEnte as estraiRichiestaEnteQ} from './ChatRequestGraphQL';
import { isNullOrUndefined } from 'util';
import checkAdmin from 'utils/functions/checkAdmin';
import RedirectAdmin from 'components/router/RedirectAdmin';
import withAuthentication from 'hoc/withAuthentication';

const EntChatPage = ({userProfile, graphqlRequest,richiestaBase,chat}) => {

  const admin = window.location.pathname.split('/chat')[0].split('/')[2] === 'admin' ? true : false;

  const [lastState, setLastState] = useState(0)
  const [statoChat, setStatoChat] =  useState(lastState && lastState.cd_stato_chat && parseInt(lastState.cd_stato_chat));
  
  const { datiLogin } = userProfile;
  const validitaAdmin = checkAdmin(datiLogin);

  const richiestaEnte = richiestaBase && richiestaBase.EstraiRichiestaEnte && richiestaBase.EstraiRichiestaEnte.richiestaServizioBase.richiestaEnte.filter(el => {
    if(parseInt(el.id_richiesta_servizio_ente) === parseInt(window.location.pathname.split('chat/')[1])) return el})[0]
  //Variabile admin
    const richiestaServizioBase = richiestaBase &&richiestaBase.EstraiRichiestaEnte&& richiestaBase.EstraiRichiestaEnte.richiestaServizioBase;
  useEffect(()=>{
    if (validitaAdmin) {
      if (!richiestaEnte || (lastState && (statoChat !== parseInt(lastState.cd_stato_chat))))
        graphqlRequest(estraiRichiestaEnteQ(window.location.pathname.split('chat/')[1]));
      graphqlRequest(retrieveMessagesQ(window.location.pathname.split('chat/')[1]));
      if ((!lastState && richiestaEnte && richiestaEnte.storiaStati) ||
        lastState && (lastState !== richiestaEnte.storiaStati[richiestaEnte.storiaStati.length - 1])) {
        setLastState(richiestaEnte.storiaStati[richiestaEnte.storiaStati.length - 1])
      }
      if (lastState && (statoChat !== parseInt(lastState.cd_stato_chat))) {
        setStatoChat(lastState && lastState.cd_stato_chat && parseInt(lastState.cd_stato_chat))
      }
    }
  }
  ,[datiLogin])
  const BreadcrumbPath = [
    { 
      slash: admin ? 'Gestione Richieste Servizi Operatore WeMi'  : 'Indice richieste e servizi acquistati',
      url: admin ? 'admin/:idOperatore/handleRequests' : 'r/idrequestsIndex'
    },
    {
      slash: richiestaEnte && !isNullOrUndefined(richiestaEnte.servizioEnte)  ? admin ?
        `Conversazione tra ${richiestaEnte.servizioEnte.ente.nm_ente} e ${richiestaBase.EstraiRichiestaEnte.richiestaServizioBase.user.ptx_username}`
      :  richiestaEnte && `Conversazione con ${richiestaEnte.servizioEnte.ente.nm_ente}` : 'Conversazione...',
      url: richiestaEnte && richiestaEnte && chat && `chat/${window.location.pathname.split('chat/')[1]}`
    },

  ];
  
  return(
  <Wrapper>
      {!validitaAdmin ? <RedirectAdmin /> :
        <>
          <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
          {admin ?
            <Row fluid padding="20px">
              {richiestaServizioBase && richiestaServizioBase !== null && richiestaEnte && richiestaEnte.servizioEnte.ente !== null && <>
                <Text size="f3" intlFormatter value="Conversazione tra " transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
                <Text size="f3" value={richiestaEnte.servizioEnte.ente.nm_ente} color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
                <Text size="f3" intlFormatter value="e" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
                <Text size="f3" value={richiestaServizioBase.user.ptx_username} color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
              </>}
            </Row>
            : richiestaEnte && richiestaEnte.servizioEnte !== null &&
            <Header title={"Conversazione con"} fontSize="f1"
              titleBold={richiestaEnte && `${richiestaEnte.servizioEnte.ente.nm_ente}`} />
          }

          <EntChat admin={admin}
            richiestaEnte={richiestaEnte}
            richiestaBase={richiestaBase && richiestaBase.EstraiRichiestaEnte &&
              richiestaBase.EstraiRichiestaEnte.richiestaServizioBase}
            statoChat={parseInt(lastState.cd_stato_chat)}
            setStatoChat={setStatoChat}
            lastState={lastState}
            chat={chat} />

        </>

      }


  </Wrapper>
)};

EntChatPage.displayName = 'EntChatPage';
EntChatPage.propTypes = EntChatPagetPropTypes;

const EntChatPageWithAuth = withAuthentication(EntChatPage);

const mapStoreToProps = store => ({
  loaded: store.graphql.loaded,
  richiestaBase: store.graphql.estraiRichiestaEnte,
  chat: store.graphql.messaggiUtenteEnte
})
const mapDispatchToProps = ({
  graphqlRequest
})
export default connect(mapStoreToProps,mapDispatchToProps)(EntChatPageWithAuth);
