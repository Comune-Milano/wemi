import { attributo, defaultValueCalendar } from "constants/db/attributo";

export const trovaDisponibilitaLavoratori = (idWorkers) => `
select id_utente_lav, json_build_array(
  json_build_object('dayId', 1, 'dayName', 'Lunedì','hoursBin', COALESCE(vacosl.tx_lunedi, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 2, 'dayName', 'Martedì','hoursBin', COALESCE(vacosl.tx_martedi, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 3, 'dayName', 'Mercoledì','hoursBin', COALESCE(vacosl.tx_mercoledi, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 4, 'dayName', 'Giovedì','hoursBin', COALESCE(vacosl.tx_giovedi, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 5, 'dayName', 'Venerdì','hoursBin', COALESCE(vacosl.tx_venerdi, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 6, 'dayName', 'Sabato','hoursBin', COALESCE(vacosl.tx_sabato, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 7, 'dayName', 'Domenica','hoursBin', COALESCE(vacosl.tx_domenica, '${defaultValueCalendar}'), 'count', 0)
  ) as "calendario"
from wemi2.val_attributo_cal_off_serv_lav vacosl
where id_utente_lav IN (${idWorkers.join(',')}) and id_servizio_riferimento = $[idServizio] 
and cd_attributo_orario_lav = ${attributo.LS_ORARIO_LAVORO.cd_attributo} and cd_val_attributo_orario_lav = $[tipologiaOrario]
`;