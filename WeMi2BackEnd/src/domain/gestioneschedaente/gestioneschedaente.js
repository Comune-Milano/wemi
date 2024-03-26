import { isNullOrUndefined, isNumber } from 'util';
import path from 'path';
import OperatorDomain from './nesteddomain/operatordomain';
import AttachmentDomain from './nesteddomain/attachmentdomain';
import MerchantDomain from './nesteddomain/merchantdomain';
import InformationInstitutionDomain from './nesteddomain/informationinstitutiondomain';
import OfficeDomain from './nesteddomain/officedomain';
import { Institution } from 'dto/institution/institution';
import { InformationInstitutionDao } from 'dao/institution/ente';
import { MerchantInstitutionDao } from 'dao/merchant/merchant';
import { OperatorInstitutionDao } from 'dao/operatore/operatore';
import { OfficeInstitutionDao } from 'dao/sede/sede';
import { STORAGE_BOUND_PATH } from 'environment';
/**
 * Class to interact with scheda ente manager
 */
class GestioneSchedaEnteDomain {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   */
  constructor(context) {
    const { user, db, logger, formatter, queryBuilder } = context;
    this.logger = logger;
    this.user = user;
    this.db = db;
    this.formatter = formatter;
    this.helpers = queryBuilder;
    const wemiMediaFilesPath = path.join(__dirname, STORAGE_BOUND_PATH, 'media');
    this.mediaPath = wemiMediaFilesPath;
  }
  /**
   * Finds the information of the section institution of the institution card
   * @param {number} idEnte the identifier of the institution
   * @returns {object} the response 
   */
  async findInstitutionCardInformation(idEnte) {
    if(isNullOrUndefined(idEnte) || !isNumber(idEnte)){
      return;
    }
    return await this.db.task(async task => {
      try {
        const institution = new Institution({ institutionId: idEnte });
        const attachmentDomain = new AttachmentDomain({
          db: task,
          helpers: this.helpers,
          formatter: this.formatter,
          user: this.user,
          logger: this.logger,
        });
        const operatorDao = new OperatorInstitutionDao(task, this.helpers, this.formatter);
        const authorizedOperatorsInstitution = await operatorDao.findOperators(institution);
        this.logger.trace('findOperators');
        const informationInstitutionDao = new InformationInstitutionDao(task, this.helpers, this.formatter);
        const informations = await informationInstitutionDao.findInformations(institution);
        this.logger.trace('findInformations');
        const institutionAttachments = await attachmentDomain.findAttachments(institution);
        this.logger.trace('findLogoAttachmentsInformation');
        const officeInstitutionDao = new OfficeInstitutionDao(task, this.helpers, this.formatter);
        const primaryOffice = await officeInstitutionDao.findPrimaryOffice(institution);
        this.logger.trace('findPrimaryOffice');
        const secondaryOffices = await officeInstitutionDao.findSecondaryOffices(institution);
        this.logger.trace('findSecondaryOffices');
        const merchantDao = new MerchantInstitutionDao(task, this.helpers, this.formatter);
        const merchantInformation = await merchantDao.findMerchant(institution);
        this.logger.trace('merchant');
      
        const result = {
          institutionInformationSection: {
            id: informations.id,
            fullname: informations.fullname,
            name: informations.name,
            vatNumber: informations.vatNumber,
            weMiSpaces: informations.weMiSpaces,
            accreditationCategories: informations.accreditationCategories,
            administratorEmail: informations.administratorEmail,
            stateDescription: informations.stateDescription,
            stateCode: informations.state,
            operatorsWeMI: informations.operatorsWeMI,
          },
          authorizedOperatorsSection: {
            authorizedOperators: authorizedOperatorsInstitution.authorizedOperators,
            note2: informations.note?.note2 || '',
          },
          descriptionSection: {
            description: informations.description,
            note3: informations.note?.note3 || '',
          },
          attachmentsSection: {
            socials: informations.othersInfo,
            logo: institutionAttachments.logo,
            documents: institutionAttachments.documents,
            note4: informations.note?.note4 || '',
          },
          principalLocationSection: {
            principalLocation: primaryOffice.getPrimaryOffice(),
            note5: informations.note?.note5 || '',
          },
          secondaryLocationSection: {
            secondaryLocations: secondaryOffices.mapSecondaryOffices(),
            note6: informations.note?.note6 || '',
          },
          contactPersonSection: {
            contactPerson: informations.contactPerson,
            note7: informations.note?.note7 || '',
          }, 
          citizenAvailabilitySection: {
            citizenAvailability: informations.citizenAvailability,
            firstContactNote: informations.firstContactNote,
            note8: informations.note?.note8 || '',
          },
          othersInfoSection: {
            othersInfo: informations.othersInfo,
            note9: informations.note?.note9 || '',
          },
          merchantSection: {
            merchant: merchantInformation.getMerchant(),
            note10: informations.note?.note10 || '',
          },
          paymentInfoSection: {
            paymentInfo: informations.paymentInfo,
            note11: informations.note?.note11 || '',
          },
        };
        return result;
      }
      catch(error){
        //log error e throw correct error
        this.logger.error(error, 'error finding the informations for institution card');
      }
     
    });
    
  }
  /**
   * Function to forward the notes to the institution
   * @param {object} args arguments of the query
   * @returns {Institution} the return object
   */
  async saveNotesInstitution(args) {
    const informationInstitutionDao = new InformationInstitutionDao(
      this.db,
      this.helpers,
      this.formatter
    );
    const institutionDTO = new Institution({
      institutionNote: args.notes,
      institutionId: args.id,
    });

    await informationInstitutionDao.updateCorporateData(institutionDTO);
  }
 
  /**
   * Function to forward the notes to the institution
   * @param {object} args arguments of the query
   * @param {number} state the state of the institution card
   * @returns {Institution} the return object
   */
  async forwardNotesInstitution(args, state){
    return await this.db.tx('GeneralTransaction', async (transaction) => {
      const informationInstitutionDao = new InformationInstitutionDao(
        transaction,
        this.helpers,
        this.formatter
      );
      const institutionDTO = new Institution({
        institutionNote: args.notes,
        institutionState: {
          code: state,
          userModified: this.user.idUtente,
        },
        institutionId: args.id,
      });
  
      const institutionNotes = await informationInstitutionDao.updateCorporateData(institutionDTO);
      await informationInstitutionDao.updateState(institutionDTO);
      const resultToSend = {
        institutionId: institutionNotes.id,
      };
      return resultToSend;
    });
  
  }
  /**
   * Function to insert the data for the institution card
   * @param {object} args arguments of the query
   * @param {number} state the state of the institution card 
   */
  async insertDataInstutionCard(args, state) {
    const {
      authorizedOperators,
      description,
      id,
      merchant,
      othersInfo,
      primaryOffice,
      secondaryOffices,
      attachments,
      contactPerson,
      paymentInfo,
      citizenAvailability,
    } = args;
    await this.db.tx('GeneralTransaction', async transaction => {
      /**
       * The new state for the institution
       */
      const institutionDTO = new Institution({ 
        institutionId: id,
        institutionAuthorizedOperators: authorizedOperators, 
        institutionDescription: description,
        institutionOthersInfo: othersInfo,
        institutionPrincipalLocation: primaryOffice,
        institutionLocations: secondaryOffices,
        institutionLogo: attachments?.logo,
        institutionDocuments: attachments?.documents,
        institutionContactPerson: contactPerson,
        institutionPaymentInfo: paymentInfo,
        institutionCitizenAvailability: citizenAvailability,
        institutionFirstContactNote: citizenAvailability?.firstContactNote,
      });
      this.logger.trace(institutionDTO, 'the start object to insert');
      const operatorDomain = new OperatorDomain({
        db: transaction,
        helpers: this.helpers,
        formatter: this.formatter,
        user: this.user,
      });
      /**
       * Inserting authorized operators
       */
      await operatorDomain.insertAuthorizedOperators(institutionDTO);
      const informationDomain = new InformationInstitutionDomain({
        db: transaction,
        helpers: this.helpers,
        formatter: this.formatter,
        user: this.user,
        logger: this.logger,
      });
      /**
       * Inserting the informations for institution
       */
      await informationDomain.insertInformations(institutionDTO);
      const officeDomain = new OfficeDomain({
        db: transaction,
        helpers: this.helpers,
        formatter: this.formatter,
        user: this.user,
        logger: this.logger,
      });
      /**
       * Inserting the primary office for institution
       */
      await officeDomain.insertPrimaryOffice(institutionDTO);
      /**
       * Inserting the secondary offices for institution
       */
      await officeDomain.insertSecondaryOffices(institutionDTO);

      const merchantDomain = new MerchantDomain({
        db: transaction,
        helpers: this.helpers,
        formatter: this.formatter,
        user: this.user,
        logger: this.logger,
      });
      /**
       * Inserting the transaction information for institution
       */
      await merchantDomain.insertTransactionInformation(new Institution({
        institutionId: id,
        institutionMerchant: merchant,
      }, false));

      const attachmentDomain = new AttachmentDomain({
        db: transaction,
        helpers: this.helpers,
        formatter: this.formatter,
        user: this.user,
        logger: this.logger,
      });
      /**
       * Inserting the logo for institution
       */
      await attachmentDomain.insertLogo(institutionDTO);
      /**
       * Inserting the attachments for institution
       */
      const attachmentsArray = attachments.documents;
      for (const attachment of attachmentsArray) {
        await attachmentDomain.insertAttachment(institutionDTO, {
          ...attachment,
          type: attachment.domain,
        });
      }
      return await informationDomain.changeState(
        id,
        state,
      );

    });
    
  }
}

export default GestioneSchedaEnteDomain;
