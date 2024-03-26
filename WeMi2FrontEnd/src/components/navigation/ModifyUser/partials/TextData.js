import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import TextTitle from './TextTitle';
import styled from 'styled-components';

const TextValue = styled(Text)`
  word-break: break-all;
`;

const TextData = React.memo(({
  title,
  value,
  columnLg = "3",
  columnMd = "4",
  columnSm = "6",
  columnXs = "12",
}) => (
  <Column padding="1em" lg={columnLg} md={columnMd} sm={columnSm} xs={columnXs}>
    <Row fuid >
      <TextTitle
        value={title}
        margin="0"
      />
    </Row>
    <Row fuid >
      <TextValue
        value={value || "-"}
        size="f6"
      />
    </Row>
  </Column>
));

TextData.displayName = 'ModificaUtenzaNavigation - TextData';

export default TextData;