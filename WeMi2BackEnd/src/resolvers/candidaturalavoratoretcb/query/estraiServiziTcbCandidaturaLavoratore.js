import { estraiDatiServiziTcbCandidaturaLavoratore } from "../queries/queries";

export const estraiServiziTcbCandidaturaLavoratore = async (parent, args, context, info) => {
  const result = context.db.any(estraiDatiServiziTcbCandidaturaLavoratore, args);
  return result;
};
