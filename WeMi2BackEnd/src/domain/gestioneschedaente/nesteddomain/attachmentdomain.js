import path from 'path';
import { Institution } from 'dto/institution/institution';
import { STORAGE_BOUND_PATH } from 'environment';
import { saveFileFromBase64 } from 'utility/saveFileFromBase64';
import { deleteFile } from 'utility/deleteFile';
import { AttachmentInstitutionDao } from 'dao/allegato/allegato';
import { InformationInstitutionDao } from 'dao/institution/ente';
import { MediaDao } from 'dao/media/media';
/**
 * Class to interact with scheda ente manager
 */
class AttachmentDomain {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   */
  constructor(context) {
    const { user, db, logger, formatter, helpers } = context;
    this.logger = logger;
    this.user = user;
    this.db = db;
    this.formatter = formatter;
    this.helpers = helpers;
    const wemiMediaFilesPath = path.join(__dirname, STORAGE_BOUND_PATH, 'media');
    this.mediaPath = wemiMediaFilesPath;
  }
  /**
   * The tasks to perform the insert of an attachment
   * @param {Institution} institution the dto for the query
   * @returns {Institution} the result object
   */
  async findAttachments(institution) {
    const attachmentInstitutionDao = new AttachmentInstitutionDao(
      this.db, 
      this.helpers, 
      this.formatter
    );
    const mediaDao = new MediaDao(
      this.db, 
      this.helpers, 
      this.formatter
    );

    const institutionResult = await attachmentInstitutionDao.findAttachments(institution);
    const institutionLogo = await mediaDao.findLogo(institution);
    return {
      logo: institutionLogo.logo,
      documents: institutionResult.documents,
    };
  }
  /**
   * The tasks to perform the insert of an attachment
   * @param {Institution} institution the dto for the query
   * @param {object} attachment the dto for the query
   * @returns {Institution} the result object
   */
  async insertAttachment(institution, attachment) {
    const attachmentInstitutionDao = new AttachmentInstitutionDao(
      this.db,
      this.helpers,
      this.formatter,
      this.user,
    );
    const mediaDao = new MediaDao(
      this.db,
      this.helpers,
      this.formatter,
      this.user,
    );
    //Trova il logo 
    const oldAttachment = await attachmentInstitutionDao.findAttachment(institution, attachment);
    
    if (!!(oldAttachment)) {
      if (oldAttachment.id !== attachment.id) {
        await attachmentInstitutionDao.deleteAllegato(institution, oldAttachment);
        //Rimozione del file dallo storage
        const oldAttachmentName = `${oldAttachment.id}_${oldAttachment.name}`;
        deleteFile(this.mediaPath, oldAttachmentName);

        //Elimina vecchio logo (db e storage)
        await mediaDao.deleteMedia(oldAttachment);
      }
    }

    if (attachment.name && !(attachment.id)) {

      const newMedia = await mediaDao.insertMedia({ ...attachment, storagePath: attachment.name });
      //Inserisco nuovo logo
      await attachmentInstitutionDao.insertAttachment(institution, {
        ...attachment,
        ...newMedia,
      });
      //Salvataggio sullo storage
      const fileName = `${newMedia.id}_${attachment.name}`;
      saveFileFromBase64(this.mediaPath, fileName, attachment.blob);
    }
  }
  /**
   * The tasks to perform the insert of the authorized operators
   * @param {Institution} institutionDTO the dto for the query
   * @returns {Institution} the result object
   */
  async insertLogo(institutionDTO) {
    const mediaDao = new MediaDao(
      this.db,
      this.helpers,
      this.formatter,
      this.user,
    );
    const informationInstitutionDao = new InformationInstitutionDao(
      this.db,
      this.helpers,
      this.formatter,
      this.user,
    );

    //Trova il logo 
    const institutionOldLogo = await mediaDao.findLogo(institutionDTO);


    if (!!(institutionOldLogo.logo?.id)) {
      if (institutionOldLogo.logo.id !== institutionDTO.logo.id) {
        //Update vecchio al nuovo (db e storage)
        await informationInstitutionDao.updateCorporateData(new Institution({
          institutionLogo: {
            id: null,
          },
          institutionId: institutionDTO.id,
        }));
        const { logo: oldLogo } = institutionOldLogo;
        //Rimozione del file dallo storage
        const oldLogoName = `${oldLogo.id}_${oldLogo.name}`;
        deleteFile(this.mediaPath, oldLogoName);

        //Elimina vecchio logo (db e storage)
        await mediaDao.deleteMedia(oldLogo);
      }
    }

    if (institutionDTO.logo?.name && !(institutionDTO.logo?.id)) {
      //Inserisco nuovo logo
      const institutionNewLogo = await mediaDao.insertLogo(institutionDTO);

      //Salvataggio sullo storage
      const { logo: logoNew } = institutionNewLogo;
      const { logo: logoDTO } = institutionDTO;
      const fileName = `${logoNew.id}_${logoDTO.name}`;
      saveFileFromBase64(this.mediaPath, fileName, logoDTO.blob);

      //Update vecchio al nuovo (db e storage)
      await informationInstitutionDao.updateCorporateData(institutionNewLogo);
    }

  }

}

export default AttachmentDomain;
