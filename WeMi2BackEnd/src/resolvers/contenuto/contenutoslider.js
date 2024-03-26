import { CONTENT_STATE } from 'constants/db/contentstate';
import { ContentSliderManagment } from 'controller/slidermanagement';

export default {
  Query: { 
    getContentListSlider: (parent, args, context) => {
      const contentManagement = new ContentSliderManagment(context);
      return contentManagement.getSliderListContent(args.params || {});
    },
    getAllListSlider: (parent, args, context) => {
      const contentManagement = new ContentSliderManagment(context);
      return contentManagement.getSliderList({ filters: { state: CONTENT_STATE.PUBLISHED  } });
    },
    getContentSlider: (parent, args, context) => {
      const contentManagement = new ContentSliderManagment(context);
      return contentManagement.getContent(args);
    },
    getMaxOrderContentSlider: (parent, args, context) => {
      const contentManagement = new ContentSliderManagment(context);
      return contentManagement.getMaxOrderContentSlider();
    },
  },
  Mutation: {
    publishContentSlider: (parent, args, context) => {
      const contentManagement = new ContentSliderManagment(context);
      return contentManagement.publishContentSlider(args);
    },
    disableContentSlider: (parent, args, context) => {
      const contentManagement = new ContentSliderManagment(context);
      return contentManagement.disableContentSlider(args);
    },
    saveContentSlider: (parent, args, context) => {
      const contentManagement = new ContentSliderManagment(context);
      return contentManagement.saveContent(args.section);
    },
  }, 
};