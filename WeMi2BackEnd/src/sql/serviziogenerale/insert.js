export const insertTag = `
  INSERT INTO 
    wemi2.servizio_tag(id_servizio, tx_tag_ricerca)
  VALUES
    ($[idServizio], $[tag])
`;