import { estraiStatoCandidaturaTCB } from '../../../sql/estraiStatoCandidaturaTCB/estraiStatoCandidaturaTCB';

export const estraiStatoCandidatura = async (parent, args, context) => {
  const { idUtenteLav } = args;
  return context.db.oneOrNone(estraiStatoCandidaturaTCB, { idUtenteLav });
}