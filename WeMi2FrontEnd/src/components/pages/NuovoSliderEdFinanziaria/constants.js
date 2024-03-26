import { generatePath } from 'react-router';
import { PAGE_ADMIN_CNT_01_URL, PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST } from 'types/url';

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
    slash: 'Gestione Slider Educazione Finanziaria',
    url: PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST,
  },
  {
    slash: 'INSERISCI NUOVO IN GESTIONE SLIDER EDUCAZIONE FINANZIARIA',
    url: '',
  },
];
