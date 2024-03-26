import { SectionContentManagement } from 'controller/sectionmanagement';
import { CONTENT_STATE } from 'constants/db/contentstate';

export default {
  Query: {
    getContentSections: (parent, args, context) => {
      const contentManagement = new SectionContentManagement(context);
      return contentManagement.getSections(args.params || {});
    },
    getAllSections: (parent, args, context) => {
      const contentManagement = new SectionContentManagement(context);
      return contentManagement.getSections({ filters: { state: CONTENT_STATE.PUBLISHED  } });
    },
    getContentAllSections: (parent, args, context) => {
      const contentManagement = new SectionContentManagement(context);
      return contentManagement.getContentAllSections({ filters: { state: CONTENT_STATE.PUBLISHED  } });
    },
    getContentSection: (parent, args, context) => {
      const contentManagement = new SectionContentManagement(context);
      return contentManagement.getSection(args);
    },
    getMaxOrderSection: (parent, args, context) => {
      const contentManagement = new SectionContentManagement(context);
      return contentManagement.getMaxOrderSection();
    },
  }, 
  Mutation: { 
    publishSection: (parent, args, context) => {
      const contentManagement = new SectionContentManagement(context);
      return contentManagement.publishSection(args);
    },
    disableSection: (parent, args, context) => {
      const contentManagement = new SectionContentManagement(context);
      return contentManagement.disableSection(args);
    },
    saveSection: (parent, args, context) => {
      const contentManagement = new SectionContentManagement(context);
      return contentManagement.saveSection(args.section);
    },
  },
};