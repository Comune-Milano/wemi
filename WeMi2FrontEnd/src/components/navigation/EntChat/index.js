/** @format */

import React, {useState, useEffect} from 'react';
import { Row } from 'components/ui/Grid';
import RiepilogoRichiesta from 'components/navigation/RequestsIndex/partials/RiepilogoRichiesta';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { Wrapper, ChatSection, Attachments, RiepilogoRichiestaEnte, RichiestaIniziale } from './partials';
import {graphqlRequest} from 'redux-modules/actions/authActions';
import {allegaPreventivo as allegaPreventivoQ} from './ChatRequestGraphQL';
import withAuthentication from 'hoc/withAuthentication';
import checkCittadino from 'utils/functions/checkCittadino';
import checkEnte from 'utils/functions/checkEnte';

const RiepilogoRichiestaRow = styled(Row)`
  overflow-x: auto;
  max-width: 100%;
`;

const EntChat = ({userProfile,richiestaEnte, richiestaBase, chat, admin, statoChat, setStatoChat, lastState, graphqlRequest}) => {
  const [files, setFiles] = useState(richiestaEnte && richiestaEnte.allegato? {filename: richiestaEnte.allegato.nm_nome_media, base64: richiestaEnte.allegato.oj_media}:[]);
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setUpdate(!update)
  }, [richiestaEnte,richiestaBase, lastState, statoChat, chat])

  const getFiles= async (filesInput) => {
   
      const reader = new FileReader();
      reader.readAsDataURL(filesInput.target.files[0]);
      
      let nomeFile = filesInput.target.value;
      reader.onload = function(event) {
        let contents = event.target.result; 
        setFiles({filename: nomeFile.split('fakepath\\')[1], base64: contents});
        graphqlRequest(allegaPreventivoQ(
          
          {
          idRichiestaEnte: parseInt(window.location.pathname.split('chat/')[1]) ,
          tymedia: contents.split(';base64')[0].replace('data:',''),
          nmMedia:nomeFile.split('fakepath\\')[1],
          ojMedia: contents}))
    };    
  }
    const { datiLogin } = userProfile;
    const ente = checkEnte(datiLogin);
    const cittadino = checkCittadino(datiLogin);
    const idCittadino = datiLogin.idCittadino;
    const idEnte = datiLogin.idEnte ? datiLogin.idEnte : undefined;
    return (
  <Wrapper fluid>
    <RiepilogoRichiestaRow  fluid>
    {!admin && ente && <RiepilogoRichiestaEnte
    setStatoChat={setStatoChat && setStatoChat.bind(this)} statoChat={statoChat} 
    richiestaEnte={richiestaEnte}  lastState={lastState} richiestaBase={richiestaBase}/> }
    {cittadino && <RiepilogoRichiesta admin={admin} richiestaEnte={richiestaEnte} richiestaBase={richiestaBase} />}
    </RiepilogoRichiestaRow>
    <RichiestaIniziale richiestaBase={richiestaBase} e={ente} />
     <ChatSection admin={admin} c={cittadino} e={ente} richiestaBase={richiestaBase} 
    setStatoChat={setStatoChat && setStatoChat.bind(this)} statoChat={statoChat} id={idCittadino} entId={idEnte}
    richiestaEnte={richiestaEnte} lastState={lastState} chat={chat}/> 
    <Attachments admin={admin} c={cittadino} e={ente} getFiles={getFiles} attached={files} statoChat={statoChat} />
  </Wrapper>
)
  };

EntChat.displayName = 'EntChat';
const mapDispatchToProps = ({
  graphqlRequest
})
export default connect(null, mapDispatchToProps)(withAuthentication(EntChat));
