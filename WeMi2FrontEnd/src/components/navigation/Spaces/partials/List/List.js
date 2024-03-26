/** @format */

import styled from 'styled-components';
import Text from 'components/ui/Text';

const List = styled(Text)`
  display: block;
  width: auto !important;
  margin: auto !important;
  &:before {
    content: '';
    width: 10px;
    height: 10px;
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
    color: #0099ab !important;
    cursor: pointer;
  }
`;
List.displayName = 'List';

export default List;
