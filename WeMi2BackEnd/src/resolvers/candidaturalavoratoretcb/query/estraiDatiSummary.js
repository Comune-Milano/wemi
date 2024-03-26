import {
  querySummary, 
} from '../queries/queries';
import {   
  estraiStatoOccupazionaleQuery, 
  estraiCorsiTataQuery, 
  estraiCorsiBadanteQuery, 
  estraiLingueParlateQuery, 
  estraiInteressiQuery, 
  estraiCarattereLavoratoreQuery, 
  estraiAltezzaQuery, 
  estraiCorporaturaQuery,
  estraiFasciaEtaQuery,
  estraiPatologieGenericheQuery,
  estraiPatologieQuery } from 'resolvers/dominioTcb/queries';
import{
  estraiMansioniColfQuery,
  estraiMansioniTataCandidaturaQuery, 
  estraiMansioniBadanteQuery
} from 'resolvers/mansioneTcb/queries';

export const estraiDatiSummary =  async (parent, args, context, info) => {
  return  await context.db.any(querySummary, args);
};

export const estraiDatiPartials =  async (parent, args, context, info) => {
  return await context.db.task('estariDatiContenutiNegliSteps', async t => {
    return await t.batch([
      t.any(estraiStatoOccupazionaleQuery, args),
      t.any(estraiCorsiBadanteQuery, args),
      t.any(estraiCorsiTataQuery, args),
      t.any(estraiLingueParlateQuery, args),
      t.any(estraiInteressiQuery, args),
      t.any(estraiCarattereLavoratoreQuery, args),
      t.any(estraiAltezzaQuery, args),
      t.any(estraiCorporaturaQuery, args),
      t.any(estraiFasciaEtaQuery, args),
      t.any(estraiPatologieGenericheQuery, args),
      t.any(estraiPatologieQuery, args), 
      t.any(estraiMansioniColfQuery, args),
      t.any(estraiMansioniTataCandidaturaQuery, args),
      t.any(estraiMansioniBadanteQuery, args), 
    ])
  })
    .then(([
      statoOccupazionale,
      corsiBadante,
      corsiTata,
      lingueParlate,
      interessi,
      carattereLavoratore,
      altezza,
      corporatura,
      fasciaEta,
      patologieGeneriche,
      patologie,
      mansioniColf,
      mansioniTata,
      mansioniBadante
    ]) => ({
      statoOccupazionale,
      corsiBadante,
      corsiTata,
      lingueParlate,
      interessi,
      carattereLavoratore,
      altezza,
      corporatura,
      fasciaEta,
      patologieGeneriche,
      patologie,
      mansioniColf,
      mansioniTata,
      mansioniBadante
    }))
}