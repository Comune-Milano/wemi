import {
  estraiDocumentoLavoratoreQuery
} from '../queries/queries';

export const estraiFileLavoratore = async (parent, args, context, info) => {
 
  const { oj_media } = await context.db.one(estraiDocumentoLavoratoreQuery, args);

  return oj_media;

};