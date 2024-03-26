import { OPERATORE_ENTE, AMMINISTRATORE_ENTE, LAVORATORE, AMMINISTRATORE, CITTADINO } from 'types/userRole';

export const mapperUser = (utente) => {
  const userMapped = {};
    // EMAIL CORRELAZIONE TRA ENTE E UTENTE
  userMapped.idCittadino = utente.idUtente;
  userMapped.Profilo = utente.profile?.code || utente.profile;
  userMapped.Ruolo = utente.profile?.description;
  userMapped.DatiPersonali = utente.personalData;
  userMapped.CodiceFiscale = utente.fiscalCode;
  userMapped.Email = utente.email;
  userMapped.Sesso = utente.gender;
  userMapped.Nome = utente.name;
  userMapped.Cognome = utente.surname;
  userMapped.Authorizations = utente.authorizations;
  userMapped.isYoung = utente.isYoung;
  userMapped.birthday = utente.birthday;

  if (userMapped.Profilo === AMMINISTRATORE_ENTE || userMapped.Profilo === OPERATORE_ENTE) {
    userMapped.idEnte = utente.idEnte;
    userMapped.Profilo = OPERATORE_ENTE;
    userMapped.Ruolo = 'Ente';
  }

  if (userMapped.Profilo === LAVORATORE) {
    userMapped.Ruolo = 'Lavoratore';
  }

  if (userMapped.Profilo === CITTADINO) {
    userMapped.Ruolo = 'Cittadino';
  }

  if (userMapped.Profilo === AMMINISTRATORE) {
    userMapped.Ruolo = 'Amministratore WeMi';
  }

  return userMapped;
};
