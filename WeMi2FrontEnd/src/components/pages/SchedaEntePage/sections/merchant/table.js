import React from 'react';
import moment from 'moment';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { Column } from 'components/ui/Grid';
import { DataRow } from './style';

const formatDate = date => moment(date).format('DD/MM/YYYY');

const Table = ({
  data,
  handleRowClick,
  buttonLabel,
}) => data ?
  (
    <DataRow
      flex
      alignitems="center"
      justifycontent="center"
    >
      <Column xs="12" md="4" padding="5px">
        <Text
          tag="strong"
          value="Merchant ID"
          color="darkGrey"
          weight="bold"
          transform="uppercase"
          marging="0 0 0.5em 0"
          size="f8"
        />
        <br />
        <Text
          tag="span"
          value={data.id}
          color="black"
          weight="bold"
          marging="0 0 0.5em 0"
          size="f6"
        />
      </Column>

      <Column xs="12" md="3" padding="5px">
        <Text
          tag="strong"
          value="Data inizio"
          color="darkGrey"
          weight="bold"
          transform="uppercase"
          marging="0 0 0.5em 0"
          size="f8"
        />
        <br />
        <Text
          tag="span"
          value={formatDate(data.startDate)}
          color="black"
          weight="bold"
          transform="uppercase"
          marging="0 0 0.5em 0"
          size="f6"
        />
      </Column>
      <Column xs="12" md="3" padding="5px">
        <Text
          tag="strong"
          value="Data fine"
          color="darkGrey"
          weight="bold"
          transform="uppercase"
          marging="0 0 0.5em 0"
          size="f8"
        />
        <br />
        <Text
          tag="span"
          value={data.endDate ? formatDate(data.endDate) : 'Periodo aperto'}
          color="black"
          weight="bold"
          transform="uppercase"
          marging="0 0 0.5em 0"
          size="f6"
        />
      </Column>
      <Column xs="12" md="2" padding="5px">
        <Button
          autowidth
          label={buttonLabel}
          color="blue"
          size="f7"
          onClick={() => handleRowClick()}
        />
      </Column>
    </DataRow>
  )
  : null;

Table.displayName = 'Riepilogo dati transazione';

export default Table;
