import React from 'react';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import { ColumnBorderBg } from './Table.styled';

const SingleHeaderTableMobile = ({
  title,
  color,
}) => (
  <Row fluid flex justifycontent="center">
    <Text
      value={title}
      color={color}
      transform="uppercase"
      weight="bold"
      lineHeight="175%"
      align="center"
      size="f7"
      letterSpacing="0.05em"
    />
    <ColumnBorderBg height="0.1em" flex padding="0" borderSize="2px" borderColor={color}>
      {/* border */}
    </ColumnBorderBg>
  </Row>
);

SingleHeaderTableMobile.displayName = 'SingleHeaderTableMobileNavigation';

export default SingleHeaderTableMobile;
