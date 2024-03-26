
export const extractDomainByType = (tyDomains) => `
SELECT cd_dominio_tcb as id, 
tl_valore_testuale ->> 'it' as value,
cast(ty_dominio_tcb as int) as type,
pg_visualizzazione as "pgVisualizzazione",
nr_valore_max_rif as "nrValoreMaxRif",
nr_valore_min_rif as "nrValoreMinRif"
FROM  wemi2.dominio_tcb
WHERE ty_dominio_tcb IN (${tyDomains.join(',')})
ORDER BY pg_visualizzazione, cd_dominio_tcb
`;