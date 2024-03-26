import styled, { css } from 'styled-components';
import { fonts, colors } from 'theme';
import { orientationTypes } from 'components/ui2/DraggableMultiSelect/constants';

export const StyledItem = styled.li`
min-height: 59px;
height: auto;
display: flex;
align-items: center;
width: 100%;
padding: 0 10px;
background-color: ${colors.white};
border-bottom: 1px solid ${colors.greyInput};
box-sizing: border-box;
user-select: none;
color: ${colors.darkGrey};
font-weight: ${fonts.weight.normal};
${props => (props.orientation === orientationTypes.horizontal) || props.orientation === orientationTypes.grid ?
  css`
  border-right: 1px solid ${colors.greyInput};
  width: auto;
  max-width: 33%;
  position: relative;
    flex-basis: 100%;
  padding: 10px;
  margin: 10px;

`
  : ''}
&:focus {
  outline: ${colors.primary} auto 1px;
}
${props => !props.disabled && props.sortable ?
css`
    cursor: move;
` : ''}
${props => props.disabled ?
    css`
    pointer-events: none;
    cursor: default;
` : ''}
`;
