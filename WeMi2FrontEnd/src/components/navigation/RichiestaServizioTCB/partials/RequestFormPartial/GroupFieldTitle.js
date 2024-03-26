/** @format */

import React, { useState } from 'react';
import Text from 'components/ui/Text';
import { fonts, colors } from 'theme';

const GroupFieldTitle = ({
  title,
  required,
  marginTop,
  marginBottom
}) => (
    <h3 style={{
      fontSize: `${fonts.size.f7}`,
      marginTop: `${marginTop ? marginTop : '3em'}`,
      marginBottom: `${marginBottom ? marginBottom : '1em'}`,
    }}>
      <Text
        value={title}
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        color="primary"
      />
      {required &&
        <Text
          aria-label="campo obbligatorio"
          value="*"
          padding="0 0 0 0.3em"
          weight="bold"
          color="red"
        />
      }
    </h3>
  );

GroupFieldTitle.displayName = 'GroupFieldTitle';

export default GroupFieldTitle;