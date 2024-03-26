import { generatePath } from 'react-router';
import { PAGE_ADMIN_CNT_01_URL, PAGE_CONTENT_SERVICE_LIST, PAGE_CONTENT_SERVICE_NEW } from 'types/url';

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
    slash: 'Gestione Servizi',
    url: PAGE_CONTENT_SERVICE_LIST,
  },
  {
    slash: 'INSERISCI NUOVO IN GESTIONE SERVIZI',
    url: PAGE_CONTENT_SERVICE_NEW,
  },
];
