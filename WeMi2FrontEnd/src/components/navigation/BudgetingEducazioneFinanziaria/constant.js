import Debiti from 'images2/educazione-finanziaria/educazione-finanziaria_debiti.png';
import Protezione from 'images2/educazione-finanziaria/educazione-finanziaria_protezione.png';
import Pensione from 'images2/educazione-finanziaria/educazione-finanziaria_pensione.png';
import Investimento from 'images2/educazione-finanziaria/educazione-finanziaria_investimento.png';
import { PAGE_EDUCAZIONE_FINANZIARIA_DEBITI, PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO, PAGE_EDUCAZIONE_FINANZIARIA_PENSIONE, PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE } from 'types/url';

export const list = Object.freeze([
  {
    title: 'DEBITI',
    img: Debiti,
    link: PAGE_EDUCAZIONE_FINANZIARIA_DEBITI,
  },
  {
    title: 'PROTEZIONE',
    img: Protezione,
    link: PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE,
  },
  {
    title: 'PENSIONE',
    img: Pensione,
    link: PAGE_EDUCAZIONE_FINANZIARIA_PENSIONE,
  },
  {
    title: 'INVESTIMENTO',
    img: Investimento,
    link: PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO,
  },
]);
