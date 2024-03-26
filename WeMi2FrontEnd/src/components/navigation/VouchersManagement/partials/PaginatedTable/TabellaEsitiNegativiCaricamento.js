/** @format */

import React from 'react';
import { colors } from 'theme';
import Table from 'components/ui/Table';


const TabellaEsitiNegativiCaricamento = ({
  listaMotivi,
}) => {
  const columnsTable = ['Riga', 'Colonna', 'Motivo'];

  const tableData = listaMotivi.map(row => ({
    riga: row.row,
    colonna: row.col ? row.col : null,
    motivo: row.motivo,
  }));

  return (
    <React.Fragment>
      <Table
        size="f8"
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
};
TabellaEsitiNegativiCaricamento.displayName = 'TabellaEsitiNegativiCaricamento';

export default TabellaEsitiNegativiCaricamento;
