import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import moment from 'moment';
import { calcPrezzoStimato } from 'components/navigation/RequestService/partials/Section/utils';
import * as tipologica from '../../constants';
import * as tcbConstants from 'types/tcbConstants';
import { CompPagataRecensione } from './partials/CompPagataRecensione';
import { CompLavoratoreAssociato } from './partials/CompLavoratoreAssociato';


const NOT_DEFINED = 'N/D';

const CHAT_CHIUSA = 'Chat chiusa';
const APERTA = 'Richiesta inoltrata';
const IN_ATTESA_DI_RISPOSTA = 'In attesa di risposta';
const ANNULLATA = 'Annullata';
const NUOVO_MESSAGGIO = 'Ti ha inviato un messaggio';
const RICHIESTA_ACCETTATA = 'Ha accettato la tua richiesta';
const SCADUTA = 'Richiesta scaduta';
const RIFIUTATA = 'Ha rifiutato la tua richiesta';
const PAGATA = 'Pagato';
const CONCLUDI = 'Concludi la richiesta';
const ELABORAZIONE ="La tua richiesta è in fase di elaborazione";
const CURRICULUM_INVIATI = (numeroAssociazioni) => {
 return `Ti abbiamo inviato i curricula di ${numeroAssociazioni} ${numeroAssociazioni > 0 ? ' candidati/e' : 'candidato/a'} per e-mail`
};

const NEGATIVO = 'La sua richiesta ha avuto esito negativo.';
const RICHIESTA_ANNULAMENTO_TCB = "Richiesta annullata dalla famiglia";

const formattedDate = (date) => {
  
    return date ? moment(date).format('DD/MM/YYYY') : null;
};

export const mapData = (data, locale, dataType, datiLogin) => (
  {
  headerData: {
    idRichiestaBase: getObjectValue(data, 'idRichiestaBase', NOT_DEFINED),
    richiestaDisponibilita: getObjectValue(data, 'js_dati_richiesta.fgRichiestaDisponibilita', false),
    numeroPrestazioni: getObjectValue(data, 'js_dati_richiesta.qtBaseRichiesta', NOT_DEFINED),
    numeroPersone: getObjectValue(data, 'js_dati_richiesta.qtPersone', NOT_DEFINED),
    momentoDellaGiornata: getObjectValue(data, `orarioName.${locale}`, NOT_DEFINED),
    dataDa: formattedDate(getObjectValue(data, 'dt_periodo_richiesto_dal', NOT_DEFINED)),
    dataA: formattedDate(getObjectValue(data, 'dt_periodo_richiesto_al', NOT_DEFINED)),
    statoRichiesta: decodeRequestState(data.stato),
    nomeServizio: getObjectValue(data, `serviceName.${locale}`, NOT_DEFINED),
    dataRichiesta: formattedDate(getObjectValue(data, 'ts_creazione_inoltro', NOT_DEFINED)),
  },
  bodyData: dataType === tipologica.ENTE ? mapEnteData(data, locale, datiLogin) : mapTCBData(data, datiLogin),
});

const idToCd = (id) => {
  switch(id) {
    case tcbConstants.ID_SERVIZIO_TATA : return tcbConstants.CD_TIPOLOGICA_TATA;
    case tcbConstants.ID_SERVIZIO_COLF : return tcbConstants.CD_TIPOLOGICA_COLF;
    case tcbConstants.ID_SERVIZIO_BADANTE : return tcbConstants.CD_TIPOLOGICA_BADANTE;
    default: return null;
  }
}

const defaultSteps = (codice) => ([
  {
    code: 'beneficiario',
    title: codice === 3 ? 'Persone da assistere' : 'Bambini da accudire',
    hide: !(codice === 3 || codice === 1),
    valid: false,
    visited: false,
    active: (codice === 3 || codice === 1)
  },
  {
    code: 'mansioni',
    title: codice === 3 ? 'Cura della persona' : 'Cura dei bambini',
    hide: !(codice === 3 || codice === 1),
    valid: false,
    visited: false,
    active: false
  },
  {
    code: 'casa',
    title: 'Cura della casa',
    valid: false,
    visited: false,
    active: (codice === 2)
  },
  {
    code: 'animali',
    title: 'Cura degli animali',
    valid: false,
    visited: false,
    active: false
  },
  {
    code: 'disponibilita',
    title: 'Disponibilità richiesta',
    valid: false,
    visited: false,
    active: false
  },
  {
    code: 'preferenzelav',
    title: 'Preferenze sul lavoratore',
    valid: false,
    visited: false,
    active: false
  },
  {
    code: 'sedelavoro',
    title: 'Sede di lavoro e contatti',
    valid: false,
    visited: false,
    active: false
  }
]);

const mapTCBData = (data, datiLogin) => {
  const lavoratoreAssociato = !!data.idLavoratore;
  const cdServizio = idToCd(data.idServizio);
  const steps = defaultSteps(cdServizio);
  return {
    idServizio: data.idServizio,
    cdServizio,
    steps,
    idRichiestaTCB: data.idRichiestaTCB,
    nomeServizio: data.nomeServizio,
    stato: data.statoRichiestaTCB,
    prezzo: data.prezzo,
    ...getInfoRichiestaTCB(data),
    lavoratoreAssociato,
    nomeLavoratore: data.nomeLavoratore,
    cognomeLavoratore: data.cognomeLavoratore,
    dataInizio: data.dataInizio ? formattedDate(data.dataInizio) : null,
    dataFine: data.dataFine ? formattedDate(data.dataFine) : null,
    dataCambioStato: formattedDate(getObjectValue(data, 'ts_variazione_stato', NOT_DEFINED)),
    curriculum: data.curriculum,
    statoRecensione: data.statoRecensione,
    datiLogin,
  }
};

const getInfoRichiestaTCB = (data) => {
  let statoRichiestaTestuale = NOT_DEFINED;
  let disableRiepilogo = false;
  let disableCurriculum = true;
  let disableBozza = true;
  let vediRecensione=false;
  let richiestaTCBIsClosed= data.statoRichiestaTCB === tipologica.RICHIESTA_TCB_FINALIZZATA && !!data.idLavoratore;
  const { nomeLavoratore, cognomeLavoratore, dataInizio, dataFine, cdServizio } = data;

  if(data.statoRichiestaTCB === tipologica.RICHIESTA_TCB_BOZZA) {
    statoRichiestaTestuale = CONCLUDI;
    disableRiepilogo = true;
    disableBozza = false;
  } else if( data.statoRichiestaTCB === tipologica.RICHIESTA_TCB_RICHIESTA_ANNULLAMENTO ){
    statoRichiestaTestuale = RICHIESTA_ANNULAMENTO_TCB;
  }else if (data.statoRichiestaTCB === tipologica.RICHIESTA_TCB_CHIUSA) {
    statoRichiestaTestuale = NEGATIVO;
  } else if (data.statoRichiestaTCB === tipologica.RICHIESTA_TCB_GESTIONE) {
    statoRichiestaTestuale = data.conteggioLavoratoriAssociati === 0 ? ELABORAZIONE : CURRICULUM_INVIATI(data.conteggioLavoratoriAssociati);
  } else if (data.statoRichiestaTCB === tipologica.RICHIESTA_TCB_INOLTRATA) {
    statoRichiestaTestuale = ELABORAZIONE;
  } else if (data.statoRichiestaTCB === tipologica.RICHIESTA_TCB_FINALIZZATA && !!data.idLavoratore) {
    statoRichiestaTestuale = <CompLavoratoreAssociato nome={nomeLavoratore} cognome= {cognomeLavoratore} dataInizio={dataInizio} dataFine={dataFine} cdServizio={cdServizio}/>;
    disableCurriculum = !data.curriculum;
  } else if(data.statoRichiestaTCB === tipologica.RICHIESTA_ENTE_PAGATA){
    statoRichiestaTestuale = <CompPagataRecensione nome= {nomeLavoratore} cognome={cognomeLavoratore}/>;
    vediRecensione= true;
    disableRiepilogo = true;
  } 
  return {
    statoRichiestaTestuale,
    disableRiepilogo,
    disableCurriculum,
    richiestaTCBIsClosed,
    disableBozza,
    vediRecensione
  };
}


function decodeRequestState(statoRichiesta) {
  switch (statoRichiesta) {
    case tipologica.RICHIESTA_BASE_BOZZA:
      return {
        text: 'In bozza',
        color: 'green',
      };
    case tipologica.RICHIESTA_BASE_APERTA:
      return {
        text: 'Aperta',
        color: 'green',
      };
    case tipologica.RICHIESTA_BASE_PAGATA:
      return {
        text: 'Pagata',
        color: 'green',
      };
    case tipologica.RICHIESTA_BASE_RIFIUTATA:
      return {
        text: 'Rifiutata',
        color: 'black',
      };
    case tipologica.RICHIESTA_BASE_SCADUTA:
      return {
        text: 'Scaduta',
        color: 'black',
      };
    case tipologica.RICHIESTA_BASE_INOLTRATA:
      return {
        text: 'Inoltrata',
        color: 'black',
      };
    case tipologica.RICHIESTA_BASE_IN_GESTIONE:
      return {
        text: 'In gestione',
        color: 'black',
      };
    case tipologica.RICHIESTA_BASE_CHIUSA:
      return {
        text: 'Chiusa',
        color: 'black',
      };
    case tipologica.RICHIESTA_BASE_FINALIZZATA:
      return {
        text: 'Finalizzata',
        color: 'green',
      };
    default:
      return {
        text: NOT_DEFINED,
        color: 'green',
      };
  }
}

function mapEnteData(data, locale, datiLogin) {
  const listaRichieste = getObjectValue(data, 'richiestaEnte', []);
  const isCittadino = datiLogin.Profilo === 'C';
  const numeroPrestazioni = getObjectValue(data, 'js_dati_richiesta.qtBaseRichiesta', NOT_DEFINED);
  const numeroPersone = getObjectValue(data, 'js_dati_richiesta.qtPersone', NOT_DEFINED);
  return listaRichieste.map(richiesta => ({
    idMittente: datiLogin.idCittadino,
    isCittadino,
    idServizioErogatoEnte: richiesta.id_servizio_erogato_ente,
    tipoOfferta: getObjectValue(richiesta, 'servizioEnte.cd_tipo_offerta_srv', undefined),
    usernameCittadino: getObjectValue(data, 'user.ptx_username', "Cittadino"),
    idDestinatario: !isCittadino ? getObjectValue(data, 'id_utente_richiedente', undefined) : null,
    dataRichiestaBaseDa: formattedDate(getObjectValue(data, 'dt_periodo_richiesto_dal', NOT_DEFINED)),
    dataRichiestaBaseA: formattedDate(getObjectValue(data, 'dt_periodo_richiesto_al', NOT_DEFINED)),
    nomeServizio: getObjectValue(data, `serviceName.${locale}`, NOT_DEFINED),
    dataDal: richiesta.dt_periodo_proposto_dal || "",
    dataAl: richiesta.dt_periodo_proposto_al || "",
    statoRecensione: richiesta.cd_stato_recensione,
    prezzoProposto: richiesta.im_costo_totale_calcolato,
    prezzoFinale: richiesta.im_costo_totale_ente,
    nomeEnte: richiesta.servizioEnte.ente.nm_ente,
    storiaStati: richiesta.storiaStati,
    recensione: richiesta.recensione,
    scadenza: richiesta.ts_scadenza_acquisto,
    idRichiestaServizioEnte: richiesta.id_richiesta_servizio_ente,
    noteCittadino: getObjectValue(data, "js_dati_richiesta.txNotaRichiesta", null),
    richiestaDisponibilita: getObjectValue(data, 'js_dati_richiesta.fgRichiestaDisponibilita', false),
    ...otherInfo(richiesta),
  }));
}

function otherInfo(richiesta) {
  const statoRichiestaEnte = parseInt(richiesta.ultimoStato.cd_stato_ric_serv_ente, 10);
  const statoChat = parseInt(richiesta.ultimoStato.cd_stato_chat, 10);
  const { disabilitaAcquista, statoRichiestaTestuale } = mapStateToInfo(statoChat, statoRichiestaEnte);
  return {
    statoChat,
    statoRichiestaEnte,
    disabilitaAcquista,
    statoRichiestaTestuale,
  };
};


function mapStateToInfo(statoChat, statoRichiestaEnte) {
  let disabilitaAcquista = true;
  let statoRichiestaTestuale = '';
  switch (statoRichiestaEnte) {
    case 1:
      statoRichiestaTestuale = APERTA;
      break;
    case 2:
      statoRichiestaTestuale = RICHIESTA_ACCETTATA;
      disabilitaAcquista = false;
      break;
    case 3:
      if (statoChat === 1) {
        statoRichiestaTestuale = NUOVO_MESSAGGIO;
      } else if (statoChat === 2) {
        statoRichiestaTestuale = IN_ATTESA_DI_RISPOSTA;
      } else {
        statoRichiestaTestuale = CHAT_CHIUSA;
      }
      break;
    case 4:
      statoRichiestaTestuale = ANNULLATA;
      break;
    case 5:
      statoRichiestaTestuale = RIFIUTATA;
      break;
    case 6:
      statoRichiestaTestuale = SCADUTA;
      break;
    case 8:
      statoRichiestaTestuale = PAGATA;
      break;
    default:
      break;
  }
  return {
    statoRichiestaTestuale,
    disabilitaAcquista,
  };
}
