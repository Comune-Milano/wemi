export const insertSedeErogatrice = `
INSERT INTO 
  wemi2.r_sede_ente_servizio_erog(
    id_servizio_ente,
    id_sede_erogazione_srv,
    fg_accompagnamento_sede
  )
VALUES
  (
    $[idServizioEnte],
    $[idSedeErogazione],
    $[fgAccompagnamentoSede]
  )
`;