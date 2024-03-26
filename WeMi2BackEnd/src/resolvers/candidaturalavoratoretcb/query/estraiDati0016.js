import {
  estrai0016
} from '../queries/queries';


export const estraiDati0016 = async (parent, args, context, info) => {
  return await context.db.any(estrai0016, args.input);
}