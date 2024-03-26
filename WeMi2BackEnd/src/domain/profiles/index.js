import { ProfileDAO } from 'dao/profile';
import UserDAO from 'dao/utente/UtenteDAO';
import { UserProfileDAO } from 'dao/userprofile';
import { ProfileDTO } from 'dto/profile';

/**
 * Profile Manager Domain class
 */
export class ProfileManager {
  /**
   * The constructor of the class
   * @param {object} context thecontext
   */
  constructor(context = {}) {
    const {
      db: connection,
      formatter,
      helpers,
      logger,
    } = context;
    this.db = connection;
    this.formatter = formatter;
    this.helpers = helpers;
    this.logger = logger;
  }
  /**
   * The method to get the profiles
   * @returns {ProfileDTO[]} the profiles to return
   */
  async getProfiles() {
    const profileDao = new ProfileDAO(this.db, this.formatter, this.helpers);
    const profiles = await profileDao.findAll();
    return profiles.map((profile) => new ProfileDTO(profile.code, profile.description));
  }
  /**
   * The method to update the profiles
   * @param {object[]} users the users
   * @param {string} profile the profile to assignee user
   * @param {object} lastUser the last user
   */
  updateTyOperatoreEnte(userId, newOperatoreEnte) {
    const userDAO = new UserDAO(this.db);
    userDAO.updateTyOperatoreEnte(userId, newOperatoreEnte);
  }
  async updateProfiles(users, profile, lastUser) {
    const userProfileDao = new UserProfileDAO(this.db, this.formatter, this.helpers);
    const userProfiles = await userProfileDao.findProfiles(users, users[0].code);
    users.forEach(async user => {
      if(Number.parseInt(user.tyOperatoreEnte, 10) >= 0){ // se non è definito il tyOperatoreEnte non effettua l'update
        await this.updateTyOperatoreEnte(user.id, Number.parseInt(user.tyOperatoreEnte, 10));
      }
    });
    const usersToInsert = users.filter((user) => {
      if (!userProfiles.length > 0) {
        return true;
      }
      const userFound = !userProfiles.find(userProfile => userProfile.id === user.id);
      if (userFound) {
        return true;
      }
      return false;
    });


    if (usersToInsert.length > 0) {
      await userProfileDao.insertProfiles(usersToInsert.map((user) => ({ ...user, code: profile })), lastUser);
    }
    const usersToUpdate = userProfiles;
    if (!usersToUpdate.length > 0) {
      return;
    }

    await userProfileDao.updateProfiles(usersToUpdate, lastUser, users[0].code, profile);
  }
}