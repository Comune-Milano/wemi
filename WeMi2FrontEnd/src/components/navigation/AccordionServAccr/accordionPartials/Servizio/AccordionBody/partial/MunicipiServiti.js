import React, { useEffect, useState } from 'react';
import Select from 'components/ui2/Select';


const MunicipiServiti = ({ Value, UpdateValue, Modifica }) => {
  const items = [{ id: 0, value: 'TUTTI I MUNICIPI' }, ...Value.listaCompleta];

  const onClickSelectItem = (value) => { handleSelectItem(Value.listaSelezionata.filter((el) => el.id !== value.id)); };

  function handleSelectItem(items) {
    const lastItem = items[items.length - 1];
    if (lastItem && lastItem.id === 0) {
      UpdateValue([{ id: 0, value: 'TUTTI I MUNICIPI' }]);
    } else {
      const newItems = items.filter(el => el.id !== 0);
      UpdateValue(newItems);
    }
  }

  return (
    <Select
      disabled={!Modifica.campi}
      multi
      maxHeight="30rem"
      color="blue"
      items={items}
      required
      selectedValue={Value.listaSelezionata}
      clickedSelectedItem={(value) => { onClickSelectItem(value); }}
      clickedItem={(value) => { handleSelectItem(Value.listaSelezionata.concat(value)); }}
      label="Municipi Serviti"
      name="municipiServitiSelect"
    />
  );
};

MunicipiServiti.displayName = 'MunicipiServiti';


export default MunicipiServiti;
