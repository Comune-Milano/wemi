import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { aChiContent } from './costants';

const AChi = () => (
  <>
    <Row fluid margin="1.8em 0 0 0">
      <BackgroundTitle size={bgTitleSizes.small} label="A chi è rivolto" bgColor="blue" />
    </Row>
    {
      aChiContent.map((text, index) => (
        <React.Fragment key={`content-AChi-${index}`}>
          <Row fluid margin="1em 0 0 0">
            <Text
              weight="bold"
              size="f6"
              value={text.title}
              lineHeight="175%"
              color="blue"
              letterSpacing="0.05em"
            />
          </Row>
          <Row fluid>
            <Text
              size="f7"
              value={text.text}
              lineHeight="175%"
            />
          </Row>
        </React.Fragment>
      ))
    }
  </>
);

AChi.displayName = 'AChi';
export default AChi;
