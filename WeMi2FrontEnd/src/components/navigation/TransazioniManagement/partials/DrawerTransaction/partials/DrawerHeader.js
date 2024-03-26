/** @format */

import React from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import media from 'utils/media-queries';
import { colors } from 'theme';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

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

const DrawerHeader = ({ drawerValue }) => {

  return (
    <StyledHeader>
      <Text
        align="left"
        tag="h2"
        value={drawerValue?.title ? drawerValue.title : ''}
        color="green"
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f5"
      />
      <Row fluid>
        <Text
          size="f6"
          lineHeight="2em"
          transform="uppercase"
          value="Voucher nr"
        >
        </Text>
        <Text
          size="f6"
          padding="0 0.4em"
          weight="bold"
          lineHeight="2em"
          transform="uppercase"
          value={`${drawerValue?.transaction?.codiceVoucher ? drawerValue.transaction.codiceVoucher : ''}`}
        >
        </Text>
      </Row>
      <Row fluid>
        <Text
          size="f6"
          lineHeight="2em"
          transform="uppercase"
          value="Transazione nr"
        >
        </Text>
        <Text
          size="f6"
          padding="0 0.4em"
          weight="bold"
          lineHeight="2em"
          transform="uppercase"
          value={`${drawerValue?.transaction?.idTransazioneVoucher ? drawerValue.transaction.idTransazioneVoucher : ''}`}
        >
        </Text>
      </Row>
      <Row fluid>
        <Text
          size="f6"
          lineHeight="2em"
          transform="uppercase"
          value="Cf minore"
        >
        </Text>
        <Text
          size="f6"
          padding="0 0.4em"
          weight="bold"
          lineHeight="2em"
          transform="uppercase"
          value={`${drawerValue?.transaction?.cfMinore ? drawerValue.transaction.cfMinore : ''}`}
        >
        </Text>
      </Row>

      <Row fluid>
        <Text
          size="f6"
          lineHeight="2em"
          transform="uppercase"
          value="Importo transazione"
        >
        </Text>
        <Text
          size="f6"
          padding="0 0.4em"
          weight="bold"
          lineHeight="2em"
          value={`${drawerValue?.transaction?.importoSpeso ? moneyFormat(drawerValue.transaction.importoSpeso, true) : ''}`}
        >
        </Text>
      </Row>
    </StyledHeader>
  );
};

DrawerHeader.displayName = 'DrawerHeader';
export default DrawerHeader;
