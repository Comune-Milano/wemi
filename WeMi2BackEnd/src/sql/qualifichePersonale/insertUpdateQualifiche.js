export const insertUpdateQualifiche = (idQualifiche, pgpHelpers) => {

  const cs = new pgpHelpers.ColumnSet(["id_servizio_ente", "id_qualifica", "ty_personale_rif"], { table: "r_qual_pers_serv_erog_ente" });

  //creo dinamicamente la lista dei valori
  const values = idQualifiche.map((element) => ({ id_servizio_ente: "$[idServizioEnte]", id_qualifica: element, ty_personale_rif: "$[personaleRif]" }));

  return pgpHelpers.insert(values, cs);
}; 