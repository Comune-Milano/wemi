import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import React from 'react';

const ListSection = ({ title, text }) => (
  <>
    <Text
      value={title}
      size="f6"
      color="orange"
      lineHeight="175%"
      letterSpacing="0.05em"
    />
    <Row fluid>
      <Text
        value={text}
        size="f7"
        color="black"
        lineHeight="175%"
      />
    </Row>
  </>
  );

ListSection.displayName = 'ListSection';
export default ListSection;
