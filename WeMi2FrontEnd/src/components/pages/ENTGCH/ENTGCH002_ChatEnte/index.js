/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import EntChat from 'components/navigation/EntChat';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';

import ChatEntePagePropTypes from './propTypes';
import {
  retrieveMessages as retrieveMessagesQ,
  estraiRichiestaEnte as estraiRichiestaEnteQ,
} from './ChatRequestGraphQL';

const ChatEntePage = ({
  graphqlRequest,
  richiestaBase,
  chat,
}) => {
  const [lastState, setLastState] = useState(0)
  const [statoChat, setStatoChat] =  useState(lastState && lastState.cd_stato_chat && parseInt(lastState.cd_stato_chat));
  
    const richiestaEnte = richiestaBase && richiestaBase.EstraiRichiestaEnte && richiestaBase.EstraiRichiestaEnte.richiestaServizioBase&& richiestaBase.EstraiRichiestaEnte.richiestaServizioBase.richiestaEnte.filter(el => {
    if(parseInt(el.id_richiesta_servizio_ente) === parseInt(window.location.pathname.split('chat/')[1])) return el; else{ return null; }})[0]

    useEffect(()=>{
    if(!richiestaEnte || (lastState && (statoChat!==  parseInt(lastState.cd_stato_chat))))
    graphqlRequest(estraiRichiestaEnteQ(window.location.pathname.split('chat/')[1]));
    if(!chat)
    graphqlRequest(retrieveMessagesQ(window.location.pathname.split('chat/')[1]));
    if((!lastState && richiestaEnte && richiestaEnte.storiaStati) || 
      lastState && (lastState !== richiestaEnte.storiaStati[richiestaEnte.storiaStati.length -1])) {
    setLastState( richiestaEnte.storiaStati[richiestaEnte.storiaStati.length -1])
    }
    if(lastState && (statoChat!==  parseInt(lastState.cd_stato_chat))) {
      setStatoChat(lastState && lastState.cd_stato_chat && parseInt(lastState.cd_stato_chat))
    }
  }
  ,[richiestaEnte, chat, lastState, statoChat])


  const BreadcrumbPath = [
    {
      slash:  'Gestione Richieste Servizi Ente',
      url: richiestaEnte && chat &&  `e/${richiestaEnte.servizioEnte.ente.id_ente}/handleRequests/`
    },
    {
      slash:  richiestaBase && 
      `Conversazione con ${richiestaBase.EstraiRichiestaEnte.richiestaServizioBase.user.ptx_username}`,
      url: richiestaEnte && chat && `chat/${window.location.pathname.split('chat/')[1]}`
      // `Conversazione tra ${richiestaEnte.EstraiRichiestaEnte.servizioEnte.ente.nm_ente} e 
      // ${richiestaEnte.EstraiRichiestaEnte.richiestaServizioBase.user.ptx_username}`,
     // url: 'r/idRequestsIndex' 
    },

  ]

  return(
  <Wrapper>
    
<Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
<Row fluid padding="20px">
    <Text size="f3" intlFormatter value="Conversazione con" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
    <Text size="f3"  value={richiestaBase && richiestaBase.EstraiRichiestaEnte.richiestaServizioBase.user && richiestaBase.EstraiRichiestaEnte.richiestaServizioBase.user.ptx_username} color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
    </Row>
    <EntChat
      richiestaEnte={richiestaEnte && richiestaEnte} 
      richiestaBase={richiestaBase && richiestaBase.EstraiRichiestaEnte && 
        richiestaBase.EstraiRichiestaEnte.richiestaServizioBase} 
      statoChat={lastState && parseInt(lastState.cd_stato_chat)}
      setStatoChat={setStatoChat}
      lastState={lastState && lastState}
      chat={chat && chat}/> 
    
     
  </Wrapper>
)};

ChatEntePage.displayName = 'ChatEntePage';
ChatEntePage.propTypes = ChatEntePagePropTypes;
const mapStoreToProps = store => ({
  richiestaBase: store.graphql.estraiRichiestaEnte,
  chat: store.graphql.messaggiUtenteEnte,
});

const mapDispatchToProps = ({
  graphqlRequest,
});

export default connect(mapStoreToProps,mapDispatchToProps)(ChatEntePage);
