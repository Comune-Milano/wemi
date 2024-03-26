export const verificaUtente  = ` 
SELECT u.*
FROM wemi2.utente u
INNER JOIN wemi2.ente e ON e.id_utente_admin = u.id_utente 
INNER JOIN wemi2.servizio_erogato_ente s ON 
s.id_ente_erogatore = e.id_ente
WHERE 
 (s.id_servizio_ente = $[servizioErogatoEnte] and id_utente_admin = $[idUtente]) 
 UNION ALL
 SELECT u.*
FROM wemi2.utente u
INNER JOIN wemi2.r_operatore_ente r ON  u.id_utente = r.id_utente
INNER JOIN wemi2.servizio_erogato_ente s1 ON r.id_ente = s1.id_ente_erogatore
WHERE 
(s1.id_servizio_ente = $[servizioErogatoEnte] and r.id_utente=$[idUtente]);
`;