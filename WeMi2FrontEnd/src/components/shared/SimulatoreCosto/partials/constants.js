import { moneyFormat } from 'utils/formatters/moneyFormat';
import * as tipologiaOrarioCostanti from 'types/tipologiaOrario';

export const ipotesiRows = (simulatore, tipologiaOrario, isMinoreDiSeiAnni, isPiuDiUnaPersonaNonAutosufficiente) => [
  ...(simulatore.stipendioMensileProposto ? [{
    title: 'stipendio mensile proposto',
    description: 'Retribuzione da corrispondere mensilmente',
    detail: moneyFormat(simulatore.stipendioMensileProposto, true),
  }] : []),
  ...(simulatore.pagaOrariaProposta ? [{
    title: 'paga oraria proposta',
    description: 'Retribuzione da corrispondere per ogni ora di lavoro',
    detail: moneyFormat(simulatore.pagaOrariaProposta, true),
  }] : []),
  {
    title: 'minimo contrattuale',
    description: `Quota ${tipologiaOrario === tipologiaOrarioCostanti.NON_CONVIVENTI || tipologiaOrario === tipologiaOrarioCostanti.WEEKEND ? "oraria" : "mensile"} di retribuzione minima prevista dal CCNL`,
    detail: moneyFormat(simulatore.minimoContrattuale, true),
  },
  ...( isMinoreDiSeiAnni || isPiuDiUnaPersonaNonAutosufficiente ? [{
    title: 'indennità',
    description: isMinoreDiSeiAnni ? "Indennità per assistenza bambini 0 - 6 anni" : "Indennità per assistenza per più di una persona non autosufficiente",
    detail: moneyFormat(simulatore.indennitaTataBadante, true),
  }] : []),
  {
    title: 'superminimo',
    description: `Quota aggiuntiva ${tipologiaOrario === tipologiaOrarioCostanti.NON_CONVIVENTI || tipologiaOrario === tipologiaOrarioCostanti.WEEKEND ? 'oraria' : 'mensile'} di retribuzione concessa oltre il minimo previsto dal CCNL`,
    detail: moneyFormat(simulatore.superminimo, true),
  },
  ...(simulatore.stipendioMensileMedio ? [{
    title: 'stipendio mensile medio',
    description: 'Retribuzione media da corrispondere mensilmente',
    detail: moneyFormat(simulatore.stipendioMensileMedio, true),
  }]
    : []),
    ...(parseFloat(simulatore.indennitaConvenzionale) > 0 ? [{
    title: 'indennità vitto e alloggio (valore convenzionale)',
    description: 'Indennità sostitutiva di vitto e alloggio corrisposta in natura nei mesi lavorativi',
    detail: moneyFormat(simulatore.indennitaConvenzionale, true),
  }] : 
  []),
  ...(simulatore.riposi ? [{
    title: 'riposi',
    description: 'Ore settimanali di riposo spettanti all’assistente familiare',
    detail: simulatore.riposi,
  }]
    : []),
  {
    title: 'ferie',
    description: 'Giorni di ferie spettanti annualmente all’assistente familiare',
    detail: simulatore.ferie,
  },
  {
    title: 'retribuzione oraria effettiva',
    description:'Retribuzione oraria di fatto comprensiva di tredicesima e eventuali indennità ripartite in misura oraria',
    detail: moneyFormat(simulatore.retribuzioneOrariaEffettiva, true),
  },

];

export const prospettoRows = (simulatore) => [
  {
    title: 'stipendio mensilità di lavoro',
    description:'Retribuzione da corrispondere per i mesi lavorativi (n. 11)',
    detail: moneyFormat(simulatore.stipendioMensilita, true),
  },
  {
    title: 'stipendio mensilità di ferie',
    description: 'Retribuzione da corrispondere per il mese di ferie',
    detail: moneyFormat(simulatore.stipendioFerie, true),
  },
  {
    title: 'stipendio annuale',
    description: 'Retribuzione da corrispondere annualmente',
    detail: moneyFormat(simulatore.stipendioAnnuale, true)
  },
  {
    title: 'tredicesima',
    description: 'Tredicesima (valore annuale) da corrispondere nel mese di dicembre ',
    detail: moneyFormat(simulatore.tredicesima, true)
  },
  {
    title: 'trattamento di fine rapporto (T.F.R.)',
    description: 'Accantonamento annuale per il trattamento di fine rapporto ',
    detail: moneyFormat(simulatore.tfr, true)
  },
  {
    title: 'contributi INPS (totale annuo)',
    description: 'Valore annuale dei contributi INPS da versare trimestralmente',
    detail: moneyFormat(simulatore.contributiAnnuo, true)
  },
  {
    title: 'contributi a carico del datore di lavoro (totale annuo)',
    description: 'Quota annuale dei contributi INPS a carico del datore di lavoro',
    detail: moneyFormat(simulatore.contributiDatoreLavoro, true)
  },
  {
    title: 'contributi a carico del lavoratore (totale annuo)',
    description: 'Quota annuale dei contributi INPS a carico del lavoratore ',
    detail: moneyFormat(simulatore.contributiLavoratore, true)
  },
  {
    title: 'cassa colf (totale annuo)',
    description: `Valore annuale della cassa sanitaria a favore di lavoratori e datori di lavoro domestici (${simulatore.totaleCassaCuaf ? `€ ${simulatore.totaleCassaCuaf}` : '--' } per ogni ora di lavoro)`,
    detail: moneyFormat(simulatore.cassaAnnuo, true)
  },
  {
    title: 'cassa colf a carico del datore di lavoro (totale annuo)',
    description: `Quota annuale della Cassacolf a carico del datore di lavoro (${simulatore.datoreDiLavoroCuaf ? `€ ${simulatore.datoreDiLavoroCuaf}` : '--' } per ogni ora di lavoro)`,
    detail: moneyFormat(simulatore.cassaDatore, true)
  },
  {
    title: 'cassa colf a carico del lavoratore (totale annuo)',
    description: `Quota annuale della Cassacolf a carico del lavoratore (${simulatore.lavoratoreCuaf ? `€ ${simulatore.lavoratoreCuaf}` : '--' } per ogni ora di lavoro)`,
    detail: moneyFormat(simulatore.cassaLavoratore, true)
  },
];

export const totalRows = (simulatore) => [
  {
    title: 'spesa annuale',
    description: 'Spesa annuale (13 mensilità + indennità dovute + quota contributi INPS e CassaColf datore di lavoro + T.F.R.)',
    detail: moneyFormat(simulatore.spesaAnnuale, true)
  },
  {
    title: 'spesa media mensile',
    description: 'Spesa media mensile (spesa annuale divisa per 12)',
    detail: moneyFormat(simulatore.spesaMediaMensile, true)
  },
];