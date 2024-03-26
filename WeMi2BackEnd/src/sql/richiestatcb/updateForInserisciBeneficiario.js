import tabelle from 'tabelle';

export const updateForInserisciBeneficiario  = (qt_beneficiari) => {
    let baseQuery = `UPDATE ${tabelle.richiesta_servizio_tcb} `;

    if(qt_beneficiari  && qt_beneficiari.qt_beneficiari){
        qt_beneficiari.qt_beneficiari = qt_beneficiari.qt_beneficiari +1;
        baseQuery += ` SET qt_beneficiari = $[qt_beneficiari.qt_beneficiari]`
    } else {
        baseQuery += ` SET qt_beneficiari = 1 `
    }

    baseQuery += ` WHERE id_richiesta_servizio_tcb= $[idRichiestaTcb]`;

    return baseQuery;

// `UPDATE ${tabelle.richiesta_servizio_tcb}
// SET qt_beneficiari = ${ qt_beneficiari  && qt_beneficiari.qt_beneficiari ? qt_beneficiari.qt_beneficiari + 1 :  1 }
// WHERE id_richiesta_servizio_tcb= ${args.idRichiestaTcb}
// `
//                                     ;

                                }