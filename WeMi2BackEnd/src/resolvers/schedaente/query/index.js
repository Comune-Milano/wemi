import { getInstitutionCard } from './getcard';
import { getInstitutionCardAdmin } from './getcardadmin';
import { checkInsertOperatorCard } from './checkinsertoperator';
import { checkDeleteOperatorCard } from './checkdeleteoperator';
import { checkDeleteSecondaryOfficeCard } from './checkdeletesecondaryoffice';

export const queriesGql = {
  Query: {
    getInstitutionCard,
    getInstitutionCardAdmin,
    checkInsertOperatorCard,
    checkDeleteOperatorCard,
    checkDeleteSecondaryOfficeCard,
  },
};