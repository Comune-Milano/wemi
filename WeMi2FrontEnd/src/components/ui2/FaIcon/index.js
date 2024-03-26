import React from 'react';
import { fonts, colors } from 'theme';
import styled from 'styled-components';

const StyledI = styled.i`
  color: ${props => colors[props.color]};
  font-size: ${props => fonts.size[props.fontSize]};
  ${props => props.width ? 'width: ' + props.width + ';' : null}
  padding: ${props => props.padding ? props.padding : '0'};
`;

const FaIcon = ({
  icon,
  customClasses = "",
  fontSize,
  color,
  label,
  width,
  iconStyle = 'fas', // "fas" | "fab"
  padding,
  ...rest
}) => (
    <StyledI
      aria-hidden="true"
      className={`${iconStyle} fa-${icon} ${customClasses}`}
      aria-label={label}
      fontSize={fontSize}
      color={color}
      width={width}
      padding={padding}
      {...rest}
    />
  );

FaIcon.displayName = 'FaIcon';

export default FaIcon;
