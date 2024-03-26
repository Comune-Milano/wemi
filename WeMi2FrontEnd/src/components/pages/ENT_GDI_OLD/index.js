/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Column } from 'hedron';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import Table from 'components/ui/Table';
import styled from 'styled-components';
import { GestioneEnteJSON } from 'mocks/GestioneEnteJSON';
import Pagination from 'components/pages/ENT_GDI/partials/pagination';
import Input from 'components/ui/Input';
import {colors} from 'theme';

const TitleEnte = styled(Text)`
  color: #707070;
`;
const BtnAggiungi = styled(Button)`
  width: 15em;
  height: 3.5em;
`;

const Container = styled.div`
  margin: 2em;
`;

const GestioneEnte = () => (
  <Container>
    <TitleEnte lg="12" xs="12" size="f0" tag="p" align="left" value="Gestione Ente" />

    <Row division={12}>
      <Column lg="6">
        <Input material intlLabel="Ricerca" intlPlaceholder="Ricerca" />
      </Column>
    </Row>
    <Row division={12}>
      <Column lg="6">
        <Link to="/it/DatiEnte">
          <BtnAggiungi value="Aggiungi +" />
        </Link>
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
    
    {...GestioneEnteJSON} />
    <Row justifyContent="center">
      <Pagination />
    </Row>
  </Container>
);

GestioneEnte.displayName = 'GestioneEnte';
export default GestioneEnte;
