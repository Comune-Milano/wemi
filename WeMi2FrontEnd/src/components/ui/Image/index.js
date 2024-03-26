/** @format */

import styled from 'styled-components';
import media from 'utils/media-queries';

const Image = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 4rem;
  ${media.sm`
    height: 2rem;
  `};
  ${media.md`
    height: 3rem;
  `};
  ${media.lg`
    height: 4rem;
  `};
`;

Image.displayName = 'Image';

export default Image;
