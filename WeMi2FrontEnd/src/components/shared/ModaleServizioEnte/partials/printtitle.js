/** @format */
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import React from 'react';

const PrintTitle = ({ titoloServizio }) => {
  const titoloSchedaServizio = `Scheda del servizio - ${titoloServizio}`;

  return (
    <Row margin="4rem 0 5rem 0" justifycontent="center">
      <Text
        value={titoloSchedaServizio}
        size="f7"
        color="black"
      />
    </Row>
  );
};

PrintTitle.displayName = 'PrintTitle';

export default React.memo(PrintTitle);
