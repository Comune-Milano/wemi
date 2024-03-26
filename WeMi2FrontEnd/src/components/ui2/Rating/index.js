/** @format */

import React from 'react';
import styled from 'styled-components';
import { fonts, colors, spacing } from 'theme';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';
import { isFunction } from 'utils/functions/typeCheckers';

const RatePoint = styled.span`
  font-size: ${props => fonts.size[props.fontSize]};
  height: 1em;
  width: 1em;
  background-color: ${props => props.isActive ? props.color ? colors[props.color] : colors.yellow : colors.grey};
  border: ${props => props.border ?  `2px solid ${ props.isActive ? colors[props.color] : colors.grey }` : null};
  border-radius: 50%;
  display: inline-block;
`;

const PointContainer = styled.span`
  padding: 0 ${props => props.spacingRight ? props.spacingRight : '0.3em'};
  cursor: ${props => props.readOnly ? 'auto' : 'pointer'};
`;

const RateContainer = styled.div`
  font-size: inherit;
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: auto;
  outline: none;
  &:hover ${RatePoint} {
  ${({ readOnly, color }) => !readOnly ? `background-color: ${color ? colors[color] : colors.yellow};` : ''} 
  }
  ${PointContainer}:hover ~ ${PointContainer} ${RatePoint} {
  ${props => !props.readOnly ? `background-color: ${props.border ? 'transparent' : colors.grey};` : ''} 
  }
`


RatePoint.displayName = 'RatePoint';

const MAX_RATING_STARS = 5;


const Rating = ({
  readOnly,
  fontSize,
  spacingRight,
  onClick,
  stars,
  color,
  border,
  tabIndex = readOnly ? -1 : 0,
}) => {
  const dots = [];
  const withoutDecimalsStars= Math.round(stars);
  const label = `Valutazione: ${withoutDecimalsStars} su ${MAX_RATING_STARS}`;

  function handleClick(event) {
    let newValue = parseInt(event.target.id, 10) + 1;
    if (newValue === withoutDecimalsStars) {
      newValue = 0;
    }
    onClick(newValue);
  }


  function handleKeyPress(event) {
    if (isFunction(onClick)) {
      switch (event.keyCode) {
        case keyCodes.UP_ARROW:
        case keyCodes.RIGHT_ARROW:
          event.preventDefault();
          onClick(withoutDecimalsStars == MAX_RATING_STARS ? withoutDecimalsStars : withoutDecimalsStars + 1);
          break;
        case keyCodes.LEFT_ARROW:
        case keyCodes.DOWN_ARROW:
          event.preventDefault();
          onClick(withoutDecimalsStars == 0 ? withoutDecimalsStars : withoutDecimalsStars - 1);
          break;
        default:
      }
    }
  }


  for (let i = 0; i < MAX_RATING_STARS; i++) {
    dots[i] = (
      <PointContainer
        key={i.toString()}
        readOnly={readOnly}
        spacingRight={spacingRight}>
        <RatePoint
          id={i}
          isActive={i < withoutDecimalsStars}
          onClick={!readOnly ? handleClick : () => { }}
          aria-hidden
          fontSize={fontSize}
          color={color}
          border={border}
        >
        </RatePoint>
      </PointContainer>
    );
  }

  return (
    <RateContainer
      tabIndex={tabIndex}
      role="slider"
      aria-label={label}
      aria-valuemax={MAX_RATING_STARS}
      aria-valuemin={0}
      aria-valuenow={withoutDecimalsStars}
      readOnly={readOnly}
      onKeyDown={handleKeyPress}
      color={color}
      border={border}
    >
      {
        dots.map(el => (el))
      }
    </RateContainer>
  );
};


Rating.displayName = 'Rating';


export default Rating;
