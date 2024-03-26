import tabelle from 'tabelle';
import { fixtureAttributo } from '../fixtures/attributo.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { attributo } = tabelle;
  await knex(attributo).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureAttributo.map(attributo =>({
      cd_attributo: attributo.cdAttributo,
      cd_alf_attributo: attributo.cdAlfAttributo,
      ty_attributo: attributo.tyAttributo,
      ty_dominio_tcb: attributo.tyDominioTcb,
      js_dati_attributo: attributo.jsDatiAttributo
    }));
  return await knex(attributo).insert(fixtureMapped);

};