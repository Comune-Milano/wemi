import AssistenzaGiuridica from 'images2/home-inclusione/Assistenza Giuridica.png';
import ConsulenzaSocialeGiuridica from 'images2/inclusione/consulenzasaperedipiu.png';
import { PAGE_CONSULENZA_HO_BISOGNO_DI_CONSULENZA, PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_SERVIZIO } from 'types/url';

export const title = 'CONSULENZA SOCIALE\nE GIURIDICA';
export const categories = [
  {
    link: PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_SERVIZIO,
    image: ConsulenzaSocialeGiuridica,
    title: 'VOGLIO SAPERE\nDI PIù SUL SERVIZIO',
  },
  {
    link: PAGE_CONSULENZA_HO_BISOGNO_DI_CONSULENZA,
    image: AssistenzaGiuridica,
    title: 'HO BISOGNO\nDI CONSULENZA',
  },
];
