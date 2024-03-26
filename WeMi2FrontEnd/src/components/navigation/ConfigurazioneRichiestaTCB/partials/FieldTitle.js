/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { fonts } from 'theme';

const FieldTitle = ({
  label,
  required,
  marginTop,
  marginBottom,
  uppercase,
}) => (
  <p
    style={{
      fontSize: `${fonts.size.f7}`,
      marginTop: `${marginTop ? marginTop : '0'}`,
      marginBottom: `${marginBottom ? marginBottom : '0.5em'}`,
      textTransform: uppercase ? 'uppercase' : null,
    }}
  >
    <Text
      weight="bold"
      tag="span"
      padding="0 0.3em 0 0"
      value={label}
      letterSpacing="0.05em"
    />
    {
    required && (
      <Text
        tag="span"
        value="*"
        weight="normal"
        color="red"
      />
    )}
  </p>
);

FieldTitle.displayName = 'FieldTitle';

export default FieldTitle;