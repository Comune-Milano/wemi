import { SliderFinancialEducationContentManagement } from 'controller/slideredfinanziaramanagement';

export default {
  Query: { 
    getSlidersFinancialEducation: (parent, args, context) => {
      const contentManagement = new SliderFinancialEducationContentManagement(context);
      return contentManagement.getSlidersFinancialEducation(args.params || {});
    },
    getSliderFinancialEducation: (parent, args, context) => {
      const contentManagement = new SliderFinancialEducationContentManagement(context);
      return contentManagement.getSliderFinancialEducation(args);
    },
    getMaxOrderTextualValuesSlider: (parent, args, context) => {
      const contentManagement = new SliderFinancialEducationContentManagement(context);
      return contentManagement.getMaxOrderTextualValuesSlider(args);
    }, 
  }, 
  Mutation: { 
    publishSlider: (parent, args, context) => {
      const contentManagement = new SliderFinancialEducationContentManagement(context);
      return contentManagement.publishSlider(args);
    },
    disableSlider: (parent, args, context) => {
      const contentManagement = new SliderFinancialEducationContentManagement(context);
      return contentManagement.disableSlider(args);
    },
    saveSlider: (parent, args, context) => {
      const contentManagement = new SliderFinancialEducationContentManagement(context);
      return contentManagement.saveSlider(args.content);
    },
  }, 
};