import React from 'react';
import { colors, fonts } from 'theme';
import { Table, StyledDashedTr, StyledSolidTr, StyledTd, BorderRightTd, PurpleFontTd, BlackFontTd } from './schooltable.components.style';

const SchoolTable = () => (
  <>
    <Table>
      <StyledSolidTr>
        <StyledTd width="12%"></StyledTd>
        <StyledTd width="58%"></StyledTd>
        <StyledTd width="12%" borderLeft={`1.5px solid ${colors.greyFooter}`} borderRight={`1.5px solid ${colors.greyFooter}`} padding="6px">DURATA</StyledTd>
        <StyledTd width="18%" padding="6px">ETÀ</StyledTd>
      </StyledSolidTr>
      <StyledSolidTr>
        <BorderRightTd>1° CICLO</BorderRightTd>
        <BorderRightTd>
          <Table>
            <StyledDashedTr>
              <PurpleFontTd>
                Scuola Primaria -
                <b>Elementari</b>
              </PurpleFontTd>
            </StyledDashedTr>
            <PurpleFontTd>
              Scuola Secondaria di Primo Grado -
              <b>Medie</b>
            </PurpleFontTd>
          </Table>
        </BorderRightTd>
        <BorderRightTd>
          <Table>
            <StyledDashedTr>
              <BlackFontTd>
                5 anni
              </BlackFontTd>
            </StyledDashedTr>
            <BlackFontTd>
              3 anni
            </BlackFontTd>
          </Table>
        </BorderRightTd>
        <td>
          <Table>
            <tr>
              <StyledTd borderBottom={`1.5px dashed ${colors.greyFooter}`} fontSize={fonts.size.f6} padding="6px">
                da 6 a 11 anni
              </StyledTd>
            </tr>
            <tr>
              <BlackFontTd>
                da 11 a 14 anni
              </BlackFontTd>
            </tr>
          </Table>
        </td>
      </StyledSolidTr>
      <StyledSolidTr>
        <BorderRightTd>2° CICLO</BorderRightTd>
        <StyledTd borderRight={`1.5px solid ${colors.greyFooter}`} color={colors.purple} fontSize={fonts.size.f6} padding="8px" align="left">
          Scuola Secondaria di Secondo Grado -
          <b> Superiori</b>
        </StyledTd>
        <StyledTd borderRight={`1.5px solid ${colors.greyFooter}`} fontSize={fonts.size.f6} padding="6px">3-5 anni</StyledTd>
        <BlackFontTd>da 14 a 19 anni</BlackFontTd>
      </StyledSolidTr>
    </Table>
  </>
);

SchoolTable.displayName = 'SchoolTable';
export default SchoolTable;
