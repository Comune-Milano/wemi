import { generatePath } from 'react-router';
import { PAGE_ADMIN_CNT_01_URL, PAGE_CONTENT_SECTION_LIST, PAGE_CONTENT_SECTION_NEW } from 'types/url';

export const breadcrumb = (idOperator) => [
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
    slash: 'Gestione Sezioni',
    url: PAGE_CONTENT_SECTION_LIST,
  },
  {
    slash: 'INSERISCI NUOVO IN GESTIONE SEZIONI',
    url: PAGE_CONTENT_SECTION_NEW,
  },
];
