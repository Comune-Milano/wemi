import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkAdmin from 'utils/functions/checkAdmin';
import { withRouter } from 'react-router-dom';
import ContentListSection from 'components/navigation/ListaSezioneContenuti';
import { breadcrumb } from './constants';

const ContentListSectionPage = ({
  userProfile,
}) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [page, setPage] = React.useState(1);

  if (!validitaAdmin) {
    return (<RedirectAdmin />);
  }

  return (
    <ContentListSection
      page={page}
      setPage={setPage}
      breadcrumb={breadcrumb(datiLogin.idCittadino)}
    />
  );
};


ContentListSectionPage.displayName = 'Content Section List Page Component';
const ContentListSectionPageWithAuth = withAuthentication(ContentListSectionPage);

export default
  withRouter(
    ContentListSectionPageWithAuth
  );
