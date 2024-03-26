import tabelle from 'tabelle';

export const selectDisponibilitaDays = `
                    select 
                    tx_lunedi_cal_disp, 
                    tx_martedi_acl_disp, 
                    tx_mercoledi_cal_disp, 
                    tx_giovedi_cal_disp, 
                    tx_venerdi_cal_disp, 
                    tx_sabato_cal_disp, 
                    tx_domenica_cal_disp,
                    nr_ore_richieste_totali
                    FROM ${tabelle.richiesta_servizio_tcb}
                    WHERE id_richiesta_servizio_tcb = $[datiDisponibilita.idRichiestaTcb]`;
