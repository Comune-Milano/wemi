import tabelle from 'tabelle';

export const eliminaVoucherNonConfermati = `
DELETE FROM ${tabelle.voucher}
WHERE   (cd_stato_voucher = $[state] and ts_caricamento::date < CURRENT_DATE ) or 
        (cd_stato_voucher = $[state] and id_utente_caricamento = $[idUtente])
;
`;
