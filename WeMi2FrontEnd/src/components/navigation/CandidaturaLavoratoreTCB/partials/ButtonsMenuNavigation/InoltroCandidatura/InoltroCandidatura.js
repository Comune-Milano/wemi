import React, { useState } from 'react';
import { Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Tooltip from 'components/ui2/Tooltip';
import { useLogger } from 'services/Logger';
import ModaleConfermaCandidatura from './ModaleConfermaCandidatura';
import ModaleInvioCandidatura from './ModaleInvioCandidatura';

const InoltroCandidaturaComponent = ({
  idOperatore,
  idLavoratore,
  checkCandidacyValidity,
}) => {
 /**
  * The state of the delete modal
  */
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

 /**
  * The state of the forwards candidacy modal
  */
  const [openForwardsModal, setOpenForwardsModal] = useState(false);

  const logger = useLogger();
  return (
    <>
      <ModaleInvioCandidatura
        logger={logger}
        idLavoratore={idLavoratore}
        idOperatore={idOperatore}
        openForwardsModal={openForwardsModal}
        setOpenForwardsModal={setOpenForwardsModal}
        setOpenConfirmModal={setOpenConfirmModal}
      />
      <ModaleConfermaCandidatura
        setOpenConfirmModal={setOpenConfirmModal}
        openConfirmModal={openConfirmModal}
      />
      <Column xs="12" padding="0">
        <Tooltip
          fluid
          position="top"
          color="white"
          bgcolor="blue"
          posAdjustment="20%"
          preventOnHover={checkCandidacyValidity}
          value="Per inoltrare la candidatura è necessario compilare i campi obbligatori di tutte le sezioni"
        >
          <Button
            type="button"
            color="blue"
            fontSize="f7"
            width="100%"
            label="Invia candidatura"
            disabled={!checkCandidacyValidity}
            onClick={() => {
              setOpenForwardsModal(true);
            }}
          />
        </Tooltip>
      </Column>
    </>
  );
};

InoltroCandidaturaComponent.displayName = 'Inoltro candidatura component';

export const InoltroCandidatura = InoltroCandidaturaComponent;
