/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import { spacing } from 'theme';
import FaIcon from 'components/ui/FaIcon';

const RatePoint = styled(FaIcon)`
  cursor: pointer !important;
  padding: 0 ${props => spacing[props.spacingRight]} 0 0;
  &:before {
    padding: 0 !important;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.darkPrimary}!important;
  }
`;
RatePoint.displayName = 'RatePoint';

const Rating = ({ fontSize, spacingRight }) => {
  const [prevIds, setPrevIds] = useState([
    { id: 1, color: 'grey' },
    { id: 2, color: 'grey' },
    { id: 3, color: 'grey' },
    { id: 4, color: 'grey' },
    { id: 5, color: 'grey' },
  ]);

  const handleClick = event => {
    const id = parseInt(event.target.id.split('/')[1], 10);
    const arrBlue = [];
    for (let i = 1; i <= id; i += 1) {
      const json = { index: i, color: 'primary', value: true };
      arrBlue.push(json);
    }
    const arrGray = [];
    for (let i = id + 1; i > id && i <= 5; i += 1) {
      const json = { index: i, color: 'grey', value: false };
      arrGray.push(json);
    }
    const arr = [...arrBlue, ...arrGray];
    setPrevIds(arr);
  };

  return (
    <div
      style={{
        fontSize: 'inherit',
        display: 'flex',
        flexdirection: 'row',
        justifycontent: 'center',
      }}
    >
      {prevIds.map((elemento1, index) => (
        <RatePoint
          noShadow
          spacingRight={spacingRight}
          id={`${elemento1.id}/${index + 1}`}
          onClick={handleClick}
          icon="\f111"
          color={elemento1.color}
          fontSize={fontSize}
        />
      ))}
    </div>
  );
};
Rating.displayName = 'Rating';
export default Rating;
