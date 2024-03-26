import React, { useState } from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { colors } from 'theme';
import Table from 'components/ui/Table';
import DrawerVoucher from '../DrawerVoucher';
import { columnsTable } from '../../costants';

const VouchersTable = React.memo(({
  listaVoucher,
  refreshList,
  setOpenErrorModal,
  setOpenSuccessModal,
}) => {
  const [open, setOpen] = useState(false);

  const tableData = listaVoucher.map(row => ({
    inizioValidita: row.inizioValidita,
    fineValidita: row.fineValidita,
    stato: row.state,
    riferimentoBando: row.bando,
    codice: row.code,
    cfIntestatario: row.cfIntestatario,
    cfMinore: row.cfMinore ? row.cfMinore : '',
    importoTotale: row.totalImport ? moneyFormat(row.totalImport, true) : '',
    importoResiduo: row.remainingImport ? moneyFormat(row.remainingImport, true) : '',
    importoContabilizzato: row.countedImport ? moneyFormat(row.countedImport, true) : '',
    azioni: (
      <DrawerVoucher
        open={open}
        setOpen={setOpen}
        idVoucher={row.idVoucher}
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

VouchersTable.displayName = 'VouchersTable';

export default VouchersTable;
