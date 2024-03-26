/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import { spaces } from 'mocks/SpacesJson';
import Label from 'components/ui/Label';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { LeftSection, RightSection} from './partials';
import pallini from 'images/homepage/spaziwemi/pallini.png';
import wemipoint from 'images/homepage/spaziwemi/wemipoint.png';

const SpacesRow = styled(Row)`
  margin: 2rem 0 4rem;
  padding: 0 0 4rem;
  position: relative;
  ${media.md`
  margin: 2rem 0 4rem;
  padding: 0 0 4rem;
  `}
`
const MyImgWeMiPoint = styled.img`
display: none;
position:absolute;

${media.md`
display: block;
  height: 15em;
  bottom:0;
  right: 5%;
`};
${media.lg`
width: 24em;
height: 17em;
`};

`;


const MyImg = styled.img`
  position: static;
  margin: 1rem 30% 2rem;
  width: 40%;
  height: 40%;
  ${media.md`
  margin: 0;
    position: absolute;
    width: 12em;
    height: 12em;
    bottom: 30%;
    right: 0;
`};
  ${media.lg`
  width: 17em;
  height: 17em;
`};
`;



const Spaces = () => (
  <SpacesRow fluid>
  <MyImgWeMiPoint src={pallini} />
  <MyImg src={wemipoint} />
    <Row fluid justifycontent="space-between">
      <Label
        intlFormatter
        size="f6"
        color="white"
        bgcolor="primary"
        transform="uppercase"
        letterSpacing="0.05em"
        value={spaces.label}
      />
    </Row>
    <Row>
        <LeftSection spaces={spaces} />
        <RightSection spaces={spaces} />
    </Row>
  </SpacesRow>
);

Spaces.displayName = 'Spaces';

export default Spaces;
