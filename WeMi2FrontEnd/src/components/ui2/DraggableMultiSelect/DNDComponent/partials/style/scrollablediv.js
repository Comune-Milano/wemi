import styled from 'styled-components';

export const ScrollableDiv = styled.div`
  max-height: ${props => props.maxHeight ? props.maxHeight : '400px'};
  overflow-y: auto;
  padding: 0 0.5em;
  scroll-behavior: smooth;
`;
