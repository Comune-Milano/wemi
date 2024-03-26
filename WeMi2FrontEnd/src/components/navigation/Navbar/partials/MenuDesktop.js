/** @format */

import React from 'react';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import { HashLink } from 'react-router-hash-link';
import AnchorLink from 'components/ui/AnchorLink';
import NavLink from 'components/router/NavLink';
import { scrollIntoView } from 'redux-modules/actions/authActions';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_HOME_URL } from 'types/url';
import { HOME_ANCHORS } from 'components/pages/Home/constants/anchors';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import Menu from './Menu';
import MenuItem, { MenuItem2, DropdownMenu } from './MenuItem';

const StyledHashLink = styled(HashLink)`
  color: inherit;
  text-decoration: none;
  cursor: default;
  outline: none;
`;

const MenuDesktop = ({ menu, locale, ...rest }) => {
  const eventBus = useEventBus();

  /**
   * Check if the provided value should be considered as an external url.
   * @param {*} url
   */
  const isExternalUrl = url => /^https?:\/\//.test(url);

  /**
   * Checks if the provided value matches a services aread identifier.
   * @param {*} value
   */
  const matchServicesAreaIdentifier = value => /AREA_SERVIZI_[0-9]+/gm.test(value);

  const MenuLiv2 = ({ liv2 }) => (
    <>
      {liv2.map((dropdownItem, index) => {
        if (dropdownItem.sottotipo === 2) {
          return (
            <MenuItem2
              role="none"
              key={`${dropdownItem.idLiv2}-${index.toString()}-Liv2`}
              role="none"
            >
              <NavLink
                role="menuitem"
                to={`/PaginaInformativa/${dropdownItem.idLiv2}`}
                cursordefault
                align="center"
                margin="auto"
                width="100%"
              >
                <Text
                  weight="bold"
                  tag="span"
                  size="f6"
                  value={dropdownItem.txLiv2[locale]}
                  letterSpacing="0.05em"
                />
              </NavLink>
            </MenuItem2>
          );
        }
        if (dropdownItem.sottotipo === 1) {
          if (!matchServicesAreaIdentifier(dropdownItem.linkLiv2)) {
            return (

              isExternalUrl(dropdownItem.linkLiv2) ?
                (
                  <AnchorLink
                    align="center"
                    role="menuitem"
                    key={`${dropdownItem.idLiv2}-${index.toString()}-Liv2`}
                    cursordefault
                    _blank
                    to={dropdownItem.linkLiv2}
                    width="100%"
                  >
                    <MenuItem2
                      role="none"
                    >
                      <Text
                        weight="bold"
                        tag="span"
                        size="f6"
                        value={dropdownItem.txLiv2[locale]}
                        letterSpacing="0.05em"
                      />
                    </MenuItem2>
                  </AnchorLink>
                ) :
                (
                  <NavLink
                    role="menuitem"
                    cursordefault
                    key={`${dropdownItem.idLiv2}-${index.toString()}-Liv2`}
                    to={dropdownItem.linkLiv2}
                    margin="0"
                    alignitems="center"
                    width="auto"
                  >
                    <MenuItem2
                      role="none"
                    >
                      <Text
                        weight="bold"
                        tag="span"
                        size="f6"
                        value={dropdownItem.txLiv2[locale]}
                        letterSpacing="0.05em"
                      />
                    </MenuItem2>
                  </NavLink>
                )

            );
          }
          return (

            <StyledHashLink
              role="menuitem"
              key={`${dropdownItem.idLiv2}-${index.toString()}-Liv2`}
              to={{
                pathname: PAGE_HOME_URL,
                hash: `#${HOME_ANCHORS.scopriServizi}`,
              }}
              scroll={el => {
                const servicesAreaCode = dropdownItem.linkLiv2.replace('AREA_SERVIZI_', '');
                eventBus.publish('CHANGE_SERVICES_AREA', parseInt(servicesAreaCode, 10));
              }}
            >
              <MenuItem2 role="none">
                <Text
                  weight="bold"
                  tag="span"
                  size="f6"
                  value={dropdownItem.txLiv2[locale]}
                  transform="uppercase"
                  letterSpacing="0.05em"
                />
              </MenuItem2>
            </StyledHashLink>
          );
        }
        if (dropdownItem.sottotipo === 3) {
          return (
            <AnchorLink
              role="menuitem"
              align="center"
              cursordefault
              key={`${dropdownItem.idLiv2}-${index.toString()}-Liv2`}
              download={`${dropdownItem.media1.oj_media}`}
              downloadName={dropdownItem.media1.nm_nome_media}
            >
              <MenuItem2 role="none" >
                <Text
                  weight="bold"
                  tag="span"
                  size="f6"
                  value={dropdownItem.txLiv2[locale]}
                  transform="uppercase"
                  letterSpacing="0.05em"
                />
              </MenuItem2>
            </AnchorLink>
          );
        }
      })}
    </>
  );

  return (
    <Menu navbarMenu role="menu" id="menuDesk" {...rest} menu={menu?.length}>
      {menu ? menu.map((navbarItem, index) => (
        navbarItem.linkLiv1 && navbarItem.linkLiv1.trim().length > 0 ?
          !navbarItem.linkLiv1.trim().includes('.') ? (
            <NavLink
              role="menuitem"
              cursordefault
              key={`${navbarItem.idLiv1}-${index.toString()}-Liv1`}
              to={`/${navbarItem.linkLiv1}`}
              margin="0"
              alignitems="center"
              width="auto"
            >
              <MenuItem
                role="none"
              >
                <Text
                  weight="bold"
                  size="f6"
                  value={navbarItem.txLiv1[locale]}
                  letterSpacing="0.05em"
                />
                <DropdownMenu role="menu">
                  {Array.isArray(navbarItem.liv2) && <MenuLiv2 liv2={navbarItem.liv2} />}
                </DropdownMenu>
              </MenuItem>
            </NavLink>
          )
            : (
              <AnchorLink
                cursordefault
                role="menuitem"
                aria-haspopup="true"
                alignitems="center"
                _blank
                to={navbarItem.linkLiv1}
                key={`${navbarItem.idLiv1}-${index.toString()}-Liv1`}
              >
                <MenuItem
                  role="none"
                >
                  <Text
                    tag="span"
                    weight="bold"
                    size="f6"
                    value={navbarItem.txLiv1[locale]}
                    letterSpacing="0.05em"
                  />
                </MenuItem>
              </AnchorLink>
            )
          : (
            <MenuItem
              role="none"
              key={`${navbarItem.idLiv1}-${index.toString()}-Liv1`}
            >
              <AnchorLink
                cursordefault
                tabIndex={0}
                role="menuitem"
                aria-haspopup="true"
                alignitems="center"
                to={null}
              >
                <Text
                  weight="bold"
                  size="f6"
                  value={navbarItem.txLiv1[locale]}
                  letterSpacing="0.05em"
                  transform=""
                />
              </AnchorLink>
              <DropdownMenu role="menu">
                {Array.isArray(navbarItem.liv2) && <MenuLiv2 liv2={navbarItem.liv2} />}
              </DropdownMenu>
            </MenuItem>
          )

      ))

        : (
          <MenuItem
            role="none"
          >
            {/* <Dropdown navItem scrollDown={scrollDown} id="menuItemDesk"> */}
            <Text
              weight="bold"
              size="f6"
              value="Sto caricando il menù..."
              color="red"
              transform="uppercase"
            />

            {/* </Dropdown> */}
          </MenuItem>
        )}
    </Menu>
  );
};

MenuDesktop.displayName = 'MenuDesktop';

const mapDispatchToProps = {
  scrollIntoView,
};

const mapStoreToProps = store => ({
  scrollIntoView: store.user.scrollIntoView,
});

export default connect(mapStoreToProps, mapDispatchToProps)(
  withRouter(MenuDesktop)
);
