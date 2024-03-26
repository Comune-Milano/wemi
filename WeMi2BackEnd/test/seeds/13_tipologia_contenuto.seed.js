import tabelle from 'tabelle';
import { fixtureTipologiaContenuto } from '../fixtures/tipologia_contenuto.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { tipologia_contenuto } = tabelle;
  await knex(tipologia_contenuto).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureTipologiaContenuto.map(tipologia =>({
    id:tipologia.id,
    ty_contenuto:tipologia.tyContenuto
    }));
  return await knex(tipologia_contenuto).insert(fixtureMapped);

};