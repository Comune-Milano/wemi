import React from 'react';

import { fonts } from 'theme';
import { StyledIcon } from './StyledIcon';

const FaIcon = ({
  icon,
  absolute,
  height,
  width,
  color,
  padding,
  margin,
  bgcolor,
  fontSize,
  radius,
  size,
  transform,
  weight,
  display,
  socicon,
  top,
  left,
  bottom,
  right,
  disabled,
  cursor,
  ...rest
}) => (
  <StyledIcon
    {...rest}
    socicon={socicon}
    padding={padding}
    cursor={cursor}
    icon={icon}
    top={top}
    bottom={bottom}
    left={left}
    right={right}
    height={height}
    width={width}
    size={size}
    radius={radius}
    absolute={absolute}
    bgColor={disabled && cursor !== 'pointer' ? 'darkGrey' : bgcolor}
    disabled={disabled}
    color={color}
    style={{
      fontSize: `${fonts.size[fontSize]}`,
      fontWeight: `${fonts.weight[weight]}`,
      transition: 'all .2s linear',
      transform: `${transform}`,
      margin: `${margin}`,
      display:  `${display}`
    }}
  />
);

FaIcon.displayName = 'FaIcon';

export default FaIcon;
