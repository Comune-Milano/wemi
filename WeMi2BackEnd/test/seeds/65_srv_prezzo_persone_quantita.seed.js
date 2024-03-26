import tabelle from 'tabelle';
import { fixtureSrvPrezzoPersoneQt} from '../fixtures/srv_prezzo_persone_quantita.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { srv_prezzo_persone_quantita } = tabelle;
  await knex(srv_prezzo_persone_quantita).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureSrvPrezzoPersoneQt.map(prezzo =>({
   id_quantita:knex.raw("nextval('wemi2.seq_prezzo_persone_quantita')"),
   id_prezzo_persone:prezzo.idPrezzoPersone,
   qt_unita_da:prezzo.qtUnitaDa,
   qt_unita_a:prezzo.qtUnitaA,
   valore:prezzo.valore
    }));
  return await knex(srv_prezzo_persone_quantita).insert(fixtureMapped);

};