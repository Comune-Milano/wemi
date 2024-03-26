import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Accordion from 'components/ui/Accordion';
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import Checkbox from 'components/ui2/Checkbox';

const When = ({
  getValue,
  items,
}) => {
  const checkValues = items.map(el => {
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
  }
  return (
    <>
      <Column xs="12" padding="1em 0">
        <Text
          tag="h3"
          value="Momento della giornata"
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
          margin="0 0 1em 0"
          size="f6" />
        {checkValues.map((el, index) => (
          <Row fluid key={index.toString()}>
            <Checkbox
              value={checkValue[index]}
              onChange={(value) => { handleCheckbox(value, index) }}
              label={el.value}
              labelledby={el.value}
              fontSize="f7"
              checkcolor="primary"
            />
          </Row>
        ))}

      </Column>
    </>
  )
}

export default When;
