/** @format */

import styled, {css} from 'styled-components';
import Text from 'components/ui/Text';
import {fonts, colors} from 'theme';

const List = styled(Text)`
  display: block;
  width: auto !important;
  margin: 0.2rem 0 ;
  transition: all .2s ease-in-out;

  &:before {
    content: '';
    width: calc(${props => fonts.size[props.size]}*0.5);
    height:  calc(${props => fonts.size[props.size]}*0.5);
    background-color: ${props => props.color};
    margin-right: 20px;
    display: inline-block;
    border-radius: 50%;
    background: #707070;
    .fOhosd {
      padding: 0 !important;
    }
  }
  &:hover {
    opacity: 0.9;
      color: ${colors.primary}!important;
      transition: all .2s ease-in-out;

    cursor: pointer;
    &:before {
      background-color: ${colors.primary}!important;
  transition: all .2s ease-in-out;

    }
  };

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
