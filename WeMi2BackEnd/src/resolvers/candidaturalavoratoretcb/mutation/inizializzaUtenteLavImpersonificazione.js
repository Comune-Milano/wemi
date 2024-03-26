
import { isNullOrUndefined } from 'util';
import { initializeUtenteLavImpMutation, estraiUtente } from '../queries/queries';
import { CITTADINO, LAVORATORE } from 'constants/usercode';
import { TY_CITTADINO } from 'constants/userroles';
import { ProfileManager } from 'domain/profiles';
/**
 * The resolver for impersonificazione
 * @param {*} _ nothing
 * @param {*} args the args 
 * @param {*} context the context
 * @returns {boolean} the result
 */
export const inizializzaUtenteLavImpersonificazione = async (_, args, context) => {
  let result = false;
  const utente = await context.db.one(estraiUtente, args);
  await context.db.tx(async t => {
    // controllo che definisce se è un cittadino 
    if (utente.cd_profilo_utente === CITTADINO && utente.ty_operatore_ente === 0 && (utente.fg_lavoratore === TY_CITTADINO || isNullOrUndefined(utente.fg_lavoratore))) {
      await t.one(initializeUtenteLavImpMutation, args);
      const userProfileManager = new ProfileManager({ ...context, helpers: context.queryBuilder, db: t });
      /**
       * Deleting the record into r_utente_profilo and insert new record with the new profile
       */
      await userProfileManager.updateProfiles([args.idUtente].map(id => ({
        id: id,
        code: CITTADINO,
      })), LAVORATORE, { idUtente: context.user.idUtente });
      result = true;
    };
  });
 

  return result;
};