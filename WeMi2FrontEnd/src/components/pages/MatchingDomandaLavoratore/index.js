import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import Redirect from 'react-router-dom/Redirect';
import { PAGE_HOME_URL } from 'types/url';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import Header from 'components/ui2/Header';
import {
  DettaglioDomanda,
  Filtri,
  TabellaLavoratori,
  PopupFilters,
} from './partials';
import { calculateBreadCrumbPath } from './utils/calculateBreadCrumbPath';
import { MatchingLavoratoreContextProvider } from './utils/MatchingLavoratoreContext';

const Matching = ({
  match,
  userProfile,
}) => {
  /**
   * Verifiy if the request is valid
   */

  /**
   * The id of the request TCB to associate with workers
   */
  const { idDomanda } = match.params;

  const idDomandaParsed = parseInt(idDomanda, 10);

  /**
   * Constant to take the idCittadino from the userProfile
   */
  const { datiLogin: { idCittadino } } = userProfile;

  /**
   * The value of the breadcrumb
   */
  const breadcrumbPaths = calculateBreadCrumbPath(idCittadino, idDomandaParsed);

  /**
   * Variable to verify if the page can be accessed
   */
  const accessRequirements = !checkAdmin(userProfile.datiLogin) || isNaN(idDomandaParsed);

  return (
    <Wrapper>
      {
        accessRequirements &&
        <Redirect to={PAGE_HOME_URL} />
      }
      <Breadcrumbs pathSlashes={breadcrumbPaths} />
      <MatchingLavoratoreContextProvider idRichiestaTcb={idDomandaParsed}>
        <>
          <Header
            title="Associazione candidature lavoratori tate, colf e badanti"
            fontSize="f4"
            color="blue"
          />
          <DettaglioDomanda
            idRichiestaTcb={idDomandaParsed}
          />
          <PopupFilters />
          <Filtri />
          <TabellaLavoratori />
        </>
      </MatchingLavoratoreContextProvider>
    </Wrapper>
  );
};

Matching.displayName = 'Sezione di matching domanda/lavoratore';

export default withAuthentication(Matching);
