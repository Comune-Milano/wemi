import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';

const TextContent = ({
  color,
  description,
  title,
}) => (
  <Row fluid>
    <Column padding="0">
      <Text
        value={title}
        size="f6"
        weight="bold"
        transform="uppercase"
        lineHeight="175%"
        color={color}
        letterSpacing="0.05em"
      />
    </Column>
    <Column padding="0">
      <Text
        value={description}
        size="f7"
        lineHeight="175%"
      />
    </Column>
  </Row>
);

TextContent.displayName = 'TextContentNavigation';

export default TextContent;
