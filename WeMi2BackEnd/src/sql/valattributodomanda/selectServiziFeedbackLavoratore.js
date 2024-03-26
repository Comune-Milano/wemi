export const selectServiziFeedbackLavoratore = ` (SELECT id_servizio_erogato_ente,
    CASE cd_attributo
    WHEN 62 then 'Baby-sitter'
    ELSE cd_attributo::varchar
    END AS nomeservizio
   from wemi2.val_attributo_domanda as val
   LEFT JOIN wemi2.richiesta_servizio_ente ent ON (val.id_richiesta_servizio_tcb = ent.id_richiesta_servizio_ente)
   WHERE id_richiesta_servizio_tcb = $[id_richiesta_servizio_tcb] and cd_attributo = 62
   LIMIT 1)
   UNION
   (SELECT id_servizio_erogato_ente,
    CASE cd_attributo
    WHEN 61 then 'Colf'
    ELSE cd_attributo::varchar
    END AS nomeservizio 
   from wemi2.val_attributo_domanda as val
   LEFT JOIN wemi2.richiesta_servizio_ente ent ON (val.id_richiesta_servizio_tcb = ent.id_richiesta_servizio_ente)
   WHERE id_richiesta_servizio_tcb = $[id_richiesta_servizio_tcb] and cd_attributo = 61
   LIMIT 1) 
   UNION
   (SELECT id_servizio_erogato_ente,
    CASE cd_attributo
    WHEN 60 then 'Badante'
    ELSE cd_attributo::varchar
    END AS nomeservizio 
   from wemi2.val_attributo_domanda as val
   LEFT JOIN wemi2.richiesta_servizio_ente ent ON (val.id_richiesta_servizio_tcb = ent.id_richiesta_servizio_ente)
   WHERE id_richiesta_servizio_tcb = $[id_richiesta_servizio_tcb] and cd_attributo = 60
   LIMIT 1
    )
    UNION 
	(SELECT id_servizio_erogato_ente, js_dati_richiesta #>> '{nomeServizioAltro}'
    FROM wemi2.val_attributo_domanda as val
    LEFT JOIN wemi2.richiesta_servizio_ente ent ON (val.id_richiesta_servizio_tcb = ent.id_richiesta_servizio_ente)
    LEFT JOIN wemi2.richiesta_servizio_base as bas ON (
    bas.id_richiesta_servizio_base = ent.id_richiesta_servizio_base)
   WHERE id_richiesta_servizio_tcb = $[id_richiesta_servizio_tcb]
   LIMIT 1)` ;