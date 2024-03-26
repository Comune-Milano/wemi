import React, { useState } from 'react';
import ModaleUscita from './ModaleUscita';
import { Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import { useLogger } from 'services/Logger';


export const UscitaCandidatura = ({ idOperatore }) => {
  /**
    * The state of the delete modal 
    */
  const [openUscita, setOpenUscita] = useState(false);
  const logger = useLogger();

  return (
    <>
      <ModaleUscita
        logger={logger}
        idOperatore={idOperatore}
        openUscita={openUscita}
        setOpenUscita={setOpenUscita}
      />
      <Column xs="3" padding="1em 0.5em 0 0">
        <Button
          color="red"
          fontSize="f7"
          label="ESCI"
          onClick={() => setOpenUscita(true)}
          padding="0.4em 0"
        />
      </Column>
    </>

  );
}