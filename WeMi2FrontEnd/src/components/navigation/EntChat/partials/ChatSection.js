/** @format */

import React, { useState, useEffect } from 'react';
import { Row } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';
import Messages from './Messages';
import TextBox from './TextBox';

const ChatSectionRow = styled(Row)`
  border-top: 0.5px solid ${colors.grey};
  border-bottom: none;
  padding-top: 40px;
`;

const ChatSection = ({richiestaBase,chat, admin, richiestaEnte, statoChat, setStatoChat, e, c, id, entId }) => {
  const [newMessage, setNewMessage] = useState([]);
  const [update, setUpdate] = useState(chat && chat.retrieveMessages);

  const getNewMessage = (array) =>{
    setNewMessage(array)
  }
  useEffect(() => {
      if(chat && newMessage !== chat.retrieveMessages)
      setNewMessage(chat.retrieveMessages)
  }, [chat])
  
  return (
  <ChatSectionRow fluid justifycontent="space-between">
    <Messages admin={admin} e={e} c={c} richiestaBase={richiestaBase} richiestaEnte={richiestaEnte} messaggi={newMessage} id={id} entId={entId} update={update} />
   {!admin && richiestaEnte &&
   <TextBox  setStatoChat={setStatoChat.bind(this)} statoChat={statoChat}  
   e={e} c={c}
   setNewMessage={getNewMessage} richiestaBase={richiestaBase} richiestaEnte={richiestaEnte} 
   setUpdate={setUpdate} update={update}
   messaggi={newMessage} id={id} entId={entId} />}
  </ChatSectionRow>
);

}

ChatSection.displayName = 'ChatSection';
export default ChatSection;
