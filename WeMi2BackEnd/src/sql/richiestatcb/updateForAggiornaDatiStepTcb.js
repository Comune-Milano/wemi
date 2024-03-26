import tabelle from 'tabelle';

export const updateForAggiornaDatiStepTcb = `
UPDATE ${tabelle.richiesta_servizio_tcb} 
SET 
  cd_stato_pag_beneficiario = $[steps.cd_stato_pag_beneficiario],
  cd_stato_pag_mansioni = $[steps.cd_stato_pag_mansioni],
  cd_stato_pag_casa = $[steps.cd_stato_pag_casa],
  cd_stato_pag_animali = $[steps.cd_stato_pag_animali],
  cd_stato_pag_disponibilita = $[steps.cd_stato_pag_disponibilita],
  cd_stato_pag_preferenzelav = $[steps.cd_stato_pag_preferenzelav],
  cd_stato_pag_sedelavoro = $[steps.cd_stato_pag_sedelavoro]
WHERE id_richiesta_servizio_tcb = $[idRichiesta]`;