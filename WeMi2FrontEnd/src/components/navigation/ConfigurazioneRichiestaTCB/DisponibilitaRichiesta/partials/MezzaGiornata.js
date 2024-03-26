/** @format */

import React, { useState, useEffect, useRef } from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import GroupFieldTitle from '../../partials/GroupFieldTitle';
import FieldTitle from '../../partials/FieldTitle';
import { getTCBServiceName } from '../../utils';
import Select from 'components/ui2/Select';
import { createSelectArray } from '../../utils';

const MezzaGiornata = ({
  setFormField,
  mezzaGiornataRiposo,
  giorniSettimana,
  handleFieldBlur,
  servizioTCB,
  locale
}) => {

  const giorniSettimanaSelect = createSelectArray(giorniSettimana, locale);

  const setMultiSelectValue = (selectedValues, value) => {
    if (selectedValues.find(el => el.id === -1)) {
      return [value]
    }
    else return selectedValues.concat(value)
  };

  const unsetMultiSelectValue = (selectedValues, value) => {
    let newArr = selectedValues.filter((el) => el.id !== value.id);
    if (!newArr.length) {
      return [{
        id: -1,
        value: undefined
      }]
    }
    else return newArr
  };

  return (
    <>
      <GroupFieldTitle
        title={`Hai delle preferenze sulla mezza giornata di riposo?`}
        required
      />
      <Row fluid margin="0">
        <Column xs="12" md="5" padding="0" flex>
          <Select
            multi
            items={giorniSettimanaSelect}
            name="mezzaGiornataRiposo"
            // error={!!errors["mezzaGiornataRiposo.id"] || !!errors["mezzaGiornataRiposo.value"]}
            onBlur={() => handleFieldBlur('mezzaGiornataRiposo')}
            selectedValue={mezzaGiornataRiposo.find(el => el.id === -1) ? [] : mezzaGiornataRiposo}
            clickedSelectedItem={(value) => setFormField('mezzaGiornataRiposo',
              unsetMultiSelectValue(mezzaGiornataRiposo, value))}
            clickedItem={(value) => setFormField('mezzaGiornataRiposo',
              setMultiSelectValue(mezzaGiornataRiposo, value))}
            placeholder="Seleziona le preferenze dei giorni"
            labelSelected="preferenze dei giorni di riposo"
          />
        </Column>
      </Row>
    </>
  )
};

MezzaGiornata.displayName = 'MezzaGiornata';

export default MezzaGiornata;