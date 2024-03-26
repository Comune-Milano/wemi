import tabelle from 'tabelle';
import { fixtureValAttributoRelOffServLav} from '../fixtures/val_attributo_rel_off_serv_lav.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { val_attributo_rel_off_serv_lav } = tabelle;
  await knex(val_attributo_rel_off_serv_lav).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureValAttributoRelOffServLav.map(val =>({
  id_utente_lav:val.idUtenteLav,
  id_servizio_riferimento:val.idServizio,
  cd_attributo_1:val.cdAttributo,
  cd_val_attributo_1:val.cdValAttributo1,
  cd_attributo_2:val.cdAttributo2,
  cd_val_attributo_2:val.cdValAttributo2
    }));
  return await knex(val_attributo_rel_off_serv_lav).insert(fixtureMapped);

};