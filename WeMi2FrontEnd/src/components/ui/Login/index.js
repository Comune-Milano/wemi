import React, { useState } from 'react';
import Modal from 'components/ui2/Modal';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { openLoginModal } from 'redux-modules/actions/authActions';
import { colors } from 'theme';
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';
import { __AUTH_DEV__ } from 'utils/environment/variables';
import { LoginContentService, LoginContentLocal } from './partials/login';
import { LoggedContent } from './partials/logged';

const Login = ({ datiLogin, openLoginModal, array, userProfile }) => {
  const DatiLogin = userProfile.datiLogin;
  const [state, setState] = useState({
    redirect: false,
  });

  const funzione = () => {
    setState({ redirect: false });
    return null;
  };

  return (
    <Modal
      iconRadius="50%"
      noShadowIcon
      iconHeight="2em"
      iconWidth="2em"
      open={datiLogin.modal}
      setOpenModal={openLoginModal}
      border={`2px ${colors.darkRed} solid`}
      header=""
      noHeader
      marginTop="2%"
      minHeight="unset"
      width="50%"
      responsiveWidth="1.6"
      iconcolor="darkRed"
    >
      {isNullOrUndefined(DatiLogin) ? (
        <>
          <LoginContentLocal open={datiLogin.modal} openModal={openLoginModal} />
        </>
            )

                : (
                  <>
                    {state.redirect ? (
                      <>
                        <Redirect to={`${window.location.pathname}/forward`} />
                        {funzione()}
                      </>
                        ) : null}
                    <LoggedContent open={datiLogin.modal} openModal={openLoginModal} />
                  </>
                )}
    </Modal>
  );
};

const mapStoreToProps = (store) => ({
  datiLogin: store.datiLogin,
  array: store.user.enti,
});

const mapDispatchToProps = ({
  openLoginModal,
});

Login.displayName = 'Login component';

export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(withAuthentication(Login)));
