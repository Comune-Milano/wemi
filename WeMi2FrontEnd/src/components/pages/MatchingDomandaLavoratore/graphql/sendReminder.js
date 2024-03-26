const sendReminderMutationName = 'sendPromemoriaDisponibilita';

export const sendReminder = [
  '',
  `mutation ${sendReminderMutationName}($idLavoratore: Int!){
    ${sendReminderMutationName}(idLavoratore: $idLavoratore)
    }
`,
sendReminderMutationName
];
