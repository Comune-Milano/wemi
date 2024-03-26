import React from 'react';
import styled, { css } from 'styled-components';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import { colors, fonts } from 'theme';
import media from 'utils/media-queries';

const StyledChip = styled.li`
    align-items: center;
    flex-wrap: wrap;
    flex-basis: 50%;
margin: ${props => props.spacing};
display: inline-flex;
padding: 0 0.5em;
height: 25px;
line-height: 25px;
border-radius: 25px;
width: max-content;
background-color: ${props => colors[props.color]};
font-size: ${props => fonts.size[props.fontSize]};
text-overflow: ellipsis;
button {
  margin-left: 0.5em;
};

&:hover {
  button {
    &:before {
      color: ${colors.red};

    }
  }
}
${props => props.disabled ? css`
  pointer-events: none;
` : ''}

`;

export const StyledGroupChip = styled.ul`
  flex-wrap: wrap;
  ${media.sm`
    flex-basis: 70%;
  
  `}
  ${media.lg`
    flex-basis: 75%;
  
  `}
`;


const Chip = ({ color, value, size, onClick, spacing, disabled, id, ...rest }) => (
  <StyledChip
    fontSize={size}
    color={color}
    spacing={spacing}
    tabindex="0"
    disabled={disabled}
    id={id}
    {...rest}
  >
    {value}
    <ButtonIcon
      icon="times"
      onClick={onClick}
      fontSize="f9"
      color="darkGrey"
      disabled={disabled}
      noBorder
      ariaButtonIconLabel={id}
    />
  </StyledChip>
);
Chip.displayName = 'Chip';
export default Chip;
