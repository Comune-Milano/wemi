import { List } from 'components/ui2/List';
import styled from 'styled-components';
import { colors, fonts } from 'theme';

export const OrangeOrderedList = styled(List)`
  counter-reset: list;
  & > li {
    list-style: none;
    &:before {
      content: counter(list) " | ";
      counter-increment: list;
      font-weight: bold;
      font-size: ${fonts.size.f6};
      color: ${colors.orange};
}
`;
