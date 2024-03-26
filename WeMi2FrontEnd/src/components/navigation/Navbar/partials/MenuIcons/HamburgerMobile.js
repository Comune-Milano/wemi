/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { scrollIntoView } from 'redux-modules/actions/authActions';
import MenuItem from 'components/navigation/Navbar/partials/MenuItem';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui2/FaIcon';
import AnchorLink from 'components/ui/AnchorLink';
import NavLink from 'components/router/NavLink';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import { PAGE_HOME_URL } from 'types/url';
import { HOME_ANCHORS } from 'components/pages/Home/constants/anchors';
import Menu from '../Menu';
import { DropdownMenu, MenuItem2 } from '../MenuItem';

const StyledHashLink = styled(HashLink)`
  color: inherit;
  text-decoration: none;
  cursor: default;
`;

const HamburgerMobile = ({ menu, locale, cambiaCategoria, scrollDown, scrollIntoView }) => {
  const [menuLiv2, setMenuLiv2] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const eventBus = useEventBus();


  const linkCorretto = (link) => {
    if (link) {
      const link2 = link.trim();
      if (link2.charAt(0) === 'w' && link2.charAt(1) === 'w' && link2.charAt(2) === 'w') {
        return (`http://${link2}`);
      }
      return link;
    }
  };

  const isExternalUrl = url => /^https?:\/\//.test(url);

  /**
   * Checks if the provided value matches a services aread identifier.
   * @param {*} value
   */
  const matchServicesAreaIdentifier = value => /AREA_SERVIZI_[0-9]+/gm.test(value);

  const getLiv2 = value => {
    if ((JSON.stringify(menuLiv2) !== JSON.stringify(value)) || !menuLiv2 || (menuLiv2.length !== value.length)) {
      setMenuLiv2(value);
    } else {
      setMenuLiv2(false);
    }
  };

  useEffect(
    () => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    []
  );

  const handleClickOutside = event => {
    if (menuRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  };

  const MenuLiv2 = ({ liv2 }) => (
    <>
      {liv2.map((dropdownItem, index) => {
        if (dropdownItem.sottotipo === 2) {
          return (
            <MenuItem2
              role="none"
              mobileItem
              key={`${dropdownItem.idLiv2}-${index.toString()}-Liv2`}
              role="none"
            >
              <NavLink
                role="menuitem"
                to={`/PaginaInformativa/${dropdownItem.idLiv2}`}
                onClick={() => setMenuOpen(false)}
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
                  transform="uppercase"
                  letterSpacing="0.05em"
                  align="center"
                />
              </NavLink>
            </MenuItem2>
          );
        }

        if (dropdownItem.sottotipo === 1) {
          if (!matchServicesAreaIdentifier(dropdownItem.linkLiv2)) {
            return (
              <MenuItem2
                key={`${dropdownItem.idLiv2}-${index.toString()}-Liv2`}
                mobileItem
                role="none"
              >
                {
                  isExternalUrl(dropdownItem.linkLiv2) ?
                    (
                      <AnchorLink
                        align="center"
                        role="menuitem"
                        cursordefault
                        onClick={() => setMenuOpen(false)}
                        _blank
                        to={linkCorretto(dropdownItem.linkLiv2)}
                        width="100%"
                      >
                        <Text
                          weight="bold"
                          tag="span"
                          size="f6"
                          value={dropdownItem.txLiv2[locale]}
                          transform="uppercase"
                          letterSpacing="0.05em"
                          align="center"
                        />
                      </AnchorLink>
                    ) :
                    (
                      <NavLink
                        role="menuitem"
                        align="center"
                        cursordefault
                        to={dropdownItem.linkLiv2}
                        margin="0"
                        alignitems="center"
                        width="auto"
                      >
                        <Text
                          weight="bold"
                          tag="span"
                          size="f6"
                          value={dropdownItem.txLiv2[locale]}
                          transform="uppercase"
                          letterSpacing="0.05em"
                          align="center"
                        />
                      </NavLink>
                    )
                }
              </MenuItem2>
            );
          }
          return (
            <MenuItem2
              //key={`${dropdownItem.idLiv2}-${index.toString()}-Liv2`}
              role="none"
              mobileItem
            >
              <StyledHashLink
                role="menuitem"
                to={{
                  pathname: PAGE_HOME_URL,
                  hash: `#${HOME_ANCHORS.scopriServizi}`,
                }}
                scroll={el => {
                  const servicesAreaCode = dropdownItem.linkLiv2.replace('AREA_SERVIZI_', '');
                  eventBus.publish('CHANGE_SERVICES_AREA', parseInt(servicesAreaCode, 10));
                }}
              >
                <Text
                  weight="bold"
                  tag="span"
                  size="f6"
                  value={dropdownItem.txLiv2[locale]}
                  transform="uppercase"
                  letterSpacing="0.05em"
                  align="center"
                />
              </StyledHashLink>
            </MenuItem2>
          );
        }
        if (dropdownItem.sottotipo === 3) {
          return (
            <MenuItem2
              mobileItem
              role="none"
              key={`${dropdownItem.idLiv2}-${index.toString()}-Liv2`}
            >
              <AnchorLink
                role="menuitem"
                align="center"
                cursordefault
                tabIndex={0}
                onClick={() => setMenuOpen(!menuOpen)}
                download={`${dropdownItem.media1.oj_media}`}
                downloadName={dropdownItem.media1.nm_nome_media}
              >
                <Text
                  weight="bold"
                  tag="span"
                  size="f6"
                  align="center"
                  value={dropdownItem.txLiv2[locale]}
                  transform="uppercase"
                  letterSpacing="0.05em"
                />
              </AnchorLink>
            </MenuItem2>
          );
        }
      })}
    </>
  );

  return (
    <Menu
      role="menu"
      mobile
      ref={menuRef}
    >
      <MenuItem icon active={menuOpen}>
        <AnchorLink
          to={null}
          onClick={() => setMenuOpen(!menuOpen)}
          role="menuitem"
          aria-haspopup="true"
          alignitems="center"
          cursordefault
          tabIndex={0}
        >
          <div style={{ width: '30px' }}>
            <FaIcon
              fontSize="f3"
              icon="bars"
              label="Apri menu"
            />
            <FaIcon
              fontSize="f3"
              icon="times"
              label="Chiudi menu"
            />
          </div>
        </AnchorLink>
        <DropdownMenu mobile>
          {menu && menuOpen && menu.map((navbarItem, index) => (
            <span key={`${navbarItem.idLiv1}-${index.toString()}-Liv1`}>
              {navbarItem.linkLiv1 && navbarItem.linkLiv1.trim().length > 0 ?
                !navbarItem.linkLiv1.trim().includes('.') ? (
                  <MenuItem
                    active={menuLiv2 && menuLiv2 === navbarItem.liv2 && navbarItem.liv2.length > 0}
                    mobileItem
                    role="none"
                    
                  >
                    <NavLink
                      role="menuitem"
                      onClick={() => { setMenuOpen(false); }}
                      cursordefault
                      to={`/${navbarItem.linkLiv1}`}
                      margin="0"
                      alignitems="center"
                      align="center"
                      width="auto"
                    >
                      <Text
                        weight="bold"
                        size="f6"
                        value={navbarItem.txLiv1[locale]}
                        transform="uppercase"
                        letterSpacing="0.05em"
                        align="center"
                      />
                    </NavLink>
                  </MenuItem>
                )
                  : (
                    <MenuItem
                      role="none"
                      active={menuLiv2 && menuLiv2 === navbarItem.liv2 && navbarItem.liv2.length > 0}
                      mobileItem
                      role="none"
                      
                    >
                      <AnchorLink
                        onClick={() => { getLiv2(navbarItem.liv2); }}
                        onBlur={() => { getLiv2(navbarItem.liv2); }}
                        cursordefault
                        role="menuitem"
                        aria-haspopup="true"
                        alignitems="center"
                        align="center"
                        _blank
                        to={linkCorretto(navbarItem.linkLiv1)}
                      >
                        <Text
                          tag="span"
                          weight="bold"
                          size="f6"
                          value={navbarItem.txLiv1[locale]}
                          transform="uppercase"
                          letterSpacing="0.05em"
                          align="center"
                        />
                      </AnchorLink>
                    </MenuItem>
                  )
                : (
                  <MenuItem
                    active={menuLiv2 && menuLiv2 == navbarItem.liv2 && navbarItem.liv2.length > 0}
                    mobileItem
                    role="none"
                    
                  >
                    <AnchorLink
                      cursordefault
                      tabIndex={0}
                      role="menuitem"
                      onClick={() => { getLiv2(navbarItem.liv2); }}
                      // onBlur={() => { getLiv2(navbarItem.liv2); }}
                      align="center"
                      aria-haspopup="true"
                      alignitems="center"
                      to={null}
                    >
                      <Text
                        weight="bold"
                        size="f6"
                        value={navbarItem.txLiv1[locale]}
                        transform="uppercase"
                        letterSpacing="0.05em"
                        align="center"
                      />
                    </AnchorLink>
                    <DropdownMenu mobileItem role="menu">
                      {Array.isArray(navbarItem.liv2) && <MenuLiv2 liv2={navbarItem.liv2} />}
                    </DropdownMenu>
                  </MenuItem>
                )}
            </span>
          ))}
        </DropdownMenu>
      </MenuItem>
    </Menu>
  );
};

const mapDispatchToProps = {
  scrollIntoView,
};

const mapStoreToProps = store => ({
  scrollIntoView: store.user.scrollIntoView,
});
HamburgerMobile.displayName = 'HamburgerMobile';

export default connect(mapStoreToProps, mapDispatchToProps)(HamburgerMobile);
