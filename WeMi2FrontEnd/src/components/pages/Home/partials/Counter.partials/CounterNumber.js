
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';

const StyledCounterNumber = styled.div`
  position: relative;
  font-weight: bold;
  font-size: 50px;
  line-height: 100px;
  display: inline-block;
  ${media.sm`
  font-size: 100px;
`};
  &:after {
    position: absolute;
    color: #FFCD00;
    content: '${props => props.number}';
    bottom: 4px;
    left: 4px;
    mix-blend-mode: multiply;
    line-height: 100px;
  }

  .numberContainer {
    display: inline-block;
    position: relative;
    color: #B63489;
  }
`;

const DEFAULT_DURATION = 1500;
const DEFAULT_DELAY = 0;
const FRAMES_RATIO = 20;


export const CounterNumber = ({
  animate,
  duration = DEFAULT_DURATION,
  delay = DEFAULT_DELAY,
  startValue,
  endValue,

}) => {
  const frames = Math.floor(FRAMES_RATIO * duration / 1000);
  const increment = Math.ceil((endValue - startValue) / frames);
  const frame_delay = Math.ceil(duration / frames);

  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [currentValue, setCurrentValue] = useState(startValue || 0);

  const handleAnimation = () => {
    setAnimationTriggered(true);
    let count = currentValue;

    const updInterval = setInterval(() => {
      if (count + increment >= endValue) {
        count = endValue;
        setCurrentValue(count);
        clearInterval(updInterval);
      } else {
        count += increment;
        setCurrentValue(count);
      }
    }, frame_delay);
  };

  useEffect(() => {
    if (animate && !animationTriggered) {
      if (delay > 0) {
        setTimeout(() => { handleAnimation(); }, delay);
      } else {
        handleAnimation();
      }
    }
  }, [animate]);


  return (
    <StyledCounterNumber number={currentValue}>
      <div className="numberContainer">
        {currentValue}
      </div>
    </StyledCounterNumber>
  );
};

CounterNumber.displayName = 'CounterNumber';
