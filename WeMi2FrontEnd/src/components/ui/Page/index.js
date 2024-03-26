/** @format */

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { HandleScrollDown } from 'components/ui/HandleScroll';
import { colors } from 'theme';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { NAV_HEIGHT_CHANGE_EV } from 'components/navigation/Navbar/constants';

export const StyledPage = styled.div`
  position: relative;
  width: 100%;
  background-color: ${colors.white};
  @keyframes opacityfade {
    0% {opacity: 0}
    100% {opacity: 1}
  }
  animation-name: opacityfade;
  animation-duration: 1.2s;

  padding-top: 16vw;
  ${media.md`
    padding-top: 13.5em;

    ${props => props.navBarHeight &&
      css`
        padding-top: ${props.navBarHeight}px !important;
      `}
  `}
`;


const StyledPageSection = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  justify-content: space-between;
  background-color: ${colors.white};
  transition: all .2s linear;
${props => props.scrollDown === 0 ? css`
min-height: none;
${media.md`
min-height: 78vh;
`}
` : css`
min-height: none;
${media.md`
min-height: 72vh;
`}
`}
`;

export const SectionPage = ({ children }) => {
  const scrollDown = HandleScrollDown();
  return (
    <StyledPageSection scrollDown={scrollDown}>
      {children}
    </StyledPageSection>
  );
};
SectionPage.displayName = 'SectionPage';


const Page = ({
  children,
}) => {
  const [navbarHeight, setNavbarHeight] = useState();
  const scrollDown = HandleScrollDown();

  useBusSubscribe(
    NAV_HEIGHT_CHANGE_EV,
    newNavHeight => setNavbarHeight(newNavHeight)
  );

  return (
    <StyledPage scrollDown={scrollDown} navBarHeight={navbarHeight}>
      {children}
    </StyledPage>
  );
};

Page.displayName = 'Page';


export default Page;
