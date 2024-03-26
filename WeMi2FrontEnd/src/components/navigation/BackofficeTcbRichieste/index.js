/** @format */

import React, { useState, useEffect } from "react";
import { PUBLIC_URL } from "types/url";
import Wrapper from "components/navigation/NavigationWrapper";
import Breadcrumbs from "components/navigation/Breadcrumbs";
import Loader from "components/ui/Loader";
import withAuthentication from '../../../hoc/withAuthentication';
import BackofficeTcbRichieste from "../../pages/TCB/TCB_ADMIN_ERI_001/backofficeTcbRichieste";

const BackofficeTcbRichiestePage = ({userProfile}) => {
  const breadcrumbPaths = [
    {
      slash: "Home",
      url: ""
    },
    {
      slash: "Area personale",
      url: "areaPersonale"
    },
    {
      slash: "Gestione Richieste di Servizio TCB",
      url: `admin/${userProfile.datiLogin.idCittadino}/richiesteTcb`
    },
    {
      slash: "Associa Domanda offerta",
      url: `admin/${userProfile.datiLogin.idCittadino}/richiesteTcb/associaDomandaOfferta`
    }
  ];
  
  if (userProfile.datiLogin.Profilo === "A") {
    return (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPaths} />
        <BackofficeTcbRichieste />
      </Wrapper>
    );
  }
  else {
    return (window.location.href = `${PUBLIC_URL}/`) && <Loader/>;
  }
};

BackofficeTcbRichiestePage.displayName = "BackofficeTcbRichiestePage";
export default withAuthentication(BackofficeTcbRichiestePage);
