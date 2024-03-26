
import React, { memo, useState, useEffect } from 'react';
import NestedWindow from 'libs/NestedWindow';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { Row } from 'components/ui/Grid';
import { fileToBase64 } from 'utils/functions/fileToBase64';
import { chatStatus as chatStatusTypes } from 'types/chatStatus';
import ChatHeader from './Header';
import ChatBody from './Body';
import ChatFooter from './Footer';
import {
  retrieveMessages as retrieveMessagesQuery,
  sendMessage as sendMessageMutation,
  allegaPreventivo as allegaPreventivoMutation,
  deleteAttachment as deleteAttachmentMutation,
  getAttachment as getAttachmentQuery,
  updateChatStatus as updateChatStatusMutation,
} from './ChatGraphQL';

const ChatRichiestaServizio = ({
  onUnload,
  onEscape,
  requestInfo,
  isTextareaDisabled,
  newChatStatus,
  usernameCittadino,
  usernameEnte,
  titoloChat,
  chiudiChatVisible,
  messageHeaderVisible,
  textAreaVisible,
  sendButtonVisible,
  uploadFileVisible
}) => {
  // The message typed by the user.
  const [inputMessage, setInputMessage] = useState('');

  // The status of the chat.
  const [chatStatus, setChatStatus] = useState(requestInfo.statoChat);

  // Retrieve and stores the attachment of the chat
  const [attachment, loadAttachment] = useGraphQLRequest(
    undefined,
    getAttachmentQuery,
    { idRichiestaServizioEnte: requestInfo.idRichiestaServizioEnte },
    true
  );

  // Performs the mutation to delete a attachment
  const [deleteAttachmentState, deleteAttachment] = useGraphQLRequest(
    undefined,
    deleteAttachmentMutation,
  );

  // Retrieves and stores the messages from the backend.
  const [messages, loadMessages] = useGraphQLRequest(
    [],
    retrieveMessagesQuery,
    { idRichiestaServizioEnte: requestInfo.idRichiestaServizioEnte },
    true,
  );

  // Performs the mutation to upload a file.
  const [uploadFileState, uploadFile] = useGraphQLRequest(
    [],
    allegaPreventivoMutation,
  );

  // Performs the mutation to send a message.
  const [addedMessageState, sendMessage] = useGraphQLRequest(
    undefined,
    sendMessageMutation,
  );

  // Performs the mutation to change the status of the chat.
  const updateChatStatus = useStatelessGraphQLRequest(
    updateChatStatusMutation,
  );

  /**
   * Determines if the sending is disabled.
   */
  const isSendDisabled = () => {
    // Disable the sending if:
    // - The loading of the messages is in progress OR
    // - The message textarea is empty.
    return isTextareaDisabled ||
      messages.isLoading ||
      addedMessageState.isLoading ||
      !inputMessage;
  };

  /**
   * Upload handler.
   */
  const onUploadFile = async (files) => {
    const file = files[0];

    if (file) {
      const base64 = await fileToBase64(file);
      const media = {
        ty_mime_type_media: file.type,
        nm_nome_media: file.name,
        oj_media: base64,
      };
      await uploadFile({
        idRichiestaEnte: requestInfo.idRichiestaServizioEnte,
        media,
      });

      if (uploadFileState.data) {
        loadAttachment();
      }
    }
  };

  /**
   * Delete attachment handler.
   */
  const onRemoveFile = async (idMedia) => {
    await deleteAttachment({ id_media: idMedia });
    if (deleteAttachmentState.data) {
      loadAttachment();
    }
  };

  /**
   * Performs the requests to post a new message and
   * update the list of displayed messages.
   * @param {*} message
   */
  const onSendMessage = async (message) => {
  
    // Resets message text field.
    setInputMessage('');

    // Performs the mutation to post the message.
    const input = {
      id_richiesta_servizio_ente: requestInfo.idRichiestaServizioEnte,
      tx_testo_messaggio: message
    };
    await sendMessage({
      input
    });
  // Reload the list of messages.
   loadMessages();
 
    // Updates chat status if changed.
    if (newChatStatus !== chatStatus) {
      updateChatStatus({
        idRichiestaEnte: requestInfo.idRichiestaServizioEnte,
        statoChat: newChatStatus,
        previousState: chatStatus,
      })
        .then(success => {
          if (success) {
            setChatStatus(newChatStatus);
          }
        });
    }
  };

  /**
   * Closes the chat.
   */
  const onCloseChat = async () => {
    const success = await updateChatStatus({
      idRichiestaEnte: requestInfo.idRichiestaServizioEnte,
      statoChat: chatStatusTypes.TERMINATA,
      previousState: chatStatus,
    });

    if (success) {
      setChatStatus(chatStatusTypes.TERMINATA);
    }
  };

  /**
   * Syncs the local chat status whenever
   * it changes in the request info.
   */
  useEffect(
    () => setChatStatus(requestInfo.statoChat),
    [requestInfo.statoChat]
  );

  return (
    <NestedWindow
      title="WeMi - La città per il Welfare"
      width={(parseInt(window.innerWidth, 10) * 0.6)}
      height={(parseInt(window.innerHeight, 10) * 0.8)}
      onEscape={onEscape}
      onUnload={onUnload}
    >
      <Row
        flex
        direction="column"
        justifycontent="space-between"
        minHeight="100%"
      >
        <ChatHeader
          chatTitle={titoloChat}
          requestInfo={requestInfo}
          chatStatus={chatStatus}
          onCloseChat={onCloseChat}
          chiudiChatVisible={chiudiChatVisible}
          messageHeaderVisible={messageHeaderVisible}
        />
        <ChatBody
          messages={messages.data}
          messagesLoading={messages.isLoading}
          noteCittadino={requestInfo.noteCittadino}
          usernameEnte={usernameEnte}
          usernameCittadino={usernameCittadino}
        />
        <ChatFooter
          message={inputMessage}
          attachment={attachment.data}
          sendDisabled={isSendDisabled()}
          textAreaDisabled={isTextareaDisabled}
          fileDisabled={isTextareaDisabled}
          onChangeMessage={setInputMessage}
          onSendMessage={onSendMessage}
          onUploadFile={onUploadFile}
          onRemoveFile={onRemoveFile}
          textAreaVisible={textAreaVisible}
          sendButtonVisible={sendButtonVisible}
          uploadFileVisible={uploadFileVisible}
        />
      </Row>
    </NestedWindow>
  );
};

ChatRichiestaServizio.displayName = 'ChatRichiestaServizio';

export default memo(ChatRichiestaServizio);
