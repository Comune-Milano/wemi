export const extractMunicipality = `
SELECT cd_municipio as id, 
tl_valore_testuale ->> 'it' as value
FROM  wemi2.d_municipio
`; 