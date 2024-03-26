import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row } from 'components/ui/Grid';
import TextBox from './TextBox';
import { aChiERivolto } from './constants';

const AChiERivolto = ({
  color = "purple"
}) => (
  <Row fluid>
    <BackgroundTitle
      bgColor={color}
      label={aChiERivolto.title}
      size={bgTitleSizes.small}
    />
    <TextBox
      text={aChiERivolto.content}
      color="purple"
      margin="0.3em 0 0 0 "
    />
  </Row>
);

AChiERivolto.displayName = 'AChiERivoltoNavigation';

export default AChiERivolto;