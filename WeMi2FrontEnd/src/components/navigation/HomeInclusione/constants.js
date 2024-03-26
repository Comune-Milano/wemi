import Ricongiungimento from 'images2/home-inclusione/Ricongiungimento.png';
import Orientamento from 'images2/home-inclusione/Orientamento.png';
import Corsi from 'images2/home-inclusione/Corsi.png';
import AssistenzaGiuridica from 'images2/home-inclusione/Assistenza Giuridica.png';
import { PAGE_CONSULENZA_SOCIALE_GIURIDICA, PAGE_INCLUSIONE_APPRENDIMENTO_ITALIANO, PAGE_INCLUSIONE_RICONGIUNGIMENTO, PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA } from 'types/url';


export const HEADER = {
  title: "I SERVIZI PER L'INCLUSIONE\nDEL COMUNE DI MILANO",
  description: 'WeMi inclusione è il centro servizi del Comune di Milano che offre informazioni, orientamento e servizi specialistici dedicati ai cittadini e alle cittadine provenienti da diversi Paesi del mondo che hanno scelto di vivere a Milano',
};

export const Cards = [
  {
    title: 'RICONGIUNGIMENTO \n FAMILIARE',
    description: 'Per supportare i cittadini e le cittadine \n neo-arrivati e coloro che vogliono \n ricongiungere a Milano i loro familiari.',
    image: Ricongiungimento,
    link: PAGE_INCLUSIONE_RICONGIUNGIMENTO,
  },
  {
    title: 'ORIENTAMENTO SCOLASTICO \n ED EXTRASCOLASTICO',
    description: 'Per orientare i ragazzi e le ragazze \n alla scelta del percorso scolastico e delle \n attività formative e del tempo libero.',
    image: Orientamento,
    link: PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA,
  },
  {
    title: 'APPRENDIMENTO \n DELLA LINGUA ITALIANA',
    description: 'Per informare sui corsi di italiano L2 \n presenti in città e orientare \n alla scelta del percorso più adatto.',
    image: Corsi,
    link: PAGE_INCLUSIONE_APPRENDIMENTO_ITALIANO,
  },
  {
    title: 'CONSULENZA SOCIALE \n E GIURIDICA',
    description: 'Per costruire percorsi di inclusione\ndelle persone centrati sulla promozione dei diritti.',
    image: AssistenzaGiuridica,
    link: PAGE_CONSULENZA_SOCIALE_GIURIDICA,
  },
];
