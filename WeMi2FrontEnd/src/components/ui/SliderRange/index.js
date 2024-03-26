/** @format */

import React from 'react';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import rcslider from 'rc-slider';

const Range = rcslider.createSliderWithTooltip(rcslider.Range);

const Wrapper = styled.div`
  width: ${props => props.width};
  margin: ${props => props.margin};
`;

const StyledSlider = styled(Range)`
  .rc-slider-rail {
    background-color: ${({ theme }) => theme.colors.grey};
  }
  .rc-slider-step {
    background-color: ${({ theme }) => theme.colors.grey};
  }
  .rc-slider-handle {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
  .rc-slider-handle {
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
    }
  }
  .rc-slider-handle {
    &:active {
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
    }
  }
  .rc-slider-handle {
    &:focus {
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: unset;
    }
  }
  .rc-slider-handle-click-focused {
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
    }
  }
  .rc-slider-tooltip {
    display: none;
  }
`;

StyledSlider.displayName = 'StyledSlider';

const SliderRange = ({ width, margin, ...rest }) => (
  <Wrapper width={width} margin={margin}>
    <StyledSlider
      {...rest}
      min={0}
      max={100}
      defaultValue={[0, 100]}
      tipFormatter={value => `${value}`}
      tipProps={{
        placement: 'top',
        prefixCls: 'rc-slider-tooltip',
      }}
    />
  </Wrapper>
);

SliderRange.displayName = 'SliderRange';

export default SliderRange;
