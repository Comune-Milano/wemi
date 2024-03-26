import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'components/ui/Grid';
import { colors } from 'theme';
import { filterIndexAdd, graphqlRequest } from 'redux-modules/actions/authActions';
import Table from 'components/ui/Table';
import FaIcon from 'components/ui/FaIcon';
import { calcolaStatoFeedback } from 'utils/functions/calcolaStatiFeedback';
import { calcolaStatiRichiestaEnte } from 'utils/functions/calcolaStatiRichiestaEnte';
import withAuthentication from 'hoc/withAuthentication';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import moment from 'moment';

const RequestsTable = ({
  richiesteEnte,
  open,
  setOpen,
  setRowData,
  loaded,
  locale,
  isEnte,
  isFeedback,
  tableColumns,
}) => {
  const data = {
    Colonne: tableColumns || [
      'Codice Richiesta',
      'Codice Richiesta Ente',
      'Tipologia servizio',
      'Data richiesta',
      'Nome famiglia',
      'Stato richiesta',
      !isEnte ? 'Nome Ente' : 'Operatore',
      'Stato Feedback',
      'Ultimo user',
      'Azioni',
    ],
    Righe: richiesteEnte.map(richiesta => {
      const codiceRichiesta = richiesta.idRichiestaServizioBase;
      const codiceRichiestaEnte = richiesta.idRichiestaServizioEnte;
      const tipologiaServizio = richiesta.nomeServizio[locale];
      const dataRichiesta = moment(richiesta.timestampCreazione).format('DD/MM/YYYY');
      const nomeFamiglia = richiesta.nomeUtente && richiesta.cognomeUtente ? `${richiesta.nomeUtente} ${richiesta.cognomeUtente}` : '';
      const statoFeedback = calcolaStatoFeedback(richiesta);
      let colonnaNome = '';
      if (!isEnte) {
        colonnaNome = getObjectValue(richiesta, 'nmEnte', '');
      } else {
        colonnaNome = getObjectValue(richiesta, 'datiLavoratore.txNominativoOperatore', '');
      }
      const ultimoOperatore = richiesta.username;
      const azioni = (
        <FaIcon
          noShadow
          icon="\f105"
          size="2x"
          weight="bold"
          fontSize="f4"
          color="blue"
          onClick={() => {
            setOpen(!open);
            setRowData(richiesta);
          }}
        />
      );

      if (!isFeedback) {
        const statoRichiesta = calcolaStatiRichiestaEnte(richiesta);
        return {
          CodiceRichiesta: codiceRichiesta,
          CodiceRichiestaEnte: codiceRichiestaEnte,
          TipologiaServizio: tipologiaServizio,
          DataRichiesta: dataRichiesta,
          NomeFamiglia: nomeFamiglia,
          StatoRichiesta: statoRichiesta,
          [!isEnte ? 'NomeEnte' : 'NomeLavoratore']: colonnaNome,
          StatoFeedback: statoFeedback,
          UltimoOperatore: ultimoOperatore,
          Azioni: azioni,
        };
      }

      return {
        CodiceRichiesta: codiceRichiesta,
        CodiceRichiestaEnte: codiceRichiestaEnte,
        TipologiaServizio: tipologiaServizio,
        DataRichiesta: dataRichiesta,
        NomeFamiglia: nomeFamiglia,
        [!isEnte ? 'NomeEnte' : 'NomeLavoratore']: colonnaNome,
        StatoFeedback: statoFeedback,
        UltimoOperatore: ultimoOperatore,
        Azioni: azioni,
      };
    }),
  };


  return (
    <Row fluid>
      <Table
        size="f8"
        thWidth="10em"
        thHeight="3em"
        thBorder={`5px solid ${colors.darkBlue}`}
        tdBorder="none!important"
        thColor="white"
        tdHeight="auto"
        tdColor="darkGrey"
        headerBgColor="blue"
        tableWidth="100%"
        {...data}
      />
    </Row>
  );
};
RequestsTable.displayName = 'RequestsTable';

const mapStoreToProps = store => ({
  locale: store.locale,
});
const mapDispatchToProps = {
  filterIndexAdd,
  graphqlRequest,
};
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(RequestsTable));
