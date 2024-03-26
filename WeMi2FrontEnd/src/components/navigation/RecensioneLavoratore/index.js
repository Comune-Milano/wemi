/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import {
  EstraiCarattereLavoratore as EstraiCarattereLavoratoreQ,
} from 'components/navigation/RecensioneLavoratore/RecLavoratoreGraphQL';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { CONFERMATO } from 'types/statoRecensioneCostants';
import ValutazioniServizio from './partials/ValutazioniServizio';
import ValutazioniMansioni from './partials/ValutazioniMansioni';
import Buttons from './partials/Button';

const RecensioneLavoratore = ({
  match,
  datiLogin,
  isFromBackoffice,
}) => {
  const { dataset } = useFormContext();

  const [datiCarattere] = useGraphQLRequest(
    undefined,
    EstraiCarattereLavoratoreQ,
    {},
    true
  );

  const verificaCarattere = !!datiCarattere?.data;

  const qtMediaSingolaRecensione = Math.round(((dataset.capacitaGestTempo + dataset.capacitaComunicative + dataset.capacitaAdattamento) / 3));

  const isReadOnly = (dataset.statoRecensione === CONFERMATO || dataset.isOnlyLavoratore || dataset.isFeedbackOld);

  return (
    <>
      {verificaCarattere ? (
        <ValutazioniServizio
          datiCarattere={datiCarattere.data}
          qtMediaSingolaRecensione={qtMediaSingolaRecensione}
          isReadOnly={isReadOnly}
        />
      )
        : null}
      <ValutazioniMansioni
        isReadOnly={isReadOnly}
      />
      {verificaCarattere && !dataset.isFeedbackOld ? (
        <Buttons
          datiLogin={datiLogin}
          match={match}
          qtMediaSingolaRecensione={qtMediaSingolaRecensione}
          isFromBackoffice={isFromBackoffice}
        />
      )
        : null}
    </>
  );
};

RecensioneLavoratore.displayName = 'RecensioneLavoratore';

export default (RecensioneLavoratore);
