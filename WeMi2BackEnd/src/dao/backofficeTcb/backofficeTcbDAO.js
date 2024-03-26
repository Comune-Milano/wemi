import { countRichiesteTcbSql, richiesteTcbSql } from './../../sql/backofficeTcb/richieste/richiesteTcb';
import { chiudiRichiestaPositivaSql, chiudiRichiestaNegativaSql, richiestaUpdateSql } from './../../sql/backofficeTcb/richieste/chiudiRichiestaTcb';
import { checkRichiesta } from './../../sql/backofficeTcb/richieste/checkRichiesta';
import { codiceAttributoChiusuraRichiestaTcbSql } from './../../sql/backofficeTcb/richieste/chiudiRichiestaTcb';
import {
  lavoratoriAssociatiRichiestaTcbSql,
  estraiDatiAssociaLavoratoriRichiestaSql
} from './../../sql/backofficeTcb/richieste/lavoratoriAssociatiRichiestaTcb';
import { disassociaLavoratoreSql } from 'sql/backofficeTcb/richieste/disassociaLavoratoreTcb';
import { associaLavoratoreDomandaSql } from './../../sql/backofficeTcb/richieste/associaLavoratoreDomandaTcb';
import { confermaAssociazioneLavoratoriDomandeSql } from './../../sql/backofficeTcb/richieste/confermaAssociazioneLavoratoriDomandeTcb';
import { countCandidatureLavoratoriTcbSql, candidatureLavoratoriTcbSql } from './../../sql/backofficeTcb/candidatureLavoratori/candidatureLavoratoriTcb';
import { disassociaLavoratoriDomandaTcbSql } from 'sql/backofficeTcb/richieste/disassociaLavoratoriDomandaTcb';
import { associaLavoratoreStatoDomandaSql } from './../../sql/backofficeTcb/richieste/associaLavoratoreStatoDomandaTcb';
import { accettaOffertaLavoratoreSql } from 'sql/backofficeTcb/richieste/accettaOffertaLavoratoreTcb';
import {
  selezionaRecensioneServizioEnteSql,
  inserisciAggiornaRecensioneEnteWemiSql,
  inserisciAggiornaRecensioneEnteLavoratoreSql
} from 'sql/backofficeTcb/richieste/recensioneEnteTcb';
import { attivitaInPendingSql } from 'sql/backofficeTcb/richieste/attivitaInPending';

export class BackofficeTcbDAO {
  constructor(context, args, db) {
    this.context = context;
    this.args = args;
    this.db = db || context.db;
  }

  countRichiesteTcb() {
    return this.db.one(countRichiesteTcbSql(this.context, this.args), this.args);
  }

  richiesteTcb() {
    return this.db.any(richiesteTcbSql(this.context, this.args), this.args);
  }

  async resultAlreadyEntered() {
    // se già abbiamo un record sulla tabella val_attributo_domanda torna true
    const codiceRichiesta = this.args.input?.codiceRichiesta
    const res = await this.db.oneOrNone(checkRichiesta, { codiceRichiesta });
    if (res?.id_richiesta_servizio_tcb === codiceRichiesta) {
      return true;
    }
    return false;
  }

  async chiudiRichiestaPositivaTcb() {
    const isAlreadyEntered = await this.resultAlreadyEntered();
    if (isAlreadyEntered) {
      // update
      return this.db.oneOrNone(richiestaUpdateSql, this.args);
    }
    // insert
    return this.db.oneOrNone(chiudiRichiestaPositivaSql(this.context, this.args), { ...this.args, ...this.context.user });
  }

  async chiudiRichiestaNegativaTcb(data) {
    const isAlreadyEntered = await this.resultAlreadyEntered();
    if (isAlreadyEntered) {
      // update
      return this.db.oneOrNone(richiestaUpdateSql, this.args);
    }
    // insert
    return this.db.oneOrNone(chiudiRichiestaNegativaSql(this.context, this.args), { ...this.args, ...data, ...this.context.user });
  }

  codiceAttributoChiusuraRichiestaTcb() {
    return this.db.one(codiceAttributoChiusuraRichiestaTcbSql(this.context, this.args), this.args);
  }

  lavoratoriAssociatiRichiestaTcb() {
    return this.db.any(lavoratoriAssociatiRichiestaTcbSql(this.context), this.args);
  }

  disassociaLavoratoreTcb() {
    return this.db.oneOrNone(disassociaLavoratoreSql(this.context, this.args), { ...this.args, ...this.context.user });
  }

  accettaOffertaLavoratoreTcb() {
    return this.db.oneOrNone(accettaOffertaLavoratoreSql(this.context), { ...this.args, ...this.context.user });
  }

  associaLavoratoreDomandaTcb(cvPdf) {
    return this.db.oneOrNone(associaLavoratoreDomandaSql(this.context), { ...this.args, cvPdf, ...this.context.user });
  }

  confermaAssociazioneLavoratoriDomandeTcb() {
    return this.db.any(confermaAssociazioneLavoratoriDomandeSql(this.context), { ...this.args, ...this.context.user });
  }

  countCandidatureLavoratoriTcb() {
    return this.db.oneOrNone(countCandidatureLavoratoriTcbSql(this.context, this.args), this.args);
  }

  candidatureLavoratoriTcb() {
    return this.db.any(candidatureLavoratoriTcbSql(this.context, this.args), this.args);
  }

  disassociaLavoratoriDomandaTcb(data) {
    return this.db.any(disassociaLavoratoriDomandaTcbSql(this.context), { ...this.args, ...data, ...this.context.user });
  }

  associaLavoratoreStatoDomandaTcb() {
    return this.db.oneOrNone(associaLavoratoreStatoDomandaSql(this.context), { ...this.args, ...this.context.user });
  }

  selezionaRecensioneServizioEnteTcb() {
    return this.db.any(selezionaRecensioneServizioEnteSql(this.context), { ...this.args, ...this.context.user });
  }

  inserisciAggiornaRecensioneEnteWemiTcb() {
    return this.db.oneOrNone(inserisciAggiornaRecensioneEnteWemiSql(this.context), { ...this.args, ...this.context.user });
  }

  inserisciAggiornaRecensioneEnteLavoratoreTcb(pg_rich_serv_rec) {
    return this.db.oneOrNone(inserisciAggiornaRecensioneEnteLavoratoreSql(this.context, pg_rich_serv_rec), { ...this.args, ...this.context.user });
  }

  estraiDatiAssociaLavoratoriRichiestaTcb() {
    return this.db.one(estraiDatiAssociaLavoratoriRichiestaSql(this.context), this.args);
  }

  attivitaInPendingTcb() {
    return this.db.oneOrNone(attivitaInPendingSql(this.context));
  }
}
