/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row } from '../Grid';
import Button from '../Button';
import TablePropTypes from './propTypes';

// import Search from '../../images/ALL_ERI/search.svg';

const Titolo = styled.h1`
  text-align: left;
  font-size: 35px;
`;

const TitoloSpan = styled.span`
  text-align: left;
  font-size: 35px;
  font-weight: normal;
`;

const Testo = styled.h1`
  text-align: center;
  font-size: 15px;
  margin-top: 11px;
`;

const TestoSpan = styled.span`
  text-align: center;
  font-size: 15px;
  font-weight: normal;
`;

const MyRow = styled(Row)`
  justify-content: center;
  padding: 1em;
`;

const MyInput = styled.input`
  margin-left: 2em;
`;

const MyButton = styled(Button)`
  max-width: 200px;
  margin-left: 2em;
`;

const MyImg = styled.img`
  height: 24px;
  margin-left: 0.5em;
  color: white;
`;

const MyTable = styled.table`
  border-collapse: collapse;
  width:100%;
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
`;

const Table = ({
  Colonne,
  Righe,
}) => (
  <MyRow>
    <MyTable>
      <TrHeader>
        {Colonne.map(i => (
          <ThTable>{i}</ThTable>
          ))}
      </TrHeader>
      {
          Righe.map(j => (
            <TrTable>
              {
                Object.values(j).map(
                  k => (
                    <TdTable>{k}</TdTable>
                  )
)
              }
            </TrTable>
          ))
        }
    </MyTable>
  </MyRow>
  );

Table.displayName = 'Table';
Table.propTypes = TablePropTypes;

export default Table;
