import Protezione from 'images2/educazione-finanziaria/educazione-finanziaria_protezione.png';
import Budgeting from 'images2/educazione-finanziaria/educazione-finanziaria_budget.png';
import Pensione from 'images2/educazione-finanziaria/educazione-finanziaria_pensione.png';
import Investimento from 'images2/educazione-finanziaria/educazione-finanziaria_investimento.png';
import { PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING, PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO, PAGE_EDUCAZIONE_FINANZIARIA_PENSIONE, PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE } from 'types/url';


export const list = Object.freeze([
  {
    title: 'BUDGETING',
    img: Budgeting,
    link: PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING,
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
