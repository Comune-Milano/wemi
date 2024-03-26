import tabelle from 'tabelle';
import { fixtureContenutoStt } from '../fixtures/contenuto_stt.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { contenuto_stt } = tabelle;
  await knex(contenuto_stt).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureContenutoStt.map(contenuto =>({
      id_contenuto:contenuto.idContenuto,
      ts_variazione_stato:contenuto.tsVariazione,
      cd_stato_contenuto:contenuto.cdStato,
      id_utente:contenuto.idUtente
    }));
  return await knex(contenuto_stt).insert(fixtureMapped);

};