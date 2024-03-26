/** @format */

import React from 'react';
import media from 'utils/media-queries';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';

const MyRow = styled(Row)`
  background-color: #ECECEC;
  position: relative;
  display: block;
  overflow-x: hidden;
  padding: 3em 2.8rem;

  ${media.md`
     padding: ${props => props.paddingMd};
  `};
`;

const HeaderBox = ({
  titolo,
  sottoTitolo,
  sizePadding,
  children,
  color,
  paddingMd,
}) => (
  <MyRow fluid paddingMd={paddingMd} sizepadding={sizePadding}>
    <Row fluid>
      <Column md="5" padding="0">
        <BackgroundTitle
          label={titolo}
          bgColor={color}
          size={bgTitleSizes.small}
        />
        <Row fluid>
          <Text
            value={sottoTitolo}
            size="f7"
            padding="2em 0 0 0"
            tag="div"
          />
        </Row>
      </Column>
      <Column md="6" padding="0">
        {children}
      </Column>
    </Row>
  </MyRow>
  );

HeaderBox.displayName = 'HeaderBox';

export default HeaderBox;
