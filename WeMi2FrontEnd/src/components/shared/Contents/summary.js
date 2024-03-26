import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import moment from 'moment';

const Summary = ({
  id,
  version,
  startDate,
  endDate,
  isEdit = false,
}) => (
  <React.Fragment>
    {isEdit ? (
      <Row margin="1rem 0">
        <Text
          value="Id contenuto:"
          transform="uppercase"
          color="darkGrey"
          size="1rem"
          letterSpacing="0.05em"
        />
      &nbsp;
        <Text
          value={id || ''}
          size="1rem"
          color="blue"
          weight="bold"
        />
      </Row>
    )
      : null}
    <Row margin="1rem 0">
      <Text
        value="Numero versione:"
        transform="uppercase"
        color="darkGrey"
        size="1rem"
        letterSpacing="0.05em"
      />
      &nbsp;
      <Text
        value={version || ''}
        size="1rem"
        color="blue"
        weight="bold"
      />
    </Row>
    <Row margin="1rem 0">
      <Text
        value="Periodo Validità:"
        transform="uppercase"
        color="darkGrey"
        size="1rem"
        letterSpacing="0.05em"
      />
      &nbsp;
      <Text
        value={`${moment(startDate).format('DD/MM/YYYY')} - ${endDate ? moment(endDate).format('DD/MM/YYYY') : 'N/D'}`}
        size="1rem"
        color="blue"
        weight="bold"
      />
    </Row>

  </React.Fragment>
);

Summary.displayName = 'Summary Content';

export default React.memo(Summary);
