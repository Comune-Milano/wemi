import {
  estraiAnniVotoEspQuery,
  estraiIscrizioniVincoliQuery,
  estraiStatoCandidaturaQuery,
  estraiIdAllegatiAttributiQuery,
  estraiDocumentiLavoratoreQuery
} from '../queries/queries';

const attributiVincoli = {
  iscrittoInps:'138',
  iscrittoRegioneLombardia:'139',
  dtItaliaDal:'210',
  vincoliCandidatura:'193'
}

export const estraiDatiOperatore = async (parent, args, context, info) => {
  const { idUtenteLav, arrayIdServizi } = args;
  let anniEspTata,
    anniEspColf,
    anniEspBadante,
    votoEspBadante,
    dtItaliaDal,
    votoEspTata,
    votoEspColf,
    iscrittoInps = false,
    iscrittoRegioneLombardia = false,
    vincoliCandidatura,
    documentiLavoratore = [];
  if (arrayIdServizi.length) {
    const anniVotoEsp = await context.db.any(estraiAnniVotoEspQuery, { args });
    anniVotoEsp.forEach(el => {
      switch (el.id_servizio_riferimento) {
        case 999997:
          anniEspTata = el.nr_anni_esperienza;
          votoEspTata = el.nr_voto_operatore;
          break;
        case 999998:
          anniEspColf = el.nr_anni_esperienza;
          votoEspColf = el.nr_voto_operatore;
          break;
        case 999999:
          anniEspBadante = el.nr_anni_esperienza;
          votoEspBadante = el.nr_voto_operatore;
          break;
        default:
          break;
      }
    });
  }

  const iscrizioniVincoli = await context.db.any(estraiIscrizioniVincoliQuery, { args });

  iscrizioniVincoli.forEach(el => {
    switch (el.cd_attributo) {
      case attributiVincoli.iscrittoInps:
        if (el.fg_val === '1') {
          iscrittoInps = true;
        }
        break;
      case attributiVincoli.iscrittoRegioneLombardia:
        if (el.fg_val === '1') {
          iscrittoRegioneLombardia = true;
        }
        break;
        case attributiVincoli.dtItaliaDal:
          if (el.dt_val) {
            dtItaliaDal = el.dt_val;
          }
          break;  
      case attributiVincoli.vincoliCandidatura:
        vincoliCandidatura = el.tx_val;
        break;
      default:
        break;
    }
  });

  const statoCandidatura = await context.db.one(estraiStatoCandidaturaQuery, { args });
  let arrayIdAllegati = [0];
  await context.db.any(estraiIdAllegatiAttributiQuery, { idUtenteLav }).then(res => {
    if (res.length) {
      arrayIdAllegati = res.map(el => el.cd_val_attributo)
    }
  });
  documentiLavoratore = await context.db.any(estraiDocumentiLavoratoreQuery, { idUtenteLav, arrayIdAllegati });

  return {
    anniEspTata: anniEspTata,
    anniEspColf: anniEspColf,
    anniEspBadante: anniEspBadante,
    statoCandidatura: statoCandidatura.cd_ultimo_stato_offerta,
    vincoliCandidatura: vincoliCandidatura,
    dtItaliaDal:dtItaliaDal,
    votoEspTata: votoEspTata,
    votoEspColf: votoEspColf,
    votoEspBadante: votoEspBadante,
    iscrittoInps: iscrittoInps,
    iscrittoRegioneLombardia: iscrittoRegioneLombardia,
    notaOperatore: statoCandidatura.tx_nota_operatore,
    documentiLavoratore: documentiLavoratore.map(doc => (
      {
        id: doc.id_allegato,
        fileName: doc.nm_nome_allegato_off,
        data: ""
      }
    ))
  }

};