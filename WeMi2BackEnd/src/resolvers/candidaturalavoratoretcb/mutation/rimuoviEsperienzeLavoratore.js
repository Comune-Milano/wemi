import {
  ottieniIdRicBaseDaRicEnteQuery,
  rimuoviEsperienzeLavoratoreQuery
} from '../queries/queries';

export const rimuoviEsperienzeLavoratore = async (_, args, context, info) => {
  const { idRichiesta } = args;
  await context.db.tx('rimuoviEsperienzeLavoratore', async t => {
    const { id_richiesta_servizio_base: idRicBase } = await t.one(ottieniIdRicBaseDaRicEnteQuery, { idRichiesta });
    t.none(rimuoviEsperienzeLavoratoreQuery, { idRichiesta, idRicBase });
  });
  return true;
}