import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import media from 'utils/media-queries';
import { fonts } from 'theme';
import { HashLink } from 'react-router-hash-link';

export const RowSticky = styled(Row)`
  position: sticky;
  top: ${({ top }) => top}px;
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

export const StyledWrapperRaw = styled(Row)`
  margin-top: 6em;

  ${media.md`
    margin-top: 0;
  `};
`;

export const WrapperText = styled.div`
  line-height: 175%;
  margin-top: 1.5em;
  margin: ${props => props.margin};
  font-size: ${props => fonts.size[props.fontSize]};
`;

export const Img = styled.img`
  margin: 0 0 0.6em 0;
`;

export const WrapperTextClick = styled.span`
  cursor: ${props => props.cursor || "default"};
  width: auto;
`;

export const StyledHashLink = styled(HashLink)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  outline: none;
`;