/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { FormatDate } from 'components/ui/FormatDate';
import { colors } from 'theme';

const DrawerHeaderRow = styled(Row)`
background-color: ${colors.blue};
padding: 3em 0 3em 5em;
  span {
    display: flex;
    align-items: flex-end;
  }
`;

const DrawerHeader = ({ headerValue }) => {
  return (
    <DrawerHeaderRow fluid justifycontent="space-between" padding="0">
      <Text color="white" value={headerValue.nm_ente} size="f7" />
      <Row fluid>
        <Text color="white" value={headerValue.ts_variazione_stato &&
          `Data ultima modifica: ${FormatDate(headerValue.ts_variazione_stato, 'it')}`} size="f7" />
      </Row>
    </DrawerHeaderRow>
  );
};

DrawerHeader.displayName = 'DrawerHeader';
export default DrawerHeader;
