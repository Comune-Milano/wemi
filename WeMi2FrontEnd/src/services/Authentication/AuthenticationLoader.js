
import React, { useContext } from 'react';
import Loader from "components/ui2/Loader";
import { SectionPage } from 'components/ui/Page';
import AuthContext from 'services/Authentication/AuthenticationContext';

const AuthenticationLoader = ({ children }) => {
  const { userProfile } = useContext(AuthContext);

  const { loading, hasError } = userProfile;
  if (loading) {
    return (
      <SectionPage>
        <Loader label="Loading WeMi..." overlay={true} />
      </SectionPage>
    );
  }
  else if (hasError && !loading) {
    return (
      <SectionPage>
        <div style={{ margin: '2em 0', width: '100%' }}>
          Errore in fase di autenticazione
        </div>
      </SectionPage>
    );
  }

  return children;
};

export default AuthenticationLoader;
