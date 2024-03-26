/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import { colorColumn, boldColumn } from './constants';

const MyTable = styled.table`
  border-collapse: collapse;
  font-size:  ${props => fonts.size[props.size]}
  width:${props => props.tableWidth ? props.tableWidth : '100%'};
  th {
  font-size:  calc(${props => fonts.size[props.size]}* 1.2)

  }
`;
const THead = styled.thead`
 
`;
const TrHeader = styled.tr`
background-color: ${props => props.headerBgColor ? colors[props.headerBgColor] : colors.primary}
font-weight: bold;
`;
const TBody = styled.tbody`
  :nth-child(odd) {
    background-color: rgb(240, 240, 240);
  }
`;

const TrTable = styled.tr`
  :nth-child(odd) {
    background-color: rgb(240, 240, 240);
  }
`;

const TdTable = styled.td`
  text-align: center;
  display: flex-block;
  align-items: center;
  width: ${props => props.tdWidth ? props.tdWidth : 'unset'};
  height: ${props => props.tdHeight ? props.tdHeight : 'unset'};
  color: ${props => props.tdColor ? colors[props.tdColor] : colors.darkGrey};
  border: ${props => props.tdBorder ? props.tdBorder : 'none'};
  padding: 0.5em 0;
  ${props => props.bold && css`
  font-weight: bold;
  `}

  ${props => props.uppercase && css`
  text-transform: uppercase;
  `}
`;

const ThTable = styled.th`
  text-align: center;
  display: flex-block;
  align-items: center;
  font-weight: normal;
  width: ${props => props.thWidth ? props.thWidth : 'unset'};
  height: ${props => props.thHeight ? props.thHeight : 'unset'};
  color: ${props => props.thColor ? colors[props.thColor] : colors.white};
  border: ${props => props.thBorder ? props.thBorder : 'none'};
  @-moz-document url-prefix() {
    border: 1px ${colors.grey} solid;
}
`;

const Table = ({
  Colonne,
  Righe,
  size,
  thWidth,
  thHeight,
  thBorder,
  thColor,
  tableWidth,
  headerBgColor,
  tdColor,
  tdWidth,
  tdHeight,
  tdBorder,
  tableBorder,
  tdBold,
  tdUppercase,
  ...rest
}) => (
  <MyTable size={size} tableWidth={tableWidth} {...rest}>
    <THead>
      <TrHeader headerBgColor={headerBgColor}>
        {Colonne.map((i, index) => (
          <ThTable
            key={index.toString()}
            thWidth={thWidth}
            thHeight={thHeight}
            thBorder={thBorder}
            thColor={thColor}>
            {i}</ThTable>
        ))}
      </TrHeader>
    </THead>
    <TBody>
      {Righe.map((j, z) => {
        return (
          <TrTable key={z + "-Table"}>
            {Object.values(j).map((k, index) => {

              const color = j[colorColumn] || tdColor;
              const bold = j[boldColumn];

              if (j[colorColumn] === k || j[boldColumn] === k) {
                //if the current element is the color of the column
                return;
              }

              return (
                <TdTable
                  key={index + "-ColumnTable"}
                  bold={tdBold && tdBold.includes(index) || bold}
                  uppercase={tdUppercase && tdUppercase.includes(index)}
                  tdWidth={tdWidth}
                  tdHeight={tdHeight}
                  tdBorder={tdBorder}
                  tdColor={color}
                >
                  {k}
                </TdTable>
              )
            })}
          </TrTable>
        )
      })}
    </TBody>
  </MyTable>
);

Table.displayName = 'Table';
// Table.propTypes = TablePropTypes;

export default Table;
