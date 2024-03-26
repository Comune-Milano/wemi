import { colors } from 'theme';
import NavLink from 'components/router/NavLink';
import styled from 'styled-components';

export const ImageContainer = styled(NavLink)`
  ${props => !props.disabled ? `cursor: pointer;
  transition: all .2s ease-in-out;
  &:hover, &:focus {
    transform: scale(1.1, 1.1);
    p {
      opacity: 0.9;
      color: ${colors.darkGrey};
    }
  }` : `
  opacity: 0.5;
  color: ${colors.darkGrey};
  pointer-events: none;
  `}
`;

export const Image = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 10rem;
`;
