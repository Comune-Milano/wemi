/** @format */
export const RecuperaUtente = [
    '',
    `query RecuperaUtente( $username: String, $codicefiscale: String ){
        RecuperaUtente (username:$username, codicefiscale: $codicefiscale)  {
            id_utente
            cognome
            nome
            ptx_codice_fiscale
            ptx_email
        }
    }
    `
];

export const InserisciUtente = [
    '',
    `mutation InserisciUtente ($input: InserisciUtente!){
        InserisciUtente(
            input: $input
        )
    }
    `
];

export const inizializzaUtenteLavImpersonificazione = [
    '',
    `mutation inizializzaUtenteLavImpersonificazione( $idUtente: Int, $jsImpersonificazione: JSON) {
        inizializzaUtenteLavImpersonificazione(
            idUtente: $idUtente,
            jsImpersonificazione: $jsImpersonificazione
        )
    }`,
    'inizializzaUtenteLavImpersonificazione',
  ];