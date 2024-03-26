/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { createLogoutRequest } from 'redux-modules/actions/authActions';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import LogoutPropTypes from './propTypes';

const Logout = ({ onClickLogout }) => {
  const handleClick = () => onClickLogout();

  return (
    <Button onClick={handleClick} primary={false}>
      <Text value="Button.logout" intlFormatter />
    </Button>
  );
};
Logout.displayName = 'Logout';
Logout.propTypes = LogoutPropTypes;

export default connect(
  null,
  {
    onClickLogout: createLogoutRequest,
  },
)(Logout);
