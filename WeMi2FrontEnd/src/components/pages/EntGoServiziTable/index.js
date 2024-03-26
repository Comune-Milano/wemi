/** @format */

import React from 'react';
import TableServizi from 'components/navigation/EntGoServiziTable/EntGo';
import Pagination from 'components//navigation/EntGoServiziTable/Pagination';
const ServiziTable = () => (
  <div>
    <TableServizi />
    <Pagination />
  </div>
);

ServiziTable.displayName = 'ServiziTable';

export default ServiziTable;
