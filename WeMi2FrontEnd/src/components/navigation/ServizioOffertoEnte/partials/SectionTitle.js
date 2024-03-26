import React from 'react';
import { colors } from 'theme';
import { Column } from "components/ui/Grid";
import styled from "styled-components";
import Text from 'components/ui/Text';

const ColumnTitle = styled(Column)`
border-bottom: 1.5px solid ${colors.primary};
`;

export const SectionTitle = ({value}) => {
  return(
  <ColumnTitle padding="0">
    <Text
      transform="uppercase"
      letterSpacing="0.05em"
      value={value}
      size="f6"
      color="primary"
      tag="h3"
      weight="bold"
    />
  </ColumnTitle>
  )
};