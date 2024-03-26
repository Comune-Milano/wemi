export const inserisciRelazioneOperatoreEnteSql = `
INSERT INTO wemi2.r_operatore_ente (id_utente, id_ente) 
VALUES ($[id_utente], $[id_ente]);
`;
