import tabelle from 'tabelle';

export const updateIdSede = `
UPDATE ${tabelle.servizio_erogato_ente}
  SET  id_sede_erogazione_srv=null
    WHERE id_sede_erogazione_srv=$[id_sede];`;