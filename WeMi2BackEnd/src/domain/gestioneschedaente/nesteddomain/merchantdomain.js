import path from 'path';
import { Institution } from 'dto/institution/institution';
import { STORAGE_BOUND_PATH } from 'environment';
import { MerchantInstitutionDao } from 'dao/merchant/merchant';
/**
 * Class to interact with scheda ente manager
 */
class MerchantDomain {
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
 * The tasks to perform the insert of the authorized operators
 * @param {Institution} institutionDTO the dto for the query
 * @returns {Institution} the result object
 */
  async insertTransactionInformation(institutionDTO) {
    const merchantDao = new MerchantInstitutionDao(
      this.db,
      this.helpers,
      this.formatter,
      this.user,
    );
    const { merchant: merchantNew } = institutionDTO;
    const institutionMerchant = await merchantDao.findMerchant(institutionDTO);
    const merchant = institutionMerchant.getMerchant();
    
    if (!!(merchant?.id)) {
      const isDirty = this.compareMerchant(merchantNew, merchant);
      return await merchantDao.updateMerchant(new Institution(
        {
          institutionMerchant: institutionDTO.merchant,
          institutionId: institutionDTO.id,
        },
        isDirty,
      ));
    }
    return await merchantDao.insertMerchant(institutionDTO);
  }
/**
 * The tasks to perform the compare between two merchants
 * @param {object} merchant the first merchant
 * @param {object} merchantRemote the remote merchant
 * @returns {boolean} has to validate or not
 */
  compareMerchant(merchant, merchantRemote){
    let isDirty = false;
    Object.values(merchant).forEach(value => {
      const isEqual = Object.values(merchantRemote).find(valueRemote => 
        new String(valueRemote).toLowerCase() === 
        new String(value).toLowerCase());
      if(!isEqual){
        isDirty = true;
      }
    });
    return isDirty;
  }

  


}

export default MerchantDomain;
