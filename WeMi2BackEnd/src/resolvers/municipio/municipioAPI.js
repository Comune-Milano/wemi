/** @format */
import { regexDenominazione, minLength } from './regex';

export default {
  Query: {
    cercaMunicipio: async (parent, args) => {
         
      const { coordinate } = args;
      return coordinate;

    },
    cercaVia: async (parent, args, context) => {
      const { logger } = context;
      const arrayRisultato = [];
      const { via } = args;
         
      if(!via || !via.trim() || via.trim().length < minLength){

        return arrayRisultato;
      }

      const nomeVia = via.replace(regexDenominazione, '').trim();
      const denominazione = via.replace(nomeVia, '').trim();

      logger.trace('Via', nomeVia);
      logger.trace('Denominazione', denominazione);

      if(!nomeVia || !nomeVia.trim() || nomeVia.trim().length < minLength){

        return arrayRisultato;
      }


         
      return arrayRisultato;
    },

  },
};

