import { CD_TIPOLOGICA_TATA, CD_TIPOLOGICA_BADANTE } from "constants/db/servizio_riferimento_tcb"


export const returnCdAttributoBeneficiario = (idServizio) => {

    if (idServizio === CD_TIPOLOGICA_TATA) {
        return '306'
    }
    if (idServizio === CD_TIPOLOGICA_BADANTE) {
        return '15'
    }
}