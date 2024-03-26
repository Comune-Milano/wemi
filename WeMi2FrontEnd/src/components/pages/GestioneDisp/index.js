import React, { useState, useEffect } from 'react';
import Text from 'components/ui/Text';
import { GestDispJSON } from 'mocks/DisponibilitaJSON';
import Select from 'components/ui/Select';
import styled from 'styled-components';
import Pagination from 'components/pages/GestioneDisp/partials/pagination';
import Table from '../../ui/Table1';
import { Row, Column } from '../../ui/Grid';


const Container = styled.div`
  margin: 2em;
`;

const Titolo = styled.h1`
  font-weigh:none;
  font-size: 40px;
`;
const Subtitle = styled.span`
  text-align: left;
  font-size: 40px;
  font-weight: normal;
`;


const MySelect = styled(Select)`
  height:2.3em ;
  cursor: pointer;
`;

const MyInput = styled.input`
  margin-left: 2em;
`;


const GestDisp = () => {
  const [categoria, setCategoria] = useState('A');

  const cambiaCategoria = (e, categoria) => {
    setCategoria(categoria);
  };

  useEffect(
    () => document.title = 'setting page name'
  );

  return (
    <Container>

      <Titolo>
INDICE
        <Subtitle>RICHIESTE E SERVIZI ACQUISTATI</Subtitle>
      </Titolo>

      &nbsp;
      <Row divisions={12}>
        <Column lg={3}>
          <Text size="f7" value="Filtra risultati per data:"> </Text>
          {' '}
          <br />
        </Column>
        <Column lg={3}>
          <MyInput type="date" />
        </Column>
        <Column lg={3}>
          <MyInput type="date" />
        </Column>

        <Column lg={3}>
          <MySelect material>
            <option value="0">Stato richiesta:</option>
            <option value="1">Accettata</option>
            <option value="2">Rifiutata</option>
            <option value="3">In approvazione</option>
          </MySelect>
        </Column>
      </Row>


      &nbsp;
      <Table
       size="f8"
       thWidth="10em"
       thHeight="3em"
       // thBorder={`5px solid ${colors.darkBlue}`}
       thColor="white"
       tdHeight="3em"
       tdColor="darkGrey"
       headerBgColor="blue"
       tableWidth="100%"
      {...GestDispJSON} />
      <Pagination />
    </Container>
  );
};

GestDisp.displayName = 'GestDisp';

export default GestDisp;
