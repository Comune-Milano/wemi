/** @format */

export const datiScheda = {
  accordion: {
    ente: {
      title: [{ value: 0, label: 'Ente' }],
    },
    operatore: {
      title: [{ value: 0, label: 'Operatori abilitati WeMI' }],
    },
    descrizione: {
      title: [{ value: 0, label: 'Descrizione' }],
      options: [{ value: 1, label: 'Descrizione * ' }],
      tooltip: [
        { value: 0, label: " Descrizione generale dell'Ente, lunghezza massima 3500 carattari" },
      ],
    },
    logo: {
      title: [{ value: 0, label: 'Logo ed allegati' }],
    },
    indirizzoPrincipale: {
      title: [
        { value: 0, label: 'Sede Legale' },
        {
          value: 1,
          label:
            "Per sede legale si intende l’indirizzo della sede a cui intestare le fatture.",
        },
      ],
    },
    indirizzoSecondario: {
      title: [
        { value: 0, label: 'Sedi' },
        {
          value: 1,
          label:
            "Per indirizzo secondario si intende l'indirizzo di un'altra sede dell'organizzazione. Se la sede operativa indicata nell'indirizzo principale non è la sede legale indicare qui la sede legale",
        },
      ],
    },
    contattiReferente: {
      title: [{ value: 0, label: "Contatti del referente dell'ente per il portale wemi" }],
      tooltip: [
        { value: 0, label: " Inserire il nominativo del referente dell'ente per il portale wemi" },
        {
          value: 1,
          label:
            " Inserire il numero di telefono a cui è reperibile il referente dell'ente per il portale wemi",
        },
        {
          value: 2,
          label:
            "Inserire il numero di telefono secondario a cui è reperibile il referente dell'ente per il portale wemi",
        },
        {
          value: 3,
          label: ' Inserire la mail a cui a cui inviare le comunicazioni relative al portale wemi',
        },
        {
          value: 4,
          label:
            ' Inserire la mail secondaria a cui a cui inviare le comunicazioni relative al portale wemi',
        },
        {
          value: 5,
          label:
            " Inserire il sito web a cui fa riferimento il referente dell'ente per il portale wemi",
        },
        {
          value: 6,
          label:
            " Inserire l'indirizzo Facebook a cui fa riferimento il referente dell'ente per il portale wemi",
        },
        {
          value: 7,
          label:
            " Inserire il contatto Instagram a cui fa riferimento il referente dell'ente per il portale wemi",
        },
        {
          value: 8,
          label:
            " Inserire il contatto Twitter a cui fa riferimento il referente dell'ente per il portale wemi",
        },
      ],
    },
    primoContatto: {
      title: [
        { value: 0, label: 'Reperibilità per cittadini *' },
        {
          value: 1,
          label:
            'Inserire il principale contatto che i cittadini potranno utilizzare per chiedere informazioni generali sui servizi.',
        },
        {
          value: 2,
          label:
            "I dati qui inseriti appariranno sulla scheda dell'ente e saranno ripresi in ogni scheda servizio.",
        },
      ],
      tooltip: [
        { value: 0, label: 'Inserire il contatto telefonico del centralino o di un referente' },
        { value: 1, label: 'Inserire il contatto mail del centralino o di un referente' },
      ],
    },

    altro: {
      title: [{ value: 0, label: 'Altro' }],
      options: [
        { value: 0, label: "L'Ente è disponibile a offrire servizi di welfare aziendale?" },
        { value: 1, label: "L'Ente è disponibile ad accogliere volontari?" },
      ],
    },
    pubblica: {
      title: [{ value: 0, label: 'Pubblica' }],
      options: [{ value: 0, label: 'Vuoi pubblicare la scheda?' }],
    },
  },

  boolean: {
    options: [{ value: 0, label: '-' }, { value: 1, label: 'Si' }, { value: 2, label: 'No' }],
  },
};
