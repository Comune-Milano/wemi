import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Accordion from 'components/ui/Accordion';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui/FaIcon';
import Radio from 'components/ui2/RadioGroup';
import Hr from 'components/ui/Hr';
import Checkbox from 'components/ui2/Checkbox';


const ServiceTypology = ({ items, getValue }) => {
  const [checkboxValues, setCheckboxValues] = useState(items.map(() => false));

  /**
   * Handles the change of a checkbox item.
   * @param {*} index
   * @param {*} value
   */
  const handleCheckboxChange = (value, index) => {
    const newCheckboxValues = checkboxValues.map(
      (checkVal, checkIndex) => checkIndex === index ? value : checkVal
    );
    setCheckboxValues(newCheckboxValues);

    const filteredValues = items.filter((_, itemIndex) => newCheckboxValues[itemIndex]);
    getValue(filteredValues);
  };

  return (
    <>
      <Column xs="12" padding="1em 0">
        <Text
          id="numero-persone"
          value="Numero di Persone"
          transform="uppercase"
          letterSpacing="0.05em"
          intlFormatter
          weight="bold"
          color="black"
          tag="h3"
          size="f6"
          margin="0 0 1em 0"
        />
        {
          items.map((checkboxItem, index) => (
            <Row fluid>
              <Checkbox
                value={checkboxValues[index]}
                onChange={(value) => handleCheckboxChange(value, index)}
                label={checkboxItem.value}
                labelledby="numero-persone"
                fontSize="f7"
                checkcolor="primary"
              />
            </Row>
          ))
        }
        {/* <Row fluid>
          <Radio
            radioItems={radioItems}
            selectedItem={radioValue}
            onChange={handleRadioChange}
            fontSize="f7"
            checkcolor={"primary"}
            display="inline-grid"
          />
        </Row> */}
      </Column>
    </>
  );
};

ServiceTypology.displayName = 'ServiceTypology';

export default ServiceTypology;
