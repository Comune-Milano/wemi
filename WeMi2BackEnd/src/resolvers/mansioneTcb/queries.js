export const estraiMansioniColfQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb", 
cd_dominio_tcb as "cdDominioTcb", 
pg_visualizzazione as "pgVisualizzazzione", 
tl_valore_testuale as "txTitoloMansione", 
nr_valore_min_rif as "minRif", 
nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 41
ORDER BY pg_visualizzazione ASC, cd_dominio_tcb ASC 
`;

export const estraiMansioniTataQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb", 
cd_dominio_tcb as "cdDominioTcb", 
pg_visualizzazione as "pgVisualizzazzione", 
tl_valore_testuale as "txTitoloMansione", 
nr_valore_min_rif as "minRif", 
nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 40 and fg_domanda = '1'
ORDER BY pg_visualizzazione ASC, cd_dominio_tcb ASC 
`;

export const estraiMansioniTataCandidaturaQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb", 
cd_dominio_tcb as "cdDominioTcb", 
pg_visualizzazione as "pgVisualizzazzione", 
tl_valore_testuale as "txTitoloMansione", 
nr_valore_min_rif as "minRif", 
nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 54
ORDER BY pg_visualizzazione ASC, cd_dominio_tcb ASC 
`;

export const estraiMansioniBadanteQuery=`
SELECT ty_dominio_tcb as "tyDominioTcb", 
cd_dominio_tcb as "cdDominioTcb", 
pg_visualizzazione as "pgVisualizzazione", 
tl_valore_testuale as "txTitoloMansione", 
nr_valore_min_rif as "minRif", 
nr_valore_max_rif as "maxRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb = 43
ORDER BY pg_visualizzazione ASC, cd_dominio_tcb ASC 
`;