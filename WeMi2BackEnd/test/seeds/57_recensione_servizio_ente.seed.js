import tabelle from 'tabelle';
import { fixtureRecensioneEnte} from '../fixtures/recensione_servizio_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { recensione_ente } = tabelle;
  await knex(recensione_ente).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureRecensioneEnte.map(rec =>({
   id_rich_serv_rec:rec.idRichiesta,
   qt_media_singola_recensione:rec.qtMedia,
   js_dati_recensione:rec.jsDati,
   js_dati_recensione_wemi:rec.jsDatiWeMi,
   ts_creazione:rec.tsCreazione,
   cd_stato_rec:rec.cdStato,
   cd_stato_rec_wemi:rec.cdStatoWeMi
    }));
  return await knex(recensione_ente).insert(fixtureMapped);

};