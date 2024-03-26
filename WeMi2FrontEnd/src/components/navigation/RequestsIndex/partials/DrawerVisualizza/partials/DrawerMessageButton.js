
import React, { useState } from 'react';
import Button from 'components/ui2/Button'
import DrawerChat from 'components/navigation/Chat';
import { RICHIESTA_ENTE_ACCETTATA, RICHIESTA_ENTE_PAGATA } from 'types/stati-richieste/richiesteEnte';
import { chatStatus } from 'types/chatStatus';

const DrawerMessageButton = ({ requestInfo, fontSize }) => {
  const [chatVisible, setChatVisible] = useState(false);

  const pagata = requestInfo.statoRichiestaEnte === RICHIESTA_ENTE_PAGATA;
  const accettata = requestInfo.statoRichiestaEnte === RICHIESTA_ENTE_ACCETTATA;

  const formatRequestInfo = () => {
    const requestInfoChat = { ...requestInfo };

    requestInfoChat.dataRichiestaBaseA = null;
    requestInfoChat.dataRichiestaBaseDa = null;

    if ((!requestInfo.richiestaDisponibilita && (pagata || accettata)) || requestInfo.richiestaDisponibilita) {
      requestInfoChat.dataRichiestaBaseA = requestInfo.dataAl || requestInfo.dataRichiestaBaseA;
      requestInfoChat.dataRichiestaBaseDa = requestInfo.dataDal || requestInfo.dataRichiestaBaseDa;
    }

    return requestInfoChat;

  };

  const isTerminata= requestInfo.statoChat === chatStatus.TERMINATA;
  const isChiusa= requestInfo.statoChat === chatStatus.CHIUSA;

  return (
    <>
      {
        chatVisible ?
          (
            <DrawerChat
              newChatStatus={chatStatus.MESSAGGIO_CITTADINO}
              usernameCittadino="Tu"
              requestInfo={formatRequestInfo()}
              usernameEnte={requestInfo.nomeEnte}
              titoloChat={requestInfo.nomeEnte}
              onEscape={() => setChatVisible(false)}
              onUnload={() => setChatVisible(false)}
              messageHeaderVisible
              textAreaVisible={!(isChiusa || isTerminata)}
              sendButtonVisible={!(isChiusa || isTerminata)}
              isTextareaDisabled={isChiusa || isTerminata }
            />
          ) : null
      }
      <Button
        color="orange"
        label="MESSAGGI"
        fontSize={fontSize}
        onClick={() => setChatVisible(true)}
        disabled={isChiusa}
      />
    </>
  );
};

DrawerMessageButton.displayName = 'DrawerMessageButton';

export default DrawerMessageButton;