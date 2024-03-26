/** @format */

import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { HashLink } from 'react-router-hash-link';

export const StyledList = styled.ul`
  display: inline-block;
  width: 100%;
  margin: 0 0 1em;
  padding: 0;

  ${media.md`
    margin: 0;
  `}
  display: block;
`;
StyledList.displayName = 'StyledList';

export const StyledListItem = styled.li`
  color: inherit;
  text-align: left;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;
  ${props =>
    props.clickable &&
    css`
  /* cursor: pointer; */
    &:hover, &:focus, &:focus-within {
            color: ${({ theme }) => theme.colors.red};
    }
    &:visited {
      color: ${({ theme }) => theme.colors.red};
}
    `}
    ${props => props.liv1 ? css` 
      /* margin: 0 0 1em; */
    ` : null}
`;
StyledListItem.displayName = 'StyledListItem';

export const StyledHashLink = styled(HashLink)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  outline: none;
`;
StyledHashLink.displayName = 'StyledHashLink';
