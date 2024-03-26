import { generatePath } from 'react-router';
import { PAGE_ADMIN_CNT_01_URL, PAGE_CONTENT_AREA_LIST, PAGE_CONTENT_AREA_NEW } from 'types/url';

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
    slash: 'Gestione Aree dei Servizi (Categorie Livello 1)',
    url: PAGE_CONTENT_AREA_LIST,
  },
  {
    slash: 'INSERISCI NUOVO IN GESTIONE AREE (CATEGORIE LIVELLO 1)',
    url: PAGE_CONTENT_AREA_NEW,
  },
];
