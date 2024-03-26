import tabelle from 'tabelle';

export const selectByIdContenuto = `select ty_contenuto 
from ${tabelle.contenuto} 
where id_contenuto=$[idContenuto]`;