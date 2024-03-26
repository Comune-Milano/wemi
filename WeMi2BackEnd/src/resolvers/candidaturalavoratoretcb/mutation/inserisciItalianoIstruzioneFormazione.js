
import {
  selectItaliano,
  updateItaliano,
  insertItaliano,
  insertItaliano2,
  deleteItaliano2
} from '../queries/queries';

export const inserisciItalianoIstruzioneFormazione =  async (parent, args, context, info) => {
  const controllo = await context.db.oneOrNone(selectItaliano, args.input);

  if (controllo) {
    await context.db.oneOrNone(updateItaliano, args.input);
  } else {
    await context.db.oneOrNone(insertItaliano, args.input);
  }

  await context.db.oneOrNone(deleteItaliano2, args.input);
  await context.db.oneOrNone(insertItaliano2, {
    idUtente: args.input.idUtente,
    cdAttributoCorsiItaliano: args.input.cdAttributoCorsiItaliano,
    corsiItaliano: args.input.corsiItaliano ? "S" : "N"
  });
  return true;
}