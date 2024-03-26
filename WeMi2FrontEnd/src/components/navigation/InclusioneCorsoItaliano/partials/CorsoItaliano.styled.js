import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import { HashLink } from 'react-router-hash-link';
import media from 'utils/media-queries';
import Text from 'components/ui/Text';

export const RowSticky = styled(Row)`
  position: sticky;
  top: ${({ top }) => top}px;
`;

export const Img = styled.img`
  cursor: pointer;
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

export const StyledList = styled.ul`
  line-height: 175%;

  list-style-type: ${props => props.type || 'disc'};
  box-sizing: border-box;
  outline: none;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 1em;
  -webkit-margin-end: 0;
  -webkit-padding-start: 0;
`;

export const StyledListItem = styled.li`
  line-height: 175%;
`;

export const StyledHashLink = styled(HashLink)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  outline: none;
`;

export const StyledWrapperRaw = styled(Row)`
  margin-top: 6em;

  ${media.md`
    margin-top: 0;
  `};
`;

export const TextPointer = styled(Text)`
  cursor: pointer;
`;
