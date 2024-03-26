/** @format */

import styled from 'styled-components';
import media from 'utils/media-queries';

const Wrapper = styled.nav`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  display: flex;
  justify-content: start;

  margin-bottom: 1em;

  li {
    &:last-child {
      span {
  opacity: 0;
  @keyframes fadein {
    0% { height: auto; opacity: 0}
    100% { height: auto; opacity: 1}
  }
  animation-name: fadein;
  animation-duration: 0.5s;
  animation-delay: .2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}
}
}
`;
Wrapper.displayName = 'Wrapper';

export default Wrapper;
