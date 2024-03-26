
import { ApolloError } from 'apollo-server';
import {
  checkUtenteLavQuery,
  initializeUtenteLavMutation,
  checkCandidaturaInoltrata,
} from '../queries/queries';
import { CITTADINO, LAVORATORE, OPERATORE_ENTE } from 'constants/usercode';
import User from 'dto/UtenteDTO';
import { CANDIDATURA_INOLTRATA_ERROR } from 'errors/candidatura';
import { ProfileManager } from 'domain/profiles';

export const inizializzaUtenteLav = async (_, args, context, info) => {
  let result = false;
 
  const { user } = context;
 
  const { profile, idUtente: idUtenteLav } = user;

  const found = await context.db.oneOrNone(checkUtenteLavQuery, { idUtenteLav });

  if (!found && profile === CITTADINO) {
    const initUt = await context.db.one(initializeUtenteLavMutation, { idUtenteLav });

    const userProfileManager = new ProfileManager({ ...context, helpers: context.queryBuilder, db: context.db });

    await userProfileManager.updateProfiles([initUt].map(user => ({
      id:user.id_utente,
      code:CITTADINO,
    }) ), LAVORATORE, {idUtente:idUtenteLav});
    
    const userDTO = new User({
      ...initUt,
      cd_profilo_utente: LAVORATORE,
    });

    context.req.session.user = userDTO;
    
    result = true;
  }

  try {
    await context.db.one(checkCandidaturaInoltrata, { idUtenteLav });
  }
  catch (error) {
    throw new ApolloError(CANDIDATURA_INOLTRATA_ERROR.message, CANDIDATURA_INOLTRATA_ERROR.code);
  }

  return result;
};