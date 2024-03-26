/** @format */

import React from 'react';
import Table from 'components/navigation/EntGoServiziTable/partial/Table';
import { Row, Column } from 'components/ui/Grid';
import { data } from 'mocks/serviziTableJson';
import styled from 'styled-components';
import Input from '../partial/input';
import {colors} from 'theme';

const Ricerca = styled(Input)`
  width: 20rem;
`;
const TableServizi = () => (
  <div>
    <Row>
      <Column xs="12" md="2" xsShift={8}>
        <Ricerca intlLabel="Ricerca" noLabel />
      </Column>
    </Row>

    <Table 
      size="f8"
      thWidth="10em"
      thHeight="3em"
      thBorder={`5px solid ${colors.darkBlue}`}
      tdBorder={'none!important'}
      thColor="white"
      tdHeight="3em"
      tdColor="darkGrey"
      headerBgColor="blue"
      tableWidth="100%"
      {...data} />
  </div>
);

TableServizi.displayName = 'TableServizi';

export default TableServizi;
