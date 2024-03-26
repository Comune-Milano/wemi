import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';
import media from 'utils/media-queries';
import { ColumnBorder } from 'components/shared/ColumnBorder';

export const StyledHashLink = styled(HashLink)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  justify-content: center;
  display: flex;
  &:focus {
    transition: all .2s ease-in-out;
    transform: scale(1.1, 1.1);
  }
`;

export const Img = styled.img`
  cursor: pointer;
  &:hover {
    transition: all .2s ease-in-out;
    transform: scale(1.1, 1.1);
  }
  height: ${props => props.height};
  width: ${props => props.width};
`;
export const WrapperText = styled.div`
  height: 3.5em;
`;

export const ColumnBorderStepper = styled(ColumnBorder)`
  ${media.lg`
    width: ${props => props.widthLg};
    padding: 0 0 3rem 0;
  `};
  ${media.xl`
    width: ${props => props.widthXl};
    padding: 20px;
  `}
`;
