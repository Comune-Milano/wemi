import { updateFlagsCandidaturaQuery } from '../queries/queries';
import { deleteFromAttributoCalendarioOffertaServizioByIdServizio } from 'sql/valattributocaloffservlav/delete';
import { deleteFromAttributoRelOffertaServizioByIdServizio } from 'sql/valattributoreloffservlav/delete';
import { deleteFromOffertaServizioByIdServizio } from 'sql/valattributooffertaservizio/delete';
import { ID_SERVIZIO_TATA, ID_SERVIZIO_COLF, ID_SERVIZIO_BADANTE } from 'constants/db/servizio_riferimento_tcb';

export const updateFlagsCandidatura = async (_, args, context, info) => {
  const queryArr = [
    deleteFromAttributoRelOffertaServizioByIdServizio(),
    deleteFromAttributoCalendarioOffertaServizioByIdServizio(),
    deleteFromOffertaServizioByIdServizio()
  ];
  const { idUtente, flags } = args;

  const bittenFlags = Object.keys(flags).reduce((accumulator, key) => {
    accumulator[key] = flags[key] ? '1': '0';
    return accumulator;
  }, {});

  if(!flags.tata) {
    await context.db.tx(async t => {
      await t.multi(queryArr.join(";"), {
        idLavoratore: idUtente,
        idServizioRiferimento: ID_SERVIZIO_TATA
      });
    });
  }
  if(!flags.colf) {
    await context.db.tx(async t => {
      await t.multi(queryArr.join(";"), {
        idLavoratore: idUtente,
        idServizioRiferimento: ID_SERVIZIO_COLF
      });
    });
  }
  if(!flags.badante) {
    await context.db.tx(async t => {
      await t.multi(queryArr.join(";"), {
        idLavoratore: idUtente,
        idServizioRiferimento: ID_SERVIZIO_BADANTE
      });
    });
  }

  const result = await context.db.one(updateFlagsCandidaturaQuery, { idUtente, ...bittenFlags });
  return Object.keys(result).reduce((accumulator, key) => {
    accumulator[key] = result[key] === '1';
    return accumulator;
  }, {});
}