import { logger } from 'utility/logger/getInstance';
import { CHAT_TERMINATA } from 'constants/db/chatStatus';
import moment from 'moment';

// TODO: Use query defined in query.js
const queryInsertNuovoStatoRichiestaBase = `
  INSERT INTO wemi2.richiesta_servizio_base_stt(
    id_richiesta_servizio,
    ts_variazione_stato,
    cd_stato_richiesta_servizio,
    id_utente
  )
  VALUES (
    $[idRichiesta],
    current_timestamp, 
    $[stato],
    $[idUtente]
  )`;

// TODO: Move in query.js to make it reusable
/**
 * La richiesta estrae solamente le richieste aperte( stato = 1 ), sono escluse quelle scadute
 * 
 */
const querySelectRichiesteBaseAperte = `
  SELECT 
    a.id_richiesta_servizio_base,
    a.dt_periodo_richiesto_al,
    b.id_utente,
    b.cd_stato_richiesta_servizio as "vecchioStato"
  FROM 
    wemi2.richiesta_servizio_base a
    inner join wemi2.richiesta_servizio_base_stt b on id_richiesta_servizio_base = id_richiesta_servizio
  WHERE
    a.id_utente_richiedente = $[idUtente]
    and b.cd_stato_richiesta_servizio in ('1')
    and b.ts_variazione_stato = (
      select max(ts_variazione_stato)
      from wemi2.richiesta_servizio_base_stt c 
      where b.id_richiesta_servizio = c.id_richiesta_servizio
    )`;

// TODO: Move in query.js to make it reusable
const querySelectEnteRichiesteBaseAperte = `
  SELECT 
    a.id_richiesta_servizio_base,
    a.dt_periodo_richiesto_al,
    b.id_utente,
    b.cd_stato_richiesta_servizio as "vecchioStato"
  FROM 
    wemi2.richiesta_servizio_base a
    inner join wemi2.richiesta_servizio_base_stt b on a.id_richiesta_servizio_base = b.id_richiesta_servizio
    inner join wemi2.richiesta_servizio_ente c on a.id_richiesta_servizio_base = c.id_richiesta_servizio_base
    inner join wemi2.servizio_erogato_ente d on d.id_servizio_ente = c.id_servizio_erogato_ente
  WHERE
    b.cd_stato_richiesta_servizio in ('1')
    and d.id_ente_erogatore = $[idEnte]
    and b.ts_variazione_stato = (
      select max(ts_variazione_stato)
      from wemi2.richiesta_servizio_base_stt c 
      where b.id_richiesta_servizio = c.id_richiesta_servizio
    )`;
// TODO: Move in query.js to make it reusable


const querySelectAllRichiesteBaseAperte = `
  SELECT 
    a.id_richiesta_servizio_base,
    a.dt_periodo_richiesto_al,
    b.id_utente,
    b.cd_stato_richiesta_servizio as "vecchioStato"
  FROM 
    wemi2.richiesta_servizio_base a
    inner join wemi2.richiesta_servizio_base_stt b on id_richiesta_servizio_base = id_richiesta_servizio
  WHERE
    b.cd_stato_richiesta_servizio in ('1')
    and b.ts_variazione_stato = (
      select max(ts_variazione_stato)
      from wemi2.richiesta_servizio_base_stt c 
      where b.id_richiesta_servizio = c.id_richiesta_servizio
    )`;

// TODO: Move in query.js to make it reusable
const querySelectStatiRichiesteEnte =
  ` SELECT 
        stt.id_richiesta_servizio_ente,
        stt.cd_stato_ric_serv_ente,
        stt.cd_stato_chat,
        stt.id_utente,
        rs.ts_scadenza_acquisto,
        d.dt_periodo_richiesto_al
    FROM
        wemi2.richiesta_servizio_ente_stt stt
        inner join wemi2.richiesta_servizio_ente rs 
            on stt.id_richiesta_servizio_ente = rs.id_richiesta_servizio_ente
            INNER JOIN wemi2.richiesta_servizio_base d on d.id_richiesta_servizio_base = rs.id_richiesta_servizio_base
    WHERE
        rs.id_richiesta_servizio_base = $[idRichiestaBase]
        and
        stt.ts_variazione_stato = (
            select max (max_stt.ts_variazione_stato)
            from wemi2.richiesta_servizio_ente_stt max_stt
            where max_stt.id_richiesta_servizio_ente = stt.id_richiesta_servizio_ente
        )`;

// TODO: Move in query.js to make it reusable
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

// TODO: Please make use of the set of statuses
// defined in "StatoRichiestaBase"
const RICHIESTA_BASE_APERTA = '1';
const RICHIESTA_BASE_PAGATA = '2';
const RICHIESTA_BASE_CHIUSA = '3';
const RICHIESTA_BASE_SCADUTA = '4';

// TODO: Please make use of the set of statuses
// defined in "richiestaservizioente/StatoRichiestaEnte"
const RICHIESTA_ENTE_INOLTRATA = '1';
const RICHIESTA_ENTE_ACCETTATA = '2';
const RICHIESTA_ENTE_CONVERSAZIONE = '3';
const RICHIESTA_ENTE_ANNULLATA = '4';
const RICHIESTA_ENTE_CHIUSA = '5';
const RICHIESTA_ENTE_SCADUTA = '6';
const RICHIESTA_ENTE_PAGATA = '8';


export default class CalcolatoreStatoRichiestaBase {
  constructor(database, idUtente, idEnte) {
    this.idUtente = idUtente;
    this.database = database;
    this.idEnte = idEnte;
  }

  async calcolaStatoRichieste() {
    //estraggo le richieste aperte da calcolare
    const listaRichiesteBaseAperte = await this.selectRichiesteBaseAperte();
    for (const richiestaBase of listaRichiesteBaseAperte) {
      const listaStatiRichiesteEnte = await this.selectStatiRichiesteEnte(richiestaBase.id_richiesta_servizio_base);
      listaStatiRichiesteEnte = await this.updateStatoRichiesteEnte(listaStatiRichiesteEnte);
      const statoRichiestaBase = this.calcolaNuovoStatoRichiestaBase(listaStatiRichiesteEnte, richiestaBase.dt_periodo_richiesto_al)
      if (statoRichiestaBase != RICHIESTA_BASE_APERTA
        && richiestaBase.vecchioStato != RICHIESTA_BASE_SCADUTA) {
        try {
          await this.insertStatoRichiestaBase({
            idRichiesta: richiestaBase.id_richiesta_servizio_base,
            stato: statoRichiestaBase,
            idUtente: richiestaBase.id_utente,
          })
        } catch (err) {
          logger.error(err, "Errore nel calcolo dello stato richiesta base");
        }
      }
    }
  }

  async insertStatoRichiestaBase(stato) {
    await this.database
      .none(queryInsertNuovoStatoRichiestaBase, stato)
  }

  async selectRichiesteBaseAperte() {
    let listaRichieste = [];
    if (this.idUtente) {
      await this.database
        .any(querySelectRichiesteBaseAperte, { idUtente: this.idUtente })
        .then(result => {
          listaRichieste = result;
        });
    } else if (this.idEnte) {
      await this.database
        .any(querySelectEnteRichiesteBaseAperte, { idEnte: this.idEnte })
        .then(result => {
          listaRichieste = result;
        });
    } else {
      await this.database
        .any(querySelectAllRichiesteBaseAperte)
        .then(result => {
          listaRichieste = result;
        });
    }
    return listaRichieste;
  }

  getDataScadenzaRichiesta(fineRichiesta) {
    if (!fineRichiesta) {
      return null; // se la data non è presente torna null
    }
    // aumenta la data di 7 giorni 
    const giorniDaAumentare= 7;
    return moment(fineRichiesta).add(giorniDaAumentare, 'days');
  };

  getTodayDate(){
    return moment().startOf('day');
  };

  calcolaNuovoStatoRichiestaBase(listaStatiRichiesteEnte, fineRichiesta) {
    // aumenta la data di 7 giorni 
    const fineRichiestaDate = this.getDataScadenzaRichiesta(fineRichiesta)
    const today = this.getTodayDate();

    const isRichiestaScaduta = today.isAfter(fineRichiestaDate);
    let isPagata = false;
    let isChiusa = true;
    let isScaduta = true;
    let isRichiestaEnteAcquistabile = false;
  
    for (const stato of listaStatiRichiesteEnte) {
      const codice = stato.cd_stato_ric_serv_ente;
      const scadenza = stato.ts_scadenza_acquisto;
      if (codice === RICHIESTA_ENTE_PAGATA) {
        isPagata = true;
        break;
      }
      if ([RICHIESTA_ENTE_ANNULLATA, RICHIESTA_ENTE_CHIUSA].indexOf(codice) < 0) {
        isChiusa = false;
        if (codice !== RICHIESTA_ENTE_SCADUTA) {
          if (codice === RICHIESTA_ENTE_ACCETTATA && new Date() <= new Date(scadenza)) {
            isRichiestaEnteAcquistabile = true;
          }
          isScaduta = false;
        }
      }
    }
    if (isPagata) {
      return RICHIESTA_BASE_PAGATA;
    }
    if (isChiusa) {
      return RICHIESTA_BASE_CHIUSA;
    }
    if (isScaduta || (!isRichiestaEnteAcquistabile && isRichiestaScaduta)) {
      return RICHIESTA_BASE_SCADUTA;
    }
    return RICHIESTA_BASE_APERTA;

  }

  async updateStatoRichiesteEnte(listaStati) {
    const valuesToUpdate = [];
    const today = this.getTodayDate();

    const nuovaListaStati = listaStati.map(stato => {
      if ((stato.cd_stato_ric_serv_ente === RICHIESTA_ENTE_ACCETTATA
        && new Date() > new Date(stato.ts_scadenza_acquisto))
        || ([RICHIESTA_ENTE_CONVERSAZIONE, RICHIESTA_ENTE_INOLTRATA].indexOf(stato.cd_stato_ric_serv_ente) >= 0
          && today.isAfter(this.getDataScadenzaRichiesta(stato.dt_periodo_richiesto_al)))) {
        stato = {
          id_richiesta_servizio_ente: stato.id_richiesta_servizio_ente,
          ts_variazione_stato: new Date(),
          cd_stato_ric_serv_ente: RICHIESTA_ENTE_SCADUTA,
          cd_stato_chat: CHAT_TERMINATA,
          id_utente: stato.id_utente,
        };
        valuesToUpdate.push(stato);
      }
      return stato;
    });
    try {
      await this.database.batch(
        valuesToUpdate.map(stato => (
          this.database.none(queryInsertStatoRichiesteEnte, stato)
        )));
    } catch (err) {
      logger.error(err, "Errore interimento stato richiesta ente");
      throw new Error('[Error on insert richiesta ente] ' + err);
    }
    return nuovaListaStati;
  }

  async selectUltimoStatoRichiestaBase() {
    let ultimoStato = null;
    await this.database
      .oneOrNone(querySelectUltimoStatoRichiestaBase, { idRichiestaBase: this.idRichiestaBase })
      .then(result => {
        ultimoStato = result.cd_stato_richiesta_servizio;
      });
    return ultimoStato;
  }

  async selectStatiRichiesteEnte(idRichiestaBase) {
    let listaStati = [];
    await this.database
      .any(querySelectStatiRichiesteEnte, { idRichiestaBase })
      .then(result => {
        listaStati = result;
      });
    return listaStati;
  }
}