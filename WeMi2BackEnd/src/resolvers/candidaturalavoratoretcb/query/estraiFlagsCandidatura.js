import { estraiFlagsCandidaturaQuery } from '../queries/queries';


export const estraiFlagsCandidatura =  async (parent, args, context, info) => {
  const result = await context.db.one(estraiFlagsCandidaturaQuery, args);

  return Object.keys(result).reduce((accumulator, key) => {
    const value = result[key];
    accumulator[key] = value ==='1';

    return accumulator;
  }, {});
}