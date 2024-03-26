/* USERNAME LDAP */
export const USERNAME_LDAP = 'uid=wemi_reader';
/* PASSWORD LDAP */
export const PASSWORD_LDAP = 'JHjky65tfgF';
/* BASE CONNECTION LDAP */
export const BASENAME_LDAP = 'cn=users, DC=COMUNE, DC=MILANO';
/* ATTRIBUTES LDAP */
export const ATTRIBUTES_LDAP = [
    'uid', //username
    'givenName', //nome
    'sn', //cognome
    'mail', //email
    'street', //indirizzo
    'cdmCodiceFiscale', //codice fiscale
    'cdmSesso', //sesso
    'cdmNascitaData', //data di nascita
    'postalCode', //codice postale
    'cdmNascitaComune', //comune di nascita
    'cdmNascitaNazione', //stato di nascita
    'cdmNascitaProvincia', //provincia di nascita
    'cdmIdUtente', //id utente nel comune
    'telephoneNumber',
    'st',
    'cdmConsensoPrivacyTerzi' //booleano privacy    
];
