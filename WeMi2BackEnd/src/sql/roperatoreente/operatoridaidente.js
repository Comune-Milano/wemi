export const trovaOperatoriDaIdEnte = `
select ptx_email AS email, wemi2.utente.id_utente
from wemi2.r_operatore_ente
inner join wemi2.utente on wemi2.utente.id_utente=wemi2.r_operatore_ente.id_utente
where wemi2.r_operatore_ente.id_ente=$[idEnte]  `;

