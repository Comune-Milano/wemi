import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkAdmin from 'utils/functions/checkAdmin';
import { withRouter } from 'react-router-dom';
import ContentListArea from 'components/navigation/ListaAreaContenuti';
import { breadcrumb } from './constants';

const ContentListAreaPage = ({
  userProfile,
}) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [page, setPage] = React.useState(1);

  if (!validitaAdmin) {
    return (<RedirectAdmin />);
  }

  return (
    <ContentListArea
      page={page}
      setPage={setPage}
      breadcrumb={breadcrumb(datiLogin.idCittadino)}
    />
  );
};


ContentListAreaPage.displayName = 'Content Area List Page Component';
const ContentListAreaPageWithAuth = withAuthentication(ContentListAreaPage);

export default
  withRouter(
    ContentListAreaPageWithAuth
  );
