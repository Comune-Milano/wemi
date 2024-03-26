import styled from 'styled-components';

export const StyledCont = styled.div`
  ${({ padding }) => `
    cursor: pointer;
    padding: ${padding};
    right: 0;
    width: 200px;
    z-index: 1;
    background-color: white;
    bottom:0;
    position:fixed;
`}`;
