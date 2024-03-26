import tabelle from 'tabelle';

export const insertSpazioWemi = `
  INSERT INTO ${tabelle.r_spazio_wemi_ente} (
  id_ente, 
  id_spazio_wemi
  )
  VALUES (
  $[id_ente],
  $[id_spazio_wemi]
  )
`;
