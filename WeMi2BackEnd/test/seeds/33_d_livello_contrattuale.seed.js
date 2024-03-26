import tabelle from 'tabelle';
import { fixtureLivello } from '../fixtures/d_livello_contrattuale.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_livello_contrattuale } = tabelle;
  await knex(d_livello_contrattuale).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureLivello.map(livello =>({
   cd_livello_contrattuale:livello.cdLivello,
   id_servizio_riferimento:livello.idServizio,
   tl_valore_testuale_breve:livello.tlTestoBreve,
   tl_valore_testuale_lungo:livello.tlTestoLungo,
   pg_visualizzazione:livello.pgVis
    }));
  return await knex(d_livello_contrattuale).insert(fixtureMapped);

};