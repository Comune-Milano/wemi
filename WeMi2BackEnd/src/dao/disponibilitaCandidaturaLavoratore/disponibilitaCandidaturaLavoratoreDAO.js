import {
  estraiDatiDisponibilitaCandidaturaLavoratoreSql,
  estraiDatiDisponibilitaCandidaturaLavoratoreBadanteSql,
  estraiDatiDisponibilitaCandidaturaLavoratoreTataSql,
  verificaTipologieOrarioLavoratoreSql,
  eliminaCandidaturaTipologiaOrarioConvivenzaSql,
  eliminaAttributiSql,
  verificaCalendarioSql,
  eliminaCandidaturaTipologiaOrarioConvivenzaRidottaSql,
  eliminaCandidaturaTipologiaOrarioFullTimePartTimeAdOreSql,
  eliminaCandidaturaTipologiaOrarioPresenzaNotturnaSql,
  eliminaCandidaturaTipologiaOrarioWeekendSql,
  eliminaCandidaturaTipologiaOrarioAssistenzaNotturnaSql,
  verificaCompetenzeTataSql,
  conditionsVerificaCompetenze,
} from '../../sql/disponibilitaCandidaturaLavoratore/disponibilitaCandidaturaLavoratore';
import { dominioTcb } from 'constants/db/dominio_tcb';
import { attributo } from 'constants/db/attributo';

export class DisponibilitaLavoratoreCandidaturaDAO {
  constructor(context, args, db) {
    this.context = context;
    this.args = args;
    this.db = db || context.db;
  }

  estraiDatiDisponibilitaCandidaturaLavoratore() {
    return this.db.multi(estraiDatiDisponibilitaCandidaturaLavoratoreSql(this.context), this.args);
  }

  estraiDatiDisponibilitaCandidaturaLavoratoreTata() {
    return this.db.multi(estraiDatiDisponibilitaCandidaturaLavoratoreTataSql(this.context), this.args);
  }

  estraiDatiDisponibilitaCandidaturaLavoratoreBadante() {
    return this.db.multi(estraiDatiDisponibilitaCandidaturaLavoratoreBadanteSql(this.context), this.args);
  }

  verificaTipologieOrarioLavoratore(tipologieOrario) {
    return this.db.any(verificaTipologieOrarioLavoratoreSql(this.context, tipologieOrario), this.args);
  }

  verificaCompetenzeTata(){
    return this.db.oneOrNone(verificaCompetenzeTataSql, this.args);
  }

  async eliminaDatiCandidaturaByTipologiaOrario(tipologieOrarioUncheckedExist) {
    let queryArr = [];

    tipologieOrarioUncheckedExist.forEach(el => {
      switch (el.codiceAttributo) {
        case dominioTcb.orarioLavoro.convivenza:
          queryArr.push(eliminaCandidaturaTipologiaOrarioConvivenzaSql());
          break;
        case dominioTcb.orarioLavoro.convivenzaRidotta:
          queryArr.push(eliminaCandidaturaTipologiaOrarioConvivenzaRidottaSql());
          break;
        case dominioTcb.orarioLavoro.fullTimePartTimeAdOre:
          queryArr.push(eliminaCandidaturaTipologiaOrarioFullTimePartTimeAdOreSql());
          break;
        case dominioTcb.orarioLavoro.presenzaNotturna:
          queryArr.push(eliminaCandidaturaTipologiaOrarioPresenzaNotturnaSql());
          break;
        case dominioTcb.orarioLavoro.weekend:
          queryArr.push(eliminaCandidaturaTipologiaOrarioWeekendSql());
          break;
        case dominioTcb.orarioLavoro.assistenzaNotturna:
          queryArr.push(eliminaCandidaturaTipologiaOrarioAssistenzaNotturnaSql());
          break;
        default:
          break;
      }
    });

    this.context.logger.info(queryArr.join('\n'));
    if (queryArr.length > 0)
      return this.context.db.tx(async t => t.multi(queryArr.join(''), { ...this.args.input }));
  }

  async inserisciAggiornaCandidaturaByTipologiaOrario(tipologieOrarioChecked, tipologieOrarioCheckedExist) {
    const queryArr = [];

    const columnSets = this.getColumnSet();

    const tipologiaOrarioData = {
      cd_val_attributo: null,
    };

    const calendarioDataDb = {
      cd_val_attributo_orario_lav: null,
      tx_lunedi: null,
      tx_martedi: null,
      tx_mercoledi: null,
      tx_giovedi: null,
      tx_venerdi: null,
      tx_sabato: null,
      tx_domenica: null,
      nr_ore_totali: null,
    };
    if (tipologieOrarioChecked && tipologieOrarioCheckedExist) {
      const convivenzaChecked = tipologieOrarioChecked.some(el => el === dominioTcb.orarioLavoro.convivenza);
      const convivenzaExist = tipologieOrarioCheckedExist.some(el => el.codiceAttributo === dominioTcb.orarioLavoro.convivenza);
      if (convivenzaChecked) {
        tipologiaOrarioData.cd_val_attributo = dominioTcb.orarioLavoro.convivenza;
        this.insTipologiaOrario(columnSets.tipologiaOrario, convivenzaExist, tipologiaOrarioData, queryArr);

        //Genera insert mezza giornata di riposo
        await this.insAttributiSelezionati(
          columnSets.convivenza.mezzaGiornataDiRiposo,
          this.args.input.convivenzaMezzaGiornataDiRiposo,
          attributo.LS_MEZZA_GIORNATA_CONVIVENTE.cd_attributo,
          queryArr
        );

        //Genera insert stipendio proposto
        await this.insAttributiSelezionati(
          columnSets.convivenza.stipendioProposto,
          this.args.input.convivenzaStipendioProposto,
          attributo.LS_STIPENDIO_CONVIVENTE.cd_attributo,
          queryArr
        );

        //Genera insert spazi accettabili
        await this.insAttributiSelezionati(
          columnSets.convivenza.spaziAccettabili,
          this.args.input.convivenzaSpaziAccettabili,
          attributo.LS_SPAZI_CONVIVENTE.cd_attributo,
          queryArr
        );
      }

      const convivenzaRidottaChecked = tipologieOrarioChecked.some(el => el === dominioTcb.orarioLavoro.convivenzaRidotta);
      const convivenzaRidottaExist = tipologieOrarioCheckedExist.some(el => el.codiceAttributo === dominioTcb.orarioLavoro.convivenzaRidotta);
      if (convivenzaRidottaChecked) {
        tipologiaOrarioData.cd_val_attributo = dominioTcb.orarioLavoro.convivenzaRidotta;
        this.insTipologiaOrario(columnSets.tipologiaOrario, convivenzaRidottaExist, tipologiaOrarioData, queryArr);

        //Genera insert stipendio proposto
        await this.insAttributiSelezionati(
          columnSets.convivenzaRidotta.stipendioProposto,
          this.args.input.convivenzaRidottaStipendioProposto,
          attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.cd_attributo,
          queryArr
        );

        //Genera insert spazi accettabili
        await this.insAttributiSelezionati(
          columnSets.convivenzaRidotta.spaziAccettabili,
          this.args.input.convivenzaRidottaSpaziAccettabili,
          attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.cd_attributo,
          queryArr
        );

        //Genera insert calendario
        await this.insCalendario(
          columnSets.calendario,
          dominioTcb.orarioLavoro.convivenzaRidotta,
          this.args.input.convivenzaRidottaCalendario,
          calendarioDataDb,
          queryArr
        );
      }

      const fullTimePartTimeAdOreChecked = tipologieOrarioChecked.some(el => el === dominioTcb.orarioLavoro.fullTimePartTimeAdOre);
      const fullTimePartTimeAdOreExist = tipologieOrarioCheckedExist.some(el => el.codiceAttributo === dominioTcb.orarioLavoro.fullTimePartTimeAdOre);
      if (fullTimePartTimeAdOreChecked) {
        tipologiaOrarioData.cd_val_attributo = dominioTcb.orarioLavoro.fullTimePartTimeAdOre;
        this.insTipologiaOrario(columnSets.tipologiaOrario, fullTimePartTimeAdOreExist, tipologiaOrarioData, queryArr);

        //Genera insert stipendio proposto
        await this.insAttributiSelezionati(
          columnSets.fullTimePartTimeAdOre.stipendioProposto,
          this.args.input.fullTimePartTimeAdOreStipendioProposto,
          attributo.LS_STIPENDIO_NON_CONVIVENTE.cd_attributo,
          queryArr
        );

        //Genera insert calendario
        await this.insCalendario(
          columnSets.calendario,
          dominioTcb.orarioLavoro.fullTimePartTimeAdOre,
          this.args.input.fullTimePartTimeAdOreCalendario,
          calendarioDataDb,
          queryArr
        );
      }

      const assistenzaNotturnaChecked = tipologieOrarioChecked.some(el => el === dominioTcb.orarioLavoro.assistenzaNotturna);
      const assistenzaNotturnaExist = tipologieOrarioCheckedExist.some(el => el.codiceAttributo === dominioTcb.orarioLavoro.assistenzaNotturna);
      if (assistenzaNotturnaChecked) {
        tipologiaOrarioData.cd_val_attributo = dominioTcb.orarioLavoro.assistenzaNotturna;
        this.insTipologiaOrario(columnSets.tipologiaOrario, assistenzaNotturnaExist, tipologiaOrarioData, queryArr);

        //Genera insert stipendio proposto
        await this.insAttributiSelezionati(
          columnSets.assistenzaNotturna.stipendioProposto,
          this.args.input.assistenzaNotturnaStipendioProposto,
          attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.cd_attributo,
          queryArr
        );

        //Genera insert calendario
        await this.insCalendario(
          columnSets.calendario,
          dominioTcb.orarioLavoro.assistenzaNotturna,
          this.args.input.assistenzaNotturnaCalendario,
          calendarioDataDb,
          queryArr
        );
      }

      const weekendChecked = tipologieOrarioChecked.some(el => el === dominioTcb.orarioLavoro.weekend);
      const weekendExist = tipologieOrarioCheckedExist.some(el => el.codiceAttributo === dominioTcb.orarioLavoro.weekend);
      if (weekendChecked) {
        tipologiaOrarioData.cd_val_attributo = dominioTcb.orarioLavoro.weekend;
        this.insTipologiaOrario(columnSets.tipologiaOrario, weekendExist, tipologiaOrarioData, queryArr);

        //Genera insert stipendio proposto
        await this.insAttributiSelezionati(
          columnSets.weekend.stipendioProposto,
          this.args.input.weekendStipendioProposto,
          attributo.LS_STIPENDIO_WEEKEND.cd_attributo,
          queryArr
        );

        //Genera insert calendario
        await this.insCalendario(
          columnSets.calendario,
          dominioTcb.orarioLavoro.weekend,
          this.args.input.weekendCalendario,
          calendarioDataDb,
          queryArr
        );
      }
      
      const presenzaNotturnaChecked = tipologieOrarioChecked.some(el => el === dominioTcb.orarioLavoro.presenzaNotturna);
      const presenzaNotturnaExist = tipologieOrarioCheckedExist.some(el => el.codiceAttributo === dominioTcb.orarioLavoro.presenzaNotturna);
      if (presenzaNotturnaChecked) {
        tipologiaOrarioData.cd_val_attributo = dominioTcb.orarioLavoro.presenzaNotturna;
        this.insTipologiaOrario(columnSets.tipologiaOrario, presenzaNotturnaExist, tipologiaOrarioData, queryArr);

        //Genera insert stipendio proposto
        await this.insAttributiSelezionati(
          columnSets.presenzaNotturna.stipendioProposto,
          this.args.input.presenzaNotturnaStipendioProposto,
          attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.cd_attributo,
          queryArr
        );

        //Genera insert calendario
        await this.insCalendario(
          columnSets.calendario,
          dominioTcb.orarioLavoro.presenzaNotturna,
          this.args.input.presenzaNotturnaCalendario,
          calendarioDataDb,
          queryArr
        );
      }
    }

    //Genera insert numero ore settimanali
    if (this.args.input.nrOreSettminali) {
      await this.insAttributiSelezionati(
        columnSets.nrOreSettminali,
        this.args.input.nrOreSettminali,
        attributo.LS_FASCE_ORE_SETTIMANALI.cd_attributo,
        queryArr
      );
    }

    //Genera insert tipologia contratto
    if (this.args.input.tipologiaContratto) {
      await this.insAttributiSelezionati(
        columnSets.tipologiaContratto,
        this.args.input.tipologiaContratto,
        attributo.LS_TIPOLOGIA_CONTRATTO.cd_attributo,
        queryArr
      );
    }

    //Genera insert disponibilità brevi trasferte
    if (this.args.input.breviTrasferte) {
      await this.insAttributiSelezionati(
        columnSets.breviTrasferte,
        this.args.input.breviTrasferte,
        attributo.FG_DISP_TRASFERTE_BREVI,
        queryArr
      );
    }

    //Genera insert disponibilità lunghe trasferte
    if (this.args.input.lungheTrasferte) {
      await this.insAttributiSelezionati(
        columnSets.lungheTrasferte,
        this.args.input.lungheTrasferte,
        attributo.FG_DISP_TRASFERTE_LUNGHE,
        queryArr
      );
    }

    //Genera insert disponibilità ad andare in vacanze con la famiglia
    if (this.args.input.vacanzaConLaFamiglia) {
      await this.insAttributiSelezionati(
        columnSets.vacanzaConLaFamiglia,
        this.args.input.vacanzaConLaFamiglia,
        attributo.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA,
        queryArr
      );
    }

    //Genera insert disponibilità ad andare in vacanza solo con assistito
    if (this.args.input.vacanzaConAssistito) {
      await this.insAttributiSelezionati(
        columnSets.vacanzaConAssistito,
        this.args.input.vacanzaConAssistito,
        attributo.FG_DISPONIBILITA_VACANZA_SOLO_CON_ASSISTITO,
        queryArr
      );
    }

    //Genera insert disponibilità a fare straordinari
    if (this.args.input.straordinari) {
      await this.insAttributiSelezionati(
        columnSets.straordinari,
        this.args.input.straordinari,
        attributo.FG_DISPONIBILITA_STRAORDINARI,
        queryArr
      );
    }

    //Genera insert Preferenze genere assistito
    await this.insAttributiSelezionati(
      columnSets.preferenzeGenereAssistito,
      this.args.input.preferenzeGenereAssistito,
      attributo.CD_RIC_SESSO_ASSISTITO.cd_attributo,
      queryArr
    );

    //Genera insert disponibilità a lavorare a casa con animali
    if (this.args.input.lavorareACasaConAnimali) {
      await this.insAttributiSelezionati(
        columnSets.lavorareACasaConAnimali,
        this.args.input.lavorareACasaConAnimali,
        attributo.FG_DISP_LAV_CASA_CON_ANIMALI,
        queryArr
      );
    }

    //Genera insert disponibilità a prendersi cura degli animali
    if (this.args.input.prendereCuraAnimali) {
      await this.insAttributiSelezionati(
        columnSets.prendereCuraAnimali,
        this.args.input.prendereCuraAnimali,
        attributo.FG_DISP_CURA_ANIMALI,
        queryArr
      );
    }

    //Genera insert disponibilità a lavorare in casa di famiglie numerose
    if (this.args.input.lavorareInCasaDiFamiglieNumerose) {
      await this.insAttributiSelezionati(
        columnSets.lavorareInCasaDiFamiglieNumerose,
        this.args.input.lavorareInCasaDiFamiglieNumerose,
        attributo.FG_FAMIGLIE_NUMEROSE,
        queryArr
      );
    }

    //Genera insert disponibilità in relazione alla grandezza della casa
    if (this.args.input.grandezzaDellaCasa) {
      await this.insAttributiSelezionati(
        columnSets.grandezzaDellaCasa,
        this.args.input.grandezzaDellaCasa,
        attributo.LS_DISPONIBILITA_SUPERFICI_CASA.cd_attributo,
        queryArr
      );
    }

    //Genera insert disponibilità a svegliarsi di notte
    if (this.args.input.svegliarsiDiNotte) {
      await this.insAttributiSelezionati(
        columnSets.svegliarsiDiNotte,
        this.args.input.svegliarsiDiNotte,
        attributo.FG_DISP_SVEGLIARSI_NOTTE,
        queryArr
      );
    }

    //Genera insert disponibilità ad accudire persone con patologie
    if (this.args.input.accudirePersoneConPatologie) {
      await this.insAttributiSelezionati(
        columnSets.accudirePersoneConPatologie,
        this.args.input.accudirePersoneConPatologie,
        attributo.LS_PATOLOGIE_DISP_ACCUDIMENTO.cd_attributo,
        queryArr
      );
    }

    //Genera insert sede di lavoro
    if (this.args.input.sedeDiLavoro) {
      await this.insAttributiSelezionati(
        columnSets.sedeDiLavoro,
        this.args.input.sedeDiLavoro,
        attributo.LS_MUNICIPI_RIF_DISPONIBILITA,
        queryArr
      );
    }

    //Genera insert disponibilità a lavorare fuori Milano
    if (this.args.input.lavoroFuoriMilano) {
      await this.insAttributiSelezionati(
        columnSets.lavoroFuoriMilano,
        this.args.input.lavoroFuoriMilano,
        attributo.FG_DISP_LAV_FUORI_MILANO,
        queryArr
      );
    }

    //Genera insert disponibilità ad effettuare sostituzione brevi
    if (this.args.input.sostituzioniBrevi) {
      await this.insAttributiSelezionati(
        columnSets.sostituzioniBrevi,
        this.args.input.sostituzioniBrevi,
        attributo.FG_DISP_SOST_BREVI,
        queryArr
      );
    }

    //Genera insert disponibilità ad effettuare sostituzione lunghe
    if (this.args.input.sostituzioniLunghe) {
      await this.insAttributiSelezionati(
        columnSets.sostituzioniLunghe,
        this.args.input.sostituzioniLunghe,
        attributo.FG_DISP_SOST_LUNGHE,
        queryArr
      );
    }

    //Genera insert numero massimo di bambini da accudire
    if (this.args.input.nrMaxBambiniDaAccudire) {
      await this.insAttributiSelezionati(
        columnSets.nrMaxBambiniDaAccudire,
        this.args.input.nrMaxBambiniDaAccudire,
        attributo.NR_MAX_BAMBINI,
        queryArr
      );
    }

    //Genera insert fasce età bambini
    if (this.args.input.fasceEtaBambini) {
      await this.insAttributiSelezionati(
        columnSets.fasceEtaBambini,
        this.args.input.fasceEtaBambini,
        attributo.LS_FASCIA_ETA_BAMBINI.cd_attributo,
        queryArr
      );
    }

    //Genera insert disponibilità ad occuparsi di persone anziane che vivono in famiglia
    if (this.args.input.occuparsiDiAnziani) {
      await this.insAttributiSelezionati(
        columnSets.occuparsiDiAnziani,
        this.args.input.occuparsiDiAnziani,
        attributo.FG_DISP_LAV_PERS_ANZIANA_FAMIGLIA,
        queryArr
      );
    }

    //Genera insert disponibilità ad occuparsi di coppie di anziani
    if (this.args.input.occuparsiDiCoppieDiAnziani) {
      await this.insAttributiSelezionati(
        columnSets.occuparsiDiCoppieDiAnziani,
        this.args.input.occuparsiDiCoppieDiAnziani,
        attributo.FG_DISP_LAV_COPPIE_ANZ,
        queryArr
      );
    }

    this.context.logger.info(queryArr.join(';'));
    if (queryArr.length > 0)
      return this.context.db.tx(async t => t.multi(queryArr.join(';'), this.args));
  }

  insTipologiaOrario(columnSetTipologiaOrario, tipologiaOrarioExist, tipologiaOrarioData, queryArr) {
    let insTipologiaOrarioSql = '';
    if (!tipologiaOrarioExist) {
      insTipologiaOrarioSql = this.context.queryBuilder.insert(
        tipologiaOrarioData,
        columnSetTipologiaOrario
      );

      queryArr.push(insTipologiaOrarioSql);
    }
  }

  async insAttributiSelezionati(columnSet, data, codiceAttributo, queryArr) {
    let queryArrAttributi = [];

    const attributoData = {
      cd_val_attributo: null,
    };

    queryArrAttributi.push(eliminaAttributiSql(this.context, codiceAttributo));

    if (Array.isArray(data)) {
      const attributiSelezionati = data.filter(el => el.checked);

      if (attributiSelezionati && attributiSelezionati.length > 0) {
        attributiSelezionati.forEach(el => {
          attributoData.cd_val_attributo = el.id;
          queryArrAttributi.push(this.context.queryBuilder.insert(
              attributoData,
              columnSet
            ));
        });
      }
    }
    else if (typeof data === 'object') {
      if (data.checked) {
        attributoData.cd_val_attributo = 1;
        queryArrAttributi.push(this.context.queryBuilder.insert(
            attributoData,
            columnSet
          ));
      }
    }
    else if (Number.isInteger(data)) {
      attributoData.cd_val_attributo = 1;
      queryArrAttributi.push(this.context.queryBuilder.insert(
          attributoData,
          columnSet
        ));
    }

    if (queryArrAttributi.length > 0)
      queryArr.push(queryArrAttributi.join(';'));
  }

  async insCalendario(columnSetCalendario, tipologiaOrario, calendarioData, calendarioDataDb, queryArr) {
    if (calendarioData) {
      calendarioDataDb.cd_val_attributo_orario_lav = tipologiaOrario;
      calendarioDataDb.tx_lunedi = this.getCalendarDaysValue(calendarioData, 'lunedì');
      calendarioDataDb.tx_martedi = this.getCalendarDaysValue(calendarioData, 'martedì');
      calendarioDataDb.tx_mercoledi = this.getCalendarDaysValue(calendarioData, 'mercoledì');
      calendarioDataDb.tx_giovedi = this.getCalendarDaysValue(calendarioData, 'giovedì');
      calendarioDataDb.tx_venerdi = this.getCalendarDaysValue(calendarioData, 'venerdì');
      calendarioDataDb.tx_sabato = this.getCalendarDaysValue(calendarioData, 'sabato');
      calendarioDataDb.tx_domenica = this.getCalendarDaysValue(calendarioData, 'domenica');
      calendarioDataDb.nr_ore_totali = calendarioData.map(x => x.count).reduce((a, b) => a + b, 0) || 0;

      let insUpdCalendarioSql = '';
      const checkCalendarioExist = await this.db.oneOrNone(verificaCalendarioSql(this.context, tipologiaOrario), this.args);

      if (!checkCalendarioExist) {
        insUpdCalendarioSql = this.context.queryBuilder.insert(calendarioDataDb, columnSetCalendario);

        queryArr.push(insUpdCalendarioSql);
      }
      else {
        const conditionData = {
          id_utente_lav: this.args.input.idLavoratore,
          id_servizio_riferimento: this.args.input.idServizioRiferimento,
          cd_attributo_orario_lav: attributo.LS_ORARIO_LAVORO.cd_attributo,
          cd_val_attributo_orario_lav: tipologiaOrario,
        };
        const condition = this.context.formatter.format(
          ' WHERE id_utente_lav = ${id_utente_lav} AND id_servizio_riferimento = ${id_servizio_riferimento} AND cd_attributo_orario_lav = ${cd_attributo_orario_lav} AND cd_val_attributo_orario_lav = ${cd_val_attributo_orario_lav}',
          conditionData
        );

        insUpdCalendarioSql = this.context.queryBuilder.update(calendarioDataDb, columnSetCalendario) + condition;

        queryArr.push(insUpdCalendarioSql);
      }
    }
  }

  getColumnSet() {
    let columnSets = {};

    const tipologiaOrario = new this.context.queryBuilder.ColumnSet(
      [
        { name: 'id_utente_lav', cnd: true, init: () => this.args.input.idLavoratore },
        { name: 'id_servizio_riferimento', cnd: true, init: () => this.args.input.idServizioRiferimento },
        { name: 'cd_attributo', cnd: true, init: () => attributo.LS_ORARIO_LAVORO.cd_attributo },
        { name: 'cd_val_attributo', cnd: true },
        { name: 'ts_modifica', mod: '^', init: () => 'LOCALTIMESTAMP' },
        { name: 'ts_creazione', mod: '^', init: () => 'LOCALTIMESTAMP', skip: () => true },
      ],
      { table: this.context.tabelle.val_attributo_offerta_servizio }
    );

    const calendario = new this.context.queryBuilder.ColumnSet(
      [
        { name: 'id_utente_lav', cnd: true, init: () => this.args.input.idLavoratore },
        { name: 'id_servizio_riferimento', cnd: true, init: () => this.args.input.idServizioRiferimento },
        { name: 'cd_attributo_orario_lav', cnd: true, init: () => attributo.LS_ORARIO_LAVORO.cd_attributo },
        { name: 'cd_val_attributo_orario_lav' },
        { name: 'tx_lunedi' },
        { name: 'tx_martedi' },
        { name: 'tx_mercoledi' },
        { name: 'tx_giovedi' },
        { name: 'tx_venerdi' },
        { name: 'tx_sabato' },
        { name: 'tx_domenica' },
        { name: 'nr_ore_totali' },
        { name: 'ts_modifica', mod: '^', init: () => 'LOCALTIMESTAMP' },
        { name: 'ts_creazione', mod: '^', init: () => 'LOCALTIMESTAMP', skip: () => true },
      ],
      { table: this.context.tabelle.val_attributo_cal_off_serv_lav }
    );

    const colCdAttMezzGior = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_MEZZA_GIORNATA_CONVIVENTE.cd_attributo,
    });

    const colCdAttStipendioConv = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_STIPENDIO_CONVIVENTE.cd_attributo,
    });

    const colSetCdAttSpaziAccettabiliConv = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.LS_SPAZI_CONVIVENTE.cd_attributo },
      {
        name: 'tx_val',
        init: col => col.source.cd_val_attributo === 0 ? this.args.input.convivenzaTestoSpazioAccettabileAltro : null,
      },
    ]);

    columnSets.convivenza = {
      mezzaGiornataDiRiposo: tipologiaOrario.merge(colCdAttMezzGior),
      stipendioProposto: tipologiaOrario.merge(colCdAttStipendioConv),
      spaziAccettabili: tipologiaOrario.merge(colSetCdAttSpaziAccettabiliConv),
    };

    const colCdAttStipendioConvRid = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.cd_attributo,
    });

    const colSetCdAttSpaziAccettabiliConvRid = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.cd_attributo },
      {
        name: 'tx_val',
        init: col => col.source.cd_val_attributo === 0 ? this.args.input.convivenzaRidottaTestoSpazioAccettabileAltro : null,
      },
    ]);

    columnSets.convivenzaRidotta = {
      stipendioProposto: tipologiaOrario.merge(colCdAttStipendioConvRid),
      spaziAccettabili: tipologiaOrario.merge(colSetCdAttSpaziAccettabiliConvRid),
    };

    const colCdAttStipendiofullTimePartTime = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_STIPENDIO_NON_CONVIVENTE.cd_attributo,
    });

    columnSets.fullTimePartTimeAdOre = {
      stipendioProposto: tipologiaOrario.merge(colCdAttStipendiofullTimePartTime),
    };

    const colCdAttStipendioAssistenzaNotturna = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.cd_attributo,
    });

    columnSets.assistenzaNotturna = {
      stipendioProposto: tipologiaOrario.merge(colCdAttStipendioAssistenzaNotturna),
    };

    const colCdAttStipendioWeekend = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_STIPENDIO_WEEKEND.cd_attributo,
    });

    columnSets.weekend = {
      stipendioProposto: tipologiaOrario.merge(colCdAttStipendioWeekend),
    };

    const colCdAttStipendioPresNott = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.cd_attributo,
    });

    columnSets.presenzaNotturna = {
      stipendioProposto: tipologiaOrario.merge(colCdAttStipendioPresNott),
    };

    const colCdAttNrOreSett = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_FASCE_ORE_SETTIMANALI.cd_attributo,
    });

    columnSets.nrOreSettminali = tipologiaOrario.merge(colCdAttNrOreSett);

    const colCdAttTpContratto = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_TIPOLOGIA_CONTRATTO.cd_attributo,
    });

    columnSets.tipologiaContratto = tipologiaOrario.merge(colCdAttTpContratto);

    const colCdAttBreviTrasf = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_TRASFERTE_BREVI },
        { name: 'fg_val', init: () => this.args.input.breviTrasferte.checked ? 'S' : 'N' },
        { name: 'tx_nota', init: () => this.args.input.breviTrasferte.nota },
    ]);

    columnSets.breviTrasferte = tipologiaOrario.merge(colCdAttBreviTrasf);

    const colCdAttLungheTrasf = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_TRASFERTE_LUNGHE },
        { name: 'fg_val', init: () => this.args.input.lungheTrasferte.checked ? 'S' : 'N' },
        { name: 'tx_nota', init: () => this.args.input.lungheTrasferte.nota },
    ]);

    columnSets.lungheTrasferte = tipologiaOrario.merge(colCdAttLungheTrasf);

    const colCdAttVacFamiglia = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA },
        { name: 'fg_val', init: () => this.args.input.vacanzaConLaFamiglia.checked ? 'S' : 'N' },
        { name: 'tx_nota', init: () => this.args.input.vacanzaConLaFamiglia.nota },
    ]);

    columnSets.vacanzaConLaFamiglia = tipologiaOrario.merge(colCdAttVacFamiglia);

    const colCdAttVacSoloAssistito = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISPONIBILITA_VACANZA_SOLO_CON_ASSISTITO },
        { name: 'fg_val', init: () => this.args.input.vacanzaConAssistito.checked ? 'S' : 'N' },
        { name: 'tx_nota', init: () => this.args.input.vacanzaConAssistito.nota },
    ]);

    columnSets.vacanzaConAssistito = tipologiaOrario.merge(colCdAttVacSoloAssistito);

    const colCdAttStraordinari = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISPONIBILITA_STRAORDINARI },
        { name: 'fg_val', init: () => this.args.input.straordinari.checked ? 'S' : 'N' },
        { name: 'tx_nota', init: () => this.args.input.straordinari.nota },
    ]);

    columnSets.straordinari = tipologiaOrario.merge(colCdAttStraordinari);

    const colCdAttGenereAssistito = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.CD_RIC_SESSO_ASSISTITO.cd_attributo,
    });

    columnSets.preferenzeGenereAssistito = tipologiaOrario.merge(colCdAttGenereAssistito);

    const colCdAttLavCasaAnimali = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_LAV_CASA_CON_ANIMALI },
        { name: 'fg_val', init: () => this.args.input.lavorareACasaConAnimali.checked ? 'S' : 'N' },
    ]);

    columnSets.lavorareACasaConAnimali = tipologiaOrario.merge(colCdAttLavCasaAnimali);

    const colCdAttPrendCuraAnimali = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_CURA_ANIMALI },
        { name: 'fg_val', init: () => this.args.input.prendereCuraAnimali.checked ? 'S' : 'N' },
    ]);

    columnSets.prendereCuraAnimali = tipologiaOrario.merge(colCdAttPrendCuraAnimali);

    const colCdAttLavCasaFamNum = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_FAMIGLIE_NUMEROSE },
        { name: 'fg_val', init: () => this.args.input.lavorareInCasaDiFamiglieNumerose.checked ? 'S' : 'N' },
    ]);

    columnSets.lavorareInCasaDiFamiglieNumerose = tipologiaOrario.merge(colCdAttLavCasaFamNum);

    const colCdAttGrandCasa = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_DISPONIBILITA_SUPERFICI_CASA.cd_attributo,
    });

    columnSets.grandezzaDellaCasa = tipologiaOrario.merge(colCdAttGrandCasa);

    const colCdAttSveglNott = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_SVEGLIARSI_NOTTE },
        { name: 'fg_val', init: () => this.args.input.svegliarsiDiNotte.checked ? 'S' : 'N' },
    ]);

    columnSets.svegliarsiDiNotte = tipologiaOrario.merge(colCdAttSveglNott);

    const colCdAttPersPatologie = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_PATOLOGIE_DISP_ACCUDIMENTO.cd_attributo,
    });

    columnSets.accudirePersoneConPatologie = tipologiaOrario.merge(colCdAttPersPatologie);

    const colCdAttSedeDiLavoro = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_MUNICIPI_RIF_DISPONIBILITA,
    });

    columnSets.sedeDiLavoro = tipologiaOrario.merge(colCdAttSedeDiLavoro);

    const colCdAttLavFuoriMilano = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_LAV_FUORI_MILANO },
        { name: 'fg_val', init: () => this.args.input.lavoroFuoriMilano.checked ? 'S' : 'N' },
    ]);

    columnSets.lavoroFuoriMilano = tipologiaOrario.merge(colCdAttLavFuoriMilano);

    const colCdAttSostBrevi = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_SOST_BREVI },
        { name: 'fg_val', init: () => this.args.input.sostituzioniBrevi.checked ? 'S' : 'N' },
    ]);

    columnSets.sostituzioniBrevi = tipologiaOrario.merge(colCdAttSostBrevi);

    const colCdAttSostLunghe = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_SOST_LUNGHE },
        { name: 'fg_val', init: () => this.args.input.sostituzioniLunghe.checked ? 'S' : 'N' },
    ]);

    columnSets.sostituzioniLunghe = tipologiaOrario.merge(colCdAttSostLunghe);

    const colCdAttNrMaxBamb = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.NR_MAX_BAMBINI },
        { name: 'nr_val', init: () => this.args.input.nrMaxBambiniDaAccudire },
    ]);

    columnSets.nrMaxBambiniDaAccudire = tipologiaOrario.merge(colCdAttNrMaxBamb);

    const colCdAttFasceEtaBamb = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cnd: true,
      init: () => attributo.LS_FASCIA_ETA_BAMBINI.cd_attributo,
    });

    columnSets.fasceEtaBambini = tipologiaOrario.merge(colCdAttFasceEtaBamb);

    const colCdAttOccAnz = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_LAV_PERS_ANZIANA_FAMIGLIA },
        { name: 'fg_val', init: () => this.args.input.occuparsiDiAnziani.checked ? 'S' : 'N' },
    ]);

    columnSets.occuparsiDiAnziani = tipologiaOrario.merge(colCdAttOccAnz);

    const colCdAttOccCoppAnz = new this.context.queryBuilder.ColumnSet([
        { name: 'cd_attributo', cnd: true, init: () => attributo.FG_DISP_LAV_COPPIE_ANZ },
        { name: 'fg_val', init: () => this.args.input.occuparsiDiCoppieDiAnziani.checked ? 'S' : 'N' },
    ]);

    columnSets.occuparsiDiCoppieDiAnziani = tipologiaOrario.merge(colCdAttOccCoppAnz);

    return {
      tipologiaOrario,
      calendario,
      ...columnSets,
    };
  }

  getCalendarDaysValue(calendarValues, textDay) {
    return calendarValues.find(el => el.txValue.toLowerCase() === textDay.toLowerCase()).hoursBin;
  }
}
