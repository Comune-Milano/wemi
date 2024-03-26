import tabelle from 'tabelle';

export const insertCatAcc = `
  INSERT INTO ${tabelle.r_cat_acc_ente} (
  id_ente, 
  id_cat_accreditamento
  )
  VALUES (
  $[id_ente], 
  $[id_cat_accreditamento]
  )
`;
