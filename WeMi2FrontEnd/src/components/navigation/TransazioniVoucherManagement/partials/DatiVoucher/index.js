/** @format */

import React from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const DatiVoucher = ({
  datiVoucher,
}) => {
  return (
    <>
      <Text
        align="left"
        tag="h2"
        value={datiVoucher?.title ? datiVoucher.title : ''}
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
          value={`${datiVoucher?.voucher?.code ? datiVoucher.voucher.code : ''}`}
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
          padding="0 0.4em"
          weight="bold"
          lineHeight="2em"
          value={`${datiVoucher?.voucher?.totalImport ? moneyFormat(datiVoucher.voucher.totalImport, true) : ''}`}
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
          padding="0 0.4em"
          weight="bold"
          lineHeight="2em"
          value={`${datiVoucher?.voucher?.remainingImport ? moneyFormat(datiVoucher.voucher.remainingImport, true) : ''}`}
        >
        </Text>
      </Row>
      <Row fluid>
        <Text
          size="f6"
          lineHeight="2em"
          transform="uppercase"
          value="Cf intestatario Voucher"
        >
        </Text>
        <Text
          size="f6"
          padding="0 0.3em"
          lineHeight="2em"
          weight="bold"
          transform="uppercase"
          value={`${datiVoucher?.voucher?.cfIntestatario ? datiVoucher.voucher.cfIntestatario : ''}`}
        >
        </Text>
      </Row>
      <Row fluid>
        <Text
          size="f6"
          lineHeight="2em"
          transform="uppercase"
          value="CONTATTO"
        >
        </Text>
        <Text
          size="f6"
          padding="0 0.3em"
          lineHeight="2em"
          weight="bold"
          value={`${datiVoucher?.voucher?.emailContatto ? `${datiVoucher.voucher.emailContatto} - ` : ''} ${datiVoucher?.voucher?.cellContatto ? datiVoucher.voucher.cellContatto : ''}`}
        >
        </Text>
      </Row>
    </>
  );
};

DatiVoucher.displayName = 'DatiVoucher';
export default DatiVoucher;
