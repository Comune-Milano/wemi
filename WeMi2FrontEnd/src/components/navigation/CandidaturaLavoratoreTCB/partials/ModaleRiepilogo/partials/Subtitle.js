/** @format */

import React from 'react';
import styled from "styled-components";
import { colors } from 'theme';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';

const StyledRow = styled(Row)`
  border-bottom: 1px solid ${colors.grey};
  padding: 0.2em 0;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
`;

const Subtitle = ({
  subtitle,
}) => (
    <StyledRow
      fluid
      margin="0"
      alignitems="flex-start"
    >
      <Column xs="12" md="7" padding="0 2em 0 0">
        <Text
          value={subtitle}
          size="f7"
          color="primary"
          weight="bold"
        />
      </Column>
    </StyledRow>
  );

Subtitle.displayName = 'Subtitle';

export default Subtitle;
