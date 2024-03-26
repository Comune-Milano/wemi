import { PAGE_INCLUSIONE_RICONGIUNGIMENTO } from 'types/url';

export const servizioSpecialistico = {
  title: 'SERVIZIO SPECIALISTICO DI CONSULENZA\nSOCIALE E GIURIDICA',
  content: 'Il servizio del Comune di Milano che offre consulenza specialistica su aspetti connessi alla condizione giuridica delle cittadine e i cittadini stranieri.',
};

export const cosaOffreCittadini = {
  title: 'COSA OFFRE AI CITTADINI',
  content: [
    {
      title: 'CONSULENZA SOCIALE SPECIALISTICA',
      value: 'Per ricevere informazione, orientamento e consulenza sociale su aspetti connessi alla propria condizione giuridica.',
    },
    {
      title: 'CONSULENZA GIURIDICA SU PERMESSI DI SOGGIORNO',
      value: 'Per ricevere informazione, orientamento e consulenza per la presentazione delle istanze di rilascio, rinnovo e conversione dei titoli di soggiorno, tramite kit postale o direttamente presso gli uffici competenti, con eventuale assistenza nella compilazione delle istanze e nella verifica dello stato di trattazione della pratica.',
    },
    {
      title: 'CONSULENZA GIURIDICA SU RICHIESTA CITTADINANZA',
      value: "Per ricevere informazione, orientamento e consulenza per la presentazione delle istanze di cittadinanza italiana, assistenza nella valutazione della documentazione e supporto all'accesso ai portali dedicati.",
    },
    {
      title: 'CONSULENZA GIURIDICA SPECIALISTICA PER FAMIGLIE CON MINORI',
      value: 'Per consulenza specialistica su tematiche connesse allo stato civile, al diritto di famiglia e alla tutela di minori.',
    },
    {
      title: 'ORIENTAMENTO SU RITORNO VOLONTARIO ASSISTITO E REINTEGRAZIONE',
      value: "Per ricevere informazioni e orientamento sulla procedura di ritorno volontario assistito e Reintegrazione che offre alle cittadine e i cittadini non comunitari l'opportunità di rientrare al proprio paese attraverso un progetto individuale comprensivo di counselling pre-partenza, assistenza logistica e finanziaria al viaggio, accompagnamento al reinserimento nel paese di origine.",
    },
  ],
  textLink: {
    title: 'CONSULENZA GIURIDICA SUl RICONGIUNGIMENTO FAMILIARE',
    valueBeforeLink: 'Per ricevere consulenza giuridica nelle diverse fasi del processo di Ricongiungimento familiare, in collaborazione con il servizio',
    valuelink: 'RICONGIUNGIMENTO FAMILIARE',
    valueAfterLink: '.',
    link: PAGE_INCLUSIONE_RICONGIUNGIMENTO,
  },
};

export const cosaOffreServizi = {
  title: 'COSA OFFRE AI SERVIZI',
  content: [
    {
      title: 'CONSULENZA SOCIALE SPECIALISTICA',
      value: "Per ricevere supporto specialistico nella gestione di interventi rivolti a cittadine e cittadini stranieri, in particolare sui temi dell'accoglienza, dell'inclusione, dell'antidiscriminazione e della tutela dei diritti.",
    },
    {
      title: "CONSULENZA GIURIDICA SUL DIRITTO DELL'IMMIGRAZIONE",
      value: "Per ricevere supporto specialistico nella gestione di interventi rivolti a cittadine e cittadini stranieri su tematiche connesse al diritto dell'immigrazione, diritto di famiglia, tutela minori, cittadinanza, stato civile.",
    },
    {
      title: 'CONSULENZA GIURIDICA SU PROTEZIONE INTERNAZIONALE',
      value: 'Per ricevere supporto specialistico nella gestione di interventi rivolti a cittadini e cittadine beneficiarie del Servizio Accoglienza e Integrazione (SAI).',
    },
    {
      title: 'ORIENTAMENTO SU RITORNO VOLONTARIO ASSISTITO E REINTEGRAZIONE',
      value: 'Per ricevere supporto specialistico nella gestione di interventi rivolti a cittadini e cittadine interessate alla procedura di ritorno volontario assistito.',
    },
  ],
};

export const aChi = {
  title: 'A chi è rivolto',
  content: [
    {
      title: 'AI CITTADINI',
      value: 'A tutti i cittadini e le cittadine presenti sul territorio milanese che necessitano di informazioni e consulenza nelle pratiche amministrative connesse al loro status di cittadini stranieri.',
    },
    {
      title: 'AI SERVIZI',
      value: 'A tutti i servizi della città (Servizi sociali e sanitari, Enti del Terzo Settore, Ospedali, ecc.) che necessitano di consulenza specialistica sulle norme che disciplinano la condizione dello straniero e i diritti connessi.',
    },
  ],
};

export const conChi = {
  title: 'con chi collabora',
  content: [
    'Prefettura di Milano (UTG, Ufficio cittadinanza, Ufficio legalizzazioni)',
    'Questura di Milano (Ufficio Immigrazione, Ufficio Minori)',
    'Rete dei Servizi Sociali Professionali Territoriali, Pronto Intervento Minori, Ufficio Tutele',
    'Ufficio Anagrafe del Comune di Milano',
    'Ufficio Stato Civile del Comune di Milano',
    'Rappresentanze Consolari',
    'Enti del Terzo Settore',
    'Sindacati',
    'Associazioni di migranti',
    'Centri di Accoglienza Straordinaria (CAS)',
    'Progetto SAI',
    'ONG operanti in paesi terzi',
    'Centro Sammartini',
  ],
  labelButton: 'ho bisogno di CONSULENZA',
};
