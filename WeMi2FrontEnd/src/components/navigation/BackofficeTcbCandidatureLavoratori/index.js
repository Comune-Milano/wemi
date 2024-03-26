/** @format */

import React from "react";
import { PUBLIC_URL } from "types/url";
import Wrapper from "components/navigation/NavigationWrapper";
import Breadcrumbs from "components/navigation/Breadcrumbs";
import Loader from "components/ui/Loader";
import withAuthentication from '../../../hoc/withAuthentication';
import BackofficeTcbCandidatureLavoratori from "components/pages/TCB/TCB_ADMIN_ECA_001/backofficeTcbCandidatureLavoratori";

const BackofficeTcbCandidatureLavoratoriPage = ({userProfile}) => {
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
      slash: "Gestione Candidature Lavoratori Tate, Colf e Badanti",
      url: `admin/${userProfile.datiLogin.idCittadino}/candidatureLavoratoriTcb`
    }
  ];
  
  if (userProfile.datiLogin.Profilo === "A") {
    return (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPaths} />
        <BackofficeTcbCandidatureLavoratori />
      </Wrapper>
    );
  }
  else {
    return (window.location.href = `${PUBLIC_URL}/`) && <Loader/>;
  }
};

BackofficeTcbCandidatureLavoratoriPage.displayName = "BackofficeTcbCandidatureLavoratoriPage";
export default withAuthentication(BackofficeTcbCandidatureLavoratoriPage);
