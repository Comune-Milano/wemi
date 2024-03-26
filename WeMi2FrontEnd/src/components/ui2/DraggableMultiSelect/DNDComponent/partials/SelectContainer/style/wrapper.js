import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${props => props.disabled ? css`
      display: none;
  ` : ''}
`;
