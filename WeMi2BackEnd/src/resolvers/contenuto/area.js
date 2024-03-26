import { AreaContentManagement } from 'controller/areamanagement';
import { CONTENT_STATE } from 'constants/db/contentstate';

export default {
  Query: {
    getContentAreas: (parent, args, context) => {
      const contentManagement = new AreaContentManagement(context);
      return contentManagement.getAreas(args.params || {});
    },
    getAllAreas: async (parent, args, context) => {
      const contentManagement = new AreaContentManagement(context);
      return contentManagement.getAreas({ filters: { state: CONTENT_STATE.PUBLISHED  } });
    },
    getContentArea: (parent, args, context) => {
      const contentManagement = new AreaContentManagement(context);
      return contentManagement.getArea(args);
    },
    getMaxOrderArea: (parent, args, context) => {
      const contentManagement = new AreaContentManagement(context);
      return contentManagement.getMaxOrderArea();
    },
  }, 
  Mutation: { 
    publishArea: (parent, args, context) => {
      const contentManagement = new AreaContentManagement(context);
      return contentManagement.publishArea(args);
    },
    disableArea: (parent, args, context) => {
      const contentManagement = new AreaContentManagement(context);
      return contentManagement.disableArea(args);
    },
    saveArea: (parent, args, context) => {
      const contentManagement = new AreaContentManagement(context);
      return contentManagement.saveArea(args.area);
    },
  },
};