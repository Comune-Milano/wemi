/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import TablePropTypes from './propTypes';

const MyTable = styled.table`
  border-collapse: collapse;
  width: ${props => props.tableWidth ? tableWidth : '100%'};
`;

const TrHeader = styled.tr`
  background-color: #0099ab;
  color: white;
  font-weight: normal;
`;

const TrTable = styled.tr`
  :nth-child(odd) {
    background-color: rgb(240, 240, 240);
  }
`;

const TdTable = styled.td`
  text-align: center;
  padding: 8px;
`;

const ThTable = styled.th`
  text-align: center;
  padding: 8px;
  font-weight: normal;
  width: ${props => props.thWidth ? thWidth : 'unset'}!important;
`;

const Table = ({ Colonne, Righe, tableWidth, thWidth, }) => (
    <MyTable tableWidth={tableWidth}>
      <TrHeader>
        {Colonne.map(i => (
          <ThTable thWidth={thWidth}>{i}</ThTable>
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
