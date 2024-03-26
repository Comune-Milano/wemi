import { STORAGE_BOUND_PATH } from 'environment';
import ServizioErogatoEnteDAO from 'dao/servizioErogatoEnte/servizioErogatoEnteDAO';
import AllegatoServizioEnteDao from 'dao/allegatoServizioEnte/allegatoServizioEnteDao';
import RQualPersServErogEnteDao from 'dao/rQualPersServErogEnte/rQualPersServErogEnteDao';
import { OfficeInstitutionDao } from 'dao/sede/sede';
import { MediaDao } from 'dao/media/media';
import path from 'path';
import { deleteFile } from 'utility/deleteFile';
import { saveFileFromBase64 } from 'utility/saveFileFromBase64';
import { tyPersonale } from 'constants/db/tyPersonale';

/**
 * Servizio Erogato Manager Domain class
 */

export class ServizioErogatoEnteManagerDomain {
  /**
   * The constructor of the class
   * @param {object} context thecontext
   */
  constructor(db, context = {}) {
    const { logger, formatter, queryBuilder, user } = context;
    this.db = db;
    this.context = context;
    const wemiMediaFilesPath = path.join(__dirname, STORAGE_BOUND_PATH, 'media');
    this.mediaPath = wemiMediaFilesPath;
    this.queryBuilder = queryBuilder;
    this.logger = logger;
    this.formatter = formatter;
    this.tabelle = context.tabelle;
    this.user = user;
  }

  async save(input = {}) {
      const servizioErogatoEnteDAO = new ServizioErogatoEnteDAO(this.db, this.queryBuilder, this.logger, this.formatter, this.mediaPath, this.tabelle);
      const allegatoServizioEnteDao = new AllegatoServizioEnteDao(this.db, this.queryBuilder, this.logger, this.formatter, this.mediaPath, this.tabelle);
      const mediaDao = new MediaDao(this.db, this.queryBuilder, this.formatter);
      const officeInstitutionDao = new OfficeInstitutionDao( this.db, this.queryBuilder, this.formatter, this.user);
     const rQualPersServErogEnteDao = new RQualPersServErogEnteDao(this.db, this.queryBuilder);

      //inserimento/modifica qualifiche personale interno
      await rQualPersServErogEnteDao.insertUpdateQualifications(
        input.id_servizio_ente,
        input.qualifiche_interne,
        tyPersonale.TY_PERSONALE_INTERNO
      );

      //inserimento/modifica qualifiche personale esterno
      await rQualPersServErogEnteDao.insertUpdateQualifications(
        input.id_servizio_ente,
        input.qualifiche_esterne,
        tyPersonale.TY_PERSONALE_ESTERNO
      );
      // inserimento/modifica slider immagini 
      const keySlider = Object.keys(input.slider_immagini);
      Promise.all(
        keySlider.map(async keyImg => {
          const img = input.slider_immagini[keyImg];
          if (img.id) { // immagine già inserita
            // rimozione del file dallo storage
            const oldAttachmentName = `${img.id}_${img.name}`;
            await deleteFile(this.mediaPath, oldAttachmentName);
            // rimozione dalla tabella allegato_servizio_ente
            await allegatoServizioEnteDao.deleteFromAllegatoServizioEnte(img.id);
            // rimozione dalla tabella media
            await mediaDao.deleteMedia({ id: img.id });
          } // fine if 
          if (img.file) { // inserimento nuove immagini se presente
            // inserimento nella tabella media
            const inputInsertMedia = { mime: img.type, name: img.name, blob: img.file };
            const idMedia = await mediaDao.insertMedia(inputInsertMedia);
            // inserimento nella tabella allegato_servizio_ente
            const nr_progressivo_slider = Number.parseInt(keyImg.split('slider')[1], 10);
            await allegatoServizioEnteDao.insertFromAllegatoServizioEnte(input.id_servizio_ente, idMedia.id, 'ALLEGATO_SERVIZIO', nr_progressivo_slider);
            // inserimento nello storage
            const fileName = `${idMedia.id}_${img.name}`;
            await saveFileFromBase64(this.mediaPath, fileName, img.file);
          }
        })
      )
      // aggiornamento sedi di erogazione
      await officeInstitutionDao.updateSediErogazione(
        input.id_servizio_ente,
        input.sedi_erogazione
      );
      // update del descrittore del benessere e del flag 018
      await servizioErogatoEnteDAO.updateDescrittoreDelBenessereFg018(input);
  }

  async find(id_servizio_ente) {
    const servizioErogatoEnteDAO = new ServizioErogatoEnteDAO(this.db, this.queryBuilder, this.logger, this.formatter, this.mediaPath);
    const officeInstitutionDao = new OfficeInstitutionDao( this.db, this.queryBuilder, this.formatter, this.user);

    const oldState = servizioErogatoEnteDAO.findOldState(id_servizio_ente)
    const sediErogatrici = officeInstitutionDao.findSediErogatrici(id_servizio_ente)
    return { oldState, sediErogatrici };
  }
}