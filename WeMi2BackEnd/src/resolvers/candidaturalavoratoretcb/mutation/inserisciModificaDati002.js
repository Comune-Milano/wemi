import { aggiornaUltimaModifica } from 'sql/candidaturaTCB/aggiornaUltimaModifica';

export const inserisciModificaDati002 = async (parent, args, context, info) => {
  if (args.input.disponibile) {
    const sql = `
    UPDATE wemi2.utente_offerta_lav
    SET dt_disponibile_dal=$[disponibile]
    WHERE id_utente_lav= $[id_utente];
  `;

    await context.db.oneOrNone(sql, args.input);
  } else {
    const sql = `
    UPDATE wemi2.utente_offerta_lav
    SET dt_disponibile_dal=null
    WHERE id_utente_lav= $[id_utente];
  `;

    await context.db.oneOrNone(sql, args.input);
  }

  if (args.input.val_attributo) {
    const sql2 = `
      SELECT *
      FROM wemi2.val_attributo_offerta_ut
      WHERE id_utente_offerta_lav= $[id_utente] AND cd_attributo= $[attributo] ;
    `;
    const controllo = await context.db.oneOrNone(sql2, args.input);

    if (controllo) {
      const sql3 = `
      UPDATE wemi2.val_attributo_offerta_ut
      SET cd_val_attributo= $[val_attributo], ts_modifica= localtimestamp
      WHERE id_utente_offerta_lav= $[id_utente] AND cd_attributo= $[attributo] ;
    `;
      await context.db.oneOrNone(sql3, args.input)
    } else {
      const sql3 = `
        INSERT INTO wemi2.val_attributo_offerta_ut(
          id_utente_offerta_lav,
          cd_attributo,
          cd_val_attributo,
          ts_modifica,
          ts_creazione
        )
        VALUES ($[id_utente], $[attributo],$[val_attributo], localtimestamp, localtimestamp);
      `;
      await context.db.oneOrNone(sql3, args.input)
    }
  } else {
    const sql4 = `
      DELETE FROM wemi2.val_attributo_offerta_ut
      WHERE  id_utente_offerta_lav = $[id_utente] and cd_attributo =$[attributo];
    `;
    await context.db.oneOrNone(sql4, args.input)
  }

  await context.db.none(aggiornaUltimaModifica, { id_lavoratore: args.input.id_utente, id_utente_mod: context.user.idUtente });
  
  return true;
}