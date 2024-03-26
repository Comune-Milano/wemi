export const verificaUtente  = ` 
SELECT u.*
FROM wemi2.utente u
INNER JOIN wemi2.ente e ON e.id_utente_admin = u.id_utente 
WHERE 
 (e.id_ente = $[idEnte] and id_utente_admin = $[idUtente]) 
 UNION ALL
 SELECT u.*
FROM wemi2.utente u
INNER JOIN wemi2.r_operatore_ente r ON  u.id_utente = r.id_utente
WHERE 
(r.id_ente = $[idEnte] and r.id_utente=$[idUtente]);
`;