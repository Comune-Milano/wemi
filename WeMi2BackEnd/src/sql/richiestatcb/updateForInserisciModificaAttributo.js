import tabelle from 'tabelle';
import { isNullOrUndefined, isString, isNumber } from "util";

/**
 * Function per mutation update richiestaTcb x InserisciModificaAttributo
 * @param {object} val
 * 
 */
export const updateForInserisciModificaAttributo = (args) => {
   let baseQuery =  `
    UPDATE ${tabelle.richiesta_servizio_tcb} SET `;

    if(args.input.disponibilitaJson &&
        args.input.disponibilitaJson.lunedi){
            args.input.disponibilitaJson.lunedi = args.input.disponibilitaJson.lunedi.trim();
            baseQuery += `tx_lunedi_cal_disp = $[disponibilitaJson.lunedi],`
        } else {
            baseQuery += ''
        }

        if(args.input.disponibilitaJson &&
            args.input.disponibilitaJson.martedi){
                args.input.disponibilitaJson.martedi = args.input.disponibilitaJson.martedi.trim();
                baseQuery += `tx_martedi_acl_disp = $[disponibilitaJson.martedi],`
            } else {
                baseQuery += ''
            }
    
            if(args.input.disponibilitaJson &&
                args.input.disponibilitaJson.mercoledi){
                    args.input.disponibilitaJson.mercoledi = args.input.disponibilitaJson.mercoledi.trim();
                    baseQuery += `tx_mercoledi_cal_disp = $[disponibilitaJson.mercoledi],`
                } else {
                    baseQuery += ''
                }
        
                if(args.input.disponibilitaJson &&
                    args.input.disponibilitaJson.giovedi){
                        args.input.disponibilitaJson.giovedi = args.input.disponibilitaJson.giovedi.trim();
                        baseQuery += `tx_giovedi_cal_disp = $[disponibilitaJson.giovedi],`
                    } else {
                        baseQuery += ''
                    }
            
                    if(args.input.disponibilitaJson &&
                        args.input.disponibilitaJson.venerdi){
                            args.input.disponibilitaJson.venerdi = args.input.disponibilitaJson.venerdi.trim();
                            baseQuery += `tx_venerdi_cal_disp = $[disponibilitaJson.venerdi],`
                        } else {
                            baseQuery += ''
                        }
                
                        if(args.input.disponibilitaJson &&
                            args.input.disponibilitaJson.sabato){
                                args.input.disponibilitaJson.sabato = args.input.disponibilitaJson.sabato.trim();
                                baseQuery += `tx_sabato_cal_disp = $[disponibilitaJson.sabato],`
                            } else {
                                baseQuery += ''
                            }
                    
                            if(args.input.disponibilitaJson &&
                                args.input.disponibilitaJson.domenica){
                                    args.input.disponibilitaJson.domenica = args.input.disponibilitaJson.domenica.trim();
                                    baseQuery += `tx_domenica_cal_disp = $[disponibilitaJson.domenica],`
                                } else {
                                    baseQuery += ''
                                }

                                if(args.input.disponibilitaJson &&
                                    isNumber(args.input.disponibilitaJson.nr_ore_totali)){
                                    baseQuery += `nr_ore_richieste_totali = $[disponibilitaJson.nr_ore_totali],`}
                                    else {
                                        baseQuery += ''
                                    }

                                    baseQuery += `ts_ult_modifica = localtimestamp
                                    where id_richiesta_servizio_tcb = $[idRichiestaTcb];`

                                    return baseQuery;
                                                                                                            
}


// sql = `
// UPDATE ${context.tabelle.richiesta_servizio_tcb}
// SET
// ${args.input.disponibilitaJson &&
// args.input.disponibilitaJson.lunedi ?
// `tx_lunedi_cal_disp= '${args.input.disponibilitaJson.lunedi.trim()}',` : ''}

// ${args.input.disponibilitaJson &&
// args.input.disponibilitaJson.martedi ?
// `tx_martedi_acl_disp= '${args.input.disponibilitaJson.martedi.trim()}',` : ''}

// ${args.input.disponibilitaJson &&
// args.input.disponibilitaJson.mercoledi ?
// `tx_mercoledi_cal_disp= '${args.input.disponibilitaJson.mercoledi.trim()}',` : ''}

// ${args.input.disponibilitaJson &&
// args.input.disponibilitaJson.giovedi ?
// `tx_giovedi_cal_disp= '${args.input.disponibilitaJson.giovedi.trim()}',` : ''}

// ${args.input.disponibilitaJson &&
// args.input.disponibilitaJson.venerdi ?
// `tx_venerdi_cal_disp= '${args.input.disponibilitaJson.venerdi.trim()}',` : ''}

// ${args.input.disponibilitaJson &&
// args.input.disponibilitaJson.sabato ?
// `tx_sabato_cal_disp= '${args.input.disponibilitaJson.sabato.trim()}',` : ''}

// ${args.input.disponibilitaJson &&
// args.input.disponibilitaJson.domenica ?
// `tx_domenica_cal_disp= '${args.input.disponibilitaJson.domenica.trim()}',` : ''}

// ${args.input.disponibilitaJson &&
//   isNumber(args.input.disponibilitaJson.nr_ore_totali) ?
// `nr_ore_richieste_totali= '${args.input.disponibilitaJson.nr_ore_totali}',` : ''}

// ts_ult_modifica = localtimestamp
// where id_richiesta_servizio_tcb = ${args.input.idRichiestaTcb};                                        
//                   `