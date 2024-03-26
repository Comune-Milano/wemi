import tabelle from 'tabelle';

export const updateSetIdMedia = (media) => {
  let baseQuery = `UPDATE ${tabelle.contenuto} `;
  if(media === 'media1'){
    baseQuery += ` SET id_media1=$[id_media],
    ts_creazione=localtimestamp
    WHERE id_contenuto=$[idContenuto] `;
  } 
  if(media === 'media2'){
    baseQuery += `SET id_media2=$[id_media],
    ts_creazione=localtimestamp
    WHERE id_contenuto=$[idContenuto] `;
  }
  if(media === 'media3'){
    baseQuery += `SET id_media3=$[id_media],
    ts_creazione=localtimestamp
    WHERE id_contenuto=$[idContenuto] `;
  }

  return baseQuery;
};
