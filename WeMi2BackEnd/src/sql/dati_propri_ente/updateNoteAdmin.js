import tabelle from 'tabelle';

export const updateNoteAdmin = `UPDATE ${tabelle.datiPropriEnte} 
SET js_note_adminwemi=$[js_note:json]
WHERE  id_ente_rif=$[id_ente_rif];`;