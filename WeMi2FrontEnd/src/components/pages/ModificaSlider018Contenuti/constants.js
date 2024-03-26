import { generatePath } from 'react-router';
import { PAGE_ADMIN_CNT_01_URL, PAGE_CONTENUTO_SLIDER_0_18 } from 'types/url';

export const breadcrumb = (idOperator, title = '') => [
  {
    slash: 'Home',
    url: '',
  },
  {
    slash: 'Area personale',
    url: 'areaPersonale',
  },
  {
    slash: 'Gestione Contenuti',
    url: generatePath(PAGE_ADMIN_CNT_01_URL, { idOp: idOperator }),
  },
  {
    slash: 'Gestione Slider HomePage 0-18',
    url: PAGE_CONTENUTO_SLIDER_0_18,
  },
  {
    slash: `MODIFICA CONTENUTO ${title ? `"${title}"` : '...'}`,
    url: '',
  },
];
