/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import Rating from 'components/navigation/EntIfe/partial/Rating';
import Button from 'components/ui/Button';
import { recServizio } from 'mocks/recServizio';
import { Row, Column } from 'components/ui/Grid';
import media from 'utils/media-queries';
import { Page } from 'hedron';
import Input from 'components/ui/Input';

const Title1 = styled(Text)`
  text-align: center;
  font-weight: bold;
`;
const Title2 = styled(Text)`
  text-align: center;
  font-weight: bold;
`;
const SubtitleBold = styled(Text)`
  text-align: justify;
`;
const MediaBtn = styled.div`
  max-width: 100%;
  padding: 5%;

  ${media.md`
  max-width: 50%;
  ;
`}
  ${media.lg`
  max-width: 50%;
  ;
`}
`;

const RowCenter = styled(Row)`
  justify-content: center;
`;

const RecServizio = () => (
  <div>
    <Page>
      <Row divisions={12}>
        <Column lg={12}>
          <Title1 value={recServizio.title1} size="f4" tag="label" />
        </Column>
      </Row>
      <Row divisions={12}>
        <Column lg={6}>
          <SubtitleBold value={recServizio.rating1} size="f7" tag="label" />
        </Column>
        <Column lg={2} lgShift={4}>
          <Rating fontSize="f5" />
        </Column>
      </Row>
      <Row divisions={12}>
        <Column lg={12} lgShift={2}>
          <Title2 value={recServizio.title2} size="f6" tag="label" />
        </Column>
      </Row>
      <Row divisions={12}>
        <Column lg={6}>
          <SubtitleBold value={recServizio.rating2} size="f7" tag="label" />
        </Column>
        <Column lg={2} lgShift={4}>
          <Rating fontSize="f5" />
        </Column>
      </Row>
      <Row divisions={12}>
        <Column lg={6}>
          <SubtitleBold value={recServizio.rating3} size="f7" tag="label" />
        </Column>
        <Column lg={2} lgShift={4}>
          <Rating fontSize="f5" />
        </Column>
      </Row>
      <Row divisions={12}>
        <Column lg={6}>
          <SubtitleBold value={recServizio.rating4} size="f7" tag="label" />
        </Column>
        <Column lg={2} lgShift={4}>
          <Rating fontSize="f5" />
        </Column>
      </Row>
      <Row divisions={12}>
        <Column lg={12}>
          <Input intlLabel="Aggiungi un commento..."  material intlPlaceholder="Aggiungi un commento..." />
        </Column>
      </Row>
      <RowCenter divisions={12}>
        <MediaBtn>
          <Column xs="12" md="12" lg="12">
            <Button value="Conferma Recensione" />
          </Column>
        </MediaBtn>
      </RowCenter>
    </Page>
  </div>
);
RecServizio.displayName = 'RecServizio';

export default RecServizio;
