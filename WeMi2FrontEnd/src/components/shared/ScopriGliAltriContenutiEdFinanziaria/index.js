import styled from 'styled-components';
import { Column, Row } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import React from 'react';
import { withRouter } from 'react-router';
import { PAGE_EDUCAZIONE_FINANZIARIA } from 'types/url';
import media from 'utils/media-queries';
import GridComponent from '../GridComponent';

const StyledColumn = styled(Column)`
  width:100%;
  padding: 4.5rem 0 0 0;
  ${media.md`
    width: 75%;
  `}
  ${media.lg`
    width: 55%;
  `}
`;

const ScopriGliAltriContenutiEdFinanziaria = ({ list = [], history }) => (
  <Row fluid sizemargin={{ xs: '6rem 0 0 0', md: '8.4rem 0 0 0' }}>
    <GridComponent
      title="SCOPRI GLI ALTRI CONTENUTI"
      contents={list}
      letterSpacing="0.05em"
      maxWidthButton={{
        xs: '11.67rem',
        sm: '11.67rem',
        md: '100%',
        lg: '100%',
      }}
    />
    <StyledColumn>
      <Button
        label="TORNA A EDUCAZIONE FINANZIARIA"
        color="purple"
        weight="bold"
        padding="4.60px 30px"
        fontSize="f7_5"
        letterSpacing="0.05rem"
        onClick={() => history.push(PAGE_EDUCAZIONE_FINANZIARIA)}
      />
    </StyledColumn>
  </Row>
);

ScopriGliAltriContenutiEdFinanziaria.displayName = 'ScopriGliAltriContenutiEdFinanziaria';

export default withRouter(ScopriGliAltriContenutiEdFinanziaria);
