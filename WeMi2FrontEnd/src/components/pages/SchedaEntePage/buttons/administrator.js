
import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { withRouter } from 'react-router';
import { PAGE_GESTIONEENTE_URL } from 'types/url';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
  CancelButton,
  SaveButton,
  SummaryButton,
  ValidateButton,
  ForwardNotesButton,
  DeactivateButton,
} from './button';
import { buttonsStyleAdmin } from './utils';
import {
  forwardNotesInstitutionCard,
  deactivateInstitutionCard,
  validateInstitutionCard,
  saveInstitutionCardAdmin,
} from './graphql';
import { mapNotes, mapSaveCard } from './mapper';

const ButtonsAdministratorComponent = ({
  history,
  getInstitutionCard,
  institutionId,
}) => {
  const { dataset } = useFormContext();

  const { stateCode } = dataset;

  const [visibileButton, setVisible] = useState(false);

  const saveCard = useStatelessGraphQLRequest(saveInstitutionCardAdmin);

  const deactivateCard = useStatelessGraphQLRequest(deactivateInstitutionCard);

  const validateCard = useStatelessGraphQLRequest(validateInstitutionCard);

  const forwardNotesCard = useStatelessGraphQLRequest(forwardNotesInstitutionCard);

  const handleSummary = async () => {
    await handleOnSave();
  };

  const handleSave = async () => {
    await handleOnSave();
    await getInstitutionCard({ institutionId });
  };

  const handleOnSave = async () => {
    const mappedDataset = mapSaveCard(dataset);
    const mappedNotes = mapNotes(dataset);
    await saveCard({
      input: {
        ...mappedDataset,
        id: institutionId,
      },
      notes: mappedNotes,
    });
  };

  const handleForwardNotes = async () => {
    const mappedNotes = mapNotes(dataset);
    const mappedDataset = mapSaveCard(dataset);
    await forwardNotesCard({
      input: {
        notes: mappedNotes,
        id: institutionId,
      },
      others: {
        ...mappedDataset,
        id: institutionId,
      },
    });
    await getInstitutionCard({ institutionId });
    history.push(PAGE_GESTIONEENTE_URL);
  };

  const handleDeactivate = async () => {
    const mappedDataset = mapSaveCard(dataset);
    const mappedNotes = mapNotes(dataset);
    await deactivateCard({
      input: {
        ...mappedDataset,
        id: institutionId,
      },
      notes: mappedNotes,
    });
    await getInstitutionCard({ institutionId });
    history.push(PAGE_GESTIONEENTE_URL);
  };

  const handleValidate = async () => {
    const mappedDataset = mapSaveCard(dataset);
    const mappedNotes = mapNotes(dataset);
    await validateCard({
      input: {
        ...mappedDataset,
        id: institutionId,
      },
      notes: mappedNotes,
    });
    await getInstitutionCard({ institutionId });
    history.push(PAGE_GESTIONEENTE_URL);
  };

  const buttonsStyleCallback = React.useCallback((code) =>
  buttonsStyleAdmin(code),
    [dataset]);

  const buttons = buttonsStyleCallback(stateCode);

  return (
    <Row fluid flex justifycontent="space-between" alignitems="center">
      {/**
       * Sempre visibile bottone annulla
       */}
      {buttons.annulla.visibility ? (
        <Column xs="12" sm="3" md="3" padding="0">
          <CancelButton
            callback={() => {
              history.push(PAGE_GESTIONEENTE_URL);
            }}
          />
        </Column>
      ) : null}
      {buttons.salva.visibility ? (
        <Column xs="12" sm="3" md="3" padding="0" sizepadding={{ xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em' }}>
          <SaveButton
            callback={async () => {
              setVisible(true);
              await handleSave();
              history.push(PAGE_GESTIONEENTE_URL);
            }}
            disabled={visibileButton}
          />
        </Column>
      ) : null}
      {/**
       * Sempre visibile bottone riepilogo
       */}
      {buttons.riepilogo.visibility ? (
        <Column xs="12" sm="3" md="3" padding="0" sizepadding={{ xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em' }}>
          <SummaryButton
            institutionId={institutionId}
            onSave={async () => {
              await handleSummary();
            }}
            onClose={() =>
              getInstitutionCard({ institutionId })
            }
          />
        </Column>
      ) : null}
      {buttons.inoltranote.visibility ? (
        <Column xs="12" sm="3" md="3" padding="0" sizepadding={{ xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em' }}>
          <ForwardNotesButton
            callback={async () => {
              // TODO Chiamata ad entpoint graphql
              await handleForwardNotes();
            }}
          />
        </Column>
      ) : null}
      {buttons.disattiva.visibility ? (
        <Column xs="12" sm="3" md="3" padding="0" sizepadding={buttons.disattiva.sizepadding}>
          <DeactivateButton
            callback={async () => {
              // TODO Chiamata ad entpoint graphql
              await handleDeactivate();
            }}
          />
        </Column>
      ) : null}
      {buttons.valida.visibility ? (
        <Column xs="12" sm="3" md="3" padding="0" sizepadding={buttons.valida.sizepadding}>
          <ValidateButton
            callback={async () => {
              // TODO Chiamata ad entpoint graphql
              await handleValidate();
            }}
          />
        </Column>
      ) : null}
    </Row>
  );
};
ButtonsAdministratorComponent.displayName = 'Buttons admin scheda ente';


export const ButtonsAdministrator = withRouter(ButtonsAdministratorComponent);
