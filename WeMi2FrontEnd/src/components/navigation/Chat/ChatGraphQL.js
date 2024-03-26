/** @format */

const sendMessageQueryName = 'sendMessage';

export const sendMessage = [
  '',
  `mutation ${sendMessageQueryName}($input: InputChat!) {
    ${sendMessageQueryName}(
      input: $input
    )
    {
      id_richiesta_servizio_ente
    }
  }`,
  sendMessageQueryName,
];

const retrieveMessagesQueryName = 'retrieveMessages';

export const retrieveMessages = [
  '',
  `query ${retrieveMessagesQueryName}($idRichiestaServizioEnte: Int!) {
    ${retrieveMessagesQueryName}(
      id_richiesta_servizio: $idRichiestaServizioEnte
    ) {
      id_richiesta_servizio_ente
      id_conversazione_ut_ente
      tx_testo_messaggio 
      fg_msg_ente
      id_utente_autore_msg
      ts_creazione
    }
  }`,
  retrieveMessagesQueryName,
];

const closeChatMutationName = 'DisattivaChatRichiestaServizioEnte';

export const closeChat = [
  '',
  `mutation ${closeChatMutationName}($idRichiestaEnte: Int!) {
    ${closeChatMutationName}(idRichiestaEnte: $idRichiestaEnte)
  } `,
  closeChatMutationName,
];

const updateChatStatusMutationName = 'updateStatoChat';

export const updateChatStatus = [
  '',
  `mutation ${updateChatStatusMutationName}(
    $idRichiestaEnte: Int!,
    $statoChat: Int!,
    $previousState: Int!
  ){
    ${updateChatStatusMutationName}(
      idRichiestaEnte: $idRichiestaEnte,
      statoChat: $statoChat,
      previousState: $previousState
    )
  }`,
  updateChatStatusMutationName,
];

const allegaFileMutationName = 'AllegaFileRichiestaServizioEnte';

export const allegaPreventivo = [
  '',
  `mutation ${allegaFileMutationName}($idRichiestaEnte: Int!, $media: mediaADDInput){
    ${allegaFileMutationName}(
        idRichiestaEnte: $idRichiestaEnte,
        media: $media
    )
  }`,
];

const getAttachmentQueryName = 'getAttachment';

export const getAttachment = [
  '',
  `query ${getAttachmentQueryName}($idRichiestaServizioEnte: Int!){
    ${getAttachmentQueryName}(
      id_richiesta_servizio: $idRichiestaServizioEnte
    ) {
      id_media
      ty_mime_type_media
      nm_nome_media
      oj_media
      ts_creazione
    }
  }
  `,
  getAttachmentQueryName,
];

const deleteAttachmentMutationName = 'deleteAttachment';

export const deleteAttachment = [
  '',
  `mutation ${deleteAttachmentMutationName}($id_media: Int!){
    ${deleteAttachmentMutationName}(id_media: $id_media)
  }`,
  deleteAttachmentMutationName,
];
