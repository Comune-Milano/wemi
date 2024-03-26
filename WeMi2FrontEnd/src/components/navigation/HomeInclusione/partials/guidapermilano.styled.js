import styled from 'styled-components';

export const ImmagineMappa = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 25rem;
  margin: 2em 0 2em 0;
`;
