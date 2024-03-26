import {
  aggiornaStatoOccupazionaleSql,
  inserisciStatoOccupazionaleSql,
  getDatiStatoOccupazionaleSql,
  aggiornaDataStatoOccupazionaleSql,
  inserisciDataStatoOccupazionaleSql,
  aggiornaUtenteOffertaLavSql
} from './../../sql/disponibilitaLavoratoreTcb/aggiornaStatoOccupazionale';
import {
  estraiTipologieOrarioLavoratoreSql,
  estraiDatiDisponibilitaOrariaSql,
  verificaTipologieOrarioLavoratoreCheckedSql,
  verificaTipologieOrarioLavoratoreUncheckedSql,
  checkConvivenzaMezzaGiornataDiRiposoSql,
  eliminaTipologiaOrarioSql,
  eliminaTipologiaOrarioConvivenzaSql,
  checkCalendarioSql,
  verificaFasceOrarioCheckedSql,
  verificaFasceOrarioUncheckedSql,
  eliminaFasceOrarioSql,
  eliminaTutteLeFasceOrarioSql,
  eliminaAttributiSql,
  eliminaCalendario
} from '../../sql/disponibilitaLavoratoreTcb/disponibilitaOraria';

export class DisponibilitaLavoratoreDAO {
  constructor(context, args, db) {
    this.context = context;
    this.args = args;
    this.db = db || context.db;
  }

  getDatiStatoOccupazionale() {
    return this.db.multi(getDatiStatoOccupazionaleSql(this.context), { ...this.args, ...this.context.user });
  }

  aggiornaStatoOccupazionale() {
    return this.db.oneOrNone(aggiornaStatoOccupazionaleSql(this.context), { ...this.args, ...this.context.user });
  }

  aggiornaDataStatoOccupazionale() {
    return this.db.oneOrNone(aggiornaDataStatoOccupazionaleSql(this.context), { ...this.args, ...this.context.user });
  }

  aggiornaUtenteOffertaLav(){
    return this.db.oneOrNone(aggiornaUtenteOffertaLavSql(this.context), { ...this.args, ...this.context.user });
  }

  inserisciStatoOccupazionale() {
    return this.db.oneOrNone(inserisciStatoOccupazionaleSql(this.context), { ...this.args, ...this.context.user });
  }

  inserisciDataStatoOccupazionale() {
    return this.db.oneOrNone(inserisciDataStatoOccupazionaleSql(this.context), { ...this.args, ...this.context.user });
  }

  estraiTipologieOrarioLavoratore() {
    return this.db.multi(estraiTipologieOrarioLavoratoreSql(this.context), { ...this.args, ...this.context.user });
  }

  estraiDatiDisponibilitaOraria() {
    return this.db.multi(estraiDatiDisponibilitaOrariaSql(this.context), { ...this.args, ...this.context.user });
  }

  verificaTipologieOrarioLavoratoreChecked() {
    return this.db.any(verificaTipologieOrarioLavoratoreCheckedSql(this.context, this.args), { ...this.args, ...this.context.user });
  }

  verificaTipologieOrarioLavoratoreUnchecked() {
    return this.db.any(verificaTipologieOrarioLavoratoreUncheckedSql(this.context, this.args), { ...this.args, ...this.context.user });
  }

  checkConvivenzaMezzaGiornataDiRiposo() {
    return this.db.any(checkConvivenzaMezzaGiornataDiRiposoSql(this.context), this.args);
  }

  async eliminaTipologieOrario(tipologieOrarioUncheckedExist) {
    let queryArr = [];

    tipologieOrarioUncheckedExist.forEach(el => {
      switch (+el.codiceAttributo) {
        case 1:
          queryArr.push(eliminaTipologiaOrarioConvivenzaSql(this.context));
          break;
        case 2:
          queryArr.push(eliminaTipologiaOrarioSql(this.context, 2));
          break;
        case 3:
          queryArr.push(eliminaTipologiaOrarioSql(this.context, 3));
          break;
        case 4:
          queryArr.push(eliminaTipologiaOrarioSql(this.context, 4));
          break;
        case 5:
          queryArr.push(eliminaTipologiaOrarioSql(this.context, 5));
          break;
        case 6:
          queryArr.push(eliminaTipologiaOrarioSql(this.context, 6));
          break;
        default:
          break;
      }
    });

    this.context.logger.info(queryArr.join(""));
    if (queryArr.length > 0)
      return this.context.db.tx(async t => t.multi(queryArr.join(""), { ...this.args, ...this.context.user }));
  }

  async eliminareDatiTipologieOrario() {

    const arrCodiceAttributo = [
      159, // eliminare le mezze giornate per convivenza
      167, // eliminare lo stipendio convivenza
      163, // eliminare spazi convivenza 
      165, // eliminare lo stipendio convivenzaRidotta
      164, // eliminare spazi convivenzaRidotta
      166, // eliminare lo stipendio assistenzaNotturna
    ];
    let sql = "";
    
    arrCodiceAttributo.forEach(codiceAttributo => {
      sql += eliminaAttributiSql(this.context, codiceAttributo);
    });

    await this.db.none(sql, { ...this.args, ...this.context.user });
  };

  async inserisciAggiornaTipologieOrario(tipologieOrarioCheckedExist) {
    let queryArr = [];

    const columnSets = this.getColumnSet();

    const tipologiaOrarioData = {
      cd_val_attributo: null
    };

    const calendarioData = {
      cd_val_attributo_orario_lav: null,
      tx_lunedi: null,
      tx_martedi: null,
      tx_mercoledi: null,
      tx_giovedi: null,
      tx_venerdi: null,
      tx_sabato: null,
      tx_domenica: null,
      nr_ore_totali: null
    };

    if (this.args.input.checkboxesTipologiaOrarioChecked) {

      const convivenzaChecked = this.args.input.checkboxesTipologiaOrarioChecked.some(el => el === 1);
      const convivenzaExist = tipologieOrarioCheckedExist.some(el => +el.codiceAttributo === 1);
      if (convivenzaChecked) {
        const convivenzaData = this.args.input.convivenza;

        tipologiaOrarioData.cd_val_attributo = 1;
        this.insTipologiaOrario(columnSets.tipologiaOrario, convivenzaExist, tipologiaOrarioData, queryArr);

        // inserire le mezze giornate per convivenza
        const tipologieMezzaGiornataDiRiposoData = convivenzaData.mezzaGiornataDiRiposo.map(el => el.id);
        if (tipologieMezzaGiornataDiRiposoData?.length) {
          let insMezzaGiornataDiRiposo = [];

          const mezzaGiornataDiRiposoData = {
            cd_val_attributo: null
          };

          tipologieMezzaGiornataDiRiposoData.forEach(el => {
            mezzaGiornataDiRiposoData.cd_val_attributo = el;
            insMezzaGiornataDiRiposo.push(
              this.context.queryBuilder.insert(
                mezzaGiornataDiRiposoData,
                columnSets.mezzaGiornataDiRiposo,
              )
            );
          });

          queryArr.push(insMezzaGiornataDiRiposo.join(";"));
        }

        // inserire lo stipendio convivenza
        const idStipendio = convivenzaData.stipendioMinimo?.id;
        if (idStipendio) {
          const insStipendioConvivenza = (
            this.context.queryBuilder.insert(
              { cd_val_attributo: idStipendio },
              columnSets.stipendioConvivenza,
            )
          )
          queryArr.push(insStipendioConvivenza)
        }

        // inserire spazi convivenza 
        if (convivenzaData.tipoSistemazione?.length) {
          const attributoData = {
            cd_val_attributo: null,
            tx_val: null
          };
          convivenzaData.tipoSistemazione.forEach(el => {
            attributoData.cd_val_attributo = el;
            if (el === 0) {
              attributoData.tx_val = convivenzaData.testoAltro;
            }
            queryArr.push(
              this.context.queryBuilder.insert(
                attributoData,
                columnSets.spaziConvivenza
              )
            );
          });
        }
      }

      const convivenzaRidottaChecked = this.args.input.checkboxesTipologiaOrarioChecked.some(el => el === 2);
      const convivenzaRidottaExist = tipologieOrarioCheckedExist.some(el => +el.codiceAttributo === 2);

      if (convivenzaRidottaChecked) {
        const convivenzaRidottaData = this.args.input.convivenzaRidotta;

        tipologiaOrarioData.cd_val_attributo = 2;
        this.insTipologiaOrario(columnSets.tipologiaOrario, convivenzaRidottaExist, tipologiaOrarioData, queryArr);

        // inserire lo stipendio convivenza
        const idStipendio = convivenzaRidottaData.stipendioMinimo?.id;
        if (idStipendio) {
          const insStipendioConvivenza = (
            this.context.queryBuilder.insert(
              { cd_val_attributo: idStipendio },
              columnSets.stipendioConvivenzaRidotta,
            )
          )
          queryArr.push(insStipendioConvivenza)
        }

        // inserire spazi convivenzaRidotta 
        if (convivenzaRidottaData.tipoSistemazione?.length) {
          const attributoData = {
            cd_val_attributo: null,
            tx_val: null
          };
          convivenzaRidottaData.tipoSistemazione.forEach(el => {
            attributoData.cd_val_attributo = el;
            if (el === 0) {
              attributoData.tx_val = convivenzaRidottaData.testoAltro;
            }
            queryArr.push(
              this.context.queryBuilder.insert(
                attributoData,
                columnSets.spaziConvivenzaRidotta
              )
            );
          });
        }

        if (convivenzaRidottaData.calendarValues?.length) {
          calendarioData.cd_val_attributo_orario_lav = 2;
          calendarioData.tx_lunedi = this.getCalendarDaysValue(convivenzaRidottaData.calendarValues, "lunedì");
          calendarioData.tx_martedi = this.getCalendarDaysValue(convivenzaRidottaData.calendarValues, "martedì");
          calendarioData.tx_mercoledi = this.getCalendarDaysValue(convivenzaRidottaData.calendarValues, "mercoledì");
          calendarioData.tx_giovedi = this.getCalendarDaysValue(convivenzaRidottaData.calendarValues, "giovedì");
          calendarioData.tx_venerdi = this.getCalendarDaysValue(convivenzaRidottaData.calendarValues, "venerdì");
          calendarioData.tx_sabato = this.getCalendarDaysValue(convivenzaRidottaData.calendarValues, "sabato");
          calendarioData.tx_domenica = this.getCalendarDaysValue(convivenzaRidottaData.calendarValues, "domenica");
          calendarioData.nr_ore_totali = convivenzaRidottaData.calendarValues.map(x => x.count).reduce((a, b) => a + b, 0) || 0;

          await this.insCalendario(columnSets.calendario, 2, calendarioData, queryArr);
        }
      }

      const fullTimePartTimeAOreChecked = this.args.input.checkboxesTipologiaOrarioChecked.some(el => el === 3);
      const fullTimePartTimeAOreExist = tipologieOrarioCheckedExist.some(el => +el.codiceAttributo === 3);

      // eliminare lo stipendio nonConviventi
      await this.db.none(eliminaAttributiSql(this.context, 168), { ...this.args, ...this.context.user });
      // eliminare oreMassime nonConviventi
      await this.db.none(eliminaAttributiSql(this.context, 154), { ...this.args, ...this.context.user });

      if (fullTimePartTimeAOreChecked) {
        const nonConviventiData = this.args.input.nonConviventi;

        tipologiaOrarioData.cd_val_attributo = 3;
        this.insTipologiaOrario(columnSets.tipologiaOrario, fullTimePartTimeAOreExist, tipologiaOrarioData, queryArr);

        // inserire lo stipendio nonConviventi
        const idStipendio = nonConviventiData.stipendioMinimo?.id;
        if (idStipendio) {
          const insStipendioConvivenza = (
            this.context.queryBuilder.insert(
              { cd_val_attributo: idStipendio },
              columnSets.stipendioNonConviventi,
            )
          )
          queryArr.push(insStipendioConvivenza)
        }

        // inserire oreMassime nonConviventi 
        if (nonConviventiData.oreMassime?.length) {
          const attributoData = {
            cd_val_attributo: null,
          };
          nonConviventiData.oreMassime.forEach(el => {
            attributoData.cd_val_attributo = el;
            queryArr.push(
              this.context.queryBuilder.insert(
                attributoData,
                columnSets.oreMassimeNonConviventi
              )
            );
          });
        }

        if (nonConviventiData.calendarValues) {
          calendarioData.cd_val_attributo_orario_lav = 3;
          calendarioData.tx_lunedi = this.getCalendarDaysValue(nonConviventiData.calendarValues, "lunedì");
          calendarioData.tx_martedi = this.getCalendarDaysValue(nonConviventiData.calendarValues, "martedì");
          calendarioData.tx_mercoledi = this.getCalendarDaysValue(nonConviventiData.calendarValues, "mercoledì");
          calendarioData.tx_giovedi = this.getCalendarDaysValue(nonConviventiData.calendarValues, "giovedì");
          calendarioData.tx_venerdi = this.getCalendarDaysValue(nonConviventiData.calendarValues, "venerdì");
          calendarioData.tx_sabato = this.getCalendarDaysValue(nonConviventiData.calendarValues, "sabato");
          calendarioData.tx_domenica = this.getCalendarDaysValue(nonConviventiData.calendarValues, "domenica");
          calendarioData.nr_ore_totali = nonConviventiData.calendarValues.map(x => x.count).reduce((a, b) => a + b, 0) || 0;

          await this.insCalendario(columnSets.calendario, 3, calendarioData, queryArr);
        }
      }

      const presenzaNotturnaChecked = this.args.input.checkboxesTipologiaOrarioChecked.some(el => el === 4);
      const presenzaNotturnaExist = tipologieOrarioCheckedExist.some(el => +el.codiceAttributo === 4);

      // eliminare lo stipendio presenzaNotturna
      await this.db.none(eliminaAttributiSql(this.context, 169), { ...this.args, ...this.context.user });
      if (presenzaNotturnaChecked) {
        const presenzaNotturnaData = this.args.input.presenzaNotturna;

        tipologiaOrarioData.cd_val_attributo = 4;
        this.insTipologiaOrario(columnSets.tipologiaOrario, presenzaNotturnaExist, tipologiaOrarioData, queryArr);

        // inserire lo stipendio presenzaNotturna
        const idStipendio = presenzaNotturnaData.stipendioMinimo?.id;
        if (idStipendio) {
          const insStipendioConvivenza = (
            this.context.queryBuilder.insert(
              { cd_val_attributo: idStipendio },
              columnSets.stipendioPresenzaNotturna,
            )
          )
          queryArr.push(insStipendioConvivenza)
        }

        if (presenzaNotturnaData.calendarValues) {
          calendarioData.cd_val_attributo_orario_lav = 4;
          calendarioData.tx_lunedi = this.getCalendarDaysValue(presenzaNotturnaData.calendarValues, "lunedì");
          calendarioData.tx_martedi = this.getCalendarDaysValue(presenzaNotturnaData.calendarValues, "martedì");
          calendarioData.tx_mercoledi = this.getCalendarDaysValue(presenzaNotturnaData.calendarValues, "mercoledì");
          calendarioData.tx_giovedi = this.getCalendarDaysValue(presenzaNotturnaData.calendarValues, "giovedì");
          calendarioData.tx_venerdi = this.getCalendarDaysValue(presenzaNotturnaData.calendarValues, "venerdì");
          calendarioData.tx_sabato = this.getCalendarDaysValue(presenzaNotturnaData.calendarValues, "sabato");
          calendarioData.tx_domenica = this.getCalendarDaysValue(presenzaNotturnaData.calendarValues, "domenica");
          calendarioData.nr_ore_totali = presenzaNotturnaData.calendarValues.map(x => x.count).reduce((a, b) => a + b, 0) || 0;

          await this.insCalendario(columnSets.calendario, 4, calendarioData, queryArr);
        }
      }

      const weekendChecked = this.args.input.checkboxesTipologiaOrarioChecked.some(el => el === 5);
      const weekendExist = tipologieOrarioCheckedExist.some(el => +el.codiceAttributo === 5);
      // eliminare lo stipendio weekend
      await this.db.none(eliminaAttributiSql(this.context, 170), { ...this.args, ...this.context.user });
      if (weekendChecked) {
        const weekendData = this.args.input.weekend;

        tipologiaOrarioData.cd_val_attributo = 5;
        this.insTipologiaOrario(columnSets.tipologiaOrario, weekendExist, tipologiaOrarioData, queryArr);

        // inserire lo stipendio weekend
        const idStipendio = weekendData.stipendioMinimo?.id;
        if (idStipendio) {
          const insStipendioConvivenza = (
            this.context.queryBuilder.insert(
              { cd_val_attributo: idStipendio },
              columnSets.stipendioWeekend,
            )
          )
          queryArr.push(insStipendioConvivenza)
        }

        if (weekendData.calendarValues) {
          calendarioData.cd_val_attributo_orario_lav = 5;
          calendarioData.tx_lunedi = this.getCalendarDaysValue(weekendData.calendarValues, "lunedì");
          calendarioData.tx_martedi = this.getCalendarDaysValue(weekendData.calendarValues, "martedì");
          calendarioData.tx_mercoledi = this.getCalendarDaysValue(weekendData.calendarValues, "mercoledì");
          calendarioData.tx_giovedi = this.getCalendarDaysValue(weekendData.calendarValues, "giovedì");
          calendarioData.tx_venerdi = this.getCalendarDaysValue(weekendData.calendarValues, "venerdì");
          calendarioData.tx_sabato = this.getCalendarDaysValue(weekendData.calendarValues, "sabato");
          calendarioData.tx_domenica = this.getCalendarDaysValue(weekendData.calendarValues, "domenica");
          calendarioData.nr_ore_totali = weekendData.calendarValues.map(x => x.count).reduce((a, b) => a + b, 0) || 0;

          await this.insCalendario(columnSets.calendario, 5, calendarioData, queryArr);
        }
      }

      const assistenzaNotturnaChecked = this.args.input.checkboxesTipologiaOrarioChecked.some(el => el === 6);
      const assistenzaNotturnaExist = tipologieOrarioCheckedExist.some(el => +el.codiceAttributo === 6);

      if (assistenzaNotturnaChecked) {
        const assistenzaNotturnaData = this.args.input.assistenzaNotturna;

        tipologiaOrarioData.cd_val_attributo = 6;
        this.insTipologiaOrario(columnSets.tipologiaOrario, assistenzaNotturnaExist, tipologiaOrarioData, queryArr);

        // inserire lo stipendio assistenzaNotturna
        const idStipendio = assistenzaNotturnaData.stipendioMinimo?.id;
        if (idStipendio) {
          const insStipendioConvivenza = (
            this.context.queryBuilder.insert(
              { cd_val_attributo: idStipendio },
              columnSets.stipendioAssistenzaNotturna,
            )
          )
          queryArr.push(insStipendioConvivenza)
        }

        if (assistenzaNotturnaData.calendarValues) {
          calendarioData.cd_val_attributo_orario_lav = 6;
          calendarioData.tx_lunedi = this.getCalendarDaysValue(assistenzaNotturnaData.calendarValues, "lunedì");
          calendarioData.tx_martedi = this.getCalendarDaysValue(assistenzaNotturnaData.calendarValues, "martedì");
          calendarioData.tx_mercoledi = this.getCalendarDaysValue(assistenzaNotturnaData.calendarValues, "mercoledì");
          calendarioData.tx_giovedi = this.getCalendarDaysValue(assistenzaNotturnaData.calendarValues, "giovedì");
          calendarioData.tx_venerdi = this.getCalendarDaysValue(assistenzaNotturnaData.calendarValues, "venerdì");
          calendarioData.tx_sabato = this.getCalendarDaysValue(assistenzaNotturnaData.calendarValues, "sabato");
          calendarioData.tx_domenica = this.getCalendarDaysValue(assistenzaNotturnaData.calendarValues, "domenica");
          calendarioData.nr_ore_totali = assistenzaNotturnaData.calendarValues.map(x => x.count).reduce((a, b) => a + b, 0) || 0;

          await this.insCalendario(columnSets.calendario, 6, calendarioData, queryArr);
        }
      }

      if (convivenzaRidottaChecked || fullTimePartTimeAOreChecked ||
        presenzaNotturnaChecked || weekendChecked || assistenzaNotturnaChecked) {
        await this.insFasceOrario(columnSets.fasciaOrario, queryArr);
      }
      else if (!convivenzaRidottaChecked || !fullTimePartTimeAOreChecked ||
        !presenzaNotturnaChecked || !weekendChecked || !assistenzaNotturnaChecked) {
        await this.db.none(eliminaTutteLeFasceOrarioSql(this.context), { ...this.args, ...this.context.user });
      }

      this.context.logger.info(queryArr.join(";"));
      if (queryArr.length > 0)
        return this.context.db.tx(async t => t.multi(queryArr.join(";"), { ...this.args, ...this.context.user }));
    }
  }

  getColumnSet() {
    const tipologiaOrario = new this.context.queryBuilder.ColumnSet(
      [
        {
          name: "id_utente_lav",
          cast: "int",
          cnd: true,
          init: () => this.context.user.idUtente
        },
        {
          name: "id_servizio_riferimento",
          cast: "int",
          cnd: true,
          init: () => this.args.input.idServizioRiferimento
        },
        {
          name: "cd_attributo",
          cast: "int",
          cnd: true,
          init: () => 161
        },
        {
          name: "cd_val_attributo",
          cast: "int",
          cnd: true
        },
        {
          name: "ts_modifica",
          mod: "^",
          init: () => "LOCALTIMESTAMP"
        },
        {
          name: "ts_creazione",
          mod: "^",
          init: () => "LOCALTIMESTAMP"
        }
      ],
      { table: this.context.tabelle.val_attributo_offerta_servizio }
    );

    const calendario = new this.context.queryBuilder.ColumnSet(
      [
        {
          name: "id_utente_lav",
          cast: "int",
          cnd: true,
          init: () => this.context.user.idUtente
        },
        {
          name: "id_servizio_riferimento",
          cast: "int",
          cnd: true,
          init: () => this.args.input.idServizioRiferimento
        },
        {
          name: "cd_attributo_orario_lav",
          cast: "int",
          cnd: true,
          init: () => 161
        },
        {
          name: "cd_val_attributo_orario_lav",
          cast: "int"
        },
        {
          name: "tx_lunedi",
          cast: "text"
        },
        {
          name: "tx_martedi",
          cast: "text"
        },
        {
          name: "tx_mercoledi",
          cast: "text"
        },
        {
          name: "tx_giovedi",
          cast: "text"
        },
        {
          name: "tx_venerdi",
          cast: "text"
        },
        {
          name: "tx_sabato",
          cast: "text"
        },
        {
          name: "tx_domenica",
          cast: "text"
        },
        {
          name: "nr_ore_totali",
          cast: "int"
        },
        {
          name: "ts_modifica",
          mod: "^",
          init: () => "LOCALTIMESTAMP"
        },
        {
          name: "ts_creazione",
          mod: "^",
          init: () => "LOCALTIMESTAMP",
          skip: () => true
        }
      ],
      { table: this.context.tabelle.val_attributo_cal_off_serv_lav }
    );

    const colCdAttMezzGior = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cast: 'int',
      cnd: true,
      init: () => 159
    });
    const mezzaGiornataDiRiposo = tipologiaOrario.merge(colCdAttMezzGior);


    const colCdAttFasOra = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cast: 'int',
      cnd: true,
      init: () => 154
    });

    const fasciaOrario = tipologiaOrario.merge(colCdAttFasOra);

    const colCdAttStipendioConvivenza = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cast: 'int',
      cnd: true,
      init: () => 167
    });

    const stipendioConvivenza = tipologiaOrario.merge(colCdAttStipendioConvivenza);

    const colCdAttStipendioNonConviventi = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cast: 'int',
      cnd: true,
      init: () => 168
    });

    const stipendioNonConviventi = tipologiaOrario.merge(colCdAttStipendioNonConviventi);

    const colCdAttStipendioPresenzaNotturna = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cast: 'int',
      cnd: true,
      init: () => 169
    });

    const stipendioPresenzaNotturna = tipologiaOrario.merge(colCdAttStipendioPresenzaNotturna);

    const colCdAttStipendioWeekend = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cast: 'int',
      cnd: true,
      init: () => 170
    });

    const stipendioWeekend = tipologiaOrario.merge(colCdAttStipendioWeekend);

    const colCdAttStipendioAssistenzaNotturna = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cast: 'int',
      cnd: true,
      init: () => 166
    });

    const stipendioAssistenzaNotturna = tipologiaOrario.merge(colCdAttStipendioAssistenzaNotturna);

    const colCdAttStipendioConvivenzaRidotta = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cast: 'int',
      cnd: true,
      init: () => 165
    });

    const stipendioConvivenzaRidotta = tipologiaOrario.merge(colCdAttStipendioConvivenzaRidotta);

    const colCdAttOreMassimeNonConviventi = new this.context.queryBuilder.Column({
      name: 'cd_attributo',
      cast: 'int',
      cnd: true,
      init: () => 154
    });

    const oreMassimeNonConviventi = tipologiaOrario.merge(colCdAttOreMassimeNonConviventi);

    const colCdAttSpaziConvivenza = new this.context.queryBuilder.ColumnSet([
      {
        name: 'cd_attributo',
        cast: 'int',
        cnd: true,
        init: () => 163
      },
      {
        name: "tx_val",
        cast: "text"
      }
    ]);

    const spaziConvivenza = tipologiaOrario.merge(colCdAttSpaziConvivenza);

    const colCdAttSpaziConvivenzaRidotta = new this.context.queryBuilder.ColumnSet([
      {
        name: 'cd_attributo',
        cast: 'int',
        cnd: true,
        init: () => 164
      },
      {
        name: "tx_val",
        cast: "text"
      }
    ]);

    const spaziConvivenzaRidotta = tipologiaOrario.merge(colCdAttSpaziConvivenzaRidotta);

    return {
      tipologiaOrario,
      calendario,
      mezzaGiornataDiRiposo,
      fasciaOrario,
      stipendioConvivenza,
      stipendioNonConviventi,
      stipendioPresenzaNotturna,
      stipendioWeekend,
      stipendioAssistenzaNotturna,
      stipendioConvivenzaRidotta,
      spaziConvivenza,
      spaziConvivenzaRidotta,
      oreMassimeNonConviventi
    }
  }

  getCalendarDaysValue(calendarValues, textDay) {
    return calendarValues.find(
      el => el.txValue.toLowerCase() === textDay.toLowerCase()
    ).hoursBin;
  }

  insTipologiaOrario(columnSetTipologiaOrario, tipologiaOrarioExist, tipologiaOrarioData, queryArr) {
    let insTipologiaOrarioSql = "";
    if (!tipologiaOrarioExist) {
      insTipologiaOrarioSql = this.context.queryBuilder.insert(
        tipologiaOrarioData,
        columnSetTipologiaOrario
      );

      queryArr.push(insTipologiaOrarioSql);
    }
  }

  async insCalendario(columnSetCalendario, tipologiaOrario, calendarioData, queryArr) {
    let insUpdCalendarioSql = "";
    const checkCalendarioExist = await this.db.oneOrNone(checkCalendarioSql(this.context, tipologiaOrario), { ...this.args, ...this.context.user });

    if (!checkCalendarioExist) {
      insUpdCalendarioSql = this.context.queryBuilder.insert(calendarioData, columnSetCalendario);

      queryArr.push(insUpdCalendarioSql);
    }
    else {
      const conditionData = {
        id_utente_lav: this.context.user.idUtente,
        id_servizio_riferimento: this.args.input.idServizioRiferimento,
        cd_attributo_orario_lav: 161,
        cd_val_attributo_orario_lav: tipologiaOrario
      };
      const condition = this.context.formatter.format(
        " WHERE id_utente_lav = ${id_utente_lav} AND id_servizio_riferimento = ${id_servizio_riferimento} AND cd_attributo_orario_lav = ${cd_attributo_orario_lav} AND cd_val_attributo_orario_lav = ${cd_val_attributo_orario_lav}",
        conditionData
      );

      insUpdCalendarioSql = this.context.queryBuilder.update(calendarioData, columnSetCalendario) + condition;

      queryArr.push(insUpdCalendarioSql);
    }
  }

  async insFasceOrario(columnSetFasciaOrario, queryArr) {
    if (this.args.input.checkboxesNrOreSettimanaliDisponibilitaUnchecked &&
      this.args.input.checkboxesNrOreSettimanaliDisponibilitaUnchecked.length > 0) {
      const fasceOrarioUncheckedExist = await this.db.any(verificaFasceOrarioUncheckedSql(this.context), { ...this.args, ...this.context.user });

      if (fasceOrarioUncheckedExist && fasceOrarioUncheckedExist.length > 0) {
        queryArr.push(eliminaFasceOrarioSql(this.context, fasceOrarioUncheckedExist.map(el => +el.codiceAttributo)));
      }
    }

    if (this.args.input.checkboxesNrOreSettimanaliDisponibilitaChecked &&
      this.args.input.checkboxesNrOreSettimanaliDisponibilitaChecked.length > 0) {
      const fasceOrarioCheckedExist = await this.db.any(verificaFasceOrarioCheckedSql(this.context), { ...this.args, ...this.context.user });

      const tipologieFasciaOrarioData = this.args.input.checkboxesNrOreSettimanaliDisponibilitaChecked
        .filter(x => !fasceOrarioCheckedExist.some(y => +y.codiceAttributo === x))
        .map(x => x);

      let insFasceOrario = [];
      if (tipologieFasciaOrarioData.length > 0) {
        const fasciaOrarioData = {
          cd_val_attributo: null
        };

        tipologieFasciaOrarioData.forEach(el => {
          fasciaOrarioData.cd_val_attributo = el;
          insFasceOrario.push(this.context.queryBuilder.insert(fasciaOrarioData, columnSetFasciaOrario));
        });

        queryArr.push(insFasceOrario.join(";"));
      }
    }
  }
}