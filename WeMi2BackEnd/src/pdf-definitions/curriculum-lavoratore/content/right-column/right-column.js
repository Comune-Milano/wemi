
import {
  childrenCare,
  homeCare,
  caregiverSkills,
  professionalExperiences,
  references,
  rightColumnHeader,
} from './partials';

import { unbreakableStack } from '../shared/unbreakable-stack';

/**
 * Right column of main layout.
 */
export function rightColumn(pdfData) {
  return {
    border: [false, false, false, false],
    style: 'mainLayoutRightCol',
	  stack: [
      // Header.
      ...rightColumnHeader(pdfData),
      // Esperienze professionali.
      ...professionalExperiences(pdfData),
      // Referenze.
      ...references(pdfData),
      // Competenze - Cura dei bambini.
      unbreakableStack(
        childrenCare(pdfData)
      ),
      // Competenze - Badante
      unbreakableStack(
        caregiverSkills(pdfData)
      ),
      // Competenze - Cura della casa.
      unbreakableStack(
        homeCare(pdfData)
      ),
    ],
  };
}