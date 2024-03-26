/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row as RowHedron, Column as ColumnHedron } from 'hedron';
import { isNullOrUndefined } from 'util';
import sizes from 'utils/breakpoints';

const ColumnBase = ({
  fluid,
  xs,
  sm,
  md,
  lg,
  xl,
  xsShift,
  smShift,
  mdShift,
  lgShift,
  children,
  className,
  divisions,
  flex,
  justifycontent,
  alignitems,
  alignself,
  margin,
  padding,
  sizepadding,
  fontWeight,
  tagName,
  textAlign,
}) => {
  // SEE: https://github.com/JSBros/hedron/wiki/Grid-System#column-component
  const allowedProps = {
    fluid,
    xs,
    sm,
    md,
    lg,
    xl,
    xsShift,
    smShift,
    mdShift,
    lgShift,
    children,
    className,
    divisions,
    flex,
    justifycontent,
    alignitems,
    alignself,
    margin,
    padding,
    sizepadding,
    fontWeight,
  };

  return <ColumnHedron {...allowedProps}
    tagName={tagName ? tagName : "div"}
    justify={justifycontent}
    xs={!isNullOrUndefined(xs) ? parseInt(xs) : undefined}
    sm={!isNullOrUndefined(sm) ? parseInt(sm) : undefined}
    md={!isNullOrUndefined(md) ? parseInt(md) : undefined}
    lg={!isNullOrUndefined(lg) ? parseInt(lg) : undefined}
    xl={!isNullOrUndefined(xl) ? parseInt(xl) : undefined}
    xsShift={!isNullOrUndefined(xsShift) ? parseInt(xsShift) : undefined}
    smShift={!isNullOrUndefined(smShift) ? parseInt(smShift) : undefined}
    mdShift={!isNullOrUndefined(mdShift) ? parseInt(mdShift) : undefined}
    lgShift={!isNullOrUndefined(lgShift) ? parseInt(lgShift) : undefined}
    flex={flex ? flex.toString() : undefined}
  />;
};
ColumnBase.displayName = 'ColumnBase';

const createCssPropMediaQuery = (cssProp, obj) => Object.keys(obj).reduce(
  (accumulator, sizeLabel) =>
    accumulator + `
      @media (min-width: ${sizes[sizeLabel]}px) {
        ${cssProp}: ${obj[sizeLabel]};
      }
    `,
  ''
);

export const Column = styled(ColumnBase)`
  box-sizing: border-box;
  ${({ justifycontent }) => justifycontent && `justify-content: ${justifycontent}`};
  ${({ alignitems }) => alignitems && `align-items: ${alignitems};`};
  ${({ alignself }) => alignself && `align-self: ${alignself};`};
  ${({ margin }) => margin && `margin: ${margin};`};
  ${({ padding }) => padding && `padding: ${padding};`};
  ${({ flex }) => flex && 'display: flex;'};
  ${({ direction }) => direction && `flex-direction: ${direction};`};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`};

  ${({ order }) => (
    order ? createCssPropMediaQuery('order', order) : ""
  )}

  ${({ sizepadding }) => (
    sizepadding ? createCssPropMediaQuery('padding', sizepadding) : ""
  )}

  ${({ sizemargin }) => (
    sizemargin ? createCssPropMediaQuery('margin', sizemargin) : ""
  )}

  ${({ sizejustifycontent }) => (
    sizejustifycontent ? createCssPropMediaQuery('justify-content', sizejustifycontent) : ""
  )}
`;
Column.displayName = 'Column';

const RowBase = ({
  alignContent,
  alignitems,
  alignSelf,
  onClick,
  debug,
  divisions,
  justifycontent,
  h100,
  flexdirection,
  flexwrap,
  order,
  children,
  sizepadding,
  className,
  flex,
  margin,
  padding,
  fluid,
  tagName,
  tabIndex,
}) => {
  // SEE: https://github.com/JSBros/hedron/wiki/Grid-System#row-options
  const allowedProps = {
    tabIndex,
    alignContent,
    alignitems,
    alignSelf,
    onClick,
    debug,
    divisions,
    justifycontent,
    h100,
    sizepadding,
    flexdirection,
    order,
    children,
    className,
    flex,
    margin,
    padding,
    flexwrap,
    fluid,

  };
  return <RowHedron {...allowedProps}
    tagName={tagName ? tagName : "div"}
    tabIndex={tabIndex}
    justify={justifycontent}
    flex={flex ? flex.toString() : undefined}
    fluid={fluid ? fluid.toString() : undefined} />;
};
RowBase.displayName = 'RowBase';

export const Row = styled(RowBase)`
  ${({ fluid }) => fluid && 'width: 100%;'};
  ${({ justifycontent }) => justifycontent && `justify-content: ${justifycontent};`};
  ${({ alignitems }) => alignitems && `align-items: ${alignitems};`};
  ${({ flexwrap }) => flexwrap && `flex-wrap: ${flexwrap};`};
  ${({ margin }) => margin && `margin: ${margin};`};
  ${({ padding }) => padding && `padding: ${padding};`};
  height: ${props => props.height};
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`};
  ${({ flex }) => flex && 'display: flex;'};
  ${({ direction }) => direction && `flex-direction: ${direction};`};
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`};
  box-sizing: border-box;
  outline: none;

  ${({ sizemargin }) => (
    sizemargin ? createCssPropMediaQuery('margin', sizemargin) : ""
  )}
  ${({ sizepadding }) => (
    sizepadding ? createCssPropMediaQuery('padding', sizepadding) : ""
  )}
`;
Row.displayName = 'Row';

export const Center = styled.div`
  margin: 0 auto;
  padding-top: 15vh;
  text-align: center;
`;

Center.displayName = 'Center';
