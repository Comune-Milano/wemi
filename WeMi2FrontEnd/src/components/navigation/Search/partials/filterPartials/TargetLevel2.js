import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled, { css } from 'styled-components';
import Accordion from 'components/ui/Accordion';
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import Checkbox from 'components/ui2/Checkbox';

const ShowFilterWrap = styled.div`
${props => !props.shown && css`
  max-height: 0;
  width: 100%;
  opacity: 0;
  transition: max-height .8s linear, opacity .4s linear;
`}

${props => props.shown && css`
height: auto;
max-height: 60vh;
opacity: 1;
transition: max-height .8s linear, opacity .8s linear;
`}
`;


const TargetLevel2 = ({ 
  getValue,
  showTarget2Filter,
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
  }, [items]);

  // useEffect(
  //   () => {
  //     if (!showTarget2Filter) {
  //       setCheckValue(checkValues.map(_ => { return false }));
  //     }
  //   },
  //   [showTarget2Filter]
  // );

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
    <ShowFilterWrap shown={showTarget2Filter}>
      <Column xs="12" padding="1em 0">
        <Text
          value="Dettaglio destinatari"
          transform="uppercase"
          letterSpacing="0.05em"
          size="f6"
          tag="h3"
          color="black"
          margin="0 0 1em 0"
          weight="bold"
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
    </ShowFilterWrap>
  )
}

export default TargetLevel2;