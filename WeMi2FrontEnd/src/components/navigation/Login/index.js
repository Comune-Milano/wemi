/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { createLoginRequest } from 'redux-modules/actions/authActions';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import LoginPropTypes from './propTypes';

const Login = ({ onClickLogin }) => {
  const onSubmit = event => {
    event.preventDefault();
    onClickLogin();
  };

  return (
    <form onSubmit={onSubmit}>
      <Button>
        <Text value="Page.Login.button.submit" intlFormatter />
      </Button>
    </form>
  );
};

Login.displayName = 'Login';
Login.propTypes = LoginPropTypes;

export default connect(
  null,
  {
    onClickLogin: createLoginRequest,
  },
)(Login);
