import { AuthorizationManagerDomain } from 'domain/authorizationmanager';
import { ProfileManager } from 'domain/profiles';
import { UsersManagerController } from 'domain/usersmanager';
import { UserExtended } from 'dto/user';

export default {
  Query: {
    getUserList: (parent, args, context) => {
      const usersManagerDomain = new UsersManagerController(context);
      return usersManagerDomain.getUsers(args.filters);
    },
    getUserDetail: (parent, args, context) => {
      const { userId } = args;
      const usersManagerDomain = new UsersManagerController(context);
      return usersManagerDomain.getUserDetail({ id_utente: userId });
    },
    getProfiles: (parent, args, context) => {
      const usersManagerDomain = new ProfileManager(context);
      return usersManagerDomain.getProfiles();
    },
    getUserAuthorizations: (parent, args, context) => {
      const authorizationManager = new AuthorizationManagerDomain(context);
      return authorizationManager.getAuthorizationsForUser(new UserExtended({ id_utente: args.userId }));
    },
  },
  Mutation: {
    saveUserAuthorization: (parent, args, context) => {
      const usersManagerDomain = new UsersManagerController(context);
      return usersManagerDomain.saveUserAuthorization(args.userAuthorizations);
    },
    deleteUserAuthorization: (parent, args, context) => {
      const usersManagerDomain = new UsersManagerController(context);
      return usersManagerDomain.deleteUserAuthorization(args.userAuthorizations);
    },
  },
};
