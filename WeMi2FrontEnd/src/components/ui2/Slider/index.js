/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import rcslider from 'rc-slider';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { noop } from 'utils/functions/noop';

const Wrapper = styled.div`
  display: flex;
  width: ${props => props.width};
  margin: ${props => props.margin};
`;

Wrapper.displayName = 'Wrapper';

const StyledMinMaxValue = styled.div`
  display: flex;
  align-items: center;
  font-size: .8rem;
  height: 12px;
  
  ${props =>
    props.type === "min"
      ? css`
      padding-right: 10px
      border-right: 2px solid ${({ theme }) => theme.colors.darkGrey};
    `
      : css`
      padding-left: 10px
      border-left: 2px solid ${({ theme }) => theme.colors.darkGrey};
  `};
`;


const StyledTooltip = styled(Tooltip)``;

StyledTooltip.displayName = 'StyledTooltip';

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <div style={{ position: 'relative' }} className="rc-tooltip-container">
      <StyledTooltip
        prefixCls="rc-slider-tooltip"
        overlay={moneyFormat(value, true)}
        getTooltipContainer={() => document.querySelector(".rc-tooltip-container")}
        visible={true}
        placement="top"
        key={index}
      >
        <rcslider.Handle value={value} {...restProps} />
      </StyledTooltip>
    </div>
  );
};
handle.displayName = 'handle';

const StyledSlider = styled(rcslider)`
  .rc-slider-rail {
    background-color: ${({ theme }) => theme.colors.darkGrey};
    height: 2px;
  }
  .rc-slider-step {
    background-color: ${({ theme }) => theme.colors.darkGrey};
    height: 2px;
  }
  .rc-slider-track {
    background-color: ${({ theme }) => theme.colors.primary};
    height: 1.5px;
    z-index: 10;
  }
  .rc-slider-handle {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    cursor: grab;
    height: 0.6em;
    width: 0.6em;
    margin-top: -0.25em;
    padding: 0 0.2em;
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

const Slider = ({
  width,
  margin,
  initialValue,
  getValue,
  min,
  max,
  tooltipSufix,
  onChange = noop,
  ariaLabelForHandle,
  ariaLabelledByForHandle,
  ariaValueTextFormatterForHandle = noop,
  ...rest
}) => {
  max = Math.ceil(max);

  return (
    <Wrapper width={width} margin={margin}>
      <StyledMinMaxValue type="min">
        {min}€
      </StyledMinMaxValue>
      <StyledSlider
        ariaLabelForHandle={ariaLabelForHandle}
        ariaLabelledByForHandle={ariaLabelledByForHandle}
        ariaValueTextFormatterForHandle={ariaValueTextFormatterForHandle}
        handle={handle}
        onAfterChange={getValue.bind(this)}
        onChange={onChange}
        {...rest}
        min={min}
        max={max}
        defaultValue={initialValue}
        tipFormatter={value => `${value}`}
        tipProps={{
          placement: 'top',
          prefixCls: 'rc-slider-tooltip',
        }}
      />
      <StyledMinMaxValue type="max">
        {moneyFormat(max, true)}
      </StyledMinMaxValue>
    </Wrapper>
  )
}

Slider.displayName = 'Slider';
export default Slider;
