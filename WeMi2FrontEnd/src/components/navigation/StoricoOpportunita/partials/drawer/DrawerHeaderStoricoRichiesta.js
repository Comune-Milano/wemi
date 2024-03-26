import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';

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

const DrawerHeaderStoricoRichiesta = ({ data }) => (
  <StyledHeader>
    {data ? (
      <>
        <Row fluid>
          <Text
            tag="h2"
            value={`Richiesta ${data.idRichiestaServizioBase} del ${data.dataOfferta}`}
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
            value={data.tipologiaLavoro}
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
            value={`Stato Opportuinità: ${data.statoOpportunitaValue}`}
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

DrawerHeaderStoricoRichiesta.displayName = 'DrawerHeaderStoricoRichiesta';
export default DrawerHeaderStoricoRichiesta;
