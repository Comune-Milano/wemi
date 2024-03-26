import tabelle from 'tabelle';

export const selectByTyContenuto = `select * 
from ${tabelle.contenuto}
where ty_contenuto=$[ty_contenuto]
`;