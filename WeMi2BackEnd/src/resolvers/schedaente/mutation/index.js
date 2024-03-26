import { saveInstitutionCard } from './savecard';
import { saveInstitutionCardAdmin } from './savecardadmin';
import { forwardInstitutionCard } from './forwardcard';
import { forwardNotesInstitutionCard } from './forwardnotescard';
import { deactivateInstitutionCard } from './deactivatecard';
import { validateInstitutionCard } from './validatecard';

export default {
  Mutation: {
    saveInstitutionCard,
    saveInstitutionCardAdmin,
    forwardInstitutionCard,
    forwardNotesInstitutionCard,
    deactivateInstitutionCard,
    validateInstitutionCard,
  },
};