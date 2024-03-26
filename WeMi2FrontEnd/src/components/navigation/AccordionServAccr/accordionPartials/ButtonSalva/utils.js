import moment from "moment";

const municipiServiti = (form, listaMunicipi) => {
  const municipiSelezionati = form.servizio.listaSelezionataMunicipi;
  const isSelectedAll = municipiSelezionati.some(el => el.id === 0);

  if (isSelectedAll) {
    return listaMunicipi.map(el => el.id);
  }
  return form.servizio.listaSelezionataMunicipi.map(municipio => municipio.id);
};

const getSediErogazione = form => {
  const sediErogazione = Array.from(form.sede.checkboxes.entries())
    .filter(([_, value]) => value.checked)
    .map(([key, value]) => ({
      id: key,
      checkAccompagnamento: value.checkAccompagnamento,
    }));
  return sediErogazione;
};

export function mapFormToBody(form, stato, locale, listaMunicipi) {
  return {
    id_ente: form.ente.idEnte,

    tl_procedura_attivazione: { [locale]: form.servizio.proceduraAttivazione },

    fg_0_18_anni: form.destinatari.fg018Anni ? '1' : '0',

    slider_immagini: form.sliderImmagini.slider || {},

    nm_descrittore_movimento: form.descrittoriDelBenessere.corpoMovimento,

    nm_descrittore_relazioni: form.descrittoriDelBenessere.relazioni,

    nm_descrittore_competenze: form.descrittoriDelBenessere.conoscereCompetenze,

    nm_descrittore_creativita: form.descrittoriDelBenessere.creativitaAbilitaTalento,

    nm_descrittore_autodeterm: form.descrittoriDelBenessere.autodeterminazione,

    id_destinatario_liv1: form.destinatari.listaSelezionataDestinatariPrimoLivello
      .map(dest => (dest.id)),

    id_servizio_ente: form.informazioni.idServizioEnte,

    id_destinatario_liv2: form.destinatari.listaSelezionataDestinatariSecondoLivello
      .map(dest => (dest.id)),

    // dt_inizio_erog_serv: form.servizio.dataInizio,

    // dt_fine_erog_serv: form.servizio.dataFine,

    tx_altre_mansioni: form.servizio.altreMansioni,

    mansioni: form.servizio.listaSelezionataMansioni.map((mansione, idx) => ({ idMansione: mansione.id, order: idx })),

    cd_municipio_servito: municipiServiti(form, listaMunicipi),

    qt_tempo_max_attivazione: parseInt(form.servizio.tempoMassimo, 10),

    // im_prezzo_minimo: form.prezzo.prezzoMinimo ? form.prezzo.prezzoMinimo : 0,

    im_prezzo_minimo_offerta_calc: form.prezzo.prezzoMinimoCalcolato,
    js_info_personale: {
      nmFornitori: form.personaleEsterno.nomiFornitori,
      qtEsperienzaPersonaleEsterno: form.personaleEsterno.anniEsperienza,
      qtEsperienzaPersonaleInterno: form.personaleInterno.anniEsperienza,
    },

    nomeServizio: form.servizio.nomeServizio,

    ulterioriInformazioni: form.servizio.ulterioriInformazioni,

    cd_fascia_oraria_erog_srv_ente: form.servizio.listaSelezionataErogazione.map(el => (el.id)),

    sedi_erogazione: getSediErogazione(form),

    tx_altra_sede: form.sede.altraSede,

    fg_accompagnamento_altra_sede: form.sede.altraSede && form.sede.altraSedeFlagAccompagnamento ?
      '1' : '0',

    cd_tipo_offerta_srv: form.prezzo.cd_tipo_offerta_srv,

    cd_tipo_servizio_erog: form.prezzo.cd_tipo_servizio_erog,

    id_contenuto_sostegno_econ: form.sostegni.listaSelezionataSostegni.map(el => (el.id)),

    qt_min_pers: form.prezzo.personeDa,

    qt_max_pers: form.prezzo.personeA,

    dt_inizio_val_offerta_prezzo: form.prezzo.dt_inizio_val_offerta_prezzo,

    dt_fine_val_offerta_prezzo: form.prezzo.dt_fine_val_offerta_prezzo,

    prezzo_minimo: form.prezzo.prezzoMinimo,

    noteEnte: form.prezzo.noteEnte,

    tl_descrizione_servizio_ente: {
      [locale]: form.servizio.descrizione,
    },

    cd_modalita_erogazione: form.sede.domicilio ? 1 : null,

    qualifiche_interne: form.personaleInterno.qualificheInterne?.map(el=> el.id),

    qualifiche_esterne: form.personaleEsterno.qualificheEsterne?.map(el=> el.id),

    // dipende dal pulsante premuto
    cd_stato_dati_servizio_ente: stato,

    js_note_adminwemi_su_servizio: {
      notedest: form.destinatari.note,
      notepers: form.personaleEsterno.note,
      notesede: form.sede.note,
      noteserv: form.servizio.note,
      noteAdminPrezzo: form.prezzo.note,
      noteAdminPersInt: form.personaleInterno.note,
      noteAdminSostegni: form.sostegni.note,
      noteAdminBenessere: form.descrittoriDelBenessere.note,
      noteSliderImmagini: form.sliderImmagini.note,
    },
  };
}


export function validateForm(form) {
  return (
    validatePrezzo(form.prezzo)
    && validateSede(form.sede)
    && validateFormDestinatari(form.destinatari)
    && validateFormServizio(form.servizio)
    && validatePersonaleInterno(form.personaleInterno)
    && validatePersonaleEsterno(form.personaleEsterno))

}

function validateSede(form) {
  return form.domicilio
    || (form.altraSedeFlag && form.altraSede !== '')
    || Array.from(form.checkboxes.entries()).some(([key, value]) => value.checked);
}


function validatePrezzo(form) {
  const isRadioSelected = [1, 2, 3].indexOf(form.cdTipoOffertaServizio) >= 0;
  let listinoIsValid = true;
  const dateValid = !!form.dataInizio && (!form.dataFine || moment(form.dataInizio).isSameOrBefore(form.dataFine));
  let titoloValid = true;
  if (form.cdTipoOffertaServizio === 1) {
    titoloValid = !!form.txTitoloFinanziamento;
  }
  if (form.cdTipoOffertaServizio === 3) {
    listinoIsValid = form.listinoPrezzi.length > 0 &&
     form.listinoPrezzi.some(el => el.offerta.length > 0);
  }
  return isRadioSelected && listinoIsValid && titoloValid && dateValid;
}


function validatePersonaleInterno(form) {
  if (form.qualificheInterne?.length === 0) {
    return true;
  }
  return form.anniEsperienza > 0 && form.qualificheInterne?.length > 0;
}


function validatePersonaleEsterno(form) {

    return (form.anniEsperienza && form.nomiFornitori && form.qualificheEsterne?.length > 0)
      || !form.anniEsperienza && !form.nomiFornitori && !form.qualificheEsterne?.length > 0

}


function validateFormServizio(form) {

  return (form.listaSelezionataMansioni.length > 0
    && form.listaSelezionataMunicipi && form.listaSelezionataMunicipi.length > 0
    && form.listaSelezionataErogazione && form.listaSelezionataErogazione.length > 0
    // Inibizione del campo descrizione servizio ente issue #145
    // && form.descrizione
    && form.proceduraAttivazione);


};

const calcolaPrezzo  = (listinoPrezzi) => {
  if (listinoPrezzi.length === 0) {
    return [0, 0];
  }
  const individuale = listinoPrezzi.find(el => (
    el.qtPersoneDa === 1
  ));
  let prezzoIndividuale = null;
  let prezzoCondiviso = Number.POSITIVE_INFINITY;
  if (individuale && individuale.offerta.length > 0) {
    prezzoIndividuale = individuale.offerta.reduce((acc, el) => (
      acc > el.valore ? el.valore : acc
    ), Number.POSITIVE_INFINITY);
  }
  for (let i = 0; i < listinoPrezzi.length; i += 1) {
    const el = listinoPrezzi[i];
    if (!(el.qtPersoneA === 1 && el.qtPersoneDa === 1)) {
      const min = el.offerta.reduce((acc, of) => (
        acc > of.valore / el.qtPersoneA ? of.valore / el.qtPersoneA : acc
      ), Number.POSITIVE_INFINITY);
      prezzoCondiviso = prezzoCondiviso > min ? min : prezzoCondiviso;
    }
  }
  prezzoCondiviso = prezzoCondiviso === Number.POSITIVE_INFINITY ? null : prezzoCondiviso;
  return [prezzoIndividuale, prezzoCondiviso];
};


const getCdTipoServizioErog = listino => {
  const individuale = listino.some(el => el.qtPersoneDa === 1);
  let condiviso = listino.some(el => el.qtPersoneA !== 1);
  if (individuale && condiviso) {
    return 3;
  }
  if (individuale) {
    return 1;
  }
  if (condiviso) {
    return 2;
  }
  return 3;
};

export const createJsonDatiPrezzo = (form) => {
  const json = form.prezzo;
  const [imPrezzoMinimo, imPrezzoMinimoCond] = calcolaPrezzo(json.listinoPrezzi);
  return {
    idServizioEnte: form.informazioni.idServizioEnte,
    cdTipoOffertaServizio: json.cdTipoOffertaServizio,
    dataInizio: json.dataInizio ? moment(json.dataInizio).toDate() : null,
    dataFine:  json.dataFine ? moment(json.dataFine).toDate() : null,
    cdTipoServizioErog: getCdTipoServizioErog(json.listinoPrezzi),
    txTitoloFinanziamento: json.txTitoloFinanziamento,
    qtMinimaUnita: json.qtMinimaUnita ? parseInt(json.qtMinimaUnita, 10) : null,
    txNoteAlPrezzo: json.txNoteAlPrezzo,
    listinoPrezzi: json.listinoPrezzi,
    imPrezzoMinimo,
    imPrezzoMinimoCond,
  }
}
function validateFormDestinatari(form) {
  return form && form.listaSelezionataDestinatariPrimoLivello && form.listaSelezionataDestinatariPrimoLivello.length > 0
}
// 31 scheda validata
// 21 in compilazione
// 2 da compilare
// 22 compilata 
// 30 da correggere
// 31 validata
// 4 disattiva