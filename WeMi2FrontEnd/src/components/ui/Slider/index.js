/** @format */

import React, {useState} from 'react';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import rcslider from 'rc-slider';
import { moneyFormat } from 'utils/formatters/moneyFormat';

const Wrapper = styled.div`
  width: ${props => props.width};
  margin: ${props => props.margin};
`;

Wrapper.displayName = 'Wrapper';

const StyledTooltip = styled(Tooltip)``;

StyledTooltip.displayName = 'StyledTooltip';

const handle = props => {
  const { value, dragging, index, ...restProps } = props;

  return (
    <StyledTooltip
      prefixCls="rc-slider-tooltip"
      overlay={moneyFormat(value,true)}
      visible={dragging}
      placement="top"
      key={index}
    >
      <rcslider.Handle value={value} {...restProps} />
    </StyledTooltip>
  );
};
handle.displayName = 'handle';
const StyledSlider = styled(rcslider)`
  .rc-slider-rail {
    background-color: ${({ theme }) => theme.colors.grey};
    height: 0.2em;
  }
  .rc-slider-step {
    background-color: ${({ theme }) => theme.colors.grey};
    height: 0.2em;
  }
  .rc-slider-track {
    background-color: ${({ theme }) => theme.colors.grey};
    height: 0.2em;
  }
  .rc-slider-handle {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    cursor: grab;
    margin-top: -0.6em;
    height: 1.5em;
    width: 1.5em;
  }
  .rc-slider-handle {
    &:hover {
      background-color: ${({ theme }) => theme.colors.darkPrimary};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
  .rc-slider-handle {
    &:active {
      background-color: ${({ theme }) => theme.colors.darkPrimary};
      border-color: ${({ theme }) => theme.colors.darkPrimary};
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
    }
  }
`;

StyledSlider.displayName = 'StyledSlider';

const Slider = ({ width, margin, initialValue, getValue, min, max, tooltipSufix, ...rest }) => {
const setFocus = useState(false)

return (
  <Wrapper width={width} margin={margin}>
    <StyledSlider
      onClick={() => setFocus(true)}
      handle={handle}
      onAfterChange={getValue.bind(this)}
      {...rest}
      min={min}
      max={max}
      defaultValue={initialValue}
      tipFormatter={value => `${value}`}
      tipProps={{
        placement: 'bottom',
        prefixCls: 'rc-slider-tooltip',
      }}
    />
  </Wrapper>
)
}

Slider.displayName = 'Slider';
export default Slider;
