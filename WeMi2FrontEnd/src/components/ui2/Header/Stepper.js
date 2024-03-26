/** @format */
import React from 'react';
import styled, { css } from 'styled-components';
import { Row } from 'components/ui/Grid';
import Header from 'components/ui2/Header';
import { NavLink } from 'components/router';
import { isFunction } from 'utils/functions/typeCheckers';

const sharedStyle = css`
    position: relative;
    width: 100%;
    /* transition: max-width .2s linear; */
    margin-left: -0.7em;
    cursor: default;
    mix-blend-mode: multiply;
    
    ${props => props.active === 'Y' ? `
        max-width: calc(100% - ${(props.steps - 1) * (3.5 - 0.7)}em);
        ` :
        'max-width: 3.5em;'}

    /* &[href] {
      cursor: pointer;
    } */

    &:first-child {
        margin-left: 0px;
    }

    @keyframes comparsaLenta {
        0% {opacity: 0};
        100% {opacity: 1}
    }
`;

const StyledStepperLink = styled(NavLink)`${sharedStyle}`;

const StyledStepperDiv = styled.div`${sharedStyle}`;

const Stepper = ({ steps, useRouting }) => (
  <Row fluid margin="0" flexwrap="nowrap">
    {steps.map((el, index) =>
      useRouting ? (
        <StyledStepperLink
          role="menuitem"
          to={el.link ? el.link : null}
          active={el.active ? 'Y' : 'N'}
          steps={steps.length}
          index={index}
          key={index.toString()}
        >
          <Header
            justify={el.active ? 'flex-start' : 'center'}
            title={el.active ? el.title : null}
            index={index + 1}
            color={el.color}
          />
        </StyledStepperLink>
      ) : (
        <StyledStepperDiv
          active={el.active ? 'Y' : 'N'}
          steps={steps.length}
          onClick={() => {
            const { onClickStepHandler } = el;
            if (isFunction(onClickStepHandler)) {
              el.onClickStepHandler(index);
            }
          }
            }
          index={index}
          key={index.toString()}
        >
          <Header
            justify={el.active ? 'flex-start' : 'center'}
            title={el.active ? el.title : null}
            index={index + 1}
            color={el.color}
          />
        </StyledStepperDiv>
      ))}
  </Row>
);

Stepper.displayName = 'Stepper';

export default Stepper;
