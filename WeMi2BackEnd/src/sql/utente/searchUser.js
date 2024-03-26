import tabelle from 'tabelle';

export const searchUser = `
  SELECT * 
  FROM ${tabelle.utente}
  WHERE id_utente=$[idUtente]              
`;