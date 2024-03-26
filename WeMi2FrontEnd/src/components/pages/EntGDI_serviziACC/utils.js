import moment from 'moment';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { isNullOrUndefined } from 'util';
import { AMMINISTRATORE, AMMINISTRATORE_ENTE, OPERATORE_ENTE } from 'types/userRole';
import { SCHEDA_SERVIZIO_STATE } from 'types/statischedaservizio';

export const getModificable = (stato, profilo) => {
  const isEnte = (profilo === AMMINISTRATORE_ENTE) || (profilo === OPERATORE_ENTE);
  const isAdmin = profilo === AMMINISTRATORE;
  const isAvailableEnteStates = {
    campi: [
      SCHEDA_SERVIZIO_STATE.DA_COMPILARE,
      SCHEDA_SERVIZIO_STATE.IN_COMPILAZIONE,
      SCHEDA_SERVIZIO_STATE.DA_CORREGGERE,
    ],
  };

  const isAvailableAdminStates = {
    campi: [
      SCHEDA_SERVIZIO_STATE.COMPILATA,
      SCHEDA_SERVIZIO_STATE.VALIDATA,
      SCHEDA_SERVIZIO_STATE.DISATTIVATA,
    ],
    note: [
      SCHEDA_SERVIZIO_STATE.COMPILATA,
      SCHEDA_SERVIZIO_STATE.VALIDATA,
      SCHEDA_SERVIZIO_STATE.DISATTIVATA,
    ],
  };

  return ({
    campi: (isEnte && isAvailableEnteStates.campi.indexOf(stato) >= 0) || (isAdmin && isAvailableAdminStates.campi.indexOf(stato) >= 0),
    note: isAdmin && isAvailableAdminStates.note.indexOf(stato) >= 0,
  });
};


export const parseData = (data, locale) => {
  const state = initialize();
  state.informazioni = parseDataInformazioni(data, locale);
  state.ente = parseDataEnte(data);
  state.destinatari = parseDataDestinatari(data, locale);
  state.primoContatto = parseDataPrimoContatto(data);
  state.servizio = parseDataServizio(data, locale);
  state.sede = parseDataSede(data);
  state.personaleInterno = parseDataPersonaleInterno(data, locale);
  state.personaleEsterno = parseDataPersonaleEsterno(data, locale);
  state.prezzo = parseDataPrezzo(data, locale);
  state.sostegni = parseDataSostegniEconomici(data, locale);
  state.descrittoriDelBenessere = parseDataDescrittoriDelBenessere(data);
  state.sliderImmagini = parseDataSliderImmagini(data);
  return state;
};

function parseDataSliderImmagini(data) {
  const slider = {
    slider1: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.sliderImg.slider1', undefined),
    slider2: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.sliderImg.slider2', undefined),
    slider3: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.sliderImg.slider3', undefined),
  };
  return {
    slider,
    note: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteSliderImmagini', undefined),
  };
}

function parseDataDescrittoriDelBenessere(data) {
  const corpoMovimento = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.nm_descrittore_movimento', 0);
  const relazioni = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.nm_descrittore_relazioni', 0);
  const conoscereCompetenze = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.nm_descrittore_competenze', 0);
  const creativitaAbilitaTalento = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.nm_descrittore_creativita', 0);
  const autodeterminazione = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.nm_descrittore_autodeterm', 0);
  const note = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteAdminBenessere', undefined);
  return {
    corpoMovimento,
    relazioni,
    conoscereCompetenze,
    creativitaAbilitaTalento,
    autodeterminazione,
    note,
  };
}

function parseDataPrezzo(data, locale) {
  if (data.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) {
    const jsonDatiPrezzo = data.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo;
    const dataInizio = jsonDatiPrezzo.dataInizio ? moment(jsonDatiPrezzo.dataInizio).toDate() : null;
    const dataFine = jsonDatiPrezzo.dataFine ? moment(jsonDatiPrezzo.dataFine).toDate() : null;
    return {
      ...jsonDatiPrezzo,
      listinoPrezzi: jsonDatiPrezzo.listinoPrezzi,
      dataFine,
      dataInizio,
      nomeEnte: data.EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente,
      service: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.service', ''),
      unitaPrezzo: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.service.prezzo.tl_testo_aggettivo.it', ''),
      noteAdmin: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notePrezzo', ''),
      note: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteAdminPrezzo', ''),
    };
  }
  return {
    cdTipoOffertaServizio: null,
    cdTipoServizioErog: null,
    dataInizio: null,
    dataFine: null,
    txTitoloFinanziamento: '',
    qtMinimaUnita: 0,
    txNoteAlPrezzo: '',
    listinoPrezzi: [],
    nomeEnte: data.EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente,
    service: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.service', ''),
    unitaPrezzo: getObjectValue(data, `EstraiDettaglioAmministrativoServizioEnte.service.prezzo.tl_testo_aggettivo.${locale}`, ''),
    note: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteAdminPrezzo', ''),
  };
}


function parseDataSostegniEconomici(data, locale) {
  return {
    listaCompletaSostegni: adaptListaSostegniToSelect(data.EstraiSostegniEconomiciPubblicati, locale),
    listaSelezionataSostegni: adaptListaSostegniToSelected(data.EstraiDettaglioAmministrativoServizioEnte.listaSostegniEconomiciSupportati, locale),
    note: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteAdminSostegni', ''),
  };
}


function adaptListaSostegniToSelect(lista, locale) {
  return lista.map(el => ({
    id: el.idSostegno,
    value: el.txSostegno[locale],
  }));
}


function adaptListaSostegniToSelected(lista, locale) {
  return lista.map(el => ({
    id: el.idSostegno,
    value: el.txSostegno[locale],
  }));
}


function parseDataPersonaleEsterno(data, locale) {
  return ({
    nomiFornitori: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori', ''),
    qualificheEsterne: adaptPersonaleToSelectedFromId(getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.qualifiche_esterne', []), locale, data.contenutoPerQualifiche),
    personaleCompleto: adaptPersonaleToSelect(data.contenutoPerQualifiche, locale),
    anniEsperienza: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno', 0),
    note: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notepers', ''),
  });
}


function parseDataPersonaleInterno(data, locale) {
  return {
    qualificheInterne: adaptPersonaleToSelectedFromId(getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.qualifiche_interne', []), locale, data.contenutoPerQualifiche),
    personaleCompleto: adaptPersonaleToSelect(data.contenutoPerQualifiche, locale),
    anniEsperienza: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno', undefined),
    note: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteAdminPersInt', ''),
  };
}

function adaptPersonaleToSelectedFromId(lista, locale, data) {
  const result = lista.map((el) => ({
    id: el,
    value: searchValue(data, el, locale),
  }));
  return result.filter(el => !isNullOrUndefined(el.id));
}

const searchValue = (data, el, locale) => data.find(element => element.id_contenuto === el)?.tl_testo_1[locale];

function adaptPersonaleToSelect(lista, locale) {
  return lista.map(el => ({
    id: el.id_contenuto,
    value: el.tl_testo_1[locale],
  }));
}


function parseDataSede(data) {
  const listaSedi = data.entePK.datiEnte.sedeEnte;
  const sediSelezionate = data.EstraiDettaglioAmministrativoServizioEnte.sediErogatrici;

  const checkboxes = new Map(
    listaSedi.map(sede => {
      const sedeSelezionataCollegata = sediSelezionate.find(
        sedeSelezionata => sedeSelezionata.id_sede === sede.id_sede
      );

      return ([
        sede.id_sede,
        {
          label: createSedeString(sede),
          checked: !!sedeSelezionataCollegata,
          checkAccompagnamento: sedeSelezionataCollegata?.fg_accompagnamento_sede === '1',
        },
      ]);
    })
  );

  return {
    // se cd_modalita_erogazione === 1 allora si effettua l'erogazione del servizio a domicilio
    domicilio: data.EstraiDettaglioAmministrativoServizioEnte.cd_modalita_erogazione === 1,
    // se è presente il testo allora la casella "altro" è checkata
    altraSedeFlag: !!data.EstraiDettaglioAmministrativoServizioEnte.tx_altra_sede,
    altraSede: data.EstraiDettaglioAmministrativoServizioEnte.tx_altra_sede,
    altraSedeFlagAccompagnamento: data.EstraiDettaglioAmministrativoServizioEnte.fg_accompagnamento_altra_sede === '1',
    checkboxes,
    note: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notesede', ''),
  };
}


function createSedeString(sede) {
  const nome = sede.js_sede.nomeSede;
  const indirizzo = sede.js_sede.indirizzo.txIndirizzo || sede.js_sede.indirizzo.indirizzo;
  const cap = sede.js_sede.indirizzo.txCAP || sede.js_sede.indirizzo.cap;
  const citta = sede.js_sede.indirizzo.txCitta || sede.js_sede.indirizzo.citta;
  const provincia = sede.js_sede.indirizzo.txProvincia || sede.js_sede.indirizzo.provincia;
  return `${nome ? `${nome}, ` : ''}${indirizzo ? `${indirizzo}, ` : ''}${citta || ''}${provincia ? `(${provincia}), ` : ', '}${cap || ''}`;
}


function adaptListaSediToSelect(lista) {
  return lista.map(el => ({
    id: el.id_sede,
    label: createSedeString(el),
  }));
}

function setSelectedRadio(data) {
  if (data.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione) {
    return { id: 3, label: 'sede ente' };
  } if (data.EstraiDettaglioAmministrativoServizioEnte.tx_altra_sede) {
    return { id: 2, label: 'altra sede' };
  }
  return { id: 1, label: 'domicilio' };
}

// funzione che estrae dalla richiesta graphql i dati relativi al servizio
function parseDataServizio(data, locale) {
  const dataInizioOfferta = data.EstraiDettaglioAmministrativoServizioEnte.dt_inizio_erog_serv;
  const dataFineOfferta = data.EstraiDettaglioAmministrativoServizioEnte.dt_fine_erog_serv;
  const { nomeServizio, ulterioriInformazioni } = data.EstraiDettaglioAmministrativoServizioEnte;
  let dataInizio = null;
  let dataFine = null;
  if (dataInizioOfferta) {
    dataInizio = moment(dataInizioOfferta, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }
  if (dataFineOfferta) {
    dataFine = moment(dataFineOfferta, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }

  const mansioniSelezionate = listaMansioniToSelected(data.EstraiDettaglioAmministrativoServizioEnte.listaMansioniSvolte, locale);

  return {
    dataInizio,
    dataFine,
    nomeServizio,
    ulterioriInformazioni,
    listaCompletaMunicipi: listaMunicipoToSelect(data.municipioAll, locale),
    listaSelezionataMunicipi: listaMunicipoToSelected(data.EstraiDettaglioAmministrativoServizioEnte.listaMunicipiServiti, locale),
    listaCompletaMansioni: listaMansioniToSelect(data.mansioniPubblicate, mansioniSelezionate, locale),
    listaSelezionataMansioni: mansioniSelezionate,
    altreMansioni: data.EstraiDettaglioAmministrativoServizioEnte.tx_altre_mansioni,
    proceduraAttivazione: data.EstraiDettaglioAmministrativoServizioEnte.tl_procedura_attivazione ?
      data.EstraiDettaglioAmministrativoServizioEnte.tl_procedura_attivazione[locale] :
      '',
    listaCompletaErogazione: listaErogazioneToSelect(data.dFasciaOrariaAll, locale),
    listaSelezionataErogazione: listaErogazioneToSelected(data.EstraiDettaglioAmministrativoServizioEnte.listaPeriodiErogazione, locale),
    tempoMassimo: data.EstraiDettaglioAmministrativoServizioEnte.qt_tempo_max_attivazione,
    note: getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteserv', ''),
  };
}


// funzione di utilità che adatta la lista dei periodi di erogazione agli items della multiselect
function listaErogazioneToSelect(lista, locale) {
  return lista.map(el => ({ id: el.id_periodo, value: el.tl_valore_testuale[locale] }));
}


// funzione di utils che adatta la lista dei periodi di erogazione agli elementi selezionati della multiselect
function listaErogazioneToSelected(lista, locale) {
  return lista.map(el => ({ id: el.id_periodo, value: el.tl_valore_testuale[locale] }));
}


// funzione di utilità che adatta la lista delle mansioni agli items della multiselect
function listaMansioniToSelect(lista, listaSelected, locale) {
  const listaMapped = lista.map(el => ({ id: el.idMansione, value: el.txTitoloMansione[locale], nrOrdineVisualizzazione: el.nrOrdineVisualizzazione}));
  const filteredList = [];
  listaMapped.forEach(el => {
    const mansioneFound = listaSelected.find(mansioneSelezionata =>
      mansioneSelezionata.id === el.id);
    if (!mansioneFound) {
      const mansioneMappata = { id: el.id, value: el.value, nrOrdineVisualizzazione: el.nrOrdineVisualizzazione };
      filteredList.push(mansioneMappata);
    }
  });
  return filteredList;
}


// funzione di utils che converte la lista delle mansioni e la adatta agli elementi selezionati della multiselect
function listaMansioniToSelected(lista, locale) {
  return lista
    .map(el => ({ id: el.idMansione, value: el.txTitoloMansione[locale], order: el.order, nrOrdineVisualizzazione: el.nrOrdineVisualizzazione }))
    .sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      return 1;
    });
}


// funzione di utilità che adatta la lista dei municipi agli items della multiselect
function listaMunicipoToSelect(lista, locale) {
  return lista.map(el => ({ id: el.idMunicipio, value: el.nmMunicipio[locale] }));
}


// funzione di utils che converte la lista dei municipi e la adatta agli elementi selezionati della multiselect
function listaMunicipoToSelected(lista, locale) {
  if (lista.length === 9) {
    return [{ id: 0, value: 'TUTTI I MUNICIPI' }];
  }
  return lista.map(el => ({ id: el.idMunicipio, value: el.nmMunicipio[locale] }));
}

// funzione che estrae dalla richiesta graphql le informazioni relative al primo contatto
function parseDataPrimoContatto(data) {
  const telefono = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono', null);
  const mail = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txEmail', null);
  const note_primo_contatto = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.note_per_cittadino', null);

  const calendario = getObjectValue(
    data,
    'EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.disponibilitaDiContatto',
    { calendario: [] }
  );
  return {
    telefono,
    mail,
    calendario,
    note_primo_contatto,
  };
}

// funzione che estrae dalla richiesta graphql le informazioni relative ai destinatari
function parseDataDestinatari(data, locale) {
  const jsonNote = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio', null);
  const listaCompletaDestinatariPrimoLivello = getObjectValue(data, 'destinatariServizio', null);
  const listaSelezionataDestinatariPrimoLivello = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.listaDestinatariPrimoLivello', null);
  const listaCompletaDestinatariSecondoLivello = listaSelezionataDestinatariPrimoLivello ? createListSecondoLivello(listaSelezionataDestinatariPrimoLivello) : null;
  const fg018Anni = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.fg_0_18_anni', false);
  const is018 = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.is_018', false);
  let listaSelezionataDestinatariSecondoLivello = getObjectValue(data, 'EstraiDettaglioAmministrativoServizioEnte.listaDestinatariSecondoLivello', null);
  listaSelezionataDestinatariSecondoLivello =
    (listaSelezionataDestinatariSecondoLivello && listaCompletaDestinatariSecondoLivello) ?
      filterSelectSecondoLivello(listaSelezionataDestinatariSecondoLivello, listaCompletaDestinatariSecondoLivello) : null;
  return {
    listaCompletaDestinatariPrimoLivello: adaptToItems(listaCompletaDestinatariPrimoLivello, locale),
    listaSelezionataDestinatariPrimoLivello: adaptToSelect(listaSelezionataDestinatariPrimoLivello, locale),
    listaCompletaDestinatariSecondoLivello: adaptToItems(listaCompletaDestinatariSecondoLivello, locale),
    listaSelezionataDestinatariSecondoLivello: adaptToSelect(listaSelezionataDestinatariSecondoLivello, locale),
    fg018Anni,
    is018,
    note: jsonNote ? jsonNote.notedest : '',
  };
}

// funzione che filtra gli elementi selezionati di secondo livello, eliminando gli elementi che non sono presenti nella lista totale
function filterSelectSecondoLivello(listaSelezionata, listaCompleta) {
  return listaSelezionata.filter(el => {
    for (const elemento of listaCompleta) {
      if (el.idDestinatario == elemento.idDestinatario) {
        return true;
      }
    }
    return false;
  });
}

// funzione che adatta la lista dei destinatari alla select(elementi selezionati), crea una lista con id e value
function adaptToSelect(list, locale) {
  return list ? list.map(elemento => ({
    id: elemento.idDestinatario,
    value: elemento.txDestinatario[locale],
  })) : null;
}
// funzione che adatta la lista dei destinatari alla select(items), crea una lista con id e value
function adaptToItems(list, locale) {
  return list ? list.map(elemento => ({
    id: elemento.idDestinatario,
    value: elemento.txDestinatario[locale],
    destinatariSecondoLivello: elemento.destinatariSecondoLivello,
  })) : null;
}

// funzione che crea la lista delle select di secondo livello
function createListSecondoLivello(listaSelezionata) {
  let toReturn = [];
  listaSelezionata.map((el) => {
    toReturn = toReturn.concat(el.destinatariSecondoLivello);
  });
  return toReturn;
}


// funzione che estrae dalla richiesta graphql le informazioni relative all'ente
function parseDataEnte(data) {
  return {
    idEnte: data.EstraiDettaglioAmministrativoServizioEnte.ente.id_ente,
    nome: data.EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente,
    descrizione: data.EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente_completo,
  };
}

// funzione che estrae dalla richiesta graphql le informazioni relative al servizio
function parseDataInformazioni(data, locale) {
  const jsonNome = data.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio;
  const jsonDescrizione = data.EstraiDettaglioAmministrativoServizioEnte.service.txDescrizioneServizio;
  return {
    idServizio: data.EstraiDettaglioAmministrativoServizioEnte.id_servizio_ente,
    idServizioEnte: data.EstraiDettaglioAmministrativoServizioEnte.id_servizio_ente,
    nome: jsonNome ? jsonNome[locale] : '',
    descrizione: jsonDescrizione ? jsonDescrizione[locale] : '',
    categoriaAccreditamento: data.EstraiDettaglioAmministrativoServizioEnte.service.categoriaAccreditamentoServizio,
  };
}

// funzione che inizializza la struttura del JSON utilizzato per passare dati alla goi005
function initialize() {
  return {
    informazioni: undefined,
    ente: undefined,
    destinatari: undefined,
    primoContatto: undefined,
    servizio: undefined,
    sede: undefined,
    personaleInterno: undefined,
    personaleEsterno: undefined,
    prezzo: undefined,
    sostegni: undefined,
    fg018Anni: undefined,
    descrittoriDelBenessere: undefined,
    sliderImmagini: undefined,
  };
}
