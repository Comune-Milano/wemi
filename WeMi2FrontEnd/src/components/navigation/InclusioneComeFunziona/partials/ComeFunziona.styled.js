import styled from 'styled-components';
import { colors, fonts } from 'theme';
import { Row } from 'components/ui/Grid';

export const StyledTitle = styled.div`
  > span {
    -webkit-box-decoration-break: clone;
    white-space: pre-line;
    line-height: 2;
    letter-spacing: 0.05em;
    font-weight: 700;
    background-color: ${props => colors[props.color]};
    font-weight: semi-bold;
    font-size: ${fonts.size.f5};
    color: white;
    padding: 0.2em 0.5em;
    text-transform: uppercase;
  }
`;

StyledTitle.displayName = 'StyledTitle';

export const StyledList = styled.ul`
  line-height: 175%;

  list-style-type: disc;
  box-sizing: border-box;
  outline: none;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 1em;
  -webkit-margin-end: 0;
  -webkit-padding-start: 0;
`;

StyledList.displayName = 'StyledList';

export const StyledListItem = styled.li`
  line-height: 175%;
`;

StyledListItem.displayName = 'StyledListItem';

export const RowSticky = styled(Row)`
  position: sticky;
  top: ${({ top }) => top}px;
`;

RowSticky.displayName = 'RowSticky';
