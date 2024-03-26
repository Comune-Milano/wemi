/** @format */

import React from 'react';
import Pagination from 'components/navigation/EntGoServiziTable/Pagination';
import TableServizi from 'components/navigation/EntGoServiziTable/EntGo';
const ServiziTable = () => (
  <div>
    <TableServizi />
    <Pagination />
  </div>
);

ServiziTable.displayName = 'ServiziTable';

export default ServiziTable;
