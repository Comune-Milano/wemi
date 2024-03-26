import tabelle from 'tabelle';

export const updateSedeEnte = `UPDATE  ${tabelle.sede_ente}
                  SET js_sede= $[js_sede:json]
                  WHERE id_sede=$[id_sede] and 
                        id_ente_rif=$[id_ente_rif];`;