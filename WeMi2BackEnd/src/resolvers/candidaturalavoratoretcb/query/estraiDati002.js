import { estraiDati002Query1, estraiDati002Query2 } from '../queries/queries';


export const estraiDati002 =  async (parent, args, context, info) => {
  let data = await context.db.any(estraiDati002Query1, args);
  let stato = await context.db.any(estraiDati002Query2, args);

  const result = {
    dt_disponibile_dal: data[0] ? data[0].dt_disponibile_dal : null,
    cd_val_attributo: stato[0] ? stato[0].cd_val_attributo : null
  }
  return result;
}