import { Router } from 'express';
import { logger } from 'utility/logger/getInstance';
import { readFile } from 'utility/readfile';

const logout = Router();

logout.get(
'/', 
  async (req, res) => {
    const {session} = req;

    let requestForm = readFile('html/request.html').toString();
    
    const { user: currentUser } = session;

    logger.trace(currentUser, 'user logged in');

    const conditionOfValidity = currentUser && currentUser.hasOwnProperty('sessionIndex') && currentUser.hasOwnProperty('nameID') && currentUser.hasOwnProperty('nameIDFormat');

    if (conditionOfValidity) {

      const user = {
        nameID: currentUser.nameID,
        nameIDFormat: currentUser.nameIDFormat,
        sessionIndex: currentUser.sessionIndex,
      };

      logger.trace(user, 'Logout user information');

      // const serviceProvider = ServiceProviderImpl.getInstance();

      // const identityProvider = IdentityProviderImpl.getInstance();

      // const genaratorLogoutRequest = new GenerateLogoutPostRequest(serviceProvider, identityProvider);

      const location = '';


      const context  = '';
      
      requestForm = requestForm.replace('$ENDPOINT', location).replace('$CONTEXT', context);

      return res.send(requestForm);
    }
    else {
      logger.trace('Not valid saml user logging out back', 'logout ldap');

      requestForm = requestForm.replace('$ENDPOINT', '/logoutcallback').replace('$CONTEXT', '');

      return res.send(requestForm);
    }

  }
);

export { logout };