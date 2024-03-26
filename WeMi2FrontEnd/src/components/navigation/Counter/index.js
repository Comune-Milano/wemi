/** @format */

import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import media from 'utils/media-queries';
import Text from 'components/ui/Text';
import Carousel from 'components/ui/Carousel';
import family from 'images/homepage/counter/icona-operatore.png';
import impostazioni from 'images/homepage/counter/icona-servizio.png';
import worker from 'images/homepage/counter/icona-users.png';
import { CounterJson } from 'mocks/CounterJson';
import { colors } from 'theme';
import WindowSize from 'components/ui/Breakpoints';

const Icona = styled.div`
  background-image: url(${props => props.src});
  background-position: center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 5em;
  ${media.sm`
    height: 6em;
  `};
  ${media.md`
    height: 4em;
  `};

`;

const Wrapper = styled(Row)`
  background-color: ${colors.yellow}
`

const MyColumn = styled(Column)`
  text-align: center
`

const Counter = ({ dati }) => {
  const datiAccountability = dati || undefined;
  const [CarouselPosition, setCarouselPosition] = useState(0);

 if(WindowSize() > 768) {
 return (
      <Wrapper fluid justifycontent="space-between" padding="3em">
        <MyColumn md={4}>
          <Icona src={family} />
          <Text value={datiAccountability && datiAccountability.EstraiDatiAccountability? datiAccountability.EstraiDatiAccountability.operatoriAccreditati: 0} size="f1" align="center" />
          <div />
          <Text value={CounterJson.label.label1} weight={CounterJson.label.weight} intlFormatter />
        </MyColumn>
        <MyColumn md={4}>
          <Icona src={impostazioni} />
          <Text value={datiAccountability && datiAccountability.EstraiDatiAccountability ? datiAccountability.EstraiDatiAccountability.serviziOfferti: 0} size="f1" align="center" />
          <div />
          <Text value={CounterJson.label.label2} weight={CounterJson.label.weight} intlFormatter />
        </MyColumn>
        <MyColumn md={4}>
          <Icona src={worker} />
          <Text value={datiAccountability && datiAccountability.EstraiDatiAccountability ? datiAccountability.EstraiDatiAccountability.cittadiniIscritti: 0} size="f1" align="center" />
          <div />
          <Text value={CounterJson.label.label3} weight={CounterJson.label.weight} intlFormatter />
        </MyColumn>
        </Wrapper>
 )} else {
 return (     
  <Wrapper fluid padding="0 1.25rem">
  <Carousel
  autoPlay="3000"
    position={CarouselPosition}
    setPosition={setCarouselPosition}
  arrowbgcolor="blue"
  arrowcolor="white"
  dots="overlay"
  dotcolor="grey"
  dotActiveColor="blue"
  dotSize="0.5em"
  arrowSize="1x"
  arrowWrapperSize="6vw"
  height="auto"
>

          <Wrapper justifycontent="center" flex fluid direction="column" alignitems="center" padding="3em 0 4em">

          <Icona src={worker} />
          <Text value={datiAccountability &&
                        datiAccountability.EstraiDatiAccountability? datiAccountability.EstraiDatiAccountability.operatoriAccreditati: 0} size="f1" align="center" />
          <div />
          <Text value={CounterJson.label.label1} weight={CounterJson.label.weight} intlFormatter />
          </Wrapper>

          <Wrapper justifycontent="center" flex fluid direction="column" alignitems="center" padding="3em 0 4em">

          <Icona src={impostazioni} />
          <Text value={datiAccountability && datiAccountability.EstraiDatiAccountability
            ? datiAccountability.EstraiDatiAccountability.serviziOfferti: 0} size="f1" align="center" />
          <div />
          <Text value={CounterJson.label.label2} weight={CounterJson.label.weight} intlFormatter />
          </Wrapper>

          <Wrapper justifycontent="center" flex fluid direction="column" alignitems="center" padding="3em 0 4em">

          <Icona src={family} />
          <Text value={datiAccountability && datiAccountability.EstraiDatiAccountability? datiAccountability.EstraiDatiAccountability.cittadiniIscritti: 0} size="f1" align="center" />
          <div />
          <Text value={CounterJson.label.label3} weight={CounterJson.label.weight} intlFormatter />
        </Wrapper>

</Carousel>
</Wrapper>
 )}
 }


Counter.displayName = 'Counter';

export default Counter;
