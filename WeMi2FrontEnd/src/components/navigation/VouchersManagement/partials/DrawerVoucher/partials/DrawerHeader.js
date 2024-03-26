/** @format */

import React from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { colors } from 'theme';
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

const DrawerHeader = ({ drawerValue }) => (
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
        padding="0 0.2em"
        weight="bold"
        lineHeight="2em"
        transform="uppercase"
        value={`${drawerValue?.voucher?.code ? drawerValue.voucher.code : ''}`}
      >
      </Text>
    </Row>
    <Row fluid>
      <Text
        size="f6"
        lineHeight="2em"
        transform="uppercase"
        value={`${drawerValue?.voucher?.cfIntestatario ? drawerValue.voucher.cfIntestatario : ''}`}
      >
      </Text>
    </Row>
    <Row fluid>
      <Text
        size="f6"
        lineHeight="2em"
        transform="uppercase"
        value={`${drawerValue?.voucher?.nomeTitolare ? drawerValue.voucher.nomeTitolare : ''} ${drawerValue?.voucher?.cognomeTitolare ? drawerValue.voucher.cognomeTitolare : ''}`}
      >
      </Text>
    </Row>
    <Row fluid>
      <Text
        size="f6"
        lineHeight="2em"
        transform="uppercase"
        value="Importo voucher"
      >
      </Text>
      <Text
        size="f6"
        padding="0 0.2em 0 0.4em"
        weight="bold"
        lineHeight="2em"
        value={`${drawerValue?.voucher?.totalImport ? moneyFormat(drawerValue.voucher.totalImport, true) : ''}`}
      >
      </Text>
      <Text
        size="f6"
        lineHeight="2em"
        transform="uppercase"
        value="di cui residuo"
      >
      </Text>
      <Text
        size="f6"
        padding="0 0.2em 0 0.4em"
        weight="bold"
        lineHeight="2em"
        value={`${drawerValue?.voucher?.remainingImport ? moneyFormat(drawerValue.voucher.remainingImport, true) : moneyFormat(0, true)}`}
      >
      </Text>
    </Row>
    <Row fluid>
      <Text
        size="f6"
        lineHeight="2em"
        transform="uppercase"
        value="Contatto"
      >
      </Text>
      <Text
        size="f6"
        padding="0 0.2em 0 0.4em"
        weight="bold"
        lineHeight="2em"
        value={`${drawerValue?.voucher?.emailContatto ? `${drawerValue.voucher.emailContatto} - ` : ''} ${drawerValue?.voucher?.cellContatto ? drawerValue.voucher.cellContatto : ''}`}
      >
      </Text>
    </Row>
  </StyledHeader>
  );

DrawerHeader.displayName = 'DrawerHeader';
export default DrawerHeader;
