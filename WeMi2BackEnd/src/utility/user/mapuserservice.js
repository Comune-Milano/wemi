import { AMMINISTRATORE } from '../../constants/usercode';
import { TY_CITTADINO } from '../../constants/userroles';
import { logger } from 'utility/logger/getInstance';
import User from 'dto/UtenteDTO';

/**
 * The mapper for user service
 * @param {object} userJson the user from ldap
 * @returns {User} the user
 */
export const mapUserService = (userJson) => {
  
  if(!userJson) {
    throw new Error('Object to map not found');
  }
  // json of info 
  const userJsonInfo = {
    username: userJson.username,
    email: userJson.email,
    groups:userJson.groups,
    fullname: userJson.fullname,
    description: userJson.description,
    fiscalcode: userJson.fiscalcode,
  }
  logger.info('response: ', userJsonInfo);

  try{
    const user = new User();
    // controls
    if(!userJson.email){
      logger.error('errore in fase di mapping della response LDAP');
      throw new Error('Error in mapping the user');
    }
    if(!userJson.username){
      logger.error('errore in fase di mapping della response LDAP');
      throw new Error('Error in mapping the user');
    }
    if(!userJson.groups){
      logger.error('errore in fase di mapping della response LDAP');
      throw new Error('Error in mapping the user');
    }
    if(!userJson.fullname){
      logger.error('errore in fase di mapping della response LDAP');
      throw new Error('Error in mapping the user');
    }
    const fiscalCode = userJson.fiscalcode || userJson.description.replace('CF ', '');
    if(fiscalCode > 16){
      logger.warn('codice fiscale maggiore di 16');
      fiscalCode.slice(0, 16);
    }
    if(!fiscalCode){
      logger.error('errore in fase di mapping della response LDAP');
      throw new Error('Error in mapping the user');
    }

    user.setProfile(AMMINISTRATORE);
    user.setName(userJson.fullname.split(' ')[0]);
    user.setSurname(userJson.fullname.split(' ')[1]);
    user.setOperatoreEnte(TY_CITTADINO);
    user.setFiscalCode(fiscalCode);
    user.setEmail(userJson.email);
    user.setUsername(userJson.username);
    user.setPersonalData({});
    user.setGroup(userJson.groups);
    return user;
  }

  catch(error) {
    logger.error(error, 'Error in mapping the user');
    throw new Error('Error in mapping the user');
  }
  
};