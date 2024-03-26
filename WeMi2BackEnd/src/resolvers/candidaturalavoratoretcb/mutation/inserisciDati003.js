import { aggiornaUltimaModifica } from 'sql/candidaturaTCB/aggiornaUltimaModifica';
import {
  deleteTata,
  insertTata,
  deleteBadante,
  insertBadante,
  insertBadante2,
  deleteBadante2,
} from '../queries/queries';

export const inserisciDati003 =  async (parent, args, context, info) => {

  if (args.input.tata) {
    //se ci sono vengono prima eliminate e poi inserite

    await context.db.oneOrNone(deleteTata, args.input);
    if (args.input.tata && args.input.tata.length > 0) {
      await context.db.oneOrNone(insertTata(args, context));
    }
  }
  if (args.input.badante) {
    //se ci sono vengono prima eliminate e poi inserite

    await context.db.oneOrNone(deleteBadante, args.input);
    if (args.input.badante && args.input.badante.length > 0) {
      await context.db.oneOrNone(insertBadante(args, context));
    }

    await context.db.oneOrNone(deleteBadante2, args.input);
    await context.db.oneOrNone(insertBadante2, {
      idUtente: args.input.idUtente,
      cdAttributoBadanteInteresse: args.input.cdAttributoBadanteInteresse,
      interesseAfrequentareCorsi: args.input.interesseAfrequentareCorsi ? "S" : "N",
      nomeCorsoDaFrequentare: args.input.nomeCorsoDaFrequentare || null
    });
  }
  await context.db.none(aggiornaUltimaModifica, { id_lavoratore: args.input.idUtente, id_utente_mod: context.user.idUtente });
  return true
}