/** @format */

import React from 'react';
import { Column, Row } from 'hedron';
import styled from 'styled-components';
import { areaPersGestDati } from 'mocks/areaPersGestDati';

const DivCard = styled.div`
  min-height: 165px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  :hover {
    background-color: rgb(250, 250, 250, 0.9);
    cursor: pointer;
  }
`;

const TitoloCard = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0.3em;
  font-size: 20px;
  color: #0099ab;
`;

const MyRow = styled(Row)`
  justify-content: center;
`;

const CardAreaPers = () => (
  <div>
    <MyRow>
      {areaPersGestDati.element.map(card => (
        <Column lg={6} md={4} sm={12} xs={12}>
          <DivCard>
            <Column lg={12} md={12} sm={12} xs={12}>
              <TitoloCard>{card.title}</TitoloCard>
              <div>{card.icon}</div>
            </Column>
          </DivCard>
        </Column>
      ))}
    </MyRow>
  </div>
);

CardAreaPers.displayName = 'CardAreaPers';

export default CardAreaPers;
