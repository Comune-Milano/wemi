import React, { useState } from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { colors } from 'theme';
import Table from 'components/ui/Table';
import Checkbox from 'components/ui2/Checkbox';
import DrawerTransaction from '../DrawerTransaction';
import { columnsTable } from '../../costants';

const TransazioniTable = React.memo(({
  listaTransazioni,
  refreshList,
  doSelect,
  setOpenErrorModal,
  setOpenSuccessModal,
}) => {
  const [open, setOpen] = useState(false);

  const tableData = listaTransazioni.map(row => ({
    selezione: row.state === 'Registrata' || row.checked ? (
      <Checkbox
        key={row.idTransazioneVoucher}
        id={row.idTransazioneVoucher}
        value={row.checked}
        onChange={(checked) => doSelect(row.idTransazioneVoucher, checked)}
        width="auto"
      />
    ) : '',
    riferimentoBando: row.bando,
    codiceVoucher: row.codiceVoucher,
    importoSpeso: row.importoSpeso ? moneyFormat(row.importoSpeso, true) : '',
    stato: row.state,
    dataUtilizzoVoucher: row.dataUtilizzoVoucher,
    dataContabilizzazione: row.dataContabilizzazione,
    servizioAcquistato: row.servizioAcquistato,
    nomeEnte: row.nomeEnte,
    idRichiestaServizioEnte: row.idRichiestaServizioEnte,
    azioni: (
      <DrawerTransaction
        open={open}
        setOpen={setOpen}
        idTransaction={row.idTransazioneVoucher}
        refreshList={refreshList}
        setOpenErrorModal={setOpenErrorModal}
        setOpenSuccessModal={setOpenSuccessModal}
      />
    ),
  }));

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

TransazioniTable.displayName = 'TransazioniTable';

export default TransazioniTable;
