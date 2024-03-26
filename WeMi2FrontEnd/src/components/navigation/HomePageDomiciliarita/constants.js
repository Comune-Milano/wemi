import Img1 from 'images2/comefunziona-domiciliarita/Come-funziona-domiciliarità_1.png';
import Img2 from 'images2/comefunziona-domiciliarita/Come-funziona-domiciliarità_2.png';
import Img3 from 'images2/comefunziona-domiciliarita/Come-funziona-domiciliarità_3.png';
import Img4 from 'images2/comefunziona-domiciliarita/Come-funziona-domiciliarità_4.png';
import Img5 from 'images2/comefunziona-domiciliarita/Come-funziona-domiciliarità_5.png';

export const CHANGE_SERVICES_AREA = 'CHANGE_SERVICES_AREA';

export const imageTitle = 'CONSULTA IL CATALOGO\r\nE SCEGLI IL SERVIZIO CHE FA PER TE!';

export const imageDescription = `
Scopri tutti i servizi offerti da associazioni, cooperative e 
imprese sociali qualificate dal Comune di Milano: per la
cura e il benessere di adulti, anziani e bambini, per la 
gestione della casa e per tanto altro ancora.
`;

export const stepList = Object.freeze([
  {
    title: 'categorie',
    img: Img1,
    textbold: 'Seleziona la categoria di servizi ',
    text2: 'di tuo interesse',
    padding: {
      md: '0 1.5em 0 1.5em',
    },
    maxWidth: {
      xs: '11.67rem',
      md: '9rem',
      lg: '10.93rem',
    },
  },
  {
    title: 'servizi',
    img: Img2,
    textbold: 'Scegli il servizio e personalizzalo ',
    text2: 'attraverso i filtri a disposizione',
    padding: {
      md: '0 1.5em 0 1.5em',
    },
    maxWidth: {
      xs: '11.67rem',
      md: '9rem',
      lg: '10.93rem',
    },
  },
  {
    title: 'richieste',
    img: Img3,
    text1: 'Seleziona il servizio di uno o più enti e ',
    textbold: 'invia la richiesta ',
    text2: 'accedendo tramite SPID',
    padding: {
      md: '0 1.5em 0 1.5em',
    },
    maxWidth: {
      xs: '11.67rem',
      md: '9rem',
      lg: '10.93rem',
    },
  },
  {
    title: 'acquisti',
    img: Img4,
    text1: 'Attendi la risposta da parte degli enti selezionati e ',
    textbold: 'acquista il servizio direttamente online',
    padding: {
      md: '0 1.5em 0 1.5em',
    },
    maxWidth: {
      xs: '11.67rem',
      md: '9rem',
      lg: '10.93rem',
    },
  },
  {
    title: 'recensioni',
    img: Img5,
    textbold: 'Esprimi il tuo livello di gradimento ',
    text2: 'sul servizio che hai utilizzato',
    maxWidth: {
      xs: '11.67rem',
      md: '9rem',
      lg: '10.93rem',
    },
  },
]);

export const HOME_DOMICILIARITA_ANCHORS = Object.freeze({
  comeFunziona: 'come-funziona',
  scopriServiziDom: 'scopri-i-servizi-dom',
  scopriServizi018: 'scopri-i-servizi-018',
});
