
import React from 'react';
import styled from 'styled-components';
import { colors } from 'theme';

const StyledNavbarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2em;
`;

const StyledArrow = styled.div`
  cursor: pointer;
  margin: 0 0.5em;  
  box-sizing: border-box;
  height: 9px;
  width: 9px;
  border-style: solid;
  border-color: ${colors.darkGrey};
  border-width: 0px 2px 2px 0px;
  transform: rotate(${props => props.rotate}deg);
  display: inline-block;

  :hover {
    border-color: ${colors.darkGrey};
  }
`;

/**
 * The date picker navbar. It allows to switch
 * to the previous or next month.
 * @param {*} props
 */
const DatePickerNavbar = ({
  onPreviousClick,
  onNextClick,
  className,
}) =>
  (
    <StyledNavbarWrapper className={className}>
      <StyledArrow
        rotate={135}
        onClick={() => onPreviousClick()}
      />
      <StyledArrow
        rotate={315}
        onClick={() => onNextClick()}
      />
    </StyledNavbarWrapper>
  );

DatePickerNavbar.displayName = 'DatePickerNavbar';

export default DatePickerNavbar;
