import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import styled, { css } from 'styled-components';


const AnimatedText = styled.div`
${props => props.hasErrors ? css` 
  display: none; 
` : ''}
${props => props.isLoading ? css`
@keyframes blink {
0% {
  opacity: .2;
}

20% {
  opacity: 1;
}

100% {
  opacity: .2;
}
}

span {
animation-name: blink;
animation-duration: 1.4s;
animation-iteration-count: infinite;
animation-fill-mode: both;
}

span:nth-child(2) {
animation-delay: .2s;
}

span:nth-child(3) {
animation-delay: .4s;
}
` : ''}
`;

export const Title = ({ firstTitle, secondTitle, animatedTitle, isLoading, hasErrors }) => (
  <Row fluid margin="20px 0" flex alignitems="flex-end">
    <Text size="f3" value={firstTitle} color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
    <Text size="f3" value={secondTitle} color="darkGrey" transform="uppercase" weight="bold" letterSpacing="0.05em" padding="0 0.5em 0 0" />
    <AnimatedText
      isLoading={isLoading}
      hasErrors={hasErrors}
    >
      {isLoading ? (
        <>
          <Text size="f3" value="." color="darkGrey" weight="bold" />
          <Text size="f3" value="." color="darkGrey" weight="bold" />
          <Text size="f3" value="." color="darkGrey" weight="bold" />
        </>
      )
        : (
          <Text
            size="f3"
            value={animatedTitle}
            color="darkGrey"
            transform="uppercase"
            weight="bold"
            padding="0 0.5em 0 0"
            letterSpacing="0.05em"
          />
        )}
    </AnimatedText>

  </Row>
);

Title.displayName = 'Title';
