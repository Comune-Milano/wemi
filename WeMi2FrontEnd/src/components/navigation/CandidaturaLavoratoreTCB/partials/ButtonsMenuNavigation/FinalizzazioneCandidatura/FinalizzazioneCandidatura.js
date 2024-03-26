import React, { useState } from 'react';
import { Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import { Redirect, withRouter, generatePath } from 'react-router-dom';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import { PAGE_MATCHING_DOMANDA_LAVORATORE_URL } from 'types/url';
import { getObjectValue } from 'utils/extensions/objectExtensions';

const FinalizzazioneCandidaturaComponent = ({
  idOperatore,
  idLavoratore,
  location,
  history,
}) => {
  const [redirect, setRedirect] = useState(false);
  
  /** Serve per gestire il salvataggio automatico per l'admin */
  const eventBus = useEventBus();

  return (
    <>
      {
        redirect ?
          <Redirect to={`/admin/finalizzaCandidaturaLavoratoreTCB/${idLavoratore}`} />
          : null
      }
      <Column xs="12" padding="1em 0 0">
        <Button
          type='button'
          color="blue"
          fontSize="f7"
          width="100%"
          label="Dati operatore"
          onClick={() => {
            eventBus.publish('SALVA_ADMIN');
            const idRichiesta = getObjectValue(location, 'state.idRichiesta', undefined);
            if (idRichiesta) {
              history.push({
                pathname: `/admin/finalizzaCandidaturaLavoratoreTCB/${idLavoratore}`,
                state: {
                  idRichiesta,
                },
              });
            } else {
              setRedirect(true);
            }
          }}
        />
      </Column>
    </>
  );
};

FinalizzazioneCandidaturaComponent.displayName = 'Finalizzazione Candidatura';

export const FinalizzazioneCandidatura = withRouter(FinalizzazioneCandidaturaComponent);

