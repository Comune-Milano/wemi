import { PAGE_HOME_URL, PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE, PAGE_EDUCAZIONE_FINANZIARIA } from 'types/url';

export const breadcrumbPath = Object.freeze([
  {
    slash: 'Home',
    url: PAGE_HOME_URL,
  },
  {
    slash: 'WeMi Educazione Finanziaria',
    url: PAGE_EDUCAZIONE_FINANZIARIA,
  },
  {
    slash: 'PROTEZIONE',
    url: PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE,
  },
]);