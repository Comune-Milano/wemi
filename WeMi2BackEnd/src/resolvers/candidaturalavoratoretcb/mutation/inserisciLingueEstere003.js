
import {
  inserisciLingueEstere,
  deleteLingueEstere
} from '../queries/queries';

export const inserisciLingueEstere003 =  async (parent, args, context) => {
  
  await context.db.oneOrNone(deleteLingueEstere, args.input);
  await context.db.oneOrNone(inserisciLingueEstere, args.input);
  return true;
}