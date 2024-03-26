import React from 'react';
import { isNullOrUndefined } from 'util';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { withRouter } from 'react-router';
import { InoltroCandidatura } from './InoltroCandidatura/InoltroCandidatura';
import { FinalizzazioneCandidatura } from './FinalizzazioneCandidatura/FinalizzazioneCandidatura';
import { SalvaCandidatura } from './SalvaCandidatura/SalvaCandidatura';
import { UscitaCandidatura } from './UscitaCandidatura/UscitaCandidatura';
import { EliminazioneCandidatura } from './EliminaCandidatura/EliminazioneCandidatura';
import { estraiStatoCandidatura as estraiStatoCandidaturaQ } from '../graphql/estraiStatoCandidaturaTCB';

/**
 * A component that wraps the logic and ui of the buttons for the Navigation Menu
 */
const ButtonsNavigationMenu = ({
  checkCandidacyValidity,
  idOperatore,
  idLavoratore,
  isLavoratoreAssociato,
  history,
}) => {
  const [Stato] = useGraphQLRequest(
    undefined,
    estraiStatoCandidaturaQ,
    { idUtenteLav: idLavoratore },
    true
  );

  return (
    !isNullOrUndefined(Stato.data) && (
    <>
      {idOperatore ? (
        <>
          <SalvaCandidatura
            idOperatore={idOperatore}
            history={history}
          />
          <FinalizzazioneCandidatura
            idLavoratore={idLavoratore}
            idOperatore={idOperatore}
          />
        </>
        )
        : (
          <InoltroCandidatura
            idLavoratore={idLavoratore}
            idOperatore={idOperatore}
            checkCandidacyValidity={checkCandidacyValidity}
          />
      )}
      <EliminazioneCandidatura
        isLavoratoreAssociato={isLavoratoreAssociato}
        idLavoratore={idLavoratore}
        idOperatore={idOperatore}
      />
      <UscitaCandidatura
        idOperatore={idOperatore}
      />
    </>
  )
  );
};
ButtonsNavigationMenu.displayName = 'ButtonsNavigationMenu';

export default withRouter(ButtonsNavigationMenu);
