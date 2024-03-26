import tabelle from 'tabelle';

export const selectRichiestaPerFeedback = ` select id_servizio_erogato_ente, js_dati_richiesta
from ${tabelle.richiesta_servizio_ente} rse
LEFT JOIN wemi2.richiesta_servizio_base rsb ON
rse.id_richiesta_servizio_base = rsb.id_richiesta_servizio_base
where id_richiesta_servizio_ente = $[id_richiesta_servizio_ente]
  `