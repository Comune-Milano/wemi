import {
  estrai003, estrai003n2
} from '../queries/queries';


export const estraiDati003 =  async (parent, args, context, info) => {
  const res1 = await context.db.any(estrai003, args.input);
  const res2 = await context.db.any(estrai003n2, args.input);
  const res = res1.concat(res2);
  return res;

}