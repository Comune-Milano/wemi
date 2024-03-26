import {
  estrai005, query1Estrai005, query2Estrai005
} from '../queries/queries';


export const estraiDati005 =  async (parent, args, context, info) => {
  let result = await context.db.any(query1Estrai005, args.input);
  let result2 = await context.db.any(query2Estrai005, args.input);

  result[result.length] = {
    id_allegato: result2[0] ? result2[0].id_allegato : null,
    cd_attributo: result2[0] ? result2[0].cd_attributo : null,
    oj_allegato_off: result2[0] ? result2[0].oj_allegato_off : null
  }
  return result;
}