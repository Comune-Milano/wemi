/** @format */

import React from 'react';
import { Row, Column, Page } from 'hedron';
import styled from 'styled-components';
import { entEVR } from 'mocks/EntEVR';


const Title = styled.h1`
color: #005cb9;
font-size: 3rem;
`;
const Subtitle = styled.h3`
color: #0099ab;
`;
const PageContainer = styled(Page)`
 flex: 1;
  max-width: 1600px;
  margin: 0 13em;
`;
const Request = styled.p`
  &&& {
    background-color: #f0f0f0;
    width: 50%,
    line-height: 2rem;
  }
`;

const EntEVR = () => (
  <PageContainer lg="12" md="12" xs="12">
    <Title lg="12" xs="12">Riepilogo</Title>

    <Row style={{ height: '3em' }} division={8}>
      <Column lg="3" md="3" xs="3">
        <Subtitle>SERVIZIO</Subtitle>
      </Column>
      <Column lg="5" md="3" xs="1">
        <p>{entEVR.service}</p>
        <br />
      </Column>
    </Row>

    <Row style={{ height: '3em' }} division={8}>
      <Column lg="3" md="3" xs="3">
        <Subtitle>DOVE</Subtitle>
      </Column>
      <Column lg="5" md="3" xs="3">
        <p>{entEVR.dove}</p>
        <br />
      </Column>
    </Row>

    <Row style={{ height: '3em' }} division={8}>
      <Column lg="3" md="3" xs="3">
        <Subtitle>COSTO</Subtitle>
      </Column>
      <Column lg="5" md="3" xs="3">
        <p>
          {entEVR.costo}
          {entEVR.prezzo}
        </p>
        <br />
      </Column>
    </Row>

    <Row style={{ height: '3em' }} division={8}>
      <Column lg="3" md="3" xs="3">
        <Subtitle>ORARIO</Subtitle>
      </Column>
      <Column lg="5" md="3" xs="3">
        <p>
          {entEVR.orario}
          {entEVR.day}
        </p>
        <br />
      </Column>
    </Row>

    <Row style={{ height: '16em' }} division={11}>
      <Column lg="3" md="3" xs="3">
        <Subtitle>MANSIONI</Subtitle>
      </Column>
      <Column lg="8" md="3" xs="3">
        {entEVR.mansioni.map(elem => (
          <Request>
            {' '}
            {elem.work}
            {' '}
          </Request>
                ))}
        <br />
      </Column>
    </Row>

    <Row style={{ height: '3em' }} division={8}>
      <Column lg="3" md="3" xs="3">
        <Subtitle>PERIODO</Subtitle>
      </Column>
      <Column lg="5" md="3" xs="3">
        <p>{entEVR.periodo}</p>
        <br />
      </Column>
    </Row>

    <Row style={{ height: '3em' }} division={8}>
      <Column lg="3" md="3" xs="3">
        <Subtitle>NOTE</Subtitle>
      </Column>
      <Column lg="5" md="3" xs="3">
        <p>{entEVR.note}</p>
        <br />
      </Column>
    </Row>
  </PageContainer>

);

EntEVR.displayName = 'EntEVR';


export default EntEVR;
