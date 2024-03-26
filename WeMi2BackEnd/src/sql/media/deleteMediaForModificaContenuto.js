import tabelle from 'tabelle';

export const deleteMediaForModificaContenuto = `
  DELETE FROM ${tabelle.media}
  WHERE id_media=$[id_media]
  RETURNING *;
`;