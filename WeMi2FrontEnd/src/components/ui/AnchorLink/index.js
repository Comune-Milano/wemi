/** @format */
import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';
import { injectIntl } from 'react-intl';
// import AnchorLinkPropTypes from './propTypes';

const StyledAnchorLink = styled.a`
  cursor: ${props => props.cursordefault ? 'default' : 'pointer'};
  outline: ${props => props.outline ? props.outline : 'none'} ;
  ${props => props.textDecoration ? `text-decoration : ${props.textDecoration} !important;` : ''}

  &:hover {
    color: 'inherit';
  }

  display: ${props => props.display || 'flex'};
  font-weight: ${props => props.weight ? props.weight : ''};
  width: ${props => props.width ? props.width : ''};
  text-align: ${props => props.align ? props.align : 'center'};
  justify-content: ${props => props.align ? props.align : 'flex-start'};
  align-items: ${props => props.alignitems ? props.alignitems : 'center'};

  ${props => props.value === 'text' ? css`
    padding: ${props => props.padding};
    color: ${props => props.color ? colors[props.color] : 'inherit'};
    text-decoration: underline ;
    font-size: ${props => fonts.size[props.size]};
    ` : css`
      text-decoration: none;
      color: inherit;
      padding: 0;
  `}
`;
StyledAnchorLink.displayName = 'StyledAnchorLink';

const AnchorLink = ({
  intl,
  value,
  size,
  activeIntl,
  children,
  to,
  color,
  weight,
  width,
  cursordefault,
  download,
  downloadName,
  intlNumber,
  alignitems,
  outline,
  _blank,
  onClick,
  display,
  textDecoration,
  ...rest
}) => {
  const label = value && activeIntl ? intl.formatMessage({ id: value }) : value;
  const number = intlNumber && activeIntl ? intl.formatMessage({ id: intlNumber }) : intlNumber;

  const handleKeyDown = event => {
    if (event.keyCode === keyCodes.ENTER) {
      onClick.bind(this);
      onClick();
    }
  };

  return (
    <StyledAnchorLink
      outline={outline}
      cursordefault={cursordefault}
      color={color}
      weight={weight}
      width={width}
      alignitems={alignitems}
      href={download || (intlNumber && typeof window.orientation !== 'undefined' ? `tel:${number}` : to)}
      size={size}
      display={display}
      value={value ? 'text' : 'children'}
      target={_blank ? '_blank' : '_self'}
      download={downloadName}
      textDecoration={textDecoration}
      onKeyDown={(event) => {
        if (onClick) { handleKeyDown(event); }
      }
      }
      {...(onClick ? { onClick } : {})}
      {...rest}
    >
      {/* Necessario il controllo perché può accettare sia un testo che un children */}
      {value ? label : children}
    </StyledAnchorLink>
  );
};
AnchorLink.displayName = 'AnchorLink';
// AnchorLink.propTypes = AnchorLinkPropTypes;
export default injectIntl(AnchorLink);
