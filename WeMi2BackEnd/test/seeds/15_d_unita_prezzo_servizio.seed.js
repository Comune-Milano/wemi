import tabelle from 'tabelle';
import { fixtureUnita} from '../fixtures/d_unita_prezzo_servizio.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_unita_prezzo_servizio } = tabelle;
  await knex(d_unita_prezzo_servizio).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureUnita.map(unita =>({
    cd_unita_prezzo:unita.cdUnita,
    tl_testo_aggettivo:unita.tlTestoAgg,
    tl_testo_sostantivo:unita.tlTestoSost,
    pg_visualizzazione:unita.pgVis
    }));
  return await knex(d_unita_prezzo_servizio).insert(fixtureMapped);

};