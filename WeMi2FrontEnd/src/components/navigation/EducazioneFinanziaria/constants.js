import budgeting from 'images2/educazione-finanziaria/educazione-finanziaria_budget.png';
import debiti from 'images2/educazione-finanziaria/educazione-finanziaria_debiti.png';
import investimento from 'images2/educazione-finanziaria/educazione-finanziaria_investimento.png';
import pensione from 'images2/educazione-finanziaria/educazione-finanziaria_pensione.png';
import protezione from 'images2/educazione-finanziaria/educazione-finanziaria_protezione.png';
import { PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING, PAGE_EDUCAZIONE_FINANZIARIA_DEBITI, PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO, PAGE_EDUCAZIONE_FINANZIARIA_PENSIONE, PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE } from 'types/url';

export const serviceContents = [
  {
    title: 'BUDGETING',
    description: 'Controllare le entrate e le uscite per migliorare le proprie abitudini di spesa',
    image: budgeting,
    link: PAGE_EDUCAZIONE_FINANZIARIA_BUDGETING,
  },
  {
    title: 'DEBITI',
    description: 'Sostenere i debiti per poter pagare rate e affitti senza preoccupazioni',
    image: debiti,
    link: PAGE_EDUCAZIONE_FINANZIARIA_DEBITI,
  },
  {
    title: 'PROTEZIONE',
    description: 'Proteggersi dagli imprevisti preparandosi a gestire necessità improvvise',
    image: protezione,
    link: PAGE_EDUCAZIONE_FINANZIARIA_PROTEZIONE,
  },
  {
    title: 'PENSIONE',
    description: 'Preparare la vita in pensione per poter vivere una vecchiaia senza preoccupazioni',
    image: pensione,
    link: PAGE_EDUCAZIONE_FINANZIARIA_PENSIONE,
  },
  {
    title: 'INVESTIMENTO',
    description: 'Raggiungere obiettivi futuri importanti per sé e per i propri cari',
    image: investimento,
    link: PAGE_EDUCAZIONE_FINANZIARIA_INVESTIMENTO,
  },
];

export const contactInfo = Object.freeze({
  number: '020202 - tasto 4.1.3',
  linkRichiesta: '',
  link: '',
});

export const pathIncontroIndividuale = '';
export const pathIncontroPubblico = '';
