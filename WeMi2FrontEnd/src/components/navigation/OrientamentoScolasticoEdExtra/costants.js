import Orientamento from 'images2/home-inclusione/Orientamento.png';
import OrientamentoSaperneDiPiu from 'images2/inclusione/Orientamento_sapernedipiù.png';
import { PAGE_ORIENTAMENTO_SCOLASTICO_COME_FUNZIONA, PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_EXTRASCOLASTICO } from 'types/url';

export const title = 'ORIENTAMENTO SCOLASTICO\nED EXTRASCOLASTICO';
export const categories = [
  {
    link: PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_EXTRASCOLASTICO,
    image: OrientamentoSaperneDiPiu,
    title: 'VOGLIO SAPERE\nDI PIù SUL SERVIZIO',
  },
  {
    link: PAGE_ORIENTAMENTO_SCOLASTICO_COME_FUNZIONA,
    image: Orientamento,
    title: 'HO BISOGNO\nDI ORIENTAMENTO',
  },
];
