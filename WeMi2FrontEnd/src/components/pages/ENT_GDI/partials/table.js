/** @format */

import React from 'react';
import styled from 'styled-components';
import TablePropTypes from './propTypes';

const MyTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  
`;

const TrHeader = styled.tr`
  background-color: #005cb9;
  color: white;
  font-weight: bold;
`;

const TrTable = styled.tr`
  :nth-child(odd) {
    background-color: rgb(240, 240, 240);
  }
`;

const TdTable = styled.td`
  text-align: center;
  padding: 0;
`;

const ThTable = styled.th`
  text-align: center;
  padding: 18px;
  font-weight: normal;
`;

const Table = ({ Colonne, Righe }) => (
  <MyTable>
    <TrHeader>
      {Colonne.map(i => (
        <ThTable>{i}</ThTable>
      ))}
    </TrHeader>
    {Righe.map(j => (
      <TrTable>
        {Object.values(j).map(k => (
          <TdTable>{k}</TdTable>
        ))}
      </TrTable>
    ))}
  </MyTable>
);

Table.displayName = 'Table';
Table.propTypes = TablePropTypes;

export default Table;
