/** @format */

import React from 'react';
import { Row, Column, Page } from 'hedron';
import styled from 'styled-components';
import { infoLavoratoreJSON } from 'mocks/infoLavoratore';
import Button from 'components/ui/Button';

const Title = styled.div`
color: #707070;
font-size: 3rem;
text-align:center;
`;
const Subtitle = styled.h2`
color: #0099ab;
font-weight: bold;
`;
const Subtitle1 = styled.h4`
color: black;
font-weight: bold;
`;

const PageContainer = styled(Page)`
 flex: 1;
  max-width: 1600px;
  margin: 0 13em;
`;

const InfoLavoratore = () => (
  <div>
    <PageContainer lg="12" md="12" xs="12">
      <Title lg="12" xs="12">Informazioni Lavoratore</Title>

      <Row style={{ height: '3em' }} division={12}>
        <Column lg="6" md="6" xs="6">
          <Subtitle1>SERVIZIO:</Subtitle1>
        </Column>
        <Column lg="6" md="3" xs="6">
          <p>{infoLavoratoreJSON.service}</p>
          <br />
        </Column>
      </Row>
      <br />
      <Row style={{ height: '3em' }} division={12}>
        <Column lg="12" md="12" xs="12">
          <Subtitle>INFO LAVORATORE:</Subtitle>
        </Column>
      </Row>

      <Row style={{ height: '3em' }} division={12}>
        <Column lg="6" md="6" xs="6">
          <Subtitle1>MATRICOLA LAVORATORE</Subtitle1>
        </Column>
        <Column lg="6" md="6" xs="6">
          <p>{infoLavoratoreJSON.matricola}</p>
          <br />
        </Column>
      </Row>

      <Row style={{ height: '3em' }} division={12}>
        <Column lg="6" md="6" xs="6">
          <Subtitle1>NOME</Subtitle1>
        </Column>
        <Column lg="6" md="6" xs="6">
          <p>{infoLavoratoreJSON.nome}</p>
          <br />
        </Column>
      </Row>

      <Row style={{ height: '3em' }} division={12}>
        <Column lg="6" md="6" xs="6">
          <Subtitle1>INFO AGGIUNTIVE</Subtitle1>
        </Column>
        <Column lg="6" md="6" xs="6">
          <p>{infoLavoratoreJSON.note}</p>
          <br />
        </Column>
      </Row>
      <Row>
        <Column lg="12">
          <Button>Accetta ed inoltra info lavoratore</Button>
        </Column>
      </Row>
    </PageContainer>
  </div>
);

InfoLavoratore.displayName = 'InfoLavoratore';


export default InfoLavoratore;
