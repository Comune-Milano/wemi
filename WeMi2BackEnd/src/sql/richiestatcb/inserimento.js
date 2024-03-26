import { RICHIESTA_BASE_CHIUSA, RICHIESTA_BASE_RICHIESTA_ANNULLAMENTO } from "../../resolvers/richiestaserviziobase/constants/StatoRichiestaBase";
import tabelle from 'tabelle';

export const insertStateRequestEnte = `
INSERT INTO wemi2.richiesta_servizio_ente_stt (
    id_richiesta_servizio_ente,
    ts_variazione_stato,
    cd_stato_ric_serv_ente,
    cd_stato_chat,
    id_utente
  )
  VALUES(
    $[id_richiesta_servizio_ente],
    localtimestamp,
    14,
    $[cd_stato_chat],
    $[id_utente_richiedente]
  );
`;

export const insertStateRequestBase = `
INSERT INTO wemi2.richiesta_servizio_base_stt (
    id_richiesta_servizio,
    ts_variazione_stato,
    cd_stato_richiesta_servizio,
    id_utente
  )
  VALUES (
    $[id_richiesta_servizio_base],
    localtimestamp,
    ${RICHIESTA_BASE_CHIUSA},
    $[id_utente_richiedente]
  )
`;

export const insertStateRequestBaseRichiestaAnnullamento = `
INSERT INTO wemi2.richiesta_servizio_base_stt (
    id_richiesta_servizio,
    ts_variazione_stato,
    cd_stato_richiesta_servizio,
    id_utente
  )
  VALUES (
    $[id_richiesta_servizio_base],
    localtimestamp,
    ${RICHIESTA_BASE_RICHIESTA_ANNULLAMENTO},
    $[id_utente_richiedente]
  )
`;

export const inserisciRichiestaTcb = (args) => {
   let baseQuery = `INSERT INTO ${tabelle.richiesta_servizio_tcb}(
     id_richiesta_servizio_tcb, `;

     if(args.input.qt_beneficiari){
     baseQuery += `qt_beneficiari,`;
     }

     baseQuery += `ts_ult_modifica, 
     ts_creazione`;

     if(args.input.js_impersonificazione){
       baseQuery += `,js_impersonificazione`;
     }

     baseQuery += ` ) VALUES ($[id_richiesta_servizio_ente], `;

     if(args.input.qt_beneficiari){
       baseQuery += `$[qt_beneficiari],`;
     }
     baseQuery +=` localtimestamp, localtimestamp`;

     if(args.input.js_impersonificazione){
      //  args.input.js_impersonificazione = JSON.stringify(args.input.js_impersonificazione);
      baseQuery +=  ` ,$[js_impersonificazione:json]`
     }

     baseQuery += `);`;

     return baseQuery;
}