import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row } from 'components/ui/Grid';
import TextBox from './TextBox';
import { cosaOffre } from './constants';

const CosaOffre = ({
  color = "purple"
}) => (
  <Row fluid>
    <BackgroundTitle
      bgColor={color}
      label={cosaOffre.title}
      size={bgTitleSizes.small}
    />
    <TextBox
      text={cosaOffre.content}
      color="purple"
      margin="0.3em 0 0 0 "
    />
  </Row>
);

CosaOffre.displayName = 'CosaOffreNavigation';

export default CosaOffre;