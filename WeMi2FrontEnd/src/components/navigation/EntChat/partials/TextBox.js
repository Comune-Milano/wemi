/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { Row, Column } from 'components/ui/Grid';
import TextArea from 'components/ui/TextArea';
import Label from 'components/ui/Label';
import Button from 'components/ui/Button';
import styled from 'styled-components';
import media from 'utils/media-queries';
import {
  sendMessage as sendMessageQ,
  retrieveMessages as retrieveMessagesQ,
  scambiaInformazioni as scambiaInformazioniQ
} from '../ChatRequestGraphQL';
const TextBoxColumn = styled(Column)`
  padding: 0;

  ${media.md`
    padding: 0 0 0 40px;
    `}
`;

const TextBox = ({ graphqlRequest, messaggi, setNewMessage,
  richiestaEnte,
  update,
  setUpdate,
  richiestaBase,
  statoChat,
  setStatoChat,
  e,
  c,
  id,
  entId
}) => {
  const [textArea, setTextArea] = useState('');
  const [reset, setReset] = useState(false)
  const handleChangeTextArea = value => {
    setTextArea(value);
  };
  const lastState = richiestaEnte && richiestaEnte.storiaStati[richiestaEnte.storiaStati.length - 1]


  const sendMessage = () => {
    graphqlRequest(sendMessageQ({
      id_richiesta_servizio_ente: parseInt(window.location.pathname.split('chat/')[1]),
      tx_testo_messaggio: textArea
    }))
    let messaggiNuovi = [];
    messaggiNuovi = messaggi;
    messaggiNuovi.push({
      id_richiesta_servizio_ente: parseInt(window.location.pathname.split('chat/')[1]),
      tx_testo_messaggio: textArea,
      id_utente_autore_msg: id,
      fg_msg_ente: e ? 'Y' : 'N',
      ts_creazione: new Date().toJSON()
    })
    messaggiNuovi.sort((a, b) => {
      let primoElemento = new Date(a.ts_creazione);
      let secondoElemento = new Date(b.ts_creazione);
      if (primoElemento.valueOf() > secondoElemento.valueOf())
        return 1;
    }
    )
    setNewMessage.bind(this);
    setNewMessage(messaggiNuovi);
  }
  return (
    <TextBoxColumn xs="12" md="5" fluid justifycontent="space-between">
      <Row fluid>
        <Label
          value="Messaggio"
          weight="bold"
          transform="uppercase"
          intlFormatter
          color={e ? 'blue' : 'primary'}
          bgcolor="grey"
          margin="0"
          size="f8"
        />
      </Row>
      <Row fluid padding="1em 0">
        {textArea!=='' ?

        <TextArea
        material
        color={e ? 'blue' : 'primary'}
        width="100%"
        height="200px"
        getValue={handleChangeTextArea}
        name=" "
        value="Scrivi qui..."
        reset = {reset}
        setReset = {setReset}
      />

      : <TextArea
      material
      color={e ? 'blue' : 'primary'}
      width="100%"
      height="200px"
      getValue={handleChangeTextArea}
      name=" "
      value="Scrivi qui..."
      reset = {reset}
      setReset = {setReset}
    />}

      </Row>
      <Row fluid>
        <Column xs="6" xsShift="6" padding="20px 0">
         {textArea=='' ?
          <Button type="disabled" disabled value="Invia"  > </Button>
          :
          <Button value="Invia"
            type={lastState.cd_stato_chat === '0' && !e ? 'disabled' : e ? 'primary' : 'default'}
            disabled={lastState.cd_stato_chat === '0' && !e}
            onClick={() => {
                graphqlRequest(scambiaInformazioniQ({ idRichiestaEnte: richiestaEnte.id_richiesta_servizio_ente, statoChat: e ? 1 : 2,
                previousState: lastState.cd_stato_chat }))
                if(statoChat === 0) {
                  setStatoChat.bind(this);
                  setStatoChat(e ? 1 : 2);
                }
                  setReset(true)
                  setTextArea('')
                  sendMessage();
                setUpdate.bind(this) && setUpdate(!update)
              }
            } /> }
        </Column>
      </Row>
    </TextBoxColumn>
  );
};

TextBox.displayName = 'TextBox';
const mapDispatchToProps = ({ graphqlRequest })
export default connect(null, mapDispatchToProps)(TextBox);
