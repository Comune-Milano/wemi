import moment from 'moment';

const querySelectStatiRichieste = `
  SELECT
    a.id_richiesta_servizio_ente,
    a.cd_stato_ric_serv_ente,
    a.cd_stato_chat,
    a.id_utente,
    b.ts_scadenza_acquisto,
    d.dt_periodo_richiesto_al
  FROM 
    wemi2.richiesta_servizio_ente_stt a
    INNER JOIN wemi2.richiesta_servizio_ente b on a.id_richiesta_servizio_ente = b.id_richiesta_servizio_ente
    INNER JOIN wemi2.servizio_erogato_ente c on c.id_servizio_ente = b.id_servizio_erogato_ente
    INNER JOIN wemi2.richiesta_servizio_base d on d.id_richiesta_servizio_base = b.id_richiesta_servizio_base
  WHERE
    c.id_ente_erogatore = $[idEnte] 
    AND
    a.ts_variazione_stato = (
      SELECT MAX(d.ts_variazione_stato)
      FROM wemi2.richiesta_servizio_ente_stt d
      WHERE d.id_richiesta_servizio_ente = a.id_richiesta_servizio_ente
    );`;

const queryInsertStatoRichiesteEnte =
` INSERT INTO wemi2.richiesta_servizio_ente_stt(
    id_richiesta_servizio_ente,
    ts_variazione_stato,
    cd_stato_ric_serv_ente,
    cd_stato_chat,
    id_utente)
  VALUES (
        $[id_richiesta_servizio_ente],
        $[ts_variazione_stato],
        $[cd_stato_ric_serv_ente],
        $[cd_stato_chat],
        $[id_utente]
  )`;

// TODO: Please make use of the set of statuses defined in "StatoRichiestaEnte"
const RICHIESTA_ENTE_INOLTRATA = '1';
const RICHIESTA_ENTE_ACCETTATA = '2';
const RICHIESTA_ENTE_CONVERSAZIONE = '3';
const RICHIESTA_ENTE_SCADUTA = '6';

export default class CalcolatoreScadenza {
  constructor(database, idEnte) {
    this.idEnte = idEnte;
    this.database = database;
  }

  async calcolaStatoRichieste() {
    const listaStatiRichieste = await this.selectStatiRichieste();
    await this.updateStatoRichiesteEnte(listaStatiRichieste);
  }

  async selectStatiRichieste() {
    return await this.database.any(querySelectStatiRichieste, { idEnte: this.idEnte });
  }

  async updateStatoRichiesteEnte(listaStati) {
    const valuesToUpdate = [];
    const today = moment().startOf('day');
    const fineRichiesta= moment(stato.dt_periodo_richiesto_al).add(7, 'days');
    const nuovaListaStati = listaStati.map(stato => {
      if ((stato.cd_stato_ric_serv_ente === RICHIESTA_ENTE_ACCETTATA
        && new Date() > new Date(stato.ts_scadenza_acquisto))
        || ([RICHIESTA_ENTE_CONVERSAZIONE, RICHIESTA_ENTE_INOLTRATA].indexOf(stato.cd_stato_ric_serv_ente) >= 0
        && today.isAfter(fineRichiesta))) {
        stato = {
          id_richiesta_servizio_ente: stato.id_richiesta_servizio_ente,
          ts_variazione_stato: new Date(),
          cd_stato_ric_serv_ente: RICHIESTA_ENTE_SCADUTA,
          cd_stato_chat: stato.cd_stato_chat,
          id_utente: stato.id_utente,
        };
        valuesToUpdate.push(stato);
      }
      return stato;
    });
    await this.database.batch(
      valuesToUpdate.map( stato => (
        this.database.none(queryInsertStatoRichiesteEnte, stato)
    )));
    return nuovaListaStati;
  }
}