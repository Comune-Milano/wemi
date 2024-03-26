
import React, { memo } from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

/**
 * A row withing the order summary.
 */
const SummaryInfoRow = ({
  label,
  text,
  padding,
}) => (
  <Row padding={padding || '0 0 0.3rem 0'}>
    <Text
      value={`${label} `}
      size="f7"
    />
    {'\u00a0'}
    <Text
      value={text}
      size="f7"
      weight="bold"
    />
  </Row>
);

SummaryInfoRow.displayName = 'SummaryInfoRow';

export default memo(SummaryInfoRow);
