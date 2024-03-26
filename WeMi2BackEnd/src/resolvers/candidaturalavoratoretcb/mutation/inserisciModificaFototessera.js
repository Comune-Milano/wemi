import {
  insertFile,
  updateFile,
  deleteFile,
  insertValAttributoOffertaUt,
} from '../queries/queries';

/**
 * Insert for photo candidacy
 * @param {*} parent the parent
 * @param {*} args the args
 * @param {*} context the context
 * @returns {object} the return object
 */
export const inserisciModificaFototessera =   async (parent, args, context) => {
  if (args.input.file) {
    if (args.input.idAllegato) {
      return await context.db.oneOrNone(updateFile, args.input);
    } else {
      return await context.db.tx(async t => {
        const resultInsert = await t.one(insertFile, args.input);
        await t.none(insertValAttributoOffertaUt, args.input);
        return resultInsert;
      });

    }
  } else {
    if (args.input.idAllegato) {
      return await context.db.multi(deleteFile, args.input);
    }
  }
};
