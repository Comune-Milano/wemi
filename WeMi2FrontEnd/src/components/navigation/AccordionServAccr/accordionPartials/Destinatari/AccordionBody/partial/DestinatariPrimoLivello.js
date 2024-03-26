import React from 'react';
import Select from 'components/ui2/Select';

const DestinatariPrimoLivello = ({ Value, UpdateValue, Modifica }) => {
  const onClickSelectItem = (value) => { UpdateValue(Value.listaSelezionata.filter((el) => el.id !== value.id)); };

  return (

    <Select
      disabled={!Modifica.campi}
      multi
      enableSearch
      maxHeight="30rem"
      required
      color="blue"
      items={Value.listaCompleta}
      selectedValue={Value.listaSelezionata}
      clickedSelectedItem={(value) => { onClickSelectItem(value); }}
      clickedItem={(value) => { UpdateValue(Value.listaSelezionata.concat(value)); }}
      label="Destinatari"
      name="destinatariPrimoLivello"
    />
  );
};


DestinatariPrimoLivello.displayName = 'Body destinatari sezione destinatari primo livello';

export default DestinatariPrimoLivello;
