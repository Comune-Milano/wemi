import { moneyFormat } from 'utils/formatters/moneyFormat';

export const ipotesiRows = (simulatore) => [
  {
    title: 'tariffa oraria',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.tariffaOraria, true),
  },
  {
    title: 'tariffa mensile',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat( simulatore.tariffaMensile, true) ,
  },
  {
    title: 'superminimo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.superminimo, true),
  },
  {
    title: 'indennità vitto e alloggio (valore convenzionale)',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.indennitaConvenzionale,true),
  },
  {
    title: 'retribuzione media mensile',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.retribuzioneMediaMensile,true),
  },
  {
    title: 'riposi',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: simulatore.riposi,
  },
  {
    title: 'ferie',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: simulatore.ferie,
  },
];

export const prospettoRows = (simulatore) => [
  {
    title: 'prospetto di spesa annuale',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.prospettoSpesaAnnuale, true)
  },
  {
    title: 'stipendio netto annuale',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.stipendioNettoAnnuale, true)
  },
  {
    title: 'indennità di vitto e alloggio su ferie',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.indennitaFerie, true)
  },
  {
    title: 'contributi',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.contributi, true)
  },
  {
    title: 'contributi a carico del datore di lavoro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.contributiDatoreLavoro, true)
  },
  {
    title: 'cassa colf a carico del datore di lavoro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.cassaDatore, true)
  },
  {
    title: 'cassa colf a carico del lavoratore',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.cassaLavoratore, true)
  },
  {
    title: 'tredicesima mensilità',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.tredicesima, true)
  },
  {
    title: 'T.F.R',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    detail: moneyFormat(simulatore.tfr, true)
  },
];
