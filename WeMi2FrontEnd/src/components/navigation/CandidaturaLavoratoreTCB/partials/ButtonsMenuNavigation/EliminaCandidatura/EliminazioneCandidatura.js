import React, { useState } from 'react';
import ModaleEliminazione from './ModaleEliminazione';
import { Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import { useLogger } from 'services/Logger';


export const EliminazioneCandidatura = ({
  idOperatore,
  idLavoratore,
  isLavoratoreAssociato,
}) => {
  /**
    * The state of the delete modal 
    */
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const logger = useLogger();


  return (
    <>
      <ModaleEliminazione
        logger={logger}
        idLavoratore={idLavoratore}
        idOperatore={idOperatore}
        openElimina={openDeleteModal}
        setOpenElimina={setOpenDeleteModal}
      />
      <Column xs="9" padding="1em 0.5em 0 0">
        <Button
          color="red"
          fontSize="f7"
          label="ELIMINA TUTTI I DATI INSERITI"
          onClick={() => setOpenDeleteModal(true)}
          padding="0.4em 0"
          disabled={isLavoratoreAssociato}
        />
      </Column>
    </>

  );
}