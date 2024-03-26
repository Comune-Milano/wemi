import {
  aggiornaStepsLavoratoreTCBQuery
} from '../queries/queries';


export const aggiornaStepsLavoratoreTCB = async (parent, args, context) => {
  const { idUtenteLav, steps } = args;
  return context.db.one(aggiornaStepsLavoratoreTCBQuery, { idUtenteLav, ...steps });
}