import tabelle from 'tabelle';
import { fixtureSedeEnte } from '../fixtures/sede_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { sede_ente } = tabelle;
  await knex(sede_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureSedeEnte.map(sede =>({
    id_sede:knex.raw("nextval('wemi2.seq_sede_ente')"),
    id_ente_rif:sede.idEnteRif,
    ty_sede:sede.tySede,
    js_sede:sede.jsSede,
    ts_creazione:sede.tsCreazione
    }));
  return await knex(sede_ente).insert(fixtureMapped);

};