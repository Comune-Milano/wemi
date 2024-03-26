import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkAdmin from 'utils/functions/checkAdmin';
import { withRouter } from 'react-router-dom';
import ContentListService from 'components/navigation/ListaServiziContenuti';
import { breadcrumb } from './constants';

const ContentListServicePage = ({
  userProfile,
}) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [page, setPage] = React.useState(1);

  if (!validitaAdmin) {
    return (<RedirectAdmin />);
  }

  return (
    <ContentListService
      page={page}
      setPage={setPage}
      breadcrumb={breadcrumb(datiLogin.idCittadino)}
    />
  );
};


ContentListServicePage.displayName = 'Content Service List Page Component';
const ContentListServicePageWithAuth = withAuthentication(ContentListServicePage);

export default
  withRouter(
    ContentListServicePageWithAuth
  );
