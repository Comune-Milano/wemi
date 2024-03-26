import React from 'react';
import Select from 'components/ui2/Select';

const PeriodoErogazione = ({ Value, UpdateValue, Modifica }) => {
  const onClickSelectItem = (value) => {
    UpdateValue(Value.listaSelezionata.filter((el) => el.id !== value.id));
  };

  return (

    <Select
      disabled={!Modifica.campi}
      multi
      color="blue"
      maxHeight="30rem"
      items={Value.listaCompleta}
      required
      selectedValue={Value.listaSelezionata}
      clickedSelectedItem={(value) => { onClickSelectItem(value); }}
      clickedItem={(value) => { UpdateValue(Value.listaSelezionata.concat(value)); }}
      label="Periodo erogazione"
      name="periodoErogazioneSelect"
    />
  );
};

PeriodoErogazione.displayName = 'PeriodoErogazione';

export default PeriodoErogazione;
