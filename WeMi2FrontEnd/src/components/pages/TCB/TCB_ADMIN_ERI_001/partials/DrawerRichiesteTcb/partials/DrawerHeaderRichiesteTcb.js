import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import moment from 'moment';

const StyledHeader = styled.div`
  padding: 3em 3em;
  min-height: 7em;
  background-color: ${colors.greyInput};

  h2 {
    padding-right: 4em;
  }

  ${media.md`
    padding: 3em 6em;

    h2 {
      padding-right: 0;
    }
  `}
`;

const DrawerHeaderRichiesteTcb = ({ data }) => (
  <StyledHeader>
    {data ? (
      <>
        <Row fluid>
          <Text
            tag="h2"
            value={`Richiesta ${data.statoRichiestaFamiglia}`}
            color="green"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            size="f5"
          />
        </Row>
        <Row fluid>
          <Text
            tag="h2"
            value={data.tipologiaServizioName}
            color="primary"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            size="f5"
          />
        </Row>
        <Row fluid>
          <Text
            tag="h2"
            value={`Richiesta ${data.codiceRichiestaBase} del ${data.dataRichiesta ? moment(data.dataRichiesta).format('DD-MM-YYYY') : 'non definita'}`}
            color="black"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            size="f5"
          />
        </Row>
      </>
    ) : null}
  </StyledHeader>
);

DrawerHeaderRichiesteTcb.displayName = 'DrawerHeaderRichiesteTcb';
export default DrawerHeaderRichiesteTcb;
