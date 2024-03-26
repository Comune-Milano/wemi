import React from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { colors } from 'theme';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Table from 'components/ui/Table';
import FaIcon from 'components/ui2/FaIcon';
import Tooltip from 'components/ui2/Tooltip';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { stornoTransazione as stornoTransazioneM, contabilizzaTransazione as contabilizzaTransazioneM } from '../../../TransazioniManagement/graphql/graphql';
import { columnsTable } from '../../costants';

const StyledColumn = styled(Column)`

  div.contabilizza {
    padding: 0.43em 0.2em 0.1em 0;
    border-radius: 2.2em
    width: 2.2em
    height: 2.2em
    background: ${colors.green}
  }

  div.storna {
    padding: 0.43em 0.2em 0.1em 0.1em;
    border-radius: 2.2em
    width: 2.2em
    height: 2.2em
    background: ${colors.red}
  }

  div.disattiva {
    padding: 0.43em 0.2em 0.1em 0.1em;
    border-radius: 2.2em
    width: 2.2em
    height: 2.2em
    background: ${colors.grey}
  }
`;

const TransactionVoucherTable = React.memo(({
  listaTransactionsVoucher,
  refreshList,
  setOpenErrorModal,
  setOpenSuccessModal,
}) => {
  const mutationContabilizzaTransazione = useStatelessGraphQLRequest(
    contabilizzaTransazioneM, undefined, undefined, undefined, true,
  );

  const mutationStornaTransazione = useStatelessGraphQLRequest(
    stornoTransazioneM, undefined, undefined, undefined, true,
  );

  const tableData = listaTransactionsVoucher.map(row => ({
    cfMinore: row.cfMinore,
    importoTransazione: row.importoTransazione ? moneyFormat(row.importoTransazione, true) : '',
    stato: row.stato,
    dataPagamento: row.dataPagamento,
    servizioAcquistato: row.servizioAcquistato,
    ente: row.ente,
    idRichiestaServizioEnte: row.idRichiestaServizioEnte,
    azioni: (
      <Row fluid justifycontent="center" alignitems="center" display="flex">
        {row.stato === 'Registrata' ? (
          <>
            <StyledColumn xs="2" lg="2">
              <div className="contabilizza">
                <Tooltip
                  position="top"
                  color="white"
                  bgcolor="green"
                  value="Contabilizza transazione"
                  posAdjustment="-8.3em"
                >
                  <FaIcon
                    noShadow
                    icon="euro-sign"
                    size="2x"
                    weight="bold"
                    fontSize="f6"
                    color="white"
                    onClick={async () => {
                      onClicContabilizzaTransazione(row.idTransazione);
                    }}
                  />
                </Tooltip>
              </div>
            </StyledColumn>
            <StyledColumn xs="2" lg="2">
              <div className="storna">
                <Tooltip
                  position="top"
                  color="white"
                  bgcolor="red"
                  value="Storna transazione"
                  posAdjustment="-8.1em"
                >
                  <FaIcon
                    noShadow
                    icon="minus"
                    size="2x"
                    weight="bold"
                    fontSize="f6"
                    color="white"
                    onClick={async () => {
                      onClicStornaTransazione(row.idTransazione);
                    }}
                  />
                </Tooltip>
              </div>
            </StyledColumn>
          </>
        ) : (
          <>
            <StyledColumn xs="2" lg="2">
              <div className="disattiva">
                <FaIcon
                  noShadow
                  icon="euro-sign"
                  size="2x"
                  weight="bold"
                  fontSize="f6"
                  color="white"
                />
              </div>
            </StyledColumn>
            <StyledColumn xs="2" lg="2">
              <div className="disattiva">
                <FaIcon
                  noShadow
                  icon="minus"
                  size="2x"
                  weight="bold"
                  fontSize="f6"
                  color="white"
                />
              </div>
            </StyledColumn>
          </>
        )}
      </Row>
    ),
  }));

  const onClicContabilizzaTransazione = async (id) => {
    try {
      await mutationContabilizzaTransazione({ id: [id] });
      setOpenSuccessModal({
        open: true,
        message: 'Operazione effettuata con successo',
      });
    } catch (error) {
      setOpenErrorModal({ open: true });
    }
    refreshList();
  };

  const onClicStornaTransazione = async (id) => {
    try {
      await mutationStornaTransazione({ id: [id] });
      setOpenSuccessModal({
        open: true,
        message: 'Operazione effettuata con successo',
      });
    } catch (error) {
      setOpenErrorModal({ open: true });
    }
    refreshList();
  };

  return (
    <React.Fragment>
      <Table
        size="f8"
        thWidth="10em"
        thHeight="3em"
        thBorder={`5px solid ${colors.darkBlue}`}
        tdBorder="none!important"
        thColor="white"
        tdHeight="3em"
        tdColor="darkGrey"
        headerBgColor="blue"
        tableWidth="100%"
        Colonne={columnsTable}
        Righe={tableData}
      />
    </React.Fragment>
  );
});

TransactionVoucherTable.displayName = 'TransactionVoucherTable';

export default TransactionVoucherTable;
