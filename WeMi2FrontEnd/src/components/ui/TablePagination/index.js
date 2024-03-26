/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from 'components/ui/Pagination';
import { Row } from '../Grid';

const MyRow = styled(Row)`
  justify-content: center;
  padding: 1em;
`;
MyRow.displayName = 'MyRow';

const MyTable = styled.table`
  border-collapse: collapse;
  width: 80%;
`;
MyTable.displayName = 'MyTable';

const TrHeader = styled.tr`
  background-color: #0099ab;
  color: white;
  font-weight: normal;
`;
TrHeader.displayName = 'TrHeader';

const TrTable = styled.tr`
  :nth-child(odd) {
    background-color: rgb(240, 240, 240);
  }
`;
TrTable.displayName = 'TrTable';
const TdTable = styled.td`
  text-align: center;
  padding: 8px;
`;
TdTable.displayName = 'TdTable';
const ThTable = styled.th`
  text-align: center;
  padding: 8px;
  font-weight: normal;
`;
ThTable.displayName = 'ThTable';
const TablePagination = ({ json, colonne, numberitem, pagenumber }) => {
  const [currentPage, setCurrentPage] = useState(pagenumber);
  const indexOfLastItem = currentPage * numberitem;
  const indexOfFirstItem = indexOfLastItem - numberitem;
  const currentItems = json.slice(indexOfFirstItem, indexOfLastItem);
  const Table = () => (
    <MyRow>
      <MyTable>
        <TrHeader>
          {colonne.map(i => (
            <ThTable>{i.nome}</ThTable>
          ))}
        </TrHeader>
        {currentItems.map(j => (
          <TrTable>
            <TdTable>{j.nomeEnte}</TdTable>
            <TdTable>{j.costo}</TdTable>
          </TrTable>
        ))}
      </MyTable>
    </MyRow>
  );
  Table.displayName = 'Table';
  return (
    <>
      <Table />
      <Pagination
        json={json}
        currentPage={currentPage}
        numberitem={numberitem}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

TablePagination.displayName = 'TablePagination';

export default TablePagination;
