import {
  estraiStepsLavoratoreTCBQuery
} from '../queries/queries';
import { countStatoAssociazione } from 'sql/rmatchriclav/selezione';


export const estraiStepsLavoratoreTCB = async (parent, args, context) => {
  const { idUtenteLav } = args;
  /**
   * Verifying if a worker has associated
   */
  const { count: countLavoratoreAssociato } = await context.db.one(countStatoAssociazione, { idUtenteLav });

  const stepsLavoratore = await context.db.oneOrNone(estraiStepsLavoratoreTCBQuery, { idUtenteLav });
  
  stepsLavoratore.isLavoratoreAssociato = !!countLavoratoreAssociato;

  return stepsLavoratore;
}