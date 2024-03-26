
import {
  insertFile,
  updateFile,
  deleteFile,
  insertDatiGenericiAllergie,
  updateDatiGenericiAllergie,
  selectDatiGenericiAllergie,
  insertAltezzaCorporaturaInteressiCarattere,
  deleteAltezzaCorporaturaInteressiCarattereCapacita,
  insertCapacita,
  insertAltezza,
  insertCorporatura

} from '../queries/queries';
import { aggiornaUltimaModifica } from 'sql/candidaturaTCB/aggiornaUltimaModifica';

export const inserisciDati005 =   async (parent, args, context) => {
  //controllo se c'è il file 
  //se c'è controllo se già è stato inserito e mi comporto di conseguenza
  //se non c'è vedo se è stato inserito allora lo elimino
  if (args.input.file) {
    if (args.input.idAllegato) {
      await context.db.oneOrNone(updateFile, args.input);
    } else {
      await context.db.multi(insertFile, args.input);
    }
  } else {
    if (args.input.idAllegato) {
      await context.db.multi(deleteFile, args.input);
    }
  }

  //per i dati generici e allergie creo array per tutti i suoi componenti sulla maschera, lo ciclo controllo se ci sono e mi comporto di conseguenza
  const arr = [
    { cd: args.input.cdAttributoAuto, controllo: args.input.auto, tx: null },
    { cd: args.input.cdAttributoAutomunito, controllo: args.input.automunito, tx: null },
    { cd: args.input.cdAttributoLavoro, controllo: args.input.lavoro, tx: null },
    { cd: args.input.cdAttributoFumatore, controllo: args.input.fumatore, tx: null },
    { cd: args.input.cdAttributoGatti, controllo: args.input.gatti, tx: null },
    { cd: args.input.cdAttributoCani, controllo: args.input.cani, tx: null },
    { cd: args.input.cdAttributoAltriAnimali, controllo: args.input.altriAnimali, tx: args.input.altriAnimaliTextArea },
    { cd: args.input.cdAttributoAlimentari, controllo: args.input.alimentari, tx: args.input.altroAlimentari },
    { cd: args.input.cdAttributoAltro, controllo: args.input.altro, tx: args.input.altroTextArea },
  ];

  arr.forEach(async (ele) => {
    let risultatoSelect = await context.db.oneOrNone(selectDatiGenericiAllergie, {
      idUtente: args.input.idUtente,
      cdAttributo: ele.cd
    });
    if (risultatoSelect) {
      await context.db.oneOrNone(updateDatiGenericiAllergie, {
        idUtente: args.input.idUtente,
        cdAttributo: ele.cd,
        fgVal: ele.controllo ? "S" : "N",
        txVal: ele.controllo ? ele.tx : null
      });
    } else {
      await context.db.oneOrNone(insertDatiGenericiAllergie, {
        idUtente: args.input.idUtente,
        cdAttributo: ele.cd,
        fgVal: ele.controllo ? "S" : "N",
        txVal: ele.tx || null
      });
    }
  })
  //altezza prima elimino poi se ci sono inserisco
    await context.db.oneOrNone(deleteAltezzaCorporaturaInteressiCarattereCapacita, {
      idUtente: args.input.idUtente,
      cdAttributo: args.input.cdAttributoAltezza
    });
    if (args.input.altezza) {
      await context.db.oneOrNone(insertAltezza, args.input);
    }
  
  //corporatura prima elimino poi se ci sono inserisco
  
    await context.db.oneOrNone(deleteAltezzaCorporaturaInteressiCarattereCapacita, {
      idUtente: args.input.idUtente,
      cdAttributo: args.input.cdAttributoCorporatura
    });
    if (args.input.corporatura) {
      await context.db.oneOrNone(insertCorporatura, args.input);
    }
  
  //interessi prima elimino poi se ci sono inserisco
  if (args.input.interessi) {
    await context.db.oneOrNone(deleteAltezzaCorporaturaInteressiCarattereCapacita, {
      idUtente: args.input.idUtente,
      cdAttributo: args.input.cdAttributoInteressi
    });
    if (args.input.interessi.length > 0) {
      await context.db.oneOrNone(insertAltezzaCorporaturaInteressiCarattere(
        args,
        args.input.cdAttributoInteressi,
        args.input.interessi,
        args.input.altroInteressi,
        context
      ));
    }
  }
  //carattere prima elimino poi se ci sono inserisco
  if (args.input.carattere) {
    await context.db.oneOrNone(deleteAltezzaCorporaturaInteressiCarattereCapacita, {
      idUtente: args.input.idUtente,
      cdAttributo: args.input.cdAttributoCarattere
    });
    if (args.input.carattere.length > 0) {
      await context.db.oneOrNone(insertAltezzaCorporaturaInteressiCarattere(
        args,
        args.input.cdAttributoCarattere,
        args.input.carattere,
        args.input.altroCarattere,
        context
      ));
    }
  }
  //prima elimino input number comunicative e poi se c'è lo inserisco
  await context.db.oneOrNone(deleteAltezzaCorporaturaInteressiCarattereCapacita, {
    idUtente: args.input.idUtente,
    cdAttributo: args.input.cdAttributoComunicative
  });
  if (args.input.comunicative) {
    await context.db.oneOrNone(insertCapacita, {
      idUtente: args.input.idUtente,
      nr: args.input.comunicative,
      cdAttributo: args.input.cdAttributoComunicative
    });
  }
  //prima elimino input number adattamento e poi se c'è lo inserisco
  await context.db.oneOrNone(deleteAltezzaCorporaturaInteressiCarattereCapacita, {
    idUtente: args.input.idUtente,
    cdAttributo: args.input.cdAttributoAdattamento
  });
  if (args.input.adattamento) {
    await context.db.oneOrNone(insertCapacita, {
      idUtente: args.input.idUtente,
      nr: args.input.adattamento,
      cdAttributo: args.input.cdAttributoAdattamento
    });
  }
  //prima elimino input number tempo e poi se c'è lo inserisco
  await context.db.oneOrNone(deleteAltezzaCorporaturaInteressiCarattereCapacita, {
    idUtente: args.input.idUtente,
    cdAttributo: args.input.cdAttributoTempo
  });
  if (args.input.tempo) {
    await context.db.oneOrNone(insertCapacita, {
      idUtente: args.input.idUtente,
      nr: args.input.tempo,
      cdAttributo: args.input.cdAttributoTempo
    });
  }
  //prima elimino la media dei tre precedenti e poi lo inserisco
  await context.db.oneOrNone(deleteAltezzaCorporaturaInteressiCarattereCapacita, {
    idUtente: args.input.idUtente,
    cdAttributo: args.input.cdAttributoMedia
  });
  await context.db.oneOrNone(insertCapacita, {
    idUtente: args.input.idUtente,
    nr: args.input.media,
    cdAttributo: args.input.cdAttributoMedia
  });

  await context.db.none(aggiornaUltimaModifica, { id_lavoratore: args.input.idUtente, id_utente_mod: context.user.idUtente });

  return true;

}