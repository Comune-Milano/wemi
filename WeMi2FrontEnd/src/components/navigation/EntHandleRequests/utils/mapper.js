import { RICHIESTA_ENTE_PAGATA } from 'types/stati-richieste/richiesteEnte';
import moment from 'moment';

export const datasetMapper = (dataset, isFeedback) => ({
  richiedente: dataset.richiedente,
  nomeEnte: dataset.nomeEnte,
  dataRichiesta: dataset.dataRichiesta ? moment(dataset.dataRichiesta).format('YYYY-MM-DD') : undefined,
  statoChat: dataset.statoChat ? '1' : '',
  tipoServizio: parseInt(dataset.tipologia.id, 10),
  statoFeedback: dataset.statoFeedback.id.toString(),
  statoRichiestaBase: !isFeedback ? dataset.statoRichiesta.id.toString() : RICHIESTA_ENTE_PAGATA,
});
