/** @format */

import React from 'react';
import styled from 'styled-components';
import FaIcon from 'components/ui/FaIcon';
import { Array } from 'es6-shim';
import { spacing } from 'theme';

const RatePoint = styled(FaIcon)`
  padding: 0 ${props => spacing[props.spacingRight]} 0 0;
  cursor: auto;
 }
`;
RatePoint.displayName = 'RatePoint';

const Rating = ({ fontSize, rate, stars, spacingRight }) => {
  const oldRate = rate;
  if (!Number.isInteger(rate)) {
    rate = parseInt(rate);
  }
  const arrayBlue = Array.from(Array(rate), () => 'primary');
  const graySize = stars - rate;
  let index = 0;
  const arrayGray = Array.from(Array(graySize), () => {
    if (!Number.isInteger(oldRate)) {
      if (index > 0) return 'grey';

      index += 1;
      return 'halfrate';
    }
    return 'grey';
  });
  const array = [...arrayBlue, ...arrayGray];
  return (
    <div style={{ fontSize: 'inherit', display: 'flex', flexdirection: 'row' }}>
      {array.map((rateColor, index) => (
        <RatePoint
          key={index.toString()}
          noShadow
          spacingRight={spacingRight}
          id={`${index + 1}`}
          icon="\f111"
          color={rateColor}
          fontSize={fontSize}
        />
      ))}
    </div>
  );
};
Rating.displayName = 'Rating';
export default Rating;
