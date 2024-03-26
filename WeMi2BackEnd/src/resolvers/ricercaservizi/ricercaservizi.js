import Dao from '../../dao/ricercaServizi/ricercaServiziDao';
import EnteDAO from '../../dao/ente/enteDAO';
import { RicercaServiziDomain } from 'domain/ricercaservizi';


export default {
  Query: {
    getTokenService: async (parent, args, context) => {
      const { input = { }  } = args;
      const ricercaServiziDomain = new RicercaServiziDomain(context);
      const token = await ricercaServiziDomain.createToken(input);
      context.logger.info(token, 'the jwt to return');
      return token;
    },
    verifyTokenService: async (parent, args, context) => {
      const { token = '' } = args;
      context.logger.info(token, 'the jwt to decode');
      const ricercaServiziDomain = new RicercaServiziDomain(context);
      return ricercaServiziDomain.validateData(token);
    },
    RicercaServizi: async(parent, args, context) => {
      const dao = new Dao(context.db, context.formatter);
      return dao.selectServiziEnteByIdServizio(
        args.idServizioRiferimento,
        args.filters,
        args.page,
        args.itemsPerPage,
        args.is0_18
      );
    },
    filtriMansioni: async(parent, args, context) => {
      const dao = new Dao(context.db, context.formatter);
      return dao.getMansioni(args.idServizioRiferimento);
    },
    filtriDestinatari: async(parent, args, context) => {
      const dao = new Dao(context.db, context.formatter);
      return dao.getDestinatari(args.idServizioRiferimento);
    },
    filtriFasceOrarie: async(parent, args, context) => {
      const dao = new Dao(context.db, context.formatter);
      return dao.getFasceOrarie(args.idServizioRiferimento);
    },
    filtriCdStatoServizi: async(parent, args, context) => {
      const dao = new Dao(context.db, context.formatter);
      return dao.getCdStatoServizi(args.idServizioRiferimento);
    },
    filtriPrezzoMaxMin: async(parent, args, context) => {
      const dao = new Dao(context.db, context.formatter);
      return dao.getPrezzoMaxMin(args.idServizioRiferimento, args.filters);
    },
    filtriMinPersoneQuantita: async(parent, args, context) => {
      const dao = new Dao(context.db, context.formatter);
      return dao.getMinPersoneQuantita(args.idServizioRiferimento);
    },
    tipologiaServizi: async(parent, args, context) => {
      const dao = new Dao(context.db, context.formatter);
      return dao.getServicesCodes(args.idServizioRiferimento);
    },
    serviceData: async(parent, args, context) => {
      const dao = new Dao(context.db, context.formatter);
      return dao.getServiceData(args.idServizioRiferimento);
    },
    listiniPrezzi: async(parent, args, context) => {
      const listini = [];
      const dao = new EnteDAO(context.db, context.queryBuilder, context.formatter);
      for (let i = 0; i < args.idServiziEnte.length; i += 1) {
        const idServizioEnte = args.idServiziEnte[i];
        const prezzo = await dao.getPrezzo(idServizioEnte);
        if (!prezzo) {
          return null;
        }
        const persone = await dao.getPersone(prezzo.idPrezzo);
        const listinoPrezzi = [];
        for (let i = 0; i < persone.length; i += 1) {
          const offerta = await dao.getQuantita(persone[i].idPrezzoPersone);
          listinoPrezzi.push({
            ...persone[i],
            offerta,
          });
        }
        listini.push({
          ...prezzo,
          listinoPrezzi,
        });
      }
      return listini;
    },
  },
  ServiziPayload: {
    spaziWeMi: async(parent, args, context) => {
      if ([999997, 999998, 999997].indexOf(parent.idServizioRiferimento) >= 0) {
        const dao = new Dao(context.db, context.formatter);
        return dao.getSpaziWemi(parent.idEnte);
      }
      return [];
    },
  },
};