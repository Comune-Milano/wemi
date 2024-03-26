import tabelle from 'tabelle';
import { fixtureBeneficiarioTcb } from '../fixtures/beneficiario_ric_serv_tcb.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { beneficiario_ric_serv_tcb } = tabelle;
  await knex(beneficiario_ric_serv_tcb).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureBeneficiarioTcb.map(beneficiario =>({
      id_richiesta_servizio_tcb: beneficiario.idRichiestaTcb,
      pg_beneficiario_richiesta_tcb: beneficiario.pgBeneficiario,
      ts_creazione:beneficiario.tsCreazione
    }));
  return await knex(beneficiario_ric_serv_tcb).insert(fixtureMapped);

};