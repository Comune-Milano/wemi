import React, { useEffect } from 'react';
import { useUserProfile } from 'hooks/useUserProfile';
import { connect } from 'react-redux';
import { openLoginModal } from 'redux-modules/actions/authActions';
import { withRouter } from 'react-router';
import { PAGE_LOGIN_ADMIN } from 'types/url';
import { LOGIN_URL } from 'types/loginurl';
import { __AUTH_DEV__, __BASE_URL__ } from 'utils/environment/variables';
import { AMMINISTRATORE, OPERATORE_ENTE, ADMIN_PREFIX, ENTE_PREFIX } from 'types/userRole';
import RedirectAdmin from 'components/router/RedirectAdmin';

const checkLoginHocComponent = (Componente, admin = false) => {
  const CheckUserProfileComponent = (props) => {
    const { openLoginModal, history, match } = props;
    const [userProfile] = useUserProfile();
    const { datiLogin } = userProfile;

    useEffect(() => {
      if (__AUTH_DEV__ && !datiLogin) {
        openLoginModal({ modal: true });
        return;
      }
      if (!datiLogin && !admin) {
        const actualUrl = window.location.href.split(window.location.origin + __BASE_URL__)[1];
        window.location.href = `${LOGIN_URL}?redirecturi=${actualUrl}`;
      }
      if (!datiLogin && admin) {
        history.push(PAGE_LOGIN_ADMIN);
      }
    }, []);

    if (!datiLogin) {
      return null;
    }
    const { Profilo } = datiLogin;
    const { url } = match;

    if ((url.includes(ADMIN_PREFIX) && Profilo !== AMMINISTRATORE) ||
        (url.includes(ENTE_PREFIX) && Profilo !== OPERATORE_ENTE)
    ) {
      return <RedirectAdmin />;
    }

    return <Componente {...props} />;
  };

  CheckUserProfileComponent.displayName = 'checking user profile';

  const mapStoreToProps = store => ({
    loginModal: store.datiLogin,
  });

  const mapDispatchToProps = {
    openLoginModal,
  };

  const ConnectedComponent = connect(mapStoreToProps, mapDispatchToProps)(withRouter(CheckUserProfileComponent));

  const ComponentToReturn = (props) => <ConnectedComponent {...props} />;

  ComponentToReturn.displayName = 'Connected component to return';

  return ComponentToReturn;
};

export const checkLoginHoc = checkLoginHocComponent;
