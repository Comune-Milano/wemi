/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import UpperNavabarMenu, { UpperNavabarMenuItem } from 'components/navigation/Navbar/partials/UpperNavabarMenu';
import WeMiNavbarLogo from 'images2/navbar/logo-menu.png';
import NavLink from 'components/router/NavLink';
import { PAGE_HOME_PATH } from 'types/path';
import HamburgerMobile from './HamburgerMobile';
import UserIcon from './UserIcon';

const NavbarLogo = styled.img`
  transition: height .2s ease-in-out;
  width: auto;
  height: 10vw;

  ${props => props.scrollDown === 0 ? css`
    ${media.md`
      height: 7em;
    `};
    ` : css`
    ${media.md`
      height: 5em;
    `};
  `}
`;
NavbarLogo.displayName = 'NavbarLogo';

const MenuIcons = ({ menu, locale, scrollDown, cambiaCategoria, isPreview, ...rest }) => (
  <UpperNavabarMenu role="menu" {...rest}>
    <UpperNavabarMenuItem role="none">
      <NavLink role="menuitem" to={PAGE_HOME_PATH}>
        <NavbarLogo scrollDown={scrollDown} alt="Torna alla homepage" src={WeMiNavbarLogo} />
      </NavLink>
    </UpperNavabarMenuItem>
    <span style={{ height: '100%', display: 'flex' }}>
      <UpperNavabarMenuItem role="none">
        <UserIcon locale={locale} isPreview={isPreview} />
      </UpperNavabarMenuItem>
      <UpperNavabarMenuItem small role="none">
        <HamburgerMobile menu={menu} isPreview={isPreview} cambiaCategoria={cambiaCategoria} alt="icona menu" locale={locale} />
      </UpperNavabarMenuItem>
    </span>
  </UpperNavabarMenu>
);

MenuIcons.displayName = 'MenuIcons';
export default MenuIcons;
