import imgRicongiungimento from 'images2/inclusione/Ricongiungimento.png';
import imgRicongiungimentoSapereDiPiu from 'images2/inclusione/Ricongiungimento_saperedipiù.png';
import { PAGE_RICONGIUNGIMENTO_COME_FUNZIONA, PAGE_RICONGIUNGIMENTO_PARENTE } from 'types/url';


export const title = 'RICONGIUNGIMENTO\nFAMILIARE';
export const categories = [
  {
    link: PAGE_RICONGIUNGIMENTO_COME_FUNZIONA,
    image: imgRicongiungimentoSapereDiPiu,
    title: 'VOGLIO SAPERE\nDI PIù SUL SERVIZIO',
  },
  {
    link: PAGE_RICONGIUNGIMENTO_PARENTE,
    image: imgRicongiungimento,
    title: 'VOGLIO RICONGIUNGERMI\nCON UN PARENTE',
  },
];
