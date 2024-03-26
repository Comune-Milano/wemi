import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const ValueText = ({
  value = '',
}) => (
  <Row margin="1rem 0 0 0">
    <Text value={value} size="f7" weight="bold" color="blue" letterSpacing="0.05em" />
  </Row>
  );

ValueText.displayName = 'Value Text Content';

export default React.memo(ValueText);
