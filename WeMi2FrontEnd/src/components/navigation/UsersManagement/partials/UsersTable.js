import React from 'react';
import { colors } from 'theme';
import { columnsTable } from '../costants';
import Table from 'components/ui/Table';

const UsersTable = React.memo(({
  listaUtenze = [],
}) => {

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
        Righe={listaUtenze}
      />
    </React.Fragment>
  );
});

UsersTable.displayName = 'UsersTable';

export default UsersTable;