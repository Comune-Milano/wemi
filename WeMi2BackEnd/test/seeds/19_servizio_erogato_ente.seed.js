import tabelle from 'tabelle';
import { fixtureServizioErogatoEnte } from '../fixtures/servizio_erogato_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { servizio_erogato_ente } = tabelle;
  await knex(servizio_erogato_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureServizioErogatoEnte.map(servizio =>({
      id_servizio_ente:knex.raw("nextval('wemi2.seq_servizio_erogato_ente')"),
      id_servizio_riferimento:servizio.idServRif,
      id_ente_erogatore:servizio.idEnte,
      tl_descrizione_serv_erog_ente:servizio.tlDescrizione,
      qt_tempo_max_attivazione:servizio.qtTempo,
      im_prezzo_minimo:servizio.imPrezzoMin,
      im_prezzo_minimo_offerta_calc:servizio.imPrezzoMinOff,
      dt_inizio_val_offerta_prezzo:servizio.dtInizioVal,
      dt_fine_val_offerta_prezzo:servizio.dtFineVal,
      cd_tipo_offerta_srv:servizio.cdOfferta,
      id_sede_erogazione_srv:servizio.idSede,
      tx_altra_sede:servizio.txAltraSede,
      tx_altre_mansioni:servizio.txAltreMansioni,
      js_dati_prezzo:servizio.jsPrezzo,
      js_info_personale:servizio.jsInfoPers,
      cd_modalita_erogazione:servizio.cdModErog,
      cd_tipo_servizio_erog:servizio.cdTipoServ,
      qt_min_pers:servizio.qtMinPers,
      qt_max_pers:servizio.qtMaxPers,
      dt_inizio_erog_serv:servizio.dtInizioErogServ,
      dt_fine_erog_serv:servizio.dtFineErogServ,
      js_note_adminwemi_su_servizio:servizio.jsNoteAdmin,
      fg_accetta_preventivo:servizio.fgAccetta,
      pg_versione:servizio.pgVersione,
      ts_creazione:servizio.tsCreazione,
      tl_procedura_attivazione:servizio.tlProceduraAtt,
      tx_note_al_prezzo:servizio.txNotePrezzo
    }));
  return await knex(servizio_erogato_ente).insert(fixtureMapped);

};