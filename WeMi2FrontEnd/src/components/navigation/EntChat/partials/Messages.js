/** @format */

import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Scrollbar from 'components/ui/Scrollbar';
import { colors } from 'theme';
const MessagesColumn = styled(Column)`
  padding: 0;
  position: relative
  @keyframes messageFadeIn {
    0% {transform: scale(0.6,0.6); opacity: 0}
    20% {transform: scale(1,1)}
    100% {transform: scale(1,1); opacity: 1}
  }

  ${media.md`
    padding: 0 50px 0 0;
    `}

    
  > div {
    > div {
      > div {
      &:last-child {
        animation-name: messageFadeIn;
        animation-duration: .5s;
        }
      }
    }
  }
`;

const scrollbarStyle = {
  height: '350px',
  overflowY: 'hidden',
  overflowX: 'hidden',
  justifyContent: 'space-between',
  width: '100%',
};

const StyledMessages = styled.div`
  border-radius: ${props => props.mine ? "5px 0 0 5px" : "0 5px 5px 0"};
  border: 1px ${props=> props.e && props.mine ? `${colors.blue}` : props.e && !props.mine ? `${colors.primary}` : !props.e && !props.mine ? `${colors.blue}` : `${colors.primary}`} solid;
  width: 100%;
`;

const Messages = ({messaggi, richiestaBase, admin, e, id, entId, richiestaEnte}) => {
return (
  <MessagesColumn xs="12" md={admin ? "12" : "7"} fluid justifycontent="space-between" padding="0 50px 0 0">
  <Scrollbar e={e} scrollBottom horizontal autoHide style={scrollbarStyle}>
  {messaggi && richiestaEnte && messaggi.map( messaggio => {
  if(messaggio.fg_msg_ente === "Y")
  return (
    <Column xs={e ? "10" : "9"} xsShift={e ? "2" : "0"} padding={e ? "0 30px 20px 0" : "0 10px 20px 0"}>
  <StyledMessages mine={e ? true : false} e ={e}>
    <Row fluid justifycontent="space-between" padding={"20px 10px 10px 30px"}>
      <Text value={richiestaEnte.servizioEnte.ente.nm_ente} size="f6" color={'blue'} />
      <Text value={`${messaggio.ts_creazione.split('T')[0]} - h:${messaggio.ts_creazione.split('T')[1].split('Z')[0]}`} size="f9" color="blue" />
    </Row>
    <Row fluid justifycontent="space-between" padding="0 10px 20px 30px">
      <Text
        value={messaggio.tx_testo_messaggio}
        size="f7"
        color="darkGrey"
      />
    </Row>
    <Row fluid /> 
  </StyledMessages>
   </Column>)
 else 
  return (
  <Column xs={e ? "9" : "10"} xsShift={e ? "0" : "2"} padding={!e ? "0 30px 20px 0" : "0 10px 20px 0"}>
<StyledMessages mine={e ? false : true} e={e} >
  <Row fluid justifycontent="space-between" padding="20px 10px 10px 30px">
    <Text value={richiestaBase.user.ptx_username} size="f6" color={'primary'} />
    <Text value={`${messaggio.ts_creazione.split('T')[0]} - h:${messaggio.ts_creazione.split('T')[1].split('Z')[0]}`} size="f9" color="primary" />
  </Row>
  <Row fluid justifycontent="space-between" padding="0 10px 20px 30px">
    <Text
      value={messaggio.tx_testo_messaggio}
      size="f7"
      color="darkGrey"
    />
  </Row>
  <Row fluid /> 
</StyledMessages>
 </Column>)
  })}  
</Scrollbar>    
  </MessagesColumn>
)};

Messages.displayName = 'Messages';

export default Messages;
