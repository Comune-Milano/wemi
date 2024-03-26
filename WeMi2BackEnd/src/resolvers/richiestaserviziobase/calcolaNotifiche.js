const querySelectCountMessaggi = `
  SELECT count(b.id_richiesta_servizio_ente)
  FROM
    wemi2.richiesta_servizio_ente a
    inner join wemi2.richiesta_servizio_ente_stt b on a.id_richiesta_servizio_ente = b.id_richiesta_servizio_ente
  WHERE
    a.id_richiesta_servizio_base = $[idRichiestaServizioBase]
    and 
    b.cd_stato_chat = '1'
    and
    b.cd_stato_ric_serv_ente='3'
    and 
    b.ts_variazione_stato = (
      SELECT MAX(c.ts_variazione_stato)
      FROM wemi2.richiesta_servizio_ente_stt c
      where b.id_richiesta_servizio_ente = c.id_richiesta_servizio_ente
    )
`;


const querySelectCountServiziAcquistabili = `
  SELECT count(b.id_richiesta_servizio_ente)
  FROM
    wemi2.richiesta_servizio_ente a
    inner join wemi2.richiesta_servizio_ente_stt b on a.id_richiesta_servizio_ente = b.id_richiesta_servizio_ente
  WHERE
    a.id_richiesta_servizio_base = $[idRichiestaServizioBase]
    and 
    b.cd_stato_ric_serv_ente = '2'
    and 
    b.ts_variazione_stato = (
      SELECT MAX(c.ts_variazione_stato)
      FROM wemi2.richiesta_servizio_ente_stt c
      where b.id_richiesta_servizio_ente = c.id_richiesta_servizio_ente
    );
`;



const querySelectCountRecensioni = `
SELECT count(b.id_richiesta_servizio_ente)
FROM
  wemi2.richiesta_servizio_ente a
  inner join wemi2.richiesta_servizio_ente_stt b ON
  a.id_richiesta_servizio_ente = b.id_richiesta_servizio_ente
  inner JOIN wemi2.recensione_servizio_ente ON
  wemi2.recensione_servizio_ente.id_rich_serv_rec = a.id_richiesta_servizio_ente
  inner JOIN wemi2.recensione_servizio_ente_stt ON
  wemi2.recensione_servizio_ente_stt.id_rich_serv_rec = wemi2.recensione_servizio_ente.id_rich_serv_rec
WHERE
  a.id_richiesta_servizio_base = $[idRichiestaServizioBase]
  and 
  recensione_servizio_ente_stt.cd_stato_recensione = '1'
  and 
  b.ts_variazione_stato = (
    SELECT MAX(c.ts_variazione_stato)
    FROM wemi2.richiesta_servizio_ente_stt c
    where b.id_richiesta_servizio_ente = c.id_richiesta_servizio_ente
  )
  and wemi2.recensione_servizio_ente_stt.ts_variazione_stato = (
    select MAX(ts_variazione_stato)
    FROM wemi2.recensione_servizio_ente_stt
    where id_rich_serv_rec =  wemi2.recensione_servizio_ente.id_rich_serv_rec )
  ;
`;

export const calcolaNotifiche = async(database, idRichiestaServizioBase) => {
  const resultMessagi = await database
      .oneOrNone(querySelectCountMessaggi, {idRichiestaServizioBase});
  const resultServizi = await database
  .oneOrNone(querySelectCountServiziAcquistabili, {idRichiestaServizioBase});
  const resultRecensioni = await database
  .oneOrNone(querySelectCountRecensioni,{idRichiestaServizioBase});
  return {
    messaggi: resultMessagi.count,
    serviziAcquistabili: resultServizi.count,
    recensioni: resultRecensioni.count
  };
}