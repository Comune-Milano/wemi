/** @format */

import styled, { css } from 'styled-components';
import { fonts, spacing } from 'theme';
import media from 'utils/media-queries';

const UpperNavabarMenu = styled.ul`
  width: 100%;
  margin: auto;
  display: flex;
  padding-left: 2.8rem !important;
  padding-right: 2.8rem !important;
  justify-content: space-between;
  align-items: center;
  padding: 3vw ${spacing.pagePadding.p1};
  ${media.md`
    height: auto;
    align-items: center;
    display: flex;
    transition: all 0.5s linear;
    padding: 1.2em;
    padding-left: 100px !important;
    padding-right: 100px !important;
  `}
  ${media.lg`
    padding: 1.5em; 
    padding-left: 100px !important;
    padding-right: 100px !important;
  `};

  ${media.xxxxl`
    padding: 1.5em;
    padding-left: 100px !important;
    padding-right: 100px !important;
` };

`;
export const UpperNavabarMenuItem = styled.span`
width: auto;
* {
  &:focus {
    outline: none;
  }
}
i {
  font-size: 7.5vw;
}

#infoUtenteDiv {
  display: none
}
${media.md`
i {
  font-size: 3.5em;
}
#infoUtenteDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1em 0 0;
}
&:focus-within {
  // opacity: 0.9;
}
`}


${props => props.small ? css`
${media.md`
display: none
`}
display: inline-flex
`: props.large ? css` 
${media.md`
display: inline-flex
`}
display: none
`:
      css`
display: inline-flex
`}
`;


UpperNavabarMenu.displayName = 'UpperNavabarMenu';
export default UpperNavabarMenu;
