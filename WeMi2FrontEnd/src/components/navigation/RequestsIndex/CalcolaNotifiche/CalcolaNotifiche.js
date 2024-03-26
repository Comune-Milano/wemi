

export const CalcolaNotifiche = (request, azzeraNotifiche) => {
  let notifiche = {
    messaggi: 0,
    serviziAcquistabili: 0,
  };

  if (!azzeraNotifiche) {
    for (const richiesta of request.richiestaEnte) {
      const lastIndex = richiesta.storiaStati.length -1;
      const lastState = richiesta.storiaStati[lastIndex];
      const statoChat = lastState.cd_stato_chat;
      const statoRichiesta = lastState.cd_stato_ric_serv_ente;
      if (statoChat === '1' && statoRichiesta === '3') {
        notifiche.messaggi = notifiche.messaggi + 1;
      }
      if (statoRichiesta === '2') {
        notifiche.serviziAcquistabili = notifiche.serviziAcquistabili + 1;
      }
    }
  }
  return notifiche;
}
