import { isNullOrUndefined } from 'util';
import { findHourTypologyAttribute } from './findHourTypologyAttribute';
import { findWorkerTypeAttribute } from './findWorkerTypeAttribute';
import { attributo, defaultValueCalendar } from 'constants/db/attributo';
import psqlAdapter from 'helpers/psqlAdapter';
import { dominioTcb } from 'constants/db/dominio_tcb';
import { statiCandidatura } from 'constants/db/statiCandidatura';

/**
 * Function to generate the filters condition
 * @param {*} parameters the parameters
 * @returns {string} the query string
 */
export const generateFilterMatchCondition = (parameters) => {
  const { orarioLavoro } = dominioTcb; 
  
  const {
    codiceFiscale,
    cognome,
    statoCandidatura,
    tipologiaServizio,
    patente,
    automunito,
    cani,
    gatti,
    lavoratorePresenzaAnimali,
    carattere,
    corsiTata,
    corsiBadante,
    madrelingua,
    livelloConoscenza,
    competenzeTata,
    competenzeColf,
    competenzeBadante,
    accudimento,
    tipologiaOrario,
    stipendioProposto,
    anniEsperienza,
    tipoLavoratore,
    vacanzaFamiglia,
    vacanzaAssistito,
    trasferteBrevi,
    trasferteLunghe,
    lavorareFuoriMi,
    straordinari,
    genere,
    superficieCasa,
    oreSettimanali,
    // oreLavoro,
    tipologiaContratto,
    municipi,
    maxBambini,
    mezzaGiornataConvivente,
    spaziConvivente,
    spaziConvivenzaRidotta,
    calendario,
    livelliLingua,
    votoOperatore,
    disponibilitaAnimali,

  } = parameters;


  let whereCondition = `WHERE  
                  t1.cd_ultimo_stato_offerta <> ${statiCandidatura.bozza} 
                  and t2.id_servizio_riferimento = $[idServizio]
                  and (t2.nr_voto_operatore > 0 or t2.nr_voto_operatore is null)
                  and t3.cd_attributo = 109 and t3.cd_val_attributo in (1,2,4) 
                 and t1.dt_disponibile_dal <= (
                    SELECT greatest(dt_val, current_date)
                     FROM wemi2.val_attributo_domanda
                     WHERE cd_attributo = 31 and id_richiesta_servizio_tcb = $[idRichiesta]
                  )
                  and t1.id_utente_lav NOT IN (
                   SELECT id_lavoratore
                    FROM wemi2.r_match_ric_lav
                    WHERE (cd_stato_associazione = '5' 
                    or cd_stato_associazione = '6')
                    and id_richiesta <> $[idRichiesta]
                  ) 
  \n`;

  //Filtri su tabella
  if (codiceFiscale) {
    const condition = 'and LOWER(ut.ptx_codice_fiscale) LIKE LOWER($[codiceFiscale]) \n';
    whereCondition = whereCondition + condition;
  }

  if (cognome) {
    const condition = 'and LOWER(vauCognome.tx_val) LIKE LOWER($[cognome]) \n';
    whereCondition = whereCondition + condition;
  }

  if (!isNullOrUndefined(statoCandidatura)) {
    const condition = 'and t1.cd_ultimo_stato_offerta = $[statoCandidatura] \n';
    whereCondition = whereCondition + condition;
  }

  if (!isNullOrUndefined(tipologiaServizio)) {
    const condition = `and t1.id_utente_lav IN (
      SELECT id_lavoratore
      FROM wemi2.r_match_ric_lav
      WHERE CAST(cd_stato_associazione as Int) = $[tipologiaServizio]
      and id_richiesta = $[idRichiesta]
      ) \n`;
    whereCondition = whereCondition + condition;
  }




  //Filtri da popup

  if(calendario && tipologiaOrario && tipologiaOrario !== orarioLavoro.convivenza){
    let condition = psqlAdapter.formatter.format(`
    and t1.id_utente_lav IN (select vacosl.id_utente_lav
      from wemi2.val_attributo_cal_off_serv_lav vacosl
      where
      vacosl.id_utente_lav = t1.id_utente_lav
      and vacosl.id_servizio_riferimento = t2.id_servizio_riferimento
      and vacosl.cd_attributo_orario_lav = $[attributo] 
      and vacosl.cd_val_attributo_orario_lav = $[tipologiaOrario] 

      `, { tipologiaOrario, attributo: attributo.LS_ORARIO_LAVORO.cd_attributo });
    calendario.forEach(giorno => { 
      if(giorno.dayId === 1){
        let index = 1;
        for (const character of giorno.hoursBin) {
          if (index !== giorno.hoursBin.length - 1) {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_lunedi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, character, defaultValueCalendar });
          }
          else {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_lunedi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, defaultValueCalendar, character });

          }
          index += 1;
        }
        // condition = condition + psqlAdapter.formatter.format(`
        //   and COALESCE(tx_lunedi, $[defaultValueCalendar]) >= $[hoursBin]
        // `, { hoursBin: giorno.hoursBin, defaultValueCalendar });
      }
      if(giorno.dayId === 2){
        let index = 1;
        for (const character of giorno.hoursBin) {
          if (index !== giorno.hoursBin.length - 1) {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_martedi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, character, defaultValueCalendar });
          }
          else {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_martedi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, defaultValueCalendar, character });

          }
          index += 1;
        }
        // condition = condition + psqlAdapter.formatter.format(`
        //   and COALESCE(tx_martedi, $[defaultValueCalendar]) >= $[hoursBin]
        // `, { hoursBin: giorno.hoursBin, defaultValueCalendar });
      } 
      if(giorno.dayId === 3){
        let index = 1;
        for (const character of giorno.hoursBin) {
          if (index !== giorno.hoursBin.length - 1) {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_mercoledi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, character, defaultValueCalendar });
          }
          else {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_mercoledi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, defaultValueCalendar, character });

          }
          index += 1;
        }
        // condition = condition + psqlAdapter.formatter.format(`
        //   and COALESCE(tx_mercoledi, $[defaultValueCalendar]) >= $[hoursBin]
        // `, { hoursBin: giorno.hoursBin, defaultValueCalendar });
      } 
      if(giorno.dayId === 4){
        let index = 1;
        for (const character of giorno.hoursBin) {
          if (index !== giorno.hoursBin.length - 1) {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_giovedi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, character, defaultValueCalendar });
          }
          else {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_giovedi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, defaultValueCalendar, character });

          }
          index += 1;
        }
        // condition = condition + psqlAdapter.formatter.format(`
        //   and COALESCE(tx_giovedi, $[defaultValueCalendar]) >= $[hoursBin]
        // `, { hoursBin: giorno.hoursBin, defaultValueCalendar });
      } 
      if(giorno.dayId === 5){
        let index = 1;
        for (const character of giorno.hoursBin) {
          if (index !== giorno.hoursBin.length - 1) {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_venerdi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, character, defaultValueCalendar });
          }
          else {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_venerdi, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, defaultValueCalendar, character });

          }
          index += 1;
        }
        // condition = condition + psqlAdapter.formatter.format(`
        //   and COALESCE(tx_venerdi, $[defaultValueCalendar]) >= $[hoursBin]
        // `, { hoursBin: giorno.hoursBin, defaultValueCalendar });
      }
      if(giorno.dayId === 6){
        let index = 1;
        for (const character of giorno.hoursBin) {
          if (index !== giorno.hoursBin.length - 1) {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_sabato, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, character, defaultValueCalendar });
          }
          else {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_sabato, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, defaultValueCalendar, character });

          }
          index += 1;
        }
        // condition = condition + psqlAdapter.formatter.format(`
        //   and COALESCE(tx_sabato, $[defaultValueCalendar]) >= $[hoursBin]
        // `, { hoursBin: giorno.hoursBin, defaultValueCalendar });
      }
      if(giorno.dayId === 7){
        let index = 1;
        for (const character of giorno.hoursBin) {
          if (index !== giorno.hoursBin.length - 1) {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_domenica, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, character, defaultValueCalendar });
          }
          else {
            condition = condition + psqlAdapter.formatter.format(`
                  and $[character] <= substring(COALESCE(tx_domenica, $[defaultValueCalendar])
                   FROM $[index] FOR 1)`, { index, defaultValueCalendar, character });

          }
          index += 1;
        }
        // condition = condition + psqlAdapter.formatter.format(`
        //   and COALESCE(tx_domenica, $[defaultValueCalendar]) >= $[hoursBin]
        // `, { hoursBin: giorno.hoursBin, defaultValueCalendar });
      }
    });

    condition = `${condition  } ) \n`;
      
    whereCondition = whereCondition + condition;
  }

  if(votoOperatore){
    const condition = `
  and t1.id_utente_lav IN (
    SELECT id_utente_lav
    FROM wemi2.utente_offerta_servizio as uos
    WHERE uos.id_utente_lav = t2.id_utente_lav and (
        ($[votoOperatore] <= uos.nr_voto_operatore)
  )) \n
  `;
    whereCondition = whereCondition + condition;
  }

  if (patente) {
    const condition = `
  and t1.id_utente_lav IN (select vaout.id_utente_offerta_lav
  from wemi2.val_attributo_offerta_ut vaout
  where
  vaout.id_utente_offerta_lav = t1.id_utente_lav
    and vaout.cd_attributo = ${attributo.FG_PATENTE_DI_GUIDA_AUTO}
    and vaout.cd_val_attributo = 1
  and vaout.fg_val = 'S') \n
  `;
    whereCondition = whereCondition + condition;
  }

  if (automunito) {
    const condition = `
  and t1.id_utente_lav IN (select vaout.id_utente_offerta_lav
    from wemi2.val_attributo_offerta_ut vaout
    where
    vaout.id_utente_offerta_lav = t1.id_utente_lav
      and vaout.cd_attributo = ${attributo.FG_AUTOMUNITO}
      and vaout.cd_val_attributo = 1
    and vaout.fg_val = 'S') \n
  `;
    whereCondition = whereCondition + condition;
  }

  if (cani) {
    const condition = `
  and t1.id_utente_lav NOT IN (select vaout.id_utente_offerta_lav
    from wemi2.val_attributo_offerta_ut vaout
    where
    vaout.id_utente_offerta_lav = t1.id_utente_lav
      and vaout.cd_attributo = ${attributo.FG_ALLERGIA_CANI}
      and vaout.cd_val_attributo = 1
    and vaout.fg_val = 'S') \n
  
  `;
    whereCondition = whereCondition + condition;
  }

  if (gatti) {

    const condition = `
  and t1.id_utente_lav NOT IN (select vaout.id_utente_offerta_lav
    from wemi2.val_attributo_offerta_ut vaout
    where
    vaout.id_utente_offerta_lav = t1.id_utente_lav
      and vaout.cd_attributo = ${attributo.FG_ALLERGIA_GATTI}
      and vaout.cd_val_attributo = 1
    and vaout.fg_val = 'S') \n
  `;

    whereCondition = whereCondition + condition;
  }

  if (lavoratorePresenzaAnimali) {

    const condition = `
  and t1.id_utente_lav IN (select vaos.id_utente_lav
    from wemi2.val_attributo_offerta_servizio vaos
    where
    vaos.id_utente_lav = t1.id_utente_lav
    and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
      and vaos.cd_attributo = ${attributo.FG_DISP_LAV_CASA_CON_ANIMALI}
      and vaos.cd_val_attributo = 1
    and vaos.fg_val = 'S') \n
  `;

    whereCondition = whereCondition + condition;
  }

  if (disponibilitaAnimali) {

    const condition = psqlAdapter.formatter.format(`
  and t1.id_utente_lav IN (select vaos.id_utente_lav
    from wemi2.val_attributo_offerta_servizio vaos
    where
    vaos.id_utente_lav = t1.id_utente_lav
    and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
      and vaos.cd_attributo = $[attributo]
      and vaos.cd_val_attributo = 1
    and vaos.fg_val = 'S') \n
  `, { attributo: attributo.FG_DISP_CURA_ANIMALI });

    whereCondition = whereCondition + condition;
  }

  if (carattere) {
    carattere.forEach(caratt => {
      const condition = psqlAdapter.formatter.format(
              `
        and t1.id_utente_lav IN (select vaout.id_utente_offerta_lav
          from wemi2.val_attributo_offerta_ut vaout
          where
          vaout.id_utente_offerta_lav = t1.id_utente_lav
            and vaout.cd_attributo = $[attributo]
        and vaout.cd_val_attributo = $[caratt]
        ) \n`
        , { caratt, attributo: attributo.LS_CARATTERE.cd_attributo }
);
      whereCondition = whereCondition + condition;
    });
  //   const condition = `
  // and t1.id_utente_lav IN (select vaout.id_utente_offerta_lav
  //   from wemi2.val_attributo_offerta_ut vaout
  //   where
  //   vaout.id_utente_offerta_lav = t1.id_utente_lav
  //     and vaout.cd_attributo = ${attributo.LS_CARATTERE.cd_attributo}
  // and vaout.cd_val_attributo in ($[carattere:csv])
  // ) \n`;

  //   whereCondition = whereCondition + condition;
  }

  if (corsiTata) {
    corsiTata.forEach(corsoTata => {
      const condition = psqlAdapter.formatter.format(
              `
        and t1.id_utente_lav IN (select vaout.id_utente_offerta_lav
          from wemi2.val_attributo_offerta_ut vaout
          where
          vaout.id_utente_offerta_lav = t1.id_utente_lav
            and vaout.cd_attributo = $[attributo]
        and vaout.cd_val_attributo = $[corsoTata]
        ) \n`
        , { corsoTata, attributo: attributo.LS_CORSI_TATA.cd_attributo }
);
      whereCondition = whereCondition + condition;
    });
  //   const condition = `
  // and t1.id_utente_lav IN (select vaout.id_utente_offerta_lav
  //   from wemi2.val_attributo_offerta_ut vaout
  //   where
  //   vaout.id_utente_offerta_lav = t1.id_utente_lav
  //     and vaout.cd_attributo = ${attributo.LS_CORSI_TATA.cd_attributo}
  // and vaout.cd_val_attributo in ($[corsiTata:csv])
  // )
  // \n
  // `;
  //   whereCondition = whereCondition + condition;
  }

  if (corsiBadante) {
    corsiBadante.forEach(corsoBadante => {
      const condition = psqlAdapter.formatter.format(
              `
        and t1.id_utente_lav IN (select vaout.id_utente_offerta_lav
          from wemi2.val_attributo_offerta_ut vaout
          where
          vaout.id_utente_offerta_lav = t1.id_utente_lav
            and vaout.cd_attributo = $[attributo]
        and vaout.cd_val_attributo = $[corsoBadante]
        ) \n`
        , { corsoBadante, attributo: attributo.LS_CORSI_BADANTE.cd_attributo }
);
      whereCondition = whereCondition + condition;
    });
  //   const condition = `

  // and t1.id_utente_lav IN (select vaout.id_utente_offerta_lav
  //   from wemi2.val_attributo_offerta_ut vaout
  //   where
  //   vaout.id_utente_offerta_lav = t1.id_utente_lav
  //     and vaout.cd_attributo = ${attributo.LS_CORSI_BADANTE.cd_attributo}
  // and vaout.cd_val_attributo in ($[corsiBadante:csv])
  // )
  // \n
  // `;
  //   whereCondition = whereCondition + condition;
  }


  if (livelloConoscenza) {

    const maxLivelloLingua = 6;

    let flagMadrelingua;

    if (flagMadrelingua) {
      flagMadrelingua = madrelingua;
    }

    const condition = `and t1.id_utente_lav IN (select vaout.id_utente 
  from val_attributo_ut vaout
  where vaout.id_utente = t1.id_utente_lav
  and vaout.cd_attributo = ${attributo.LIV_CONOSCENZA_ITALIANO}
  and vaout.cd_val_attributo = 1
  and vaout.nr_val >=  ${flagMadrelingua ? maxLivelloLingua : '$[livelloConoscenza]'}) \n
  `;
    whereCondition = whereCondition + condition;
  }

  if (competenzeTata) {
    competenzeTata.forEach(competenzaTata => {
      competenzaTata.fasceEtaSelezionate.forEach(fasciaEta => {
        const condition = psqlAdapter.formatter.format(
          `
          and t1.id_utente_lav IN (select varosl.id_utente_lav
            from wemi2. val_attributo_rel_off_serv_lav  varosl
            where
            varosl.id_utente_lav = t1.id_utente_lav
            and varosl.id_servizio_riferimento = t2.id_servizio_riferimento
              and varosl.cd_attributo_1 = $[attributoMansioni]
          and varosl.cd_val_attributo_1 = $[competenzaTata]
          and varosl.cd_attributo_2 = $[attributoFasceEta]
          and varosl.cd_val_attributo_2 = $[fasciaEta]
          ) \n
          `
         , { competenzaTata: competenzaTata.idMans, 
           fasciaEta,
           attributoMansioni: attributo.FASCE_ETA_MANSIONI_TATA.cd_attributo,
           attributoFasceEta: attributo.LS_FASCIA_ETA_BAMBINI.cd_attributo,
         }
);
        whereCondition = whereCondition + condition;
      });
    });
  //   const condition = `
  // and t1.id_utente_lav IN (select varosl.id_utente_lav
  //   from wemi2. val_attributo_rel_off_serv_lav  varosl
  //   where
  //   varosl.id_utente_lav = t1.id_utente_lav
  //   and varosl.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and varosl.cd_attributo_1 = ${attributo.FASCE_ETA_MANSIONI_TATA.cd_attributo}
  // and varosl.cd_val_attributo_1 in ($[competenzeTata:csv])
  // and varosl.cd_attributo_2 = ${attributo.LS_FASCIA_ETA_BAMBINI.cd_attributo}
  // and varosl.cd_val_attributo_2 in ($[fasceEta:csv])
  // ) \n
  // `;
  //   whereCondition = whereCondition + condition;
  }

  if (competenzeColf) {
    competenzeColf.forEach(competenzaColf => {
      const condition = psqlAdapter.formatter.format(
         `
          and t1.id_utente_lav IN (select vaos.id_utente_lav
          from wemi2.val_attributo_offerta_servizio vaos
          where
            vaos.id_utente_lav = t1.id_utente_lav
            and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
            and vaos.cd_attributo = $[attributo]
            and vaos.cd_val_attributo = $[competenzaColf]
          ) \n`
        , { competenzaColf, attributo: attributo.LS_MANSIONI_COLF.cd_attributo }
);
      whereCondition = whereCondition + condition;
    });
  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.LS_MANSIONI_COLF.cd_attributo}
  // and vaos.cd_val_attributo in ($[competenzeColf:csv])
  // ) \n
  
  // `;
  //   whereCondition = whereCondition + condition;
  }

  if (competenzeBadante) {
    competenzeBadante.forEach(competenzaBadante => {
      const condition = psqlAdapter.formatter.format(
         `
          and t1.id_utente_lav IN (select vaos.id_utente_lav
          from wemi2.val_attributo_offerta_servizio vaos
          where
            vaos.id_utente_lav = t1.id_utente_lav
            and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
            and vaos.cd_attributo = $[attributo]
            and vaos.cd_val_attributo = $[competenzaBadante]
          ) \n`
        , { competenzaBadante, attributo: attributo.LS_MANSIONI_BADANTE.cd_attributo }
);
      whereCondition = whereCondition + condition;
    });
  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.LS_MANSIONI_BADANTE.cd_attributo}
  // and vaos.cd_val_attributo in ($[competenzeBadante:csv])
  // ) \n
  // `;
  //   whereCondition = whereCondition + condition;
  }

  if (accudimento) {
    accudimento.forEach(accud => {
      const condition = psqlAdapter.formatter.format(
         `
          and t1.id_utente_lav IN (select vaos.id_utente_lav
          from wemi2.val_attributo_offerta_servizio vaos
          where
            vaos.id_utente_lav = t1.id_utente_lav
            and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
            and vaos.cd_attributo = $[attributo]
            and vaos.cd_val_attributo = $[accud]
          ) \n`
        , { accud, attributo: attributo.LS_PATOLOGIE_DISP_ACCUDIMENTO.cd_attributo }
);
      whereCondition = whereCondition + condition;
    });
  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.LS_PATOLOGIE_DISP_ACCUDIMENTO.cd_attributo}
  // and vaos.cd_val_attributo in ($[accudimento:csv])
  // ) \n
  
  // `;
  //   whereCondition = whereCondition + condition;
  }

  if (stipendioProposto && tipologiaOrario) {

    const tipologiaOrarioAttributo = findHourTypologyAttribute(tipologiaOrario);
 
    const condition = psqlAdapter.formatter.format(
         `
          and t1.id_utente_lav NOT IN (select vaos.id_utente_lav
          from wemi2.val_attributo_offerta_servizio vaos
          inner join wemi2.dominio_tcb as dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
          and dtcb.ty_dominio_tcb = $[dominio]
          where
            vaos.id_utente_lav = t1.id_utente_lav
            and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
            and vaos.cd_attributo = $[attributo]
            and ( dtcb.nr_valore_min_rif > $[stipendioProposto.min] ) 
          ) \n`
        , { stipendioProposto, attributo: tipologiaOrarioAttributo.cd_attributo, dominio: tipologiaOrarioAttributo.ty_dominio_tcb }
);
    whereCondition = whereCondition + condition;

  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${tipologiaOrarioAttributo}
  //     and vaos.cd_val_attributo in ($[stipendioProposto:csv])
  //     )  \n
  // `;
  //   whereCondition = whereCondition + condition;
  }

  if (anniEsperienza && tipoLavoratore) {

    const tipologiaServizio = findWorkerTypeAttribute(tipoLavoratore);

    const condition = psqlAdapter.formatter.format(`
    and t1.id_utente_lav IN (select ufs.id_utente_lav
      from wemi2.utente_offerta_servizio ufs
      where
      ufs.id_utente_lav = t1.id_utente_lav
      and ufs.id_servizio_riferimento = $[tipologiaServizio]
      and $[anniEsperienza] <= ufs.nr_anni_esperienza) \n
    `, { anniEsperienza, tipologiaServizio });

  //   const condition = psqlAdapter.formatter.format(`
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = $[anniEsperienzaAttributo]
  //     and vaos.cd_val_attributo = 1
  //   and $[anniEsperienza] <= vaos.nr_val) \n
  // `, { anniEsperienza, anniEsperienzaAttributo });
    whereCondition = whereCondition + condition;
  }

  if (vacanzaFamiglia) {
    const condition = `
  and t1.id_utente_lav IN (select vaos.id_utente_lav
    from wemi2.val_attributo_offerta_servizio vaos
    where
    vaos.id_utente_lav = t1.id_utente_lav
    and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
      and vaos.cd_attributo = ${attributo.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA}
      and vaos.cd_val_attributo = 1
    and vaos.fg_val = 'S') \n
  `;
    whereCondition = whereCondition + condition;
  }

  if (vacanzaAssistito) {
    const condition = `
  and t1.id_utente_lav IN (select vaos.id_utente_lav
    from wemi2.val_attributo_offerta_servizio vaos
    where
    vaos.id_utente_lav = t1.id_utente_lav
    and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
      and vaos.cd_attributo = ${attributo.FG_DISPONIBILITA_VACANZA_SOLO_CON_ASSISTITO}
      and vaos.cd_val_attributo = 1
    and vaos.fg_val = 'S') \n
  `;
    whereCondition = whereCondition + condition;
  }

  if (trasferteBrevi) {
    const condition = `
  and t1.id_utente_lav IN (select vaos.id_utente_lav
    from wemi2.val_attributo_offerta_servizio vaos
    where
    vaos.id_utente_lav = t1.id_utente_lav
    and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
      and vaos.cd_attributo = ${attributo.FG_DISP_TRASFERTE_BREVI}
      and vaos.cd_val_attributo = 1
    and vaos.fg_val = 'S') \n
    `;
    whereCondition = whereCondition + condition;
  }

  if (trasferteLunghe) {
    const condition = `
  and t1.id_utente_lav IN (select vaos.id_utente_lav
    from wemi2.val_attributo_offerta_servizio vaos
    where
    vaos.id_utente_lav = t1.id_utente_lav
    and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
      and vaos.cd_attributo = ${attributo.FG_DISP_TRASFERTE_LUNGHE}
      and vaos.cd_val_attributo = 1
    and vaos.fg_val = 'S') \n
  
  `;
    whereCondition = whereCondition + condition;
  }

  if (lavorareFuoriMi) {
    const condition = `
  and t1.id_utente_lav IN (select vaos.id_utente_lav
    from wemi2.val_attributo_offerta_servizio vaos
    where
    vaos.id_utente_lav = t1.id_utente_lav
    and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
      and vaos.cd_attributo = ${attributo.FG_DISP_LAV_FUORI_MILANO}
      and vaos.cd_val_attributo = 1
    and vaos.fg_val = 'S') \n
  `;
    whereCondition = whereCondition + condition;
  }

  if (straordinari) {
    const condition = `
  and t1.id_utente_lav IN (select vaos.id_utente_lav
    from wemi2.val_attributo_offerta_servizio vaos
    where
    vaos.id_utente_lav = t1.id_utente_lav
    and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
      and vaos.cd_attributo = ${attributo.FG_DISPONIBILITA_STRAORDINARI}
      and vaos.cd_val_attributo = 1
    and vaos.fg_val = 'S') \n
    `;
    whereCondition = whereCondition + condition;
  }

  if (genere) {
    const condition = psqlAdapter.formatter.format(`
    and t1.id_utente_lav IN (select vaos.id_utente_lav
      from wemi2.val_attributo_offerta_servizio vaos
      where
      vaos.id_utente_lav = t1.id_utente_lav
      and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
        and vaos.cd_attributo = $[attributo]
    and vaos.cd_val_attributo = $[genere] 
    ) \n
    `, { genere, attributo: attributo.CD_RIC_SESSO_ASSISTITO.cd_attributo });
  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.CD_RIC_SESSO_ASSISTITO.cd_attributo}
  // and vaos.cd_val_attributo = $[genere] 
  // ) \n
  // `;
    whereCondition = whereCondition + condition;
  }

  if (superficieCasa) {
  
    const condition = psqlAdapter.formatter.format(`
      and t1.id_utente_lav NOT IN (select vaos.id_utente_lav
        from wemi2.val_attributo_offerta_servizio vaos
        left join wemi2.dominio_tcb as dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb
        and ty_dominio_tcb = 13
        where
        vaos.id_utente_lav = t1.id_utente_lav
        and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
          and vaos.cd_attributo = $[attributo]
      and (dtcb.nr_valore_max_rif > $[superficieCasa.max] or dtcb.nr_valore_min_rif < $[superficieCasa.min] ) 
      )  \n
      `, { superficieCasa, attributo: attributo.LS_DISPONIBILITA_SUPERFICI_CASA.cd_attributo });
    whereCondition = whereCondition + condition;
 
  }

  if (oreSettimanali) {
    oreSettimanali.forEach(oraSettimanali => {
      const condition = psqlAdapter.formatter.format(`
      and t1.id_utente_lav IN (select vaos.id_utente_lav
        from wemi2.val_attributo_offerta_servizio vaos
        where
        vaos.id_utente_lav = t1.id_utente_lav
        and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
          and vaos.cd_attributo = $[attributo]
      and vaos.cd_val_attributo = $[oraSettimanali] \n
      )
      `, { oraSettimanali, attributo: attributo.LS_FASCE_ORE_SETTIMANALI.cd_attributo });
      whereCondition = whereCondition + condition;
    });
  }

  //Da valutare esistenza
  // if (oreLavoro) {
  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.LS_ORARIO_LAVORO.cd_attributo}
  // and vaos.cd_val_attributo in ($[oreLavoro:csv]) \n
  // )
  // `;
  //   whereCondition = whereCondition + condition;
  // }

  if (tipologiaContratto) {
    tipologiaContratto.forEach(tipologia => {
      const condition = psqlAdapter.formatter.format(`
      and t1.id_utente_lav IN (select vaos.id_utente_lav
        from wemi2.val_attributo_offerta_servizio vaos
        where
        vaos.id_utente_lav = t1.id_utente_lav
        and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
          and vaos.cd_attributo = $[attributo]
      and vaos.cd_val_attributo = $[tipologia] \n
      )
      `, { tipologia, attributo: attributo.LS_TIPOLOGIA_CONTRATTO.cd_attributo });
      whereCondition = whereCondition + condition;
    });

  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.LS_TIPOLOGIA_CONTRATTO.cd_attributo}
  // and vaos.cd_val_attributo in ($[tipologiaContratto:csv]) \n
  // ) 
  // `;
    // whereCondition = whereCondition + condition;
  }

  if (municipi) {
    municipi.forEach(municipio => {
      const condition = psqlAdapter.formatter.format(`
      and t1.id_utente_lav IN (select vaos.id_utente_lav
        from wemi2.val_attributo_offerta_servizio vaos
        where
        vaos.id_utente_lav = t1.id_utente_lav
        and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
          and vaos.cd_attributo = $[attributo]
      and vaos.cd_val_attributo = $[municipio] \n
      )
      `, { municipio, attributo: attributo.LS_MUNICIPI_RIF_DISPONIBILITA });
      whereCondition = whereCondition + condition;
    });
  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.LS_MUNICIPI_RIF_DISPONIBILITA}
  // and vaos.cd_val_attributo in ($[municipi:csv]) \n
  // )
  // `;
  //   whereCondition = whereCondition + condition;
  }


  if (maxBambini) {
    const condition = `
  and t1.id_utente_lav IN (select vaos.id_utente_lav
    from wemi2.val_attributo_offerta_servizio vaos
    where
    vaos.id_utente_lav = t1.id_utente_lav
    and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
      and vaos.cd_attributo = ${attributo.NR_MAX_BAMBINI}
      and vaos.cd_val_attributo = 1
    and $[maxBambini] <= vaos.nr_val) \n
  `;
    whereCondition = whereCondition + condition;
  }

  if (mezzaGiornataConvivente) {
    mezzaGiornataConvivente.forEach(mezzaGiornata => {
      const condition = psqlAdapter.formatter.format(`
      and t1.id_utente_lav IN (select vaos.id_utente_lav
        from wemi2.val_attributo_offerta_servizio vaos
        where
        vaos.id_utente_lav = t1.id_utente_lav
        and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
          and vaos.cd_attributo = $[attributo]
      and vaos.cd_val_attributo = $[mezzaGiornata] \n
      )
      `, { mezzaGiornata, attributo: attributo.LS_MEZZA_GIORNATA_CONVIVENTE.cd_attributo});
      whereCondition = whereCondition + condition;
    });
  //   const condition = `
    
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.LS_MEZZA_GIORNATA_CONVIVENTE.cd_attributo}
  // and vaos.cd_val_attributo in ($[mezzaGiornataConvivente:csv])
  // ) \n
  // `;
  //   whereCondition = whereCondition + condition;
  }

  if (spaziConvivente) {
    spaziConvivente.forEach(spazioConvivente => {
      const condition = psqlAdapter.formatter.format(`
      and t1.id_utente_lav IN (select vaos.id_utente_lav
        from wemi2.val_attributo_offerta_servizio vaos
        where
        vaos.id_utente_lav = t1.id_utente_lav
        and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
          and vaos.cd_attributo = $[attributo]
      and vaos.cd_val_attributo = $[spazioConvivente] \n
      )
      `, { spazioConvivente, attributo: attributo.LS_SPAZI_CONVIVENTE.cd_attributo});
      whereCondition = whereCondition + condition;
    });
  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.LS_SPAZI_CONVIVENTE.cd_attributo}
  // and vaos.cd_val_attributo in ($[spaziConvivente:csv])
  // ) \n
  // `;
  //   whereCondition = whereCondition + condition;
  }

  if (spaziConvivenzaRidotta) {
    spaziConvivenzaRidotta.forEach(spazioConvivenzaRidotta => {
      const condition = psqlAdapter.formatter.format(`
      and t1.id_utente_lav IN (select vaos.id_utente_lav
        from wemi2.val_attributo_offerta_servizio vaos
        where
        vaos.id_utente_lav = t1.id_utente_lav
        and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
          and vaos.cd_attributo = $[attributo]
      and vaos.cd_val_attributo = $[spazioConvivenzaRidotta] \n
      )
      `, { spazioConvivenzaRidotta, attributo: attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.cd_attributo});
      whereCondition = whereCondition + condition;
    });
  //   const condition = `
  // and t1.id_utente_lav IN (select vaos.id_utente_lav
  //   from wemi2.val_attributo_offerta_servizio vaos
  //   where
  //   vaos.id_utente_lav = t1.id_utente_lav
  //   and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
  //     and vaos.cd_attributo = ${attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.cd_attributo}
  // and vaos.cd_val_attributo in ($[spaziConvivenzaRidotta:csv])
  // ) \n
  // `;
  //   whereCondition = whereCondition + condition;
  }

  /**
   * TODO Matching con Disponibilità
   */

  if (tipologiaOrario) {
    const condition = `
    and t1.id_utente_lav IN (select vaos.id_utente_lav
      from wemi2.val_attributo_offerta_servizio vaos
      where
      vaos.id_utente_lav = t1.id_utente_lav
      and vaos.id_servizio_riferimento = t2.id_servizio_riferimento
        and vaos.cd_attributo = ${attributo.LS_ORARIO_LAVORO.cd_attributo}
        and vaos.cd_val_attributo =$[tipologiaOrario]
        ) \n
  `;
    whereCondition = whereCondition + condition;
  }

  if (livelliLingua) {
    livelliLingua.forEach(livelloLingua => {
      const condition = psqlAdapter.formatter.format(`
      and t1.id_utente_lav IN (select vat.id_utente
        from wemi2.val_attributo_ut vat
        where
        vat.id_utente = t1.id_utente_lav
          and vat.cd_attributo = $[attributo]
          and vat.cd_val_attributo = $[livelloLingua.id]
          and vat.nr_val >= $[livelloLingua.value]
      ) \n
      `, { livelloLingua, attributo: attributo.LIV_LINGUE_CONOSCIUTE });
      whereCondition = whereCondition + condition;
    });
  //   for (const livello of livelliLingua) {
  //     const condition = `
  //   and t1.id_utente_lav IN (select vaout.id_utente_offerta_lav
  //     from wemi2.val_attributo_offerta_ut vaout
  //     where
  //     vaout.id_utente_offerta_lav = t1.id_utente_lav
  //       and vaout.cd_attributo = ${attributo.LIV_LINGUE_CONOSCIUTE}
  //       and vaout.cd_val_attributo = ${livello.id}
  //       and vaout.nr_val = ${livello.value}
  //       ) \n
  // `;
  //     whereCondition = whereCondition + condition;
  //   }
  }

  return whereCondition;
};