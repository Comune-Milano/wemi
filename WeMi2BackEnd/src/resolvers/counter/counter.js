/** @format */

export default {
  Query: {
    EstraiDatiAccountability: async (parent, args, context) => {
      const sql = `
                SELECT 
                    servizi.numero_servizi       AS "serviziOfferti",
                    enti.numero_enti             AS "entiAccreditati",
                    operatori.numero_operatori   AS "operatoriAccreditati",
                    utenti.numero_utenti         AS "cittadiniIscritti"
                FROM
                
                --servizi erogati - un servizio erogato da più enti è conteggiato con il numero di enti
                (
                    SELECT count(1) AS numero_servizi 
                    FROM  wemi2.servizio_erogato_ente AS srv
                    INNER JOIN wemi2.servizio_erogato_ente_stt ON wemi2.servizio_erogato_ente_stt.id_servizio_ente = srv.id_servizio_ente
                    INNER JOIN wemi2.srv_prezzo prz on srv.id_servizio_ente = prz.id_servizio_ente 
                               and  (current_date >= prz.dt_inizio and (current_date <= prz.dt_fine or prz.dt_fine is null))
                    WHERE wemi2.servizio_erogato_ente_stt.cd_stato_dati_servizio_ente = 31 and
                        ts_variazione_stato = 
                        (
                            SELECT MAX(ts_variazione_stato)
                            FROM wemi2.servizio_erogato_ente_stt	
                            WHERE id_servizio_ente = srv.id_servizio_ente
                        )
                ) AS servizi,             

                    --enti accreditati
                    (
                        SELECT count(ent.id_ente) AS numero_enti 
                        FROM  ${context.tabelle.ente} ent
                        INNER JOIN ${context.tabelle.ente_stt} stt ON stt.id_ente = ent.id_ente AND stt.cd_stato_ente = '31'
                        and stt.ts_variazione_stato = 
                        (
                            SELECT MAX(ts_variazione_stato)
                            FROM ${context.tabelle.ente_stt} st1
                            WHERE st1.id_ente = ent.id_ente
                        )
                    ) AS enti,

                    --operatori accreditati
                    (SELECT sum(numero_operatori) as numero_operatori FROM (
                        select coalesce(sum(nr_operatori_servizi_wemi),0) as numero_operatori
                from wemi2.ente e
                inner join wemi2.ente_stt st1 on st1.id_ente = e.id_ente
                     and st1.cd_stato_ente = '31' and st1.ts_variazione_stato =
                        (
                            SELECT MAX(ts_variazione_stato)
                            FROM wemi2.ente_stt st2
                            WHERE st1.id_ente = st2.id_ente
                        )
                            UNION ALL
                        SELECT count(ope.id_utente_lav) AS numero_operatori 
                        FROM  wemi2.utente_offerta_lav ope
                        INNER JOIN wemi2.utente_offerta_lav_stt stt ON stt.id_utente_lav = ope.id_utente_lav AND stt.cd_stato_dati_lav in (2, 4)
                        and stt.ts_variazione_stato = 
                        (
                            SELECT MAX(ts_variazione_stato)
                            FROM wemi2.utente_offerta_lav_stt st1
                            WHERE st1.id_utente_lav = ope.id_utente_lav
                        )
                    ) as somma_operatori ) as operatori ,

                    --utenti iscritti = cittadini
                    (
                        SELECT SUM(users.numero_utenti) AS numero_utenti
                        FROM (
                            SELECT CAST(COALESCE(nr_operatori_servizi_wemi, 0) AS Int) AS numero_utenti
                            FROM ${context.tabelle.ente}
                            WHERE id_ente = 0
                                UNION ALL
                            SELECT count(id_utente) AS numero_utenti 
                            FROM ${context.tabelle.utente}
                            WHERE ts_primo_login IS NOT NULL and cd_profilo_utente = 'C' and ty_operatore_ente = 0
                        ) AS users
                    ) AS utenti
            `;
      context.logger.info(sql);
      return await context.db.oneOrNone(sql);
    },
  },
};
