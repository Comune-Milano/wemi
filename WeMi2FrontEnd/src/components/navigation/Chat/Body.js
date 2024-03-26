
import React, { memo } from 'react';
import moment from 'moment';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import Loader from 'components/ui2/Loader';
import MessageBox from './MessageBox';


const ChatBody = ({
  messages,
  messagesLoading,
  usernameEnte,
  usernameCittadino,
  noteCittadino,
}) => {
  let lastMessageDate = null;
  const emptyMessages = messages.length === 0;

  return (
    <div style={{ padding: '4em 6em', width: '100%' }}>
      {
        emptyMessages && !noteCittadino ?
          (
            <Text
              tag="span"
              value="Non è stato ancora inviato alcun messaggio."
              color="grey"
              weight="semiBold"
              size="f6"
            />
          ) : null
      }
      {
        noteCittadino ?
          (
            <Row padding="1rem 0">
              <Column
                padding="0"
                xs={10}
                xsShift={2}
              >
                <MessageBox
                  backgroundActive
                  userName={usernameCittadino}
                  message={noteCittadino}
                  color="orange"
                />
              </Column>
            </Row>
          ) : null
      }
      {
        messages.map(message => {
          const fromEnte = message.fg_msg_ente === 'Y';
          const currentMessageDate = moment(message.ts_creazione);
          const isNewDay = !lastMessageDate || !currentMessageDate.isSame(lastMessageDate, 'days');
          lastMessageDate = currentMessageDate;

          return (
            <React.Fragment key={message.id_conversazione_ut_ente}>
              {
                isNewDay ?
                  (
                    <>
                      <Text
                        tag="span"
                        value={currentMessageDate.format('D/M/YYYY')}
                        color="grey"
                        size="f8"
                      />
                      <Hr
                        width="100%"
                        height="1.5px"
                        color="grey"
                        type="solid"
                        top="0px"
                        bottom="1em"
                      />
                    </>
                  ) :
                  null
              }
              <Row padding="1rem 0">
                <Column
                  padding="0"
                  xs={10}
                  xsShift={fromEnte ? 0 : 2}
                >
                  <MessageBox
                    userName={fromEnte ? usernameEnte : usernameCittadino}
                    message={message.tx_testo_messaggio}
                    color={fromEnte ? 'primary' : 'orange'}
                    messageTime={moment(message.ts_creazione).format('H:mm')}
                  />
                </Column>
              </Row>
            </React.Fragment>
          );
        })
      }
      {
        // se sta caricando i messaggi mostra il Loader
        messagesLoading ?
          <Loader />
          : null
      }
    </div>
  );
};

ChatBody.displayName = 'ChatBody';

export default memo(ChatBody);
