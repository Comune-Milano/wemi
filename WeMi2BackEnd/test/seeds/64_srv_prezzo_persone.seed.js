import tabelle from 'tabelle';
import { fixtureSrvPrezzoPersone} from '../fixtures/srv_prezzo_persone.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { srv_prezzo_persone } = tabelle;
  await knex(srv_prezzo_persone).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureSrvPrezzoPersone.map(prezzo =>({
   id_prezzo_persone:knex.raw("nextval('wemi2.seq_prezzo_persone')"),
   id_prezzo:prezzo.idPrezzo,
   qt_persone_da:prezzo.qtPersoneDa,
   qt_persone_a:prezzo.qtPersoneA
    }));
  return await knex(srv_prezzo_persone).insert(fixtureMapped);

};