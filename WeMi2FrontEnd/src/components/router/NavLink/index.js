/** @format */

import React from 'react';
import { localeSelector } from 'redux-modules/selectors/localeSelectors';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { NavLink as NavLinkReactRouter } from 'react-router-dom';

const BaseNavLink = styled(NavLinkReactRouter)`
  ${props => props.cursordefault ? css`
    cursor: default;
  ` : css`cursor: pointer;`}
  align-items: ${props => props.alignitems ? props.alignitems : 'center'};
  display: ${props => props.display || 'flex'};
  width: ${props => props.width ? props.width : 'max-content'};
  color: inherit;
  outline: ${props => props.outline ? props.outline : 'none'} ;
  text-align: center;
  text-decoration: none;
  justify-content: ${props => props.align ? props.align : "inherit"};
  margin: ${props => props.margin};
`;
BaseNavLink.displayName = 'BaseNavLink';

const NavLink = ({ 
  locale,
  to,
  margin,
  width,
  children,
  align,
  alignitems,
  outline,
  display,
  cursordefault,
  dispatch,
  _blank,
  ...rest
}) => (

  <BaseNavLink
    outline={outline}
    cursordefault={cursordefault ? cursordefault.toString() : null}
    margin={margin} 
    align={align} 
    alignitems={alignitems}
    width={width} 
    display={display}
    to={to || to === '' ? to : '#'}
    dispatch={""}
    _blank={_blank ? _blank.toString() : null}
    {...rest}
  >
    {children}
  </BaseNavLink>


);

NavLink.displayName = 'NavLink';
// NavLink.propTypes = NavLinkPropTypes;

const mapStoreToProps = store => ({
  locale: localeSelector(store),
});

export default connect(mapStoreToProps)(NavLink);
