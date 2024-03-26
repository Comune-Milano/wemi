import { ServiceContentManagement } from 'controller/servicecontentmanagement';

export default {
  Query: {
    getContentServices: (parent, args, context) => {
      const contentManagement = new ServiceContentManagement(context);
      return contentManagement.getServices(args.params || {});
    },
    getContentService: (parent, args, context) => {
      const contentManagement = new ServiceContentManagement(context);
      return contentManagement.getService(args);
    },
    getMaxOrderService: (parent, args, context) => {
      const contentManagement = new ServiceContentManagement(context);
      return contentManagement.getMaxOrderService();
    },
  }, 
  Mutation: { 
    publishServiceContent: (parent, args, context) => {
      const contentManagement = new ServiceContentManagement(context);
      return contentManagement.publishContentService(args);
    },
    disableServiceContent: (parent, args, context) => {
      const contentManagement = new ServiceContentManagement(context);
      return contentManagement.disableContentService(args);
    },
    saveContentService: (parent, args, context) => {
      const contentManagement = new ServiceContentManagement(context);
      return contentManagement.saveContentService(args.service);
    },
  },
};