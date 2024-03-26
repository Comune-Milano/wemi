/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import { injectIntl } from 'react-intl';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';

const StyledWrapper = styled.nav`
  width: 100%;
  
  padding: 1em 0 1em calc((1.5em + 2px)/2);
  li {
    left: calc((-1.5em - 2px)/2);
  }
`;

const StyledList = styled.ol`
  position: relative;
  font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f7};
  border-left: 2px solid ${colors.grey};
  width: 100%;

  li:first-child {
    margin-top: 0px;
  }
`;

const StyledStep = styled.li`
  cursor: ${props => (!props.disabled && !props.active && (!props.progressive || (props.progressive && props.visited))) ? 'pointer' : 'default'};
  position: relative;
  outline: none;
  display: flex;
  justify-content: stretch;
  align-items: center;
  flex-wrap: nowrap;
  margin-top: 1em;

  span.circle {
    display: block;
    box-sizing: border-box;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    margin-right: 1.5em;
    flex-shrink: 0;

    border: 2px solid ${colors.grey};
    background-color: ${colors.grey};
    transition: all 0.2s linear;

    ${props => props.visited &&
    css`
        background-color: ${props => props.color ? colors[props.color] : colors.primary};
        ${props => props.required &&
        css`
            border-width: 0.5em;
          `
      }
      `
  }
    ${props => props.active &&
    css`
        background-color: ${props => props.color ? colors[props.color] : colors.primary};
        border-color: ${props => props.color ? colors[props.color] : colors.primary};
      `
  }
  }
  span.title {
    display: block;
    color: ${colors.darkGrey};

    ${props => props.visited &&
    css`
        color: ${colors.black};
      `
  }
    ${props => props.active &&
    css`
        text-transform: uppercase;
        color: ${props => props.color ? colors[props.color] : colors.primary};
        font-weight: 700;
      `
  }
  ${props => props.disabled &&
    css`
        color: ${colors.grey};
      `
  }

    i {font-style: normal}
  }
`;

/**
 * Steps format:
 * {
 *  @title : name of the step (or intlTitle for the international name)
 *  @hide : true/false hide/show the step
 *  @active : true/false
 *  @visited : true/false (if the property "progressive" is set to true, only the visited steps can be selected)
 *  @valid : true/false in case a step with required fields inside has / has not been fully compiled
 * }
 */
const VerticalStepper = ({
  steps,
  readOnly,
  progressive,
  fontSize,
  color,
  onChange,
  intl,
}) => (
  <StyledWrapper
    aria-label="Menu di navigazione"
  >
    <StyledList
      role="menu"
      fontSize={fontSize}
    >
      {steps.map((step, stepIndex) => (
        <React.Fragment key={`TCBstep_${stepIndex}`}>
          {!step.hide && (
            <StyledStep
              role="menuitem"
              aria-current={step.active}
              tabIndex="0"
              color={color}
              active={step.active}
              visited={step.visited}
              required={!step.valid}
              progressive={progressive}
              disabled={step.disabled}
              onKeyUp={e => { if (e.keyCode == 13) { e.target.click(); } }}
              onClick={e => { if (!(step.disabled) && !step.active && (!progressive || (progressive && step.visited))) { onChange(stepIndex); } }}
            >
              <span className="circle" />
              <span className="title">
                {
                    step.intlTitle ?
                      intl.formatMessage({ id: step.intlTitle.id }, step.intlTitle.params) :
                      step.title
                  }
                {!step.valid && step.visited && !step.active && <i aria-label="required"> *</i>}
              </span>
            </StyledStep>
          )}
        </React.Fragment>
        ))}
    </StyledList>
  </StyledWrapper>
  );

VerticalStepper.displayName = 'VerticalStepper';

export default injectIntl(VerticalStepper);
