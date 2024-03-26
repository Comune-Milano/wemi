import Debiti from 'images2/educazione-finanziaria/educazione-finanziaria_debiti.png';
import Budgeting from 'images2/educazione-finanziaria/educazione-finanziaria_budget.png';
import Protezione from 'images2/educazione-finanziaria/educazione-finanziaria_protezione.png';
import Investimento from 'images2/educazione-finanziaria/educazione-finanziaria_investimento.png';
import { PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING, PAGE_EDUCAZIONE_FINANZIARIA_DEBITI, PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO, PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE } from 'types/url';

export const list = Object.freeze([
  {
    title: 'BUDGETING',
    img: Budgeting,
    link: PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING,
  },
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
    title: 'INVESTIMENTO',
    img: Investimento,
    link: PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO,
  },
]);
