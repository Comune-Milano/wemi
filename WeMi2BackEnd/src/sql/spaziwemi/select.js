export const getMinPriceTCB = `

select 
  cd_dominio_tcb_19 as "idHourType", 
  id_servizio as "idService",
  id_servizio_tecnico as "idTechnicalService",
  min(coalesce(valore,0)) as "prezzoMinimo" -- il valore null esce solo per i gratuiti
from wemi2.servizio_erogato_ente a
-- deve essere valido nel giorno (gestire la data aperta)
inner join wemi2.srv_prezzo b on a.id_servizio_ente = b.id_servizio_ente 
           and current_date between b.dt_inizio and coalesce(b.dt_fine,'9999-12-31')
-- se è gratuito può non avere i record in srv_prezzo*, in quel caso il minimo è zero
left outer join wemi2.srv_prezzo_persone c on b.id_prezzo = c.id_prezzo
left outer join wemi2.srv_prezzo_persone_quantita d on c.id_prezzo_persone = d.id_prezzo_persone
-- la scheda servizio deve essere valida
inner join wemi2.servizio_erogato_ente_stt e on a.id_servizio_ente = e.id_servizio_ente and e.cd_stato_dati_servizio_ente = '31'
           and e.ts_variazione_stato = (select max(f.ts_variazione_stato) from wemi2.servizio_erogato_ente_stt f where f.id_servizio_ente = e.id_servizio_ente)
-- la scheda ente deve essere valida
inner join wemi2.ente_stt g on a.id_ente_erogatore = g.id_ente and g.cd_stato_ente = '31'
           and g.ts_variazione_stato = (select max(h.ts_variazione_stato) from wemi2.ente_stt h where h.id_ente = g.id_ente)
inner join wemi2.r_servizio_tcb_orario_servizio as rstos  ON
  a.id_servizio_riferimento = rstos.id_servizio
where rstos.id_servizio_tecnico = $[idServizio]
GROUP BY cd_dominio_tcb_19, id_servizio, id_servizio_tecnico;

`;

export const getServicesTCB = `
SELECT 
  cd_dominio_tcb_19 as "idHourType", 
  id_servizio as "idService",
  id_servizio_tecnico as "idTechnicalService"
FROM wemi2.r_servizio_tcb_orario_servizio
WHERE id_servizio_tecnico = $[idServizio]         
`;
