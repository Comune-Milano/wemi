import React from 'react';
import { DraggableMultiSelect } from 'components/ui2/DraggableMultiSelect';

const Mansioni = ({ 
  Value, 
  Modifica, 
  setForm, 
  form 
}) => {
  
  const handleAddItem = (selectedItems, selectableItems) => {
    setForm({ ...form, listaSelezionataMansioni: selectedItems, listaCompletaMansioni: selectableItems });
  };

  const handleDeleteItem = (selectedItems, selectableItems) => {
    setForm({ ...form, listaSelezionataMansioni: selectedItems, listaCompletaMansioni: selectableItems });
  };

  const handleSort = (selectedItems) => {
    setForm({ ...form, listaSelezionataMansioni: selectedItems });
  };

  return (
    <DraggableMultiSelect
      disabled={!Modifica.campi}
      color="blue"
      items={Value.listaCompleta} 
      selectedItems={Value.listaSelezionata}
      onAdd={handleAddItem}
      onDelete={handleDeleteItem}
      onSort={handleSort}
      required={Value.required}
      sortItemsFunction={(items) =>
        items.sort((a,b) => a.nrOrdineVisualizzazione - b.nrOrdineVisualizzazione)
      }
      label="Mansioni"
      sortableElementsLabel="Mansioni selezionate"
      selectedElementsLabel="Mansioni disponibili"
    />
  );
};

Mansioni.displayName = 'Mansioni';

export default Mansioni;
