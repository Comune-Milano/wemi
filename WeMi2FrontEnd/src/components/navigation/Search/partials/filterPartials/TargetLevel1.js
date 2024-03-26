import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';

const TargetLevel1 = ({
  getValue,
  destinatariPrimoLivello
}) => {

  const checkValues = destinatariPrimoLivello.map(el => {
    return {
      id: el.value,
      value: el.textValue,
    }
  });
  const [checkValue, setCheckValue] = useState(checkValues.map(_ => { return false }));
  const handleCheckbox = (value, pos) => {
    let newCheckValues = checkValue.slice();
    newCheckValues = newCheckValues.map((val, index) => {
      if (index !== pos) {
        return val;
      }
      else {
        return value;
      }
    });
    setCheckValue(newCheckValues)
    getValue(checkValues.filter((el, index) => {
      if (newCheckValues[index]) {
        return el
      }
    }))
  };

  return (
    <>
      <Column xs="12" padding="1em 0">
        <Text
          value="Destinatari"
          transform="uppercase"
          letterSpacing="0.05em"
          size="f6"
          weight="bold"
          tag="h3"
          margin="0 0 1em 0"
          color="black"
        />
        {checkValues.map((destinatario, index) => (
          <Row fluid key={index.toString()}>
            <Checkbox
              value={checkValue[index]}
              onChange={(value) => { handleCheckbox(value, index) }}
              label={destinatario.value}
              labelledby={destinatario.value}
              fontSize="f7"
              checkcolor="primary"
            />
          </Row>
        ))}
      </Column>
    </>
  )
}

export default TargetLevel1;