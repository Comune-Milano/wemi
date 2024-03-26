import React from 'react';
import AnchorLink from 'components/ui/AnchorLink';
import Text from 'components/ui/Text';
import NavLink from 'components/router/NavLink';
import { StyledList, StyledListItem } from './StyledList';
import { MenuLiv2 } from './MenuLivello2';
import styled from "styled-components";

const MenuLiv1Component = (footerNav, index, locale) => {
  const StyledMenuLiv1 = () => {
    if (footerNav.linkLiv1 && footerNav.linkLiv1.trim().length > 0) {
      if (footerNav.linkLiv1.trim().includes('.')) {
        return (
          <StyledListItem
            liv1
            role="none"
            clickable
          >
            <AnchorLink
              // cursordefault
              role="menuitem"
              aria-haspopup="true"
              alignitems="left"
              to={footerNav.linkLiv1}
            >
              <Text
                weight="bold"
                size="f7"
                value={footerNav.txLiv1[locale]}
                align="left"
                letterSpacing="0.05em"
              />
            </AnchorLink>
          </StyledListItem>
        );
      }
      return (
        <StyledListItem
          liv1
          role="none"
          clickable
        >
          <NavLink
            role="menuitem"
            color="black"
            // cursordefault
            // aria-haspopup="true"
            to={`/${footerNav.linkLiv1}`}
            margin="0"
            alignitems="center"
            width="auto"
          >
            <Text
              weight="bold"
              size="f7"
              value={footerNav.txLiv1[locale]}
              align="left"
              letterSpacing="0.05em"
            />
          </NavLink>
        </StyledListItem>
      );
    }

    return (
      <Text
        weight="bold"
        size="f7"
        value={footerNav.txLiv1[locale]}
        align="left"
        letterSpacing="0.05em"
      />
    );
  };

  StyledMenuLiv1.displayName = 'Menu livello 1';


  return (
    <div
      style={{ margin: '0 0 1em' }}
      key={index.toString()}
    >
      <StyledMenuLiv1 />
      <StyledList role="menu" liv2>
        {Array.isArray(footerNav.liv2) ?
          <MenuLiv2 liv2={footerNav.liv2} locale={locale} />
          : null}
      </StyledList>
    </div>
  );
};
MenuLiv1Component.displayName = 'MenuLiv1Component';

export const MenuLiv1 = MenuLiv1Component;
