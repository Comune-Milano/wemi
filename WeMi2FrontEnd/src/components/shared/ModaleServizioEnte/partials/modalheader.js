/** @format */
import { Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import React from 'react';
import { ModalHeader, PrintButtonColumn, RowHeader, ColumnTitle } from '../components.styled';

const HeaderSchedaServizio = ({ txTitoloServizio, nomeEnte }) => (
  <ModalHeader
    mobileFullScreen="true"
  >
    <RowHeader margin="0" padding="0">
      <ColumnTitle
        xs="12"
        sm="9"
        lg="10"
        margin="0"
        padding="3.12rem 4.69rem"
        sizepadding={{
          xs: '2.5rem 0 2.5rem 2rem',
          sm: '0 3.15rem 3.15rem 3.15rem',
        }}
      >
        <Text
          tag="h2"
          value={txTitoloServizio}
          size="f4"
          weight="bold"
          color="black"
        />
        <Text
          tag="span"
          value={nomeEnte}
          size="f7"
          weight="bold"
          transform="uppercase"
          letterSpacing="0.05em"
        />
      </ColumnTitle>
      <PrintButtonColumn xs="12" sm="3" lg="2" margin="0" padding="0" textAlign="right">
        <Button
          width="auto"
          label="Stampa"
          color="primary"
          onClick={() => window.print()}
        />
      </PrintButtonColumn>
    </RowHeader>
  </ModalHeader>
);

HeaderSchedaServizio.displayName = 'HeaderSchedaServizio';

export default React.memo(HeaderSchedaServizio);
