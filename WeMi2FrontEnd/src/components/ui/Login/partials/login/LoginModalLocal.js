/** @format */

import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { userLoggedIn as userLoggedInAction } from 'redux-modules/actions/authActions';
import { Column } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import { AccediRegistrati, Links, Inputs, Buttons, Errors } from './partials';


const LoginModal = ({ open, openModal, array }) => {
  const [showComponent, setShowComponent] = useState(open);
  const [parolaChiave, setParolaChiave] = useState({ username: '', password: '' });
  const riferimentoForm = useRef();
  const [errore, setErrore] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const leggiTesto = (key, event) => {
    const json = parolaChiave;

    let check = false;
    if (riferimentoForm.current) {
      check = riferimentoForm.current.checkValidity();
    }

    setParolaChiave({ ...json, [key]: event });
    setErrore(!check);
  };

  useEffect(
    () => {
      let check = false;
      if (riferimentoForm.current) {
        check = riferimentoForm.current.checkValidity();
      }

      setErrore(!check);
    },
    []
  );


  return (
    <div>
      {showComponent === false ? (
        <>
          <Column xs="12" />
          <AccediRegistrati
            openModal={openModal}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
          <Links />
        </>
      ) : null}
      {showComponent === true ? (
        <>
          <form ref={riferimentoForm}>
            <Inputs
              parolaChiave={parolaChiave}
              leggiTesto={leggiTesto}
            />
            <Buttons
              array={array}
              errore={errore}
              setShowComponent={setShowComponent}
              showComponent={setShowComponent}
              parolaChiave={parolaChiave}
              openModal={openModal}
              open={open}
              setErrore={setErrore}
              setSubmitted={setSubmitted}
            />
          </form>
        </>
      ) : null}
      <Errors errore={submitted && errore} />
    </div>
  );
};

LoginModal.displayName = 'LoginModal';

function mapStateToProps(state) {
  const { user } = state;
  const { enti } = user;
  return {
    array: enti,
  };
}
const mapDispatchToProps = ({
  userLoggedIn: userLoggedInAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthentication(LoginModal));
