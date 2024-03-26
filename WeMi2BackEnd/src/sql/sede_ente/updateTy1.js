import tabelle from 'tabelle';

export const updateTy1 = `UPDATE ${tabelle.sede_ente}
SET js_sede=$[js_sede:json]
WHERE id_ente_rif=$[id_ente_rif] AND ty_sede=1`;