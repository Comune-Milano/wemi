import Text from 'components/ui/Text';
import React from 'react';
import { colors, fonts } from 'theme';
import { TableXs, BorderSolidTr, Table, StyledTd, CicleColumn, StyledDashedTr, TextContainer } from './schooltable.components.style';

const SchoolTableMobile = () => (
  <>
    <TableXs>
      <BorderSolidTr>
        <CicleColumn>
          <TextContainer padding="0.95em" writingMode="vertical-rl">
            1° CICLO
          </TextContainer>
        </CicleColumn>
        <td>
          <Table>
            <StyledDashedTr>
              <TextContainer padding="0.67em">
                <Text
                  color="purple"
                  value="Scuola primaria"
                  size="f7"
                  tag="div"
                />
                <Text
                  color="purple"
                  value="Elementari"
                  size="f7"
                  tag="div"
                  weight="bold"
                />
                <Text
                  color="black"
                  value="DURATA: 5 anni"
                  size="f7"
                  tag="div"
                />
                <Text
                  color="black"
                  value="ETÀ: da 6 a 11 anni"
                  size="f7"
                  tag="div"
                />
              </TextContainer>
            </StyledDashedTr>
            <tr>
              <TextContainer padding="0.67em">
                <Text
                  color="purple"
                  value="Scuola secondaria di primo grado"
                  size="f7"
                />
                <Text
                  color="purple"
                  value="Medie"
                  size="f7"
                  tag="div"
                  weight="bold"
                />
                <Text
                  color="black"
                  value="DURATA: 3 anni"
                  size="f7"
                  tag="div"
                />
                <Text
                  color="black"
                  value="ETÀ: da 11 a 14 anni"
                  size="f7"
                  tag="div"
                />
              </TextContainer>
            </tr>
          </Table>
        </td>
      </BorderSolidTr>
      <BorderSolidTr>
        <CicleColumn>
          <TextContainer padding="0.95em" writingMode="vertical-rl">
            2° CICLO
          </TextContainer>
        </CicleColumn>
        <StyledTd color={colors.black} width="100%" fontSize={fonts.size.f7} padding="8px" align="left">
          <Text
            color="purple"
            value="Scuola secondaria di secondo grado"
            size="f7"
            tag="div"
          />
          <Text
            color="purple"
            value="Superiori"
            size="f7"
            tag="div"
            weight="bold"
          />
          <Text
            color="black"
            value="DURATA: da 3 a 5 anni"
            size="f7"
            tag="div"
          />
          <Text
            color="black"
            value="ETÀ: da 14 a 19 anni"
            size="f7"
            tag="div"
          />
        </StyledTd>
      </BorderSolidTr>
    </TableXs>
  </>
);

SchoolTableMobile.displayName = 'SchoolTableMobile';
export default SchoolTableMobile;
