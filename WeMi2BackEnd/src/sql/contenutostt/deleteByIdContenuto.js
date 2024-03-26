import tabelle from 'tabelle';

export const deleteByIdContenuto = `DELETE 
FROM ${tabelle.contenuto_stt}
WHERE id_contenuto IN (SELECT id_contenuto 
                       FROM ${tabelle.contenuto} 
                       WHERE ty_contenuto=$[ty_contenuto]);
DELETE FROM ${tabelle.contenuto}
WHERE ty_contenuto=$[ty_contenuto];
`