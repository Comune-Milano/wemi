import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { aChi } from './costants';
import TextContent from './TextContent';

const AChi = ({
  color,
}) => (
  <Row fluid>
    <Column padding="0">
      <BackgroundTitle
        bgColor={color}
        label={aChi.title}
        size={bgTitleSizes.small}
      />
    </Column>
    <Column padding="0">
      {aChi.content.map((text, index) => (
        <Column padding="0" margin="1.5em 0 0 0" key={`aChi-content-${index}`}>
          <TextContent
            color={color}
            title={text.title}
            description={text.value}
          />
        </Column>
      ))}
    </Column>
  </Row>
);

AChi.displayName = 'AChiNavigation';

export default AChi;
