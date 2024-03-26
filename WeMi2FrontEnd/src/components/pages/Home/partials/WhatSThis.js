import React from 'react';
import { HOME_ANCHORS } from '../constants/anchors';
import LeftColumn from './WhatSThis.partials/LeftColumn';
import RightColumn from './WhatSThis.partials/RightColumn';
import Wrapper from './Wrapper';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import { Row, Column } from 'components/ui/Grid';

const WhatSThis = () => (
    <Wrapper paddingTop="7.58rem" paddingBottom="0" paddingBottomMd="0" id={HOME_ANCHORS.whatsThis}>
      <BackgroundTitle
        label="COS'È WeMi"
        bgColor="orange"
        transform="none"
        size={bgTitleSizes.small}
      />
      <Row fluid>
        <Column lg="6" padding="0" margin="1.5rem 0 0 0">
          <LeftColumn />
        </Column>
        <Column lg="6" padding="0" margin="0.5rem 0 0 0">
          <RightColumn />
        </Column>
      </Row>
    </Wrapper>
  );

WhatSThis.displayName = 'WhatSThis';

export default React.memo(WhatSThis);
