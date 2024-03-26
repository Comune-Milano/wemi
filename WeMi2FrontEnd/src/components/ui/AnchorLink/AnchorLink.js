/** @format */
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';

const StyledAnchorLink = styled.a`
padding: ${({ theme }) => theme.spacing.p2}
  color: ${props => colors[props.color]} !important;
 text-decoration: underline !important;
 position: absolute;
 right:0;
 top: 0;
 font-size:  ${props => fonts[props.size]};
 ${props =>
   props.leftAnchor &&
   css`
     position: absolute;
     right: 5em;
   `}
`;
StyledAnchorLink.displayName = 'StyledAnchorLink';

export default StyledAnchorLink;
