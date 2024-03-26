import React from 'react';
import Select from 'components/ui2/Select';

const SostegniEconomici = ({ Value, UpdateValue, Modifica }) => {
  const onClickSelectItem = (value) => {
    UpdateValue(Value.listaSelezionata.filter((el) => el.id !== value.id));
  };

  return (

    <Select
      disabled={!Modifica.campi}
      multi
      maxHeight="30rem"
      enableSearch
      color="blue"
      items={Value.listaCompleta}
      selectedValue={Value.listaSelezionata}
      clickedSelectedItem={(value) => { onClickSelectItem(value); }}
      clickedItem={(value) => { UpdateValue(Value.listaSelezionata.concat(value)); }}
      label="Sostegni economici"
      name="sostegniEconomiciSelect"
    />
  );
};

SostegniEconomici.displayName = 'SostegniEconomici';


export default SostegniEconomici;
