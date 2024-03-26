import tabelle from 'tabelle';

export const insertBeneficiario  = `INSERT INTO ${tabelle.beneficiario_ric_serv_tcb} 
                               (id_richiesta_servizio_tcb, 
                                pg_beneficiario_richiesta_tcb,
                                ts_creazione) 
                                VALUES (
                                    $[idRichiestaTcb],
                                    $[pgBen],
                                    localtimestamp);
                                    `;