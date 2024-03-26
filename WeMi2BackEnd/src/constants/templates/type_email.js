import { EmailSenderAdministrator } from 'utility/email/implementation/administrator';
import { EmailSenderCandidatura } from 'utility/email/implementation/candidaturatcb';
import { EmailSenderRichiestaEnte } from 'utility/email/implementation/richiestaente';
import { EmailSenderRichiestaTcb } from 'utility/email/implementation/richiestatcb';

export const EMAIL_TYPE = {
  ADMINISTRATOR: { code: 'administrator', class: EmailSenderAdministrator },
  CANDIDATURA_TCB: { code: 'candidatura_tcb', class: EmailSenderCandidatura },
  RICHIESTA_ENTE: { code: 'richiesta_ente', class: EmailSenderRichiestaEnte },
  RICHIESTA_TCB: { code: 'richiesta_tcb', class: EmailSenderRichiestaTcb },
};