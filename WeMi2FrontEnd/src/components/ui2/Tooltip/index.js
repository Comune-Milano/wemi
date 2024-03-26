/** @format */

import React from "react";
import styled, { css } from "styled-components";
import { injectIntl } from 'react-intl';
import media from 'utils/media-queries';
import TooltipBox from './tooltip';

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
  ${props => props.fluid ? 'width: 100%;' : null}

  ${props =>
    (!props.preventOnHover) &&
    css`
      &:hover > span[role="tooltip"], &:focus > span[role="tooltip"] {
        visibility: visible;
        opacity: 1;
      }
  `}

  span[role="tooltip"] {
    display: none;
    ${media.md`
      display: inline;
    `}
  }
`;

const Tooltip = ({
  id,
  color,
  bgcolor,
  fluid,
  value,
  position,
  visibility,
  fontSize,
  fontWeight,
  emWidth,
  posAdjustment,
  preventOnHover,
  children,
  intl,
  intlValue,
}) => {
  const tooltipValue = intlValue ?
    intl.formatMessage({ id: intlValue.id }, intlValue.params) :
    value;

  return (
    <StyledWrapper
      preventOnHover={preventOnHover}
      fluid={fluid}
      role="none"
    >
      {children}
      <TooltipBox
        id={id}
        color={color}
        bgcolor={bgcolor}
        position={position}
        posAdjustment={posAdjustment}
        fontSize={fontSize}
        fontWeight={fontWeight}
        emWidth={emWidth}
        visibility={visibility}
        value={tooltipValue}
      />
    </StyledWrapper>
  );
}

Tooltip.displayName = "Tooltip";

export default injectIntl(Tooltip);
