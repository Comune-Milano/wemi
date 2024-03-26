import tabelle from 'tabelle';
import { isNullOrUndefined } from "util";


export const deleteAndUpdateBeneficiarioRic = (pgBenUpBeneficiarioTcb) => {
    let baseQuery = `DELETE FROM ${tabelle.beneficiario_ric_serv_tcb}
    WHERE 
    id_richiesta_servizio_tcb =$[idRichiestaTcb] AND `;

    if(!isNullOrUndefined(pgBenUpBeneficiarioTcb)){
        
        baseQuery += `pg_beneficiario_richiesta_tcb = $[pgBenUpBeneficiarioTcb];`;
    } else {
        baseQuery += `pg_beneficiario_richiesta_tcb = $[pgBen];`;
    }
 
    baseQuery += `UPDATE ${tabelle.richiesta_servizio_tcb}
    SET qt_beneficiari = $[qt_beneficiari.qt_beneficiari] -1
    WHERE id_richiesta_servizio_tcb= $[idRichiestaTcb];`;

    return baseQuery;

}



// `DELETE FROM ${tabelle.beneficiario_ric_serv_tcb}
// WHERE 
// id_richiesta_servizio_tcb =$[idRichiestaTcb] AND
// pg_beneficiario_richiesta_tcb = ${pgBenUp[pgBenUp.length - 1] &&
// pgBenUp[pgBenUp.length - 1].pg_beneficiario_richiesta_tcb ?
// pgBenUp[pgBenUp.length - 1].pg_beneficiario_richiesta_tcb : args.pgBen};

// UPDATE ${tabelle.richiesta_servizio_tcb}
// SET qt_beneficiari = ${qt_beneficiari.qt_beneficiari} -1
// WHERE id_richiesta_servizio_tcb= ${args.idRichiestaTcb}
// `;