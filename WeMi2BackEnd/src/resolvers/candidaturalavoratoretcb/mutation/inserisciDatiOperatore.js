
import {
  aggiornaAnniVotoServiziMutation,
  aggiornaStatoCandidaturaMutation,
  inserisciAttributiUtenteLavMutation,
  aggiornaAttributiUtenteLavMutation,
  controllaPresenzaAttributoUtenteLavQuery,
  inserisciDocumentiAllegatiLavoratoreMutation,
  eliminaDocumentiLavoratoreMutation,
  selectUltimoStatoCandidatura,
  updateNotaOperatore,
} from '../queries/queries';

/**
 * The resolver to insert data of operator candidacy
 * @param {*} _ nothing
 * @param {*} args the args
 * @param {*} context the context
 * @returns {object} the return object
 */
export const inserisciDatiOperatore = async (_, args, context) => {
  let idAllegati = [];
  const {
    idLavoratore,
    anniEsp,
    votoEsp,
    statoCandidatura,
    attributiUtenteLav,
    notaOperatore,
    documentiLavoratore,
    documentiDaEliminare,
  } = args.input;

  const { user } = context;
  const { idUtente } = user;
  const idOperatore = idUtente;

  await context.db.tx('inserisciDatiOperatore', async t => {
    /**
     * The function to map the id service of tcb
     * @param {number} val the value
     * @returns {number} the equivalent code
     */
    const getIdServizioTcb = (val) => {
      switch (val) {
        case 1:
          return 999997;
        case 2:
          return 999998;
        case 3:
          return 999999;
        default:
          return;
      }
    };

    /** Definisco le costanti per aggiornamento ANNI E VOTO ESPERIENZA */
    const updateServicesRows = anniEsp.map((anni, index) => ({
      id_utente_lav: idLavoratore,
      id_servizio_riferimento: getIdServizioTcb(index + 1),
      nr_anni_esperienza: anni,
      nr_voto_operatore: votoEsp[index],
      ts_ultima_modifica: 'localtimestamp',
    }));
    const aggiornaAnniVotoServizi = aggiornaAnniVotoServiziMutation(
      updateServicesRows,
      context
    );

    if (documentiLavoratore && documentiLavoratore.length) {
      const insertAttachedDocumentsRows = documentiLavoratore.map(doc => ({
        id_allegato: 'nextval(\'wemi2.seq_allegato_offerta_lav\')',
        id_utente_lav: idLavoratore,
        nm_nome_allegato_off: doc.fileName,
        oj_allegato_off: doc.data,
        ts_creazione: 'localtimestamp',
      }));
      const inserisciDocumentiAllegatiLavoratore = inserisciDocumentiAllegatiLavoratoreMutation(
          insertAttachedDocumentsRows,
          context
        );
      t.any(inserisciDocumentiAllegatiLavoratore).then(res => idAllegati = res);
      // }
    }

    if (documentiDaEliminare.length) {
      t.none(eliminaDocumentiLavoratoreMutation, { documentiDaEliminare });
    }

    /** Definisco le costanti per inserimento e l'aggiornamento di iscrizioniFlags, vincoli */
    let insertAttrUtenteLavRows = [];
    let updateAttrUtenteLavRows = [];

    let attributiPresenti = await t.any(controllaPresenzaAttributoUtenteLavQuery, { idLavoratore });
    attributiPresenti = attributiPresenti.map(el => parseInt(el.cd_attributo, 10));

    attributiUtenteLav.forEach((attr) => {
      let found = attributiPresenti.includes(attr.cd_attributo);
      if (!found) {
        insertAttrUtenteLavRows.push({
          id_utente_offerta_lav: idLavoratore,
          cd_attributo: attr.cd_attributo,
          cd_val_attributo: attr.cd_val_attributo,
          fg_val: attr.fg_val,
          dt_val: attr.dt_val || null,
          tx_val: attr.tx_val,
          ts_modifica: 'localtimestamp',
          ts_creazione: 'localtimestamp',
        });
      } else {
        updateAttrUtenteLavRows.push({
          id_utente_offerta_lav: idLavoratore,
          cd_attributo: attr.cd_attributo,
          cd_val_attributo: attr.cd_val_attributo,
          dt_val: attr.dt_val || null,
          fg_val: attr.fg_val,
          tx_val: attr.tx_val,
          ts_modifica: 'localtimestamp',
          ts_creazione: 'localtimestamp',
        });
      }
    });

    if (updateAttrUtenteLavRows.length) {
      const aggiornaAttributiUtenteLav = aggiornaAttributiUtenteLavMutation(
        updateAttrUtenteLavRows,
        context,
      );
      t.none(aggiornaAttributiUtenteLav, { idLavoratore });
    }

    if (insertAttrUtenteLavRows.length) {
      const inserisciAttributiUtenteLav = inserisciAttributiUtenteLavMutation(
        insertAttrUtenteLavRows,
        context,
      );
      t.none(inserisciAttributiUtenteLav, { idLavoratore });
    }

    const ultimoStatoCandidatura = await t.one(selectUltimoStatoCandidatura, {idLavoratore}).then(res => parseInt(res.cd_stato_dati_lav));
    
    if(notaOperatore){
      t.none(updateNotaOperatore, {
        notaOperatore,
        idLavoratore,
      });
    }

    if (ultimoStatoCandidatura !== statoCandidatura) {
      t.none(aggiornaStatoCandidaturaMutation, {
        idLavoratore,
        idOperatore,
        statoCandidatura,
      });
    }
    t.none(aggiornaAnniVotoServizi, { idLavoratore });
  });

  if (idAllegati && idAllegati.length) {
    return idAllegati.map(el => (
      {
        id: el.id_allegato,
        fileName: el.nm_nome_allegato_off,
      }
    ));
  }

  else return {
    idOperatore,
    idLavoratore,
    anniEsp,
    votoEsp,
    statoCandidatura,
    attributiUtenteLav,
    notaOperatore,
    documentiDaEliminare,
  };
};