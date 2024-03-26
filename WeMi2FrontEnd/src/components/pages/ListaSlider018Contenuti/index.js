import React from 'react';
import ContentListSlider from 'components/navigation/ListaSlider018Contenuti';
import checkAdmin from 'utils/functions/checkAdmin';
import RedirectAdmin from 'components/router/RedirectAdmin';
import withAuthentication from 'hoc/withAuthentication';
import withRouter from 'react-router/withRouter';
import { breadcrumb } from './constants';

const GestioneContenutoSliderPage = ({ userProfile }) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [page, setPage] = React.useState(1);

  if (!validitaAdmin) {
    return (<RedirectAdmin />);
  }

  return (
    <ContentListSlider
      page={page}
      setPage={setPage}
      breadcrumb={breadcrumb(datiLogin.idCittadino)}
    />

  );
};

GestioneContenutoSliderPage.displayName = 'GestioneContenutoSliderPage';
const GestioneContenutoSliderPageWithAuth = withAuthentication(GestioneContenutoSliderPage);
export default
  withRouter(
    GestioneContenutoSliderPageWithAuth
  );
