import { CandidaturaTCBValidator } from "validator/implementation/candidaturatcbvalidator";
import { DatiEnteValidator } from "../../validator/implementation/datientevalidator";
import { RichiestaTcbValidator } from "../../validator/implementation/richiestatcbvalidator";
import { RichiestaBaseCittadinoValidator } from "../../validator/implementation/richiestabasecittadinovalidator";
import { RichiestaEnteValidator } from "../../validator/implementation/richiestaentevalidator";
import { ServiziErogatiValidator } from "../../validator/implementation/servizierogativalidator";
import { AdministratorValidator } from "validator/implementation/administratorvalidator";

/**
 * The constant to represent the validator accept code and class
 * Code defines the type of validator
 * Class defines the implementation of the validator
 */

export const ENUM_VALIDATOR = {
    CANDIDATURA_TCB: { code: 'candidatura_tcb', class: CandidaturaTCBValidator },
    DATI_ENTE: { code: 'dati_ente', class: DatiEnteValidator },
    RICHIESTA_TCB: { code: 'richiesta_tcb', class: RichiestaTcbValidator },
    RICHIESTA_BASE_CITTADINO: { code: 'richiesta_base_cittadino', class: RichiestaBaseCittadinoValidator },
    RICHIESTA_ENTE: { code: 'richiesta_ente', class: RichiestaEnteValidator },
    SERVIZI_EROGATI_ENTE: { code: 'servizi_erogati_ente', class: ServiziErogatiValidator },
    ADMIN_VALIDATOR: { code: 'admin_validator', class: AdministratorValidator }
}

