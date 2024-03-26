import tabelle from 'tabelle';

export const updateIdMediaNull = (media) => {
  let baseQuery = `UPDATE ${tabelle.contenuto} `;
  if(media === 'media1'){
    baseQuery += ` SET id_media1=null,
    ts_creazione=localtimestamp
    WHERE id_contenuto=$[idContenuto] `;
  }
  if(media === 'media2'){
    baseQuery += ` SET id_media2=null,
    ts_creazione=localtimestamp
    WHERE id_contenuto=$[idContenuto] `;
  }
  if(media === 'media3'){
    baseQuery += ` SET id_media3=null,
    ts_creazione=localtimestamp
    WHERE id_contenuto=$[idContenuto] `;
  }
  
  return baseQuery;
};