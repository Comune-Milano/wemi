import linkBlu from 'images2/Icons/link-blu.svg';
import linkViola from 'images2/Icons/link-viola.svg';
import { PAGE_INCLUSIONE_APPRENDIMENTO_ITALIANO, PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA } from 'types/url';

export const cosaOffre = {
  title: 'COSA OFFRE',
  text: [
    {
      subTitle: 'INFORMAZIONI E ORIENTAMENTO',
      text: 'Per conoscere meglio la procedura di ricongiungimento familiare in tutte le sue fasi.',
    },
    {
      subTitle: 'CONSULENZA SPECIALISTICA',
      text: 'Per avere un supporto specialistico nel disbrigo degli adempimenti burocratici previsti dalla procedura di ricongiungimento familiare.',
    },
    {
      subTitle: 'DOMANDA DI NULLA OSTA',
      text: 'Per avere assistenza nell\'inoltro, tramite procedura telematica della domanda di nulla osta al ricongiungimento indirizzata allo Sportello Unico per l\'Immigrazione della Prefettura.',
    },
    {
      subTitle: 'SUPPORTO SOCIALE E PSICOLOGICO',
      text: 'Per avere un supporto nel gestire i cambiamenti che si affrontano nelle relazioni famigliari nelle diverse fasi del percorso di Ricongiungimento Familiare.',
    },
    {
      subTitle: 'SERVIZI DI INCLUSIONE PERSONALIZZATI PER I FAMILIARI NEO ARRIVATI',
      text: 'Per avere informazioni e orientamento a tutti i servizi della città che possono favorire l\'integrazione in città (anagrafe, servizi socio-sanitari, educativi, ricreativi, culturali e sportivi e molto altro).',
    },
    {
      subTitle: 'MEDIAZIONE LINGUISTICO-CULTURALE',
      text: 'Per favorire la comprensione e la comunicazione con servizi pubblici e privati attraverso la mediazione linguistica e culturale di operatori specializzati.',
    },
    {
      subTitle: 'GRUPPI DI AUTO-AIUTO',
      text: 'Per condividere la propria esperienza con altre persone che stanno vivendo o hanno vissuto l\'esperienza del Ricongiungimento familiare.',
    },
    {
      subTitle: 'OSSERVATORIO SUL FENOMENO DEL RICONGIUNGIMENTO FAMILIARE',
      text: 'Per avere i dati aggiornati sul fenomeno del Ricongiungimento familiare a Milano.',
    },
  ],
};

export const cosaOffreIcon = [
  {
    subTitle: 'ORIENTAMENTO SCOLASTICO ED EXTRASCOLASTICO',
    text: 'Per ricevere informazioni e orientamento alla scuola in particolare per ragazzi di età compresa tra i 14 e i 21 arrivati in Italia da non più di 3 anni.',
    color: 'purple',
    img: linkViola,
    link: PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA,
  },
  {
    subTitle: 'APPRENDIMENTO DELLA LINGUA ITALIANA  ',
    text: 'Per ricevere un informazione e orientamento sui corsi per l\'apprendimento della lingua italiana offerti da istituzioni, scuola e associazioni.',
    color: 'blue',
    img: linkBlu,
    link: PAGE_INCLUSIONE_APPRENDIMENTO_ITALIANO,
  },
];

export const aChiERivolto = {
  title: 'A CHI è RIVOLTO',
  text: [
    {
      subTitle: 'AI CITTADINI',
      text: 'A tutti i cittadini e le cittadine interessati al/dal ricongiungimento familiare, residenti nella città metropolitana di Milano.',
    },
    {
      subTitle: 'AI SERVIZI',
      text: 'A tutti i servizi della città che necessitano di una consulenza specialistica sul tema del ricongiungimento familiare.',
    },
  ],
};

export const conChiCollaboraList = [
  "Sportello unico per l'immigrazione della Prefettura - Ufficio Territoriale del Governo",
  'Ufficio Scolastico Territoriale e Istruzioni Scolastiche di ogni ordine e grado',
  'ATS',
  'Rappresentanze Consolari',
  'Rete dei Servizi Sociali',
  'Enti del Terzo Settore e rete territoriale dei Servizi Sociali',
];

export const orariSettimanali = [
  {
    dayName: 'Lunedì',
    value: {
      from: '8',
      to: '18',
    },
  },
  {
    dayName: 'Martedì',
    value: {
      from: '8',
      to: '18',
    },
  },
  {
    dayName: 'Mercoledì',
    value: {
      from: '8',
      to: '18',
    },
  },
  {
    dayName: 'Giovedì',
    value: {
      from: '8',
      to: '18',
    },
  },
  {
    dayName: 'Venerdì',
    value: {
      from: '8',
      to: '18',
    },
  },
  {
    dayName: 'Sabato',
    value: {
      from: '8',
      to: '18',
    },
  },
];
