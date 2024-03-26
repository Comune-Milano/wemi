import { SliderFinancialEducationContentManagement } from 'controller/slideredfinanziaramanagement';

export default {
  Query: {
    EstraiSliderEducazioneFinanziaria: async (parent, args, context, info) => {
      const financialEducationManagement = new SliderFinancialEducationContentManagement(context);
      return financialEducationManagement.estraiSliderEducazioneFinanziaria(args);
    },
  },
};

