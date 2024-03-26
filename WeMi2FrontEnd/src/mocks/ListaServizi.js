/** @format */

import tate from '../images/homepage/servizi/tate.png';
import estetica from '../images/homepage/servizi/estetica.png';
import famiglia from '../images/homepage/servizi/famiglia.png';
import psicoterapia from '../images/homepage/servizi/psicoterapia.png';
import assistenzasanitaria2 from '../images/homepage/servizi/assistenza-sanitaria-2.png';
import assistenzasanitaria1 from '../images/homepage/servizi/assistenza-sanitaria-1.png';
import stranieri from '../images/homepage/servizi/stranieri.png';

export const ListaServizi = {
  TitoloServizi: { weight: 'light', label: 'Scopri i ' },
  TitoloBoldServizi: { weight: 'bold', label: 'servizi' },
  SottotitoloServizi: { weight: 'light', label: 'Clicca sulla categoria di tuo interesse per scoprire con semplicità tutti i servizi.' },
  arrTabs: [
    { key: 'A', label: 'Servizi.Tab' },
    { key: 'B', label: 'Servizi.Tab1' },
    { key: 'C', label: 'Servizi.Tab2' },
    { key: 'D', label: 'Servizi.Tab3' },
    { key: 'E', label: 'Servizi.Tab4' },
  ],
  arrServizi: [
    {
      title: 'Tate, Badanti e Colf',
      imgSrc: tate,
      classes: ['A', 'B', 'D', 'E'],
      key: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/it/MenuTCB',
      button: 'Servizi.Button',
    },
    {
      title: 'Valorizzazione estetica',
      imgSrc: estetica,
      classes: ['A', 'C'],
      key: 2005,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/it/c/:idCategory',
      button: 'Servizi.Button1',
    },
    {
      title: 'Ricongiung. famigliare',
      imgSrc: famiglia,
      classes: ['A', 'B'],
      key: '3',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/it/FunzionalitaDiRicerca',
      button: 'Servizi.Button2',
    },
    {
      title: 'Servizio psicologico',
      imgSrc: psicoterapia,
      classes: ['A', 'C'],
      key: '4',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/it/All_Eri',
      button: 'Servizi.Button3',
    },
    {
      title: 'Assistenza socio sanitaria',
      imgSrc: assistenzasanitaria2,
      classes: ['A', 'C'],
      key: '5',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: 'componentsWeMI/ricerca2livello',
      button: 'Servizi.Button4',
    },
    {
      title: 'Assistenza sanitaria',
      imgSrc: assistenzasanitaria1,
      classes: ['A', 'C'],
      key: '6',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: 'componentsWeMI/ricerca2livello',
      button: 'Servizi.Button5',
    },
    {
      title: 'Servizio per stranieri',
      imgSrc: stranieri,
      classes: ['A', 'C'],
      key: '7',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: 'componentsWeMI/ricerca2livello',
      button: 'Servizi.Button6',
    },
  ],
};
