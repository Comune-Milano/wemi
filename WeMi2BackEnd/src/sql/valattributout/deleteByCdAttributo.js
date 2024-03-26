import tabelle from 'tabelle';

export const deleteByCdAttributo = `
DELETE FROM ${tabelle.val_attributo_ut}
where id_utente = $[idUtente] AND cd_attributo = $[ls];`