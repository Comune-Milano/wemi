import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { withRouter } from 'react-router';
import { PAGE_AREAPERSONALE_URL } from 'types/url';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { CancelButton, SaveButton, SummaryButton, ForwardButton } from './button';
import { buttonVisibilityEnte } from './utils';
import {
  saveInstitutionCard,
  forwardInstitutionCard,
} from './graphql';
import { mapSaveCard } from './mapper';

const ButtonsInstitutionComponent = ({
  history,
  datiLogin,
  getInstitutionCard,
}) => {
  const { dataset, isFormValid } = useFormContext();

  const { stateCode } = dataset;

  const [visibileButton, setVisible] = useState(false);

  const saveCard = useStatelessGraphQLRequest(saveInstitutionCard);

  const forwardCard = useStatelessGraphQLRequest(forwardInstitutionCard);

  const handleSummary = async () => {
    await handleOnSave();
  };

  const handleSave = async () => {
    await handleOnSave();
    await getInstitutionCard();
  };

  const handleOnSave = async () => {
    const mappedDataset = mapSaveCard(dataset);
    await saveCard({
      input: mappedDataset,
    });
  };

  const handleForward = async () => {
    const mappedDataset = mapSaveCard(dataset);
    await forwardCard({
      input: mappedDataset,
    });
    await getInstitutionCard();
    history.push(PAGE_AREAPERSONALE_URL);
  };

  const buttonsVisibilityCallback = React.useCallback((code) =>
    buttonVisibilityEnte(code),
    [dataset]);

  const buttons = buttonsVisibilityCallback(stateCode);

  return (
    <Row fluid flex justifycontent="space-between" alignitems="center">
      {/**
       * Sempre visibile bottone annulla
       */}
      {buttons.annulla.visibility ? (
        <Column xs="12" sm="3" md="3" padding="0">
          <CancelButton
            callback={() => {
              history.push(PAGE_AREAPERSONALE_URL);
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
              history.push(PAGE_AREAPERSONALE_URL);
            }}
            disabled={visibileButton}
          />
        </Column>
      )
        : null}
      {/**
       * Sempre visibile bottone riepilogo
       */}
      {buttons.riepilogo.visibility ? (
        <Column xs="12" sm="3" md="3" padding="0" sizepadding={{ xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em' }}>
          <SummaryButton
            institutionId={datiLogin.idEnte}
            onSave={async () => {
              await handleSummary();
            }}
            onClose={() =>
              getInstitutionCard()
            }
          />
        </Column>
      ) :
        null}
      {buttons.inoltra.visibility ? (
        <Column xs="12" sm="3" md="3" padding="0" sizepadding={{ xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em' }}>
          <ForwardButton
            callback={async () => {
              await handleForward();
            }}
            disabled={!isFormValid}
          />
        </Column>
      ) : null}
    </Row>
  );
};

ButtonsInstitutionComponent.displayName = 'Buttons institution card';

export const ButtonsInstitution = withRouter(ButtonsInstitutionComponent);
