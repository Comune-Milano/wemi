/** @format */
import NavbarTranslations from './NavbarTranslations';
import MessageTranslations from './MessageTranslations';
import PageTranslations from './PageTranslations';
import SwitchLocaleTranslations from './SwitchLocaleTranslations';
import SearchboxTranslations from './SearchboxTranslations';
import FooterTranslations from './FooterTranslations';
import HomeCarouselTranslations from './HomeCarouselTranslations';
import SearchFiltersTranslations from './SearchFiltersTranslations';
import SearchPageTranslations from './SearchPageTranslations';
import RequestServiceTranslations from './RequestServiceTranslations';
import ServiziTranslations from './ServiziTranslations';
import SpacesTranslations from './SpacesTranslations';
import RequestsIndexTranslations from './RequestsIndexTranslations';
import SharingTranslations from './SharingTranslations';
import IntroTranslations from './IntroTranslations';
import HelpTranslations from './HelpTranslations';
import CounterTranslations from './CounterTranslations';
import CategoriaServiziTranslations from './CategoriaServiziTranslations';
import HandleOrderTranslations from './HandleOrderTranslations';
import OrderSummaryTranslations from './OrderSummaryTranslations';
import EntChatTranslations from './EntChatTranslation';
import CarrelloTranslations from './CarrelloTranslations';


const translations = {
  en: {
    ...NavbarTranslations.en,
    ...MessageTranslations.en,
    ...PageTranslations.en,
    ...SwitchLocaleTranslations.en,
    ...SearchboxTranslations.en,
    ...FooterTranslations.en,
    ...HomeCarouselTranslations.en,
    ...SearchFiltersTranslations.en,
    ...SearchPageTranslations.en,
    ...RequestServiceTranslations.en,
    ...ServiziTranslations.en,
    ...SpacesTranslations.en,
    ...SharingTranslations.en,
    ...IntroTranslations.en,
    ...HelpTranslations.en,
    ...CounterTranslations.en,
    ...CategoriaServiziTranslations.en,
    ...RequestsIndexTranslations.en,
    ...HandleOrderTranslations.en,
    ...OrderSummaryTranslations.en,
    ...EntChatTranslations.en,
    ...CarrelloTranslations.en,
    'Breadcrumb.page': 'You are in:',
    'noresult': 'No Result'
  },
  it: {
    ...NavbarTranslations.it,
    ...MessageTranslations.it,
    ...PageTranslations.it,
    ...SwitchLocaleTranslations.it,
    ...SearchboxTranslations.it,
    ...FooterTranslations.it,
    ...HomeCarouselTranslations.it,
    ...SearchFiltersTranslations.it,
    ...SearchPageTranslations.it,
    ...RequestServiceTranslations.it,
    ...ServiziTranslations.it,
    ...SpacesTranslations.it,
    ...SharingTranslations.it,
    ...IntroTranslations.it,
    ...HelpTranslations.it,
    ...CounterTranslations.it,
    ...CategoriaServiziTranslations.it,
    ...RequestsIndexTranslations.it,
    ...HandleOrderTranslations.it,
    ...OrderSummaryTranslations.it,
    ...EntChatTranslations.it,
    ...CarrelloTranslations.it,

    'Breadcrumb.page': 'Ti trovi in:',
    'noresult': 'Nessun Risultato'
  },
};

export const valuesTranslations = Object.keys(translations);

export const DEFAULT_LOCALE = 'it';

export default translations;
