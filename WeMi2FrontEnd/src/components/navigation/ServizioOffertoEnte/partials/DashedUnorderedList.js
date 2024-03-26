
import styled from 'styled-components';

export const DashedUnorderedList = styled.ul`
  margin: 0;
  list-style-type: none;
  
  li:before {
    content: "\\2013";
    padding-right: 13.5px;
  }
  
  li {
    padding-left: 20px;
    text-indent: -20px;
  }
`;