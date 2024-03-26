/** @format */

import React from 'react';
import styled, {css} from 'styled-components';
import { colors, fonts } from 'theme';
import media from 'utils/media-queries';
import { injectIntl } from 'react-intl';
import BadgePropTypes from './propTypes';

const Wrapper = styled.div`
  position: relative;
  width: auto;
  height: auto;
  margin: ${props => props.margin};
  cursor: default;
`

const StyledBadge = styled.div`
position: absolute;
cursor: default;

  z-index: 2;
  ${props => props.verticalPosition === "bottom" ? css `
  bottom: calc(-0.5 * ${props => props.height});` : props.verticalPosition === 'top' ? css`
  top: calc(-0.5 * ${props => props.height});
  `: 
 css`
    position: static;

 `}

  right: calc(-0.5 * ${props => props.width});
  width: ${props => props.width};
  height: ${props => props.height};
  margin-bottom: ${props => props.margin};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding};
  font-size: ${props => fonts.size[props.fontsize]};
  color: ${props => colors[props.color]};
  height: ${props => props.size};
  background-color: ${props => colors[props.bgcolor]};
  border-radius: ${props => props.radius};
  ${media.md`
  font-size:  calc(${props => fonts.size[props.fontsize]} *0.55) !important;
  `};
  ${media.lg`
  font-size:  calc(${props => fonts.size[props.fontsize]}*0.7) !important;
  `};
`;

const Badge = ({
  intl,
  value,
  bgcolor,
  width,
  radius,
  color,
  padding,
  height,
  margin,
  fontsize,
  children,
  wrapperMargin,
  verticalPosition,
  activeIntl
}) => {
  const label = activeIntl? intl.formatMessage({ id: value }) : value;
  return (
    <Wrapper margin={wrapperMargin} verticalPosition={verticalPosition}>
    <StyledBadge
      bgcolor={bgcolor}
      width={width}
      verticalPosition={verticalPosition}
      padding={padding}
      height={height}
      fontsize={fontsize}
      radius={radius}
      color={color}
      margin={margin}
    >
      {label}
 
    </StyledBadge>
         {children}
         </Wrapper>
  );
};
Badge.displayName = 'Badge';
Badge.propTypes = BadgePropTypes;
export default injectIntl(Badge);
