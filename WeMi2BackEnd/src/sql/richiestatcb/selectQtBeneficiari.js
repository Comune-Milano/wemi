import tabelle from 'tabelle';

export const selectQtBeneficiari = ` select qt_beneficiari from ${tabelle.richiesta_servizio_tcb}
WHERE id_richiesta_servizio_tcb= $[idRichiestaTcb]
`;