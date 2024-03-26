
import React, { memo } from 'react';
import Text from 'components/ui/Text';

const OrderConfirmationModalRow = ({
  label,
  text,
}) => (
  <tr style={{ paddingBottom: '0.5em' }}>
    <td style={{ paddingRight: '2em' }}>
      <Text
        value={`${label} `}
        size="f7"
        transform="uppercase"
        letterSpacing="0.05em"
        weight="bold"
      />
    </td>
    <td>
      <Text
        value={text}
        size="f7"
      />
    </td>
  </tr>
);

OrderConfirmationModalRow.displayName = 'OrderConfirmationModalRow';

export default memo(OrderConfirmationModalRow);
