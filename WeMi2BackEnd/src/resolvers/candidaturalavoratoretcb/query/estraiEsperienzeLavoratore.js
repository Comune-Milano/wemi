import {
  estraiEsperienzeLavoratoreQuery
} from '../queries/queries';
import { estraiEsperienzeLavoratoreValidate } from 'sql/valattributodomanda/estraiesperienzelavoratorevalidate';

export const estraiEsperienzeLavoratore = async (parent, args, context, info) => {
  const { idUtenteLav } = args;

  const ENUM_TYPE = {
    VALIDATA: "Validata",
    INSERITA: "Inserita",
  };

  const esperienzeInserite = await context.db.any(estraiEsperienzeLavoratoreQuery, { idUtenteLav });
  let arrIdRichieste = [];

  const esperienzeValidate = await context.db.any(estraiEsperienzeLavoratoreValidate, { idUtenteLav });

  esperienzeValidate.forEach(esp => {
    if (!arrIdRichieste.includes(esp.id_richiesta_servizio_tcb)) {
      arrIdRichieste = arrIdRichieste.concat(esp.id_richiesta_servizio_tcb)
    }
  });

  esperienzeInserite.forEach(esp => {
    if (!arrIdRichieste.includes(esp.id_richiesta_servizio_tcb)) {
      arrIdRichieste = arrIdRichieste.concat(esp.id_richiesta_servizio_tcb)
    }
  });



  let nomeServizioAltro;

  const valuesToReturn = arrIdRichieste.map(ric => {
    let inizioPeriodo;
    let finePeriodo;
    let descrizioneEsp;
    let arrayAttributi = [];
    let cdAttrMans;
    let arrServizi = [];
    let type;

    esperienzeValidate.forEach(el => {
      if (ric === el.id_richiesta_servizio_tcb &&
        (el.cd_attributo === '60' ||
          el.cd_attributo === '61' ||
          el.cd_attributo === '62')) {

        if (cdAttrMans !== parseInt(el.cd_attributo, 10)) {
          switch (parseInt(el.cd_attributo, 10)) {
            case 60:
              if (!arrServizi.includes(3)) {
                arrServizi.push(3);
              }
              break;
            case 61:
              if (!arrServizi.includes(2)) {
                arrServizi.push(2);
              }
              break;
            case 62:
              if (!arrServizi.includes(1)) {
                arrServizi.push(1);
              }
              break;
            
            default:
              break;
          }
          cdAttrMans = parseInt(el.cd_attributo, 10);
        }
      }
      if (el.id_richiesta_servizio_tcb === ric) {
          inizioPeriodo = el.dt_periodo_richiesto_dal || undefined,
          finePeriodo = el.dt_periodo_richiesto_al,
          descrizioneEsp = el.tx_note_ente,
          type = ENUM_TYPE.VALIDATA;
          arrayAttributi = arrayAttributi.concat({
            cd_attributo: el.cd_attributo,
            cd_val_attributo: el.cd_val_attributo,
            tx_val: el.tx_val,
          });
      }
    });

    esperienzeInserite.forEach(el => {
      if (ric === el.id_richiesta_servizio_tcb &&
        (el.cd_attributo === '60' ||
          el.cd_attributo === '61' ||
          el.cd_attributo === '62')) {

        if (cdAttrMans !== parseInt(el.cd_attributo, 10)) {
          switch (parseInt(el.cd_attributo, 10)) {
            case 60:
              if (!arrServizi.includes(3)) {
                arrServizi.push(3);
              }
              break;
            case 61:
              if (!arrServizi.includes(2)) {
                arrServizi.push(2);
              }
              break;
            case 62:
              if (!arrServizi.includes(1)) {
                arrServizi.push(1);
              }
              break;
            
            default:
              break;
          }
          cdAttrMans = parseInt(el.cd_attributo, 10);
        }
      }
      if (el.id_richiesta_servizio_tcb === ric) {
        inizioPeriodo = el.dt_periodo_richiesto_dal,
          finePeriodo = el.dt_periodo_richiesto_al,
          descrizioneEsp = el.tx_note_ente,
          type = ENUM_TYPE.INSERITA;
          arrayAttributi = arrayAttributi.concat({
            cd_attributo: el.cd_attributo,
            cd_val_attributo: el.cd_val_attributo,
            tx_val: el.tx_val,
          });
          if (el.nomeServizioAltro && !arrServizi.includes(4)){
            nomeServizioAltro = el.nomeServizioAltro;
            arrServizi.push(4);
          }
      }
    });


    return {
      idRichiesta: ric,
      serviziPrestati: arrServizi,
      inizioPeriodo: inizioPeriodo,
      finePeriodo: finePeriodo,
      descrizioneEsp: descrizioneEsp,
      attributi: arrayAttributi,
      type,
      nomeServizioAltro
    }
  });

  return valuesToReturn.sort((a,b) => {
    if(a.idRichiesta < b.idRichiesta){
      return -1;
    }
  });

}