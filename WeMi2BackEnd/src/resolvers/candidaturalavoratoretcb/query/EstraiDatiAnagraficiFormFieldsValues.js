import {
  estraiDatiAnagraficiFormFieldValuesQuery
} from '../queries/queries';


export const EstraiDatiAnagraficiFormFieldsValues = async (parent, args, context, info) => {
  let fieldValues;
  await context.db.any(estraiDatiAnagraficiFormFieldValuesQuery).then(res => fieldValues = res);
  return {
    statoNascitaFieldValues: fieldValues.filter(el => el.tyDominioTcb === '25'),
    sessoFieldValues: fieldValues.filter(el => el.tyDominioTcb === '9'),
  };
}