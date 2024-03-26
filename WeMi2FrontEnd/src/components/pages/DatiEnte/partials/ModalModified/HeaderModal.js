/** @format */

import React from 'react';
import Text from 'components/ui/Text';

const Header = ({ headervalue, headersize }) => (
  <Text value={headervalue} size={headersize} color="third" weight="bold" />
);

Header.displayName = 'Header';

export default Header;