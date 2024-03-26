import tabelle from 'tabelle';
import { fixtureValAttributoRelDomServLav } from '../fixtures/val_attributo_rel_dom_serv_lav.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { val_attributo_rel_dom_serv_lav } = tabelle;
  await knex(val_attributo_rel_dom_serv_lav).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureValAttributoRelDomServLav.map(val =>({
  id_richiesta_servizio_tcb:val.idRichServizioTcb,
  cd_attributo_1:val.cdAttributo,
  cd_val_attributo_1:val.cdValAttributo1,
  cd_attributo_2:val.cdAttributo2,
  cd_val_attributo_2:val.cdValAttributo2,
  pg_beneficiario_richiesta_tcb:val.pgBeneficiario
    }));
  return await knex(val_attributo_rel_dom_serv_lav).insert(fixtureMapped);

};