import MansioniTate from 'components/pages/RichiestaServizioTCB/partials/tabs/MansioniTate';
import MansioniBadanti from 'components/pages/RichiestaServizioTCB/partials/tabs/MansioniBadanti';
import MansioniColf from 'components/pages/RichiestaServizioTCB/partials/tabs/MansioniColf';

import Stepper1 from 'components/pages/RichiestaServizioTCB/partials/Stepper1';

export const RichiestaServizioTate = {
  color: {
    coloractive: 'primary',
    bgcoloractive: 'primary',
    color: 'darkGrey',
  },

  tab: [
    { title: 'Step 1', component: Stepper1 },
    { title: 'Step 2', component: Stepper1 },
    { title: 'Step 3', component: Stepper1 },
    { title: 'Step 4', component: Stepper1 },
  ],

  tabStepper: [{ title: 'Mansioni Tate', component: MansioniTate }],

  dati: [
    { titoloServizio: 'Richiesta servizio', weight: 'light' },
    { titolo: 'Tate', weight: 'bold', color: 'primary' },
  ],

  stepper1: [
    {
      titoloLabel: 'Mansioni richieste',
      testoLabel: 'Scegli uno o più servizi e per gli stessi indica quali mansioni stai ricercando',
      durataLabel: 'Durata',
      convivenzaLabel: 'Convivenza',
    },
  ],
};

export const RichiestaServizioBadanti = {
  color: {
    coloractive: 'primary',
    bgcoloractive: 'primary',
    color: 'darkGrey',
  },

  tab: [
    { title: 'Step 1', component: Stepper1 },
    { title: 'Step 2', component: Stepper1 },
    { title: 'Step 3', component: Stepper1 },
    { title: 'Step 4', component: Stepper1 },
  ],

  tabStepper: [{ title: 'Mansioni Badanti', component: MansioniBadanti }],

  dati: [
    { titoloServizio: 'Richiesta servizio', weight: 'light' },
    { titolo: 'Badanti', weight: 'bold', color: 'primary' },
  ],
  stepper1: [
    {
      titoloLabel: 'Mansioni richieste',
      testoLabel: 'Scegli uno o più servizi e per gli stessi indica quali mansioni stai ricercando',
      durataLabel: 'Durata',
      convivenzaLabel: 'Convivenza',
    },
  ],
};

export const RichiestaServizioColf = {
  color: {
    coloractive: 'primary',
    bgcoloractive: 'primary',
    color: 'darkGrey',
  },

  tab: [
    { title: 'Step 1', component: Stepper1 },
    { title: 'Step 2', component: Stepper1 },
    { title: 'Step 3', component: Stepper1 },
    { title: 'Step 4', component: Stepper1 },
  ],

  tabStepper: [{ title: 'Mansioni Colf', component: MansioniColf }],

  dati: [
    { titoloServizio: 'Richiesta servizio', weight: 'light' },
    { titolo: 'Colf', weight: 'bold', color: 'primary' },
  ],
  stepper1: [
    {
      titoloLabel: 'Mansioni richieste',
      testoLabel: 'Scegli uno o più servizi e per gli stessi indica quali mansioni stai ricercando',
      durataLabel: 'Durata',
      convivenzaLabel: 'Convivenza',
    },
  ],
};

export const elementTabs = {
  placeholder: ['Servizio da', 'Servizio a', 'Servizio bo'],
};

export const rightSectionJson = {
  titlePage: 'Quanto ti costa? ',
  sottotitolo: 'Il prezzo per il servizio configurato è indicativamente di:',

  card: [
    {
      title: 'Assunzione diretta',
      prezzo: '€ 15,00',
      bottone: 'Scelgo questo',
      icon: '\f105',
    },
    {
      title: 'Assunzione diretta',
      prezzo: '€ 15,00',
      bottone: 'Scelgo questo',
      icon: '\f105',
    },
    {
      title: 'Assunzione diretta',
      prezzo: '€ 15,00',
      bottone: 'Scelgo questo',
      icon: '\f105',
    },
  ],
};

export const tabs = {
  color: {
    coloractive: 'primary',
    bgcoloractive: 'primary',
    color: 'darkGrey',
  },

  tab: [
    { title: 'Mansioni Tate', component: MansioniTate },
    { title: 'Mansioni Badanti', component: MansioniBadanti },
    { title: 'Mansioni Colf', component: MansioniColf },
  ],
};
