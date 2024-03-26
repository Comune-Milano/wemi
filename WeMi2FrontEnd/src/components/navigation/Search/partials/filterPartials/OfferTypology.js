import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Switch from 'components/ui2/Switch';


const OfferTypology = ({ getValue }) => {
  const [switchOn, setSwitchOn] = useState(false)
  return (
    <>
      <Column xs="12" padding="1em 0">
        <Text
          tag="h3"
          value="prezzo"
          color="black"
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
          size="f6" />
        <Switch
          value={switchOn}
          onChange={(value) => {
            setSwitchOn(value);
            if (value) {
              getValue(value)
            } else {
              getValue(value)
            }
          }}
          fontSize="f7"
          label={"Solo servizi gratuiti"}
          spacing="1em 1.5em 0.5em 0"
          checkcolor={"primary"}
        />
      </Column>

    </>
  )
};

export default OfferTypology;