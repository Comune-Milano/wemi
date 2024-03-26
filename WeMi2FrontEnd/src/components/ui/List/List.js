/** @format */

import styled, {css} from 'styled-components';
import Text from 'components/ui/Text';
import {fonts, colors} from 'theme';

const List = styled(Text)`
display: ${props => props.display ? props.display : 'flex' };
word-break: break-word;
align-items: center;
justify-content: flex-start;
width: auto !important;
font-weight: ${props => props.weight};
margin: 0.2rem 0 ;
text-decoration: ${props => props.decoration};
transition: all .2s ease-in-out;
&:before {
  content: '';
  color: inherit;
  background-color: ${props => colors.primary}!important;
  font-size: ${props => fonts.size[props.size]};
  width: calc(1em * ${props => props.dotproportion});
  height:  calc(1em * ${props => props.dotproportion});
  background-color: ${props => colors[props.dotcolor]};
  margin-right: ${props => fonts.size[props.size]};
  display: inline-block;
  border-radius: ${props => props.radius};
}

${props => props.clickable && css `
&:hover {
  opacity: 0.9;
    color: ${props => colors[props.clickable]}!important;
    transition: all .2s ease-in-out;

  cursor: pointer;
  &:before {
    background-color: ${props => colors[props.clickable]}!important;
transition: all .2s ease-in-out;

  }
};
`}

${props => props.active && css` 
  color: ${colors.primary}!important;
  cursor: pointer;
transition: all .2s ease-in-out;
&:before {
  background-color: ${colors.primary}!important;
  transition: all .2s ease-in-out;
}
  `}
`;
List.displayName = 'List';

export default List;
