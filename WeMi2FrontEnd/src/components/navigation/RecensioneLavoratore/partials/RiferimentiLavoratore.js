import React from 'react';
import Text from 'components/ui/Text';
import { useFormContext } from 'libs/Form/hooks/useFormContext';

const RiferimentiLavoratore = () => {
  const { dataset } = useFormContext();


  const anagraficaLavoratore = `${dataset.cognomeLavoratore} ${dataset.nomeLavoratore}`;

  return (
    <>
      <Text
        weight="bold"
        value="Riferimenti lavoratore: "
        size="f5"
      />
      <Text
        value={anagraficaLavoratore}
        size="f5"
      />
      <div></div>
      <Text
        weight="bold"
        value="Servizio: "
        size="f5"
      />
      <Text
        value={dataset.serviziPrestati.map(el => `${el.nomeservizio} `)}
        size="f5"
      />
    </>
  );
};

RiferimentiLavoratore.displayName = 'RiferimentiLavoratore';

export default (RiferimentiLavoratore);
