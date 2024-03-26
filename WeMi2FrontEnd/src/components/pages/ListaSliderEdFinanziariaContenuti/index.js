import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkAdmin from 'utils/functions/checkAdmin';
import { withRouter } from 'react-router-dom';
import ContentListSliderFinancialEducation from 'components/navigation/ListaSliderEdFinanziariaContenuti';
import { breadcrumb } from './constants';

const ContentListSliderEdFinanziariaPage = ({
  userProfile,
}) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [page, setPage] = React.useState(1);

  if (!validitaAdmin) {
    return (<RedirectAdmin />);
  }

  return (
    <ContentListSliderFinancialEducation
      page={page}
      setPage={setPage}
      breadcrumb={breadcrumb(datiLogin.idCittadino)}
    />
  );
};


ContentListSliderEdFinanziariaPage.displayName = 'ContentListSliderEdFinanziariaPageComponent';
const ContentListSliderEdFinanziariaPageWithAuth = withAuthentication(ContentListSliderEdFinanziariaPage);

export default
  withRouter(
    ContentListSliderEdFinanziariaPageWithAuth
  );
