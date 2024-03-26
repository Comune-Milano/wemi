import tabelle from 'tabelle';
import { fixtureContenutoAssociato } from '../fixtures/contenuto_associato.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { contenuto_associato } = tabelle;
  await knex(contenuto_associato).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureContenutoAssociato.map(contenuto =>({
      id_contenuto_primario:contenuto.idContenutoPrim,
      id_contenuto_associato:contenuto.idContenutoAsso,
      nm_relazione:contenuto.nmRelazione,
      ts_creazione:contenuto.tsCreazione
    }));
  return await knex(contenuto_associato).insert(fixtureMapped);

};