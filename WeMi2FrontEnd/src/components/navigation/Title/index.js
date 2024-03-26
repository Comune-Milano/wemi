/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import TitlePropTypes from './propTypes';

const Title = ({ value, intlFormatter }) => (
  <Text value={value} intlFormatter={intlFormatter} tag="h1" weight="bold" size="f1" />
);

Title.displayName = 'Title';
Title.propTypes = TitlePropTypes;

export default Title;
