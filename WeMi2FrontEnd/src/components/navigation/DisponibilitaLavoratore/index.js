/** @format */

import React from "react";
import { PUBLIC_URL } from "types/url";
import Wrapper from "components/navigation/NavigationWrapper";
import Breadcrumbs from "components/navigation/Breadcrumbs";
import Loader from "components/ui/Loader";
import withAuthentication from '../../../hoc/withAuthentication';
import DisponibilitaLavoratoreTcb from "components/pages/TCB/TCB_LCA_001/disponibilitaLavoratore";

const DisponibilitaLavoratoreTcbPage = ({userProfile}) => {
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
      slash: "Le mie disponibilità",
      url: `disponibilitaLavoratore`
    },
  ];
  
  if (userProfile && userProfile.datiLogin.Profilo === "L") {
    return (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPaths} />
        <DisponibilitaLavoratoreTcb userProfile={userProfile} />
      </Wrapper>
    );
  }
  else {
    return (window.location.href = `${PUBLIC_URL}/`) && <Loader/>;
  }
};

DisponibilitaLavoratoreTcbPage.displayName = "DisponibilitaLavoratoreTcbPage";
export default withAuthentication(DisponibilitaLavoratoreTcbPage);
