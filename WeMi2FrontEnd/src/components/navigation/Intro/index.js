/** @format */

import React from 'react';

import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { IntroJson } from 'mocks/IntroJson';
import media from 'utils/media-queries';
import {colors, spacing} from 'theme';

import IntroPct from 'images/homepage/wemiintro/WemiHome.png';

const IntroTxt1 = styled(Text)`
padding-bottom: 0.8rem;
font-weight: bold;
${media.md`
font-weight: bold;
`};
${media.sm`
font-size:f6;
font-weight: bold;
`};
`;
const IntroTxt2 = styled(Text)`
  &&& {
    font-weight: normal;
    justify: left;
  }
`;

const DivBackground = styled.div`
position: relative;
display: flex;
height: auto;
min-height: 27em;
justify-content: center;
background-color: #F2F2F2;

padding: calc(${spacing.p4}*4) ${spacing.p5};
${media.sm`
padding: calc(${spacing.p4}*4) calc(${spacing.p4}*1.1); 

`};
${media.md`
padding: ${spacing.p5} calc(${spacing.p4}*4 ); 

`};
${media.lg`

padding: ${spacing.p5} calc(${spacing.p4}*5); 

`};
`;

const IntroImg = styled.img`
width: 60%;
transition: all .2s ease-in-out;
${media.sm`
width: 50%

`};
${media.md`
width: 80%

`};
`;

const IntroCol = styled(Column)`
    display: inline-table;
    ${media.md`
    display: inline-table;
  
`};
${media.lg`
display: inline-table;

`};

`;
const ColImg = styled(Column)`
justify-content: center;
text-align: center;
padding-bottom: 2rem;
${media.md`
justify-content: flex-start;
text-align: left;
padding-bottom: 0;

`};

`;

const Intro = () => (

  <DivBackground>
    <Row fluid flex alignitems="center" justifycontent="space-between">
      <ColImg xs={12} sm={12} md={4} lg={4} padding="0">
        <IntroImg src={IntroPct} />
      </ColImg>

      <IntroCol xs={12} sm={12} md={8} lg={8} fluid flex alignitems="center" padding="0">

          <IntroTxt1 value={IntroJson.Titolo} size="f5" intlFormatter tag="p" />
  
          <IntroTxt2
          tag="p"
            value={IntroJson.Sottotitolo.label}
            weight={IntroJson.Sottotitolo.weight}
            size="f7"
            intlFormatter
          />

      </IntroCol>
</Row>
  </DivBackground>
);

Intro.displayName = 'Intro';

export default Intro;
