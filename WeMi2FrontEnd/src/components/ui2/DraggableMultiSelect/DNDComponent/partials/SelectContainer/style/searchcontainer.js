import styled from 'styled-components';
import { colors } from 'theme';

export const StyledContainerSearch = styled.div`
  padding: 0 0 1em 0;
  border-bottom: 1px solid gray;
  
  & > input {
    width: 100%;
    padding: 0.5em;
    border: 1px solid ${colors.primary};
  }
`;
