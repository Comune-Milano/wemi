import tabelle from 'tabelle';
import { fixtureRichiestaBase } from '../fixtures/richiesta_servizio_base.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { richiesta_servizio_base } = tabelle;
  await knex(richiesta_servizio_base).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureRichiestaBase.map(richiesta =>({
      id_richiesta_servizio_base:knex.raw("nextval('wemi2.seq_richiesta_servizio_base')"),
      dt_periodo_richiesto_dal:richiesta.dtDal,
      dt_periodo_richiesto_al:richiesta.dtAl,
      id_utente_richiedente:richiesta.idUtenteRich,
      js_dati_richiesta:richiesta.jsDati,
      dt_inizio_val:richiesta.dtInizio,
      dt_fine_val:richiesta.dtFine,
      ts_creazione:richiesta.tsCreazione,
      ds_servizio:richiesta.dsServizio,
      ts_variazione_stato:richiesta.tsVariazione,
      cd_stato_richiesta_servizio:richiesta.cdStato,
      id_utente:richiesta.idUtente
    }));
  return await knex(richiesta_servizio_base).insert(fixtureMapped);

};