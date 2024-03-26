/** @format */

import { inserisciUtenteCandidatura } from "sql/utente/inserisciUtenteCandidatura";

export default {
  Mutation: {
    InserisciUtente: async (parent, args, context, info) => {
      context.logger.info(inserisciUtenteCandidatura, args.input);
      return await context.db.any(inserisciUtenteCandidatura, args.input);
    }
  }
};
