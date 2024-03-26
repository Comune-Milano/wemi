import tabelle from 'tabelle';

export const deleteSede = `
Delete from ${tabelle.sede_ente} 
 where id_sede = $[id_sede] ;`;