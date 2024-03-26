import React from 'react';
import { Row } from 'components/ui/Grid';
import InputNumber from 'components/ui2/InputNumber';
import Text from 'components/ui/Text';
import { limitsValue, content } from './constants';

const InputNumbers = ({ Form, UpdateValue, Modifica }) => (
  <Row padding="0" fluid>
    {
      content.map((descrittore, index) => (
        <Row fluid margin="0 0 1rem 0" key={`Descrittore-${descrittore.key}`}>
          <InputNumber
            value={Form[descrittore.key] || 0}
            onChange={(value) => { UpdateValue(Number.parseInt(value, 10), descrittore.key); }}
            onInputChange={(value) => { UpdateValue(Number.parseInt(value, 10), descrittore.key); }}
            minValue={limitsValue.min}
            maxValue={limitsValue.max}
            size="f7"
            iconColor="primary"
            textColor="black"
            ariaLabel={descrittore.text}
            disabled={!Modifica?.campi}
          />
          <Text
            tag="span"
            size="f7"
            value={descrittore.text}
            padding="0 0 0 1.5em"
            weight="bold"
            color="darkGrey"
          />
        </Row>
      ))
    }
  </Row>
);

InputNumbers.displayName = 'InputNumbers Dimensione Del Benessere';


export default InputNumbers;
