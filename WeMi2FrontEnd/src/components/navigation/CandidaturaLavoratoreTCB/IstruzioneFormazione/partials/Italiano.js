
import React from 'react';
import LinguaSelezionata from './LinguaSelezionata';
import { Row } from 'components/ui/Grid';

const Italiano = ({
  dataset,
  idLavoratore,
  setFormField
}) => {
  const linguaSelezionata = {
    nome: 'Italiano',
    inizializzazione: dataset.livelloConoscenzaItaliano,
    valoreCorsi: dataset.corsiItaliano,
  };
  return (
    <>
      <LinguaSelezionata
        elemento={linguaSelezionata}
        dataset={dataset}
        idLavoratore={idLavoratore}
        setFormField={setFormField}
        italiano
      />
    </>
  );
};

Italiano.displayName = 'Italiano';

export default (Italiano);
