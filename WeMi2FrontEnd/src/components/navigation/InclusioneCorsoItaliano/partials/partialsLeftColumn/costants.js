import italiano_livello from 'images2/inclusione/italiano_livello.png';
import italiano_titolo from 'images2/inclusione/italiano_titolo.png';
import italiano_scuola from 'images2/inclusione/italiano_scuola.png';

export const LEFT_ANCHORS = Object.freeze({
  qualeLivello: 'quale-livello',
  qualeTitolo: 'quale-titolo',
  qualeScuola: 'quale-scuola',
  tabella: 'tabella',
});

// come cercare
export const comeCercare = {
  comeCercareTitle: 'COME CERCARE UN CORSO DI ITALIANO A MILANO',
  comeCercareText1: 'A Milano ci sono più di 100 scuole di lingua italiana.',
  comeCercareText2: 'Ecco le domande che devi porti per trovare la scuola giusta per te:',
  // images
  imgLivello: {
    src: italiano_livello,
    text: 'QUALE LIVELLO',
    hr: true,
  },
  imgTitolo: {
    src: italiano_titolo,
    text: 'QUALE TITOLO',
    hr: true,
  },
  imgScuola: {
    src: italiano_scuola,
    text: 'QUALE SCUOLA',
  },
};

// quale livello
export const qualeLivello = {
  qualeLivelloTitle: 'QUALE LIVELLO',
  qualeLivelloSubTitle: 'Capisci a che livello sei e che livello vuoi raggiungere',
  qualeLivelloButton: 'LIVELLI CEFR',
};

// quale titolo
export const qualeTitolo = {
  qualeTitoloTitle: 'QUALE TITOLO',
  qualeTitoloSubTitle: 'CAPISCI SE HAI BISOGNO DI UN’ATTESTAZIONE O UNA CERTIFICAZIONE',
  qualeTitoloTextTop: [
    {
      text: 'La',
      bold: false,
      block: false,
    },
    {
      text: 'certificazione',
      bold: true,
      block: false,
    },
    {
      text: 'di italiano è un documento che "certifica" il livello di conoscenza della lingua italiana ed è ufficialmente riconosciuto a livello internazionale.',
      bold: false,
      block: false,
    },
    {
      text: 'Le certificazioni possono essere: CILS, PLIDA, CELI, CERT.IT L2. Possono essere rilasciate dai Centri Certificatori (situati all’interno di Scuole Pubbliche e alcune Scuole del Terzo Settore).  Avere una certificazione è utile per soddisfare le normative riguardanti l’ottenimento di documenti che necessitano della dimostrazione di livelli minimi di conoscenza della lingua italiana.',
      bold: false,
      block: true,
    },
  ],
  qualeTitoloTextTopList: [
    {
      text: 'Molte scuole rilasciano',
      bold: false,
    },
    {
      text: 'attestazioni di frequenza:',
      bold: true,
    },
    {
      text: 'le Scuole del Comune rilasciano attestazioni del tuo livello di conoscenza, ma solo le attestazioni di livello rilasciate dai Centri Provinciali Istruzione Adulti (CPIA), per via dell’Accordo Quadro tra il Ministero dell’Interno e il MIUR, permettono di:',
      bold: false,
    },
  ],
  qualeTitoloList: [
    'Soddisfare i requisiti previsti dall’Accordo Integrazione (livello A2)',
    'Richiedere il permesso CE per soggiornanti di lungo periodo (livello A2)',
    'Richiedere la cittadinanza (livello B1)',
  ],
  qualeTitoloLink: {
    value: 'Scopri di più',
    to: 'https://www.interno.gov.it/it/temi/immigrazione-e-asilo/modalita-dingresso/test-conoscenza-lingua-italiana',
  },
  qualeTitoloButton1: 'CERTIFICAZIONE',
  qualeTitoloButton2: 'ATTESTAZIONE',
};

// quale scuola
export const qualeScuola = {
  qualeScuolaTitle: 'QUALE SCUOLA',
  qualeScuolaSubTitle: 'trova la scuola più vicina a casa tua',
  qualeScuolaText: 'Se cerchi una scuola il più possibile vicino a casa tua, quando sei nella pagina dedicata ai corsi di italiano inserisci il tuo indirizzo nella colonna “Personalizza la tua richiesta”. In questo modo visualizzerai solo le scuole presenti nel tuo municipio.',
  qualeScuolaButton: 'CERCA UN CORSO DI ITALIANO',
};

// Corsi
export const corsiTitle = 'I CORSI DI ITALIANO A MILANO';

// domande frequenti
export const domandeFrequenti = {
  domandeFrequentiTitle: 'DOMANDE FREQUENTI',
  domandeFrequentiArr: [
    {
      title: 'ESISTONO CORSI PER GENITORI CON FIGLIE E FIGLI PICCOLI?',
      value: 'Se sei un genitore con figlie o figli piccoli, in età prescolare e non inseriti presso nidi o scuole materne, guarda le scuole che offrono corsi con servizio di baby-sitting. Puoi applicare questo filtro nella colonna "Personalizza la tua richiesta" della pagina dedicata ai corsi di italiano.',
    },
  ],
  domandeFrequentiButton: 'VOGLIO SAPERE DI PIù SUL SERVIZIO',
};

export const textBottomTable = [
  {
    text: 'Consulta la',
  },
  {
    text: 'tabella',
    link: LEFT_ANCHORS.tabella,
  },
  {
    text: 'in fondo alla pagina per capire quale livello potrai raggiungere con ognuno dei diversi enti.',
  },
];

export const stepList = [
  {
    title: 'QUALE LIVELLO',
    img: comeCercare.imgLivello.src,
    tag: LEFT_ANCHORS.qualeLivello,
  },
  {
    title: 'QUALE TITOLO',
    img: comeCercare.imgTitolo.src,
    tag: LEFT_ANCHORS.qualeTitolo,
  },
  {
    title: 'QUALE SCUOLA',
    img: comeCercare.imgScuola.src,
    tag: LEFT_ANCHORS.qualeScuola,
  },
];
