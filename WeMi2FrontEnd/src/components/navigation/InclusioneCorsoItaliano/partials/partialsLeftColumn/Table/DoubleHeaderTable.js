import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { ColumnBorderBg } from './Table.styled';

const DoubleHeaderTable = ({
  titleSx,
  titleDx,
  color,
}) => (
  <Row fluid>
    <Column height="auto" lg="6" md="7" flex padding="0" sizepadding={{ md: '0', lg: '0' }} justifycontent="center" alignitems="center">
      <ColumnBorderBg height="auto" flex padding="0" borderSize="2px" borderColor={color} justifycontent="center" alignitems="center">
        <Text
          value={titleSx}
          color={color}
          transform="uppercase"
          weight="bold"
          lineHeight="175%"
          align="center"
          size="f7"
          letterSpacing="0.05em"
        />
      </ColumnBorderBg>
    </Column>
    <Column padding="0" lg="6" md="5" flex justifycontent="center" alignitems="center">
      <ColumnBorderBg height="auto" flex padding="0" borderSize="2px" borderColor={color} justifycontent="center" alignitems="center">
        <Text
          value={titleDx}
          color={color}
          transform="uppercase"
          weight="bold"
          lineHeight="175%"
          align="center"
          size="f7"
          letterSpacing="0.05em"
        />
      </ColumnBorderBg>
    </Column>
  </Row>
);

DoubleHeaderTable.displayName = 'DoubleHeaderTableNavigation';

export default DoubleHeaderTable;
