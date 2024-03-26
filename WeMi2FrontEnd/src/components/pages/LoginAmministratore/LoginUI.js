import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { openLoginModal } from 'redux-modules/actions/authActions';
import { Row, Column } from 'components/ui/Grid';
import { LoginHeader, LoginBody } from './partials';

const Form = styled.form`
  padding: 3em;
  border: 1px solid ${({ theme }) => theme.colors.primary};

`;

const LoginUI = () => {
  const [redirect] = useState(false);
  const riferimentoLogin = useRef();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errore, setErrore] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const getFormData = (key, value) => {
    if (errore) {
      setErrore(false);
    }
    const json = { ...formData };
    json[key] = value;
    setFormData({ ...json });
  };
  useEffect(
        () => {
          let check = false;
          if (riferimentoLogin.current) {
            check = riferimentoLogin.current.checkValidity();
          }
          setErrore(!check);
        },
        []
      );
  return (
    <Row fluid justifycontent="center" margin="1em 0">
      <Column xs={12} md={6}>
        <Form
          ref={riferimentoLogin}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <LoginHeader />
          <LoginBody
            getFormData={getFormData}
            formData={formData}
            loginErrorVisible={submitted && errore}
            setLoginErrorVisible={setErrore}
            setSubmitted={setSubmitted}
            redirect={redirect}
            validita={errore}
          />
        </Form>
      </Column>
    </Row>
  );
};

LoginUI.displayName = 'LoginUI';

const mapStoreToProps = (store) => ({
  datiLogin: store.datiLogin,
});

const mapDispatchToProps = ({
  openLoginModal,
});


export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(LoginUI));
