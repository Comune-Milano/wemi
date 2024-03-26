import tabelle from 'tabelle';

export const selectByIdUtente = `
SELECT cd_attributo
FROM ${tabelle.val_attributo_ut}
WHERE 
id_utente =$[idUtente];
`;