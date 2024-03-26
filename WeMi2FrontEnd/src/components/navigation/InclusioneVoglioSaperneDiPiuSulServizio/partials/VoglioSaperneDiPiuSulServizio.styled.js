import styled from 'styled-components';
import { Row } from 'components/ui/Grid';

export const RowSticky = styled(Row)`
  position: sticky;
  top: ${({ top }) => top}px;
`;

export const StyledList = styled.ul`
  line-height: 175%;

  list-style-type: disc;
  box-sizing: border-box;
  outline: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 1em;
  margin-inline-end: 0;
  padding-inline-start: 0;
`;

export const StyledListItem = styled.li`
  line-height: 175%;
`;
