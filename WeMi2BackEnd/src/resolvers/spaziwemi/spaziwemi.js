import SpaziWeMiDao from '../../dao/spaziwemi/spaziwemiDao';

export default {
  Query: {
    getSpaziTCBData: async(parent, args, context) => {
      const dao = new SpaziWeMiDao(context.db);
      const servizi = dao.getSpaziData(args.idTCB);
      return {
        services: servizi,
      };
    },
  },
};