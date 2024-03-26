import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from 'theme';

export const WrapperImmagineCategoria = styled(NavLink)`
  span {
    color: ${colors.darkGrey};
  }
  outline: none;
  cursor: pointer;
  transition: all .2s ease-in-out;
  &:hover, &:focus {
    transform: scale(1.1, 1.1);
  }
  width: 100%;
  height: 100%;
  text-align: center;

`;

export const ImmagineCategoria = styled.img`
 
`;
