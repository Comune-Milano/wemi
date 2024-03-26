
import {
  additionalAvailabilities,
  character,
  communicationAbility,
  documents,
  education,
  hobbies,
  languages,
  personalInfo,
  profileImage,
  salary,
} from './partials';

import { unbreakableStack } from '../shared/unbreakable-stack';

/**
 * Left column of main layout.
 */
export async function leftColumn(pdfData) {
  const profileImageContent = await profileImage(pdfData);

  return {
    border: [false, false, false, false],
    margin: [0, -30, 20, 0],
    style: 'mainLayoutLeftCol',
	  stack: [
      // Immagine profilo.
      profileImageContent,
      // Dati personali.
      unbreakableStack(
        personalInfo(pdfData)
      ),
      // Documenti.
      unbreakableStack(
        documents(pdfData)
      ),
      // Istruzione e formazione.
      unbreakableStack(
        education(pdfData)
      ),
      // Lingue.
      unbreakableStack(
        languages(pdfData)
      ),
      // Retribuzione.
      unbreakableStack(
        salary(pdfData)
      ),
      // Capacità comunicative.
      unbreakableStack(
        communicationAbility(pdfData)
      ),
      // Character.
      unbreakableStack(
        character(pdfData)
      ),
      // Hobby e interessi.
      unbreakableStack(
        hobbies(pdfData)
      ),
      // Disponibilità aggiuntive.
      unbreakableStack(
        additionalAvailabilities(pdfData)
      ),
    ],
  };
}