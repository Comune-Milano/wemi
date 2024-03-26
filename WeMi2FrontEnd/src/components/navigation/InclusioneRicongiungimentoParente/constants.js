import PreparazioneImg from 'images2/home-inclusione/Raggiungimi 1.png';
import AttivazioneImg from 'images2/home-inclusione/Raggiungimi 2.png';
import RealizzazioneImg from 'images2/home-inclusione/Raggiungimi 3.png';
import ConsolidamentoImg from 'images2/home-inclusione/Raggiungimi 4.png';

export const RICONGIUNGIMENTO_FAMILIARE = {
  title: 'COME FUNZIONA IL RICONGIUNGIMENTO FAMILIARE',
  subTitleSostegnoPerTe: 'Sei un cittadino straniero e vorresti ricongiungere un tuo familiare?',
  subTitleSostegnoPerFamiliare: 'Hai bisogno di un sostegno per un tuo familiare arrivato da poco a Milano?',
  description: 'WeMi RaggiungiMi è un servizio gratuito del Comune di Milano che ti dà tutte le informazioni\nsu quello che serve per poter avviare un percorso di ricongiungimento familiare:',
};

export const COME_CONTATTARCI = {
  title: ' COME CONTATTARCI',
  subTitle: ' Hai bisogno di maggiori informazioni o desideri\ncomunicare direttamente con un operatore WeMi?',
};

export const ORARI_SETTIMANALI = [
  {
    dayName: 'lunedì',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'martedi',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'mercoledì',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'giovedì',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'venerdì',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'sabato',
    values: [{
      from: '8',
      to: '18',
    }],
  },
];

export const SERVICE_INFORMATION = `Il servizio è realizzato in collaborazione 
                                    con lo sportello unico per l'immigrazione
                                    della Prefettura - Ufficio Territoriale
                                    del Governo di Milano`;

export const ANCHORS = Object.freeze({
  attivazione: 'attivazione',
  preparazione: 'preparazione',
  consolidamento: 'consolidamento',
  realizzazione: 'realizzazione',
});

const PREPARAZIONE = {
  title: 'PREPARAZIONE',
  img: PreparazioneImg,
  tag: ANCHORS.preparazione,
};

const ATTIVAZIONE = {
  title: 'ATTIVAZIONE',
  img: AttivazioneImg,
  tag: ANCHORS.attivazione,
};

const REALIZZAZIONE = {
  title: 'REALIZZAZIONE',
  img: RealizzazioneImg,
  tag: ANCHORS.realizzazione,
};

const CONSOLIDAMENTO = {
  title: 'CONSOLIDAMENTO',
  img: ConsolidamentoImg,
  tag: ANCHORS.consolidamento,
};

export const STEPLIST = [PREPARAZIONE, ATTIVAZIONE, REALIZZAZIONE, CONSOLIDAMENTO];
