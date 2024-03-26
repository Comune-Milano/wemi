/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme'
import Text from 'components/ui/Text';
import moment from 'moment';
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

const DrawerHeader = ({ 
  Data, 
  dataDaVisible, 
  numeroPrestazioniVisible,
  numeroPersoneVisible
}) => {

  return (
    <StyledHeader>
      <Text
        tag="h2"
        value={'Richiesta ' + Data.statoRichiesta.text}
        color={Data.statoRichiesta.color}
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f5"
      />
      <Text
        tag="strong"
        value={Data.nomeServizio}
        color="primary"
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f6"
      />
      <br />
      <Text
        tag="strong"
        value={'Richiesta ' + Data.idRichiestaBase + ' del ' + Data.dataRichiesta}
        color="black"
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f6"
      />
      <Row fluid xs="12" md="10" margin="2.5em 0 0 0">
        { dataDaVisible ?
          <Column xs="12" padding="0 0 1em 0">
            <Text
              tag="strong"
              value="Periodo"
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"
            />
            <br />
            <Text
              tag="span"
              value={moment(Data.dataDa, "DD/MM/YYYY").isValid() ? 'Dal ' + Data.dataDa + ' al ' + Data.dataA : 'N/D'}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f6"
            />
          </Column>
          : null}
        { numeroPrestazioniVisible ?
          <Column xs="12" sm="5" padding="0 0.5em 1em 0" sizemargin={{md:"0 1.5em 0 0", lg:"0 1em 0 0"}}>
            <Text
              tag="strong"
              value="Numero di prestazioni"
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"
            />
            <br />
            <Text
              tag="span"
              value={Data.numeroPrestazioni + ' prestazion' + ((Data.numeroPrestazioni > 1) ? 'i' : 'e')}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f6"
            />
          </Column>
          : null}
        { numeroPersoneVisible ?
          <Column xs="12" sm="6" padding="0 1em 1em 0">
            <Text
              tag="strong"
              value="Numero di persone"
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"
            />
            <br />
            <Text
              tag="span"
              value={Data.numeroPersone + ' person' + ((Data.numeroPersone > 1) ? 'e' : 'a')}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f6"
            />
          </Column>
          : null}
      </Row>
    </StyledHeader>
  );
};

DrawerHeader.displayName = 'DrawerHeader';
export default DrawerHeader;
