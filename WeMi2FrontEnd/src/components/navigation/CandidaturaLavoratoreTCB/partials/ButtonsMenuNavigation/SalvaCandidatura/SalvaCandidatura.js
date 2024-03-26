import React from 'react';
import { Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import { generatePath, withRouter } from 'react-router-dom';
import { PAGE_TCB_ADMIN_ECA_001, PAGE_MATCHING_DOMANDA_LAVORATORE_URL } from 'types/url';
import { getObjectValue } from 'utils/extensions/objectExtensions';

const SalvaCandidaturaComponent = ({ idOperatore, history, location }) => {
  const eventBus = useEventBus();
  return (
    <>
      <Column xs="12" padding="0">
        <Button
          type='button'
          color="blue"
          fontSize="f7"
          width="100%"
          label="Salva candidatura"
          onClick={() => {
            eventBus.publish('SALVA_ADMIN');
            const idRichiesta = getObjectValue(location, 'state.idRichiesta', undefined);
            if (idRichiesta) {
              return history.push(generatePath(PAGE_MATCHING_DOMANDA_LAVORATORE_URL, { idDomanda: idRichiesta }));
            }
            return history.push(generatePath(PAGE_TCB_ADMIN_ECA_001, { idOperatore }));
          }}
        />
      </Column>
    </>
  );
};

SalvaCandidaturaComponent.displayName = 'Salva candidatura';

export const SalvaCandidatura = withRouter(SalvaCandidaturaComponent);
