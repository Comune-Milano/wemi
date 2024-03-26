export const estraiStatoOccupazionaleQuery=  `
  SELECT ty_dominio_tcb as "tyDominioTcb", 
    cd_dominio_tcb as "cdDominioTcb", 
    pg_visualizzazione as "pgVisualizzazione", 
    tl_valore_testuale as "tlValoreTestuale", 
    nr_valore_min_rif as "minRif", 
    nr_valore_max_rif as "maxRif"
  FROM  wemi2.dominio_tcb
  WHERE ty_dominio_tcb = 36
  ORDER BY pg_visualizzazione ASC
`;

export const estraiCorsiTataQuery= `
SELECT ty_dominio_tcb as "tyDominioTcb",
  cd_dominio_tcb as "cdDominioTcb",
  pg_visualizzazione as "pgVisualizzazione",
  tl_valore_testuale as "tlValoreTestuale",
  nr_valore_min_rif as "minRif",
  nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 22
ORDER BY pg_visualizzazione ASC
  `;

export const estraiCorsiBadanteQuery= `
SELECT ty_dominio_tcb as "tyDominioTcb",
  cd_dominio_tcb as "cdDominioTcb",
  pg_visualizzazione as "pgVisualizzazione",
  tl_valore_testuale as "tlValoreTestuale",
  nr_valore_min_rif as "minRif",
  nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 23
ORDER BY pg_visualizzazione ASC
  `;

export const estraiLingueParlateQuery=`
  SELECT ty_dominio_tcb as "tyDominioTcb", 
    cd_dominio_tcb as "cdDominioTcb", 
    pg_visualizzazione as "pgVisualizzazione", 
    tl_valore_testuale as "tlValoreTestuale", 
    nr_valore_min_rif as "minRif", 
    nr_valore_max_rif as "maxRif"
  FROM  wemi2.dominio_tcb
  WHERE ty_dominio_tcb = 24
  ORDER BY pg_visualizzazione
`;

export const estraiInteressiQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb",
  cd_dominio_tcb as "cdDominioTcb",
  pg_visualizzazione as "pgVisualizzazione",
  tl_valore_testuale as "tlValoreTestuale",
  nr_valore_min_rif as "minRif",
  nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 39
  `;

export const estraiCarattereLavoratoreQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb",
  cd_dominio_tcb as "cdDominioTcb",
  pg_visualizzazione as "pgVisualizzazione",
  tl_valore_testuale as "tlValoreTestuale",
  nr_valore_min_rif as "minRif",
  nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 16
ORDER BY pg_visualizzazione
  `;  

export const estraiAltezzaQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb", 
cd_dominio_tcb as "cdDominioTcb", 
pg_visualizzazione as "pgVisualizzazione", 
tl_valore_testuale as "tlValoreTestuale", 
nr_valore_min_rif as "minRif", 
nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 7
`;

export const estraiCorporaturaQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb", 
cd_dominio_tcb as "cdDominioTcb", 
pg_visualizzazione as "pgVisualizzazione", 
tl_valore_testuale as "tlValoreTestuale", 
nr_valore_min_rif as "minRif", 
nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 8
`;

export const estraiFasciaEtaQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb", 
cd_dominio_tcb as "cdDominioTcb", 
pg_visualizzazione as "pgVisualizzazione", 
tl_valore_testuale as "tlValoreTestuale", 
nr_valore_min_rif as "minRif", 
nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 6
`;

export const estraiPatologieGenericheQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb",
  cd_dominio_tcb as "cdDominioTcb",
  pg_visualizzazione as "pgVisualizzazione",
  tl_valore_testuale as "tlValoreTestuale",
  nr_valore_min_rif as "minRif",
  nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 48
ORDER BY pg_visualizzazione
  `;

export const estraiPatologieQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb", 
cd_dominio_tcb as "cdDominioTcb", 
pg_visualizzazione as "pgVisualizzazione", 
tl_valore_testuale as "tlValoreTestuale", 
nr_valore_min_rif as "minRif", 
nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 20
ORDER BY pg_visualizzazione
`;  