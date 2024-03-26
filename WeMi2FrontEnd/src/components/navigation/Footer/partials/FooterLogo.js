/** @format */

import styled from 'styled-components';
import media from 'utils/media-queries';

const FooterLogo = styled.img`
  src: ${props => props.src};
  margin: ${props => props.fluid ? '0' : '0 0'};
  display: block;
  width: ${props => props.fluid ? '100%' : '60%'};
`;
FooterLogo.displayName = 'FooterLogo';

export default FooterLogo;
