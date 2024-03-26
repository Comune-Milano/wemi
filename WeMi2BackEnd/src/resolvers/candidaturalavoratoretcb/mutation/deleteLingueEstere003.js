
import {
  deleteLingueEstere
} from '../queries/queries';

export const deleteLingueEstere003 =  async (parent, args, context) => {
  await context.db.oneOrNone(deleteLingueEstere, args.input);
  return true;
}