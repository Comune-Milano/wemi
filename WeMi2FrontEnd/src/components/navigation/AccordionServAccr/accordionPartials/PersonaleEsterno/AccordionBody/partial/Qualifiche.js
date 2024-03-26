import React from 'react';
import Select from 'components/ui2/Select';

const Qualifiche = ({ Value, UpdateValue, Modifica }) => {

  const onClickSelectedItem = (item) => {
    UpdateValue(Value.listaSelezionata.filter((el) => el.id !== item.id));
  };

  const onClickItem = (item) => {
    const newArray = Value.listaSelezionata ? Value.listaSelezionata.slice() : [];
    newArray.push(item);
    UpdateValue(newArray);
  };

  return (
    <Select
      disabled={!Modifica.campi}
      multi
      enableSearch
      required={Value.required}
      maxHeight="30rem"
      color="blue"
      items={Value.listaCompleta}
      selectedValue={Value.listaSelezionata}
      clickedSelectedItem={ onClickSelectedItem }
      clickedItem={ onClickItem }
      label="Qualifiche del personale"
      name="qualificheDelPersonaleEsternoSelect"
    />
  );
};

Qualifiche.displayName = 'QualificheEsterno';


export default Qualifiche;
