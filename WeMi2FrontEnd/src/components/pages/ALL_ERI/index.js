/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import Button from 'components/ui/Button';
import styled from 'styled-components';
import TableAccordion from 'components/ui/Table';
import { AllEriJson } from './AllEriJson';

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

const AreaPersonaleCittadino = () => (
  <div>
    <Row>
      <Titolo>
        Elenco Servizi &nbsp;
        <TitoloSpan>richiesti / acquistati</TitoloSpan>
      </Titolo>
    </Row>
    <MyRow>
      <Testo>
        Cerca
        <TestoSpan>tra le richieste</TestoSpan>
      </Testo>
      <MyInput type="date" />
      <MyInput type="date" />
      <MyButton value="Cerca" />
    </MyRow>
    <MyRow>
      <TableAccordion {...AllEriJson} />
    </MyRow>
  </div>
);

AreaPersonaleCittadino.displayName = 'AreaPersonaleCittadino';

export default AreaPersonaleCittadino;