import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';

const Tasks = ({
  getValue,
  items,
}) => {


  const checkValues = items.map(el => {
    return {
      id: el.value,
      value: el.textValue,
    }
  });
  const [checkValue, setCheckValue] = useState([]);

  useEffect(() => {
    if (checkValue.length !== checkValues.length) {
      setCheckValue(checkValues.map(_ => { return false }))
    }
  }, [items])

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
          value="Mansioni"
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
          color="black"
          tag="h3"
          margin="0 0 1em 0"
          size="f6" />
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

export default Tasks;