/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';

const AltraEsperienza = ({
  altreEsperienze,
  setAltreEsperienze
}) => {

  return (
    <Row fluid margin="2.5em 0 0 0" >
      <Checkbox
        value={altreEsperienze.check}
        onChange={(value) => { setAltreEsperienze({... altreEsperienze, check: value})}}
        label="Esperienze lavorative in altri ambiti (specificare)"
        checkcolor="primary"
        width="auto"
      />
      { altreEsperienze.check ?
      <Row fluid margin="1em 0 0 0">
        <TextArea
          onChange={(value) => {setAltreEsperienze({... altreEsperienze, TextArea: value}) }}
          placeholder="Scrivi qui eventuali altre esperienze"
          inputValue={altreEsperienze.TextArea}
          name="terapieSpecificate"
          rows="3"
          width="30%"
        />
      </Row>
      : null
      }
    </Row>
  );
};

AltraEsperienza.displayName = 'AltraEsperienza';

export default (AltraEsperienza);