import { ApolloError } from 'apollo-server';
import { CITTADINO, LAVORATORE } from 'constants/usercode';
import { MULTIPLE_FISCAL_CODE, FISCAL_CODE_NOT_FOUND } from 'errors/candidatura';
import { selectUserFiscalCode } from 'sql/utente/selezione';

export default {
  Query: {
    RecuperaUtente: async (parent, args, context) => {
      const sql = selectUserFiscalCode;
      context.logger.info(sql, args);
      const users = await context.db.any(sql, { ...args, profiles: [CITTADINO, LAVORATORE] });
      if(users.length > 1){
        throw new ApolloError(MULTIPLE_FISCAL_CODE.message, MULTIPLE_FISCAL_CODE.code);
      }
      const [user] = users;
      if(!user){
        throw new ApolloError(FISCAL_CODE_NOT_FOUND.message, FISCAL_CODE_NOT_FOUND.code);
      }
      return user;
    },
  },
};
