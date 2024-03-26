/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import footerLogo from 'images2/footer/logo-footer.svg';
import partnersLogos from 'images2/footer/pon-metro-footer.svg';
import media from 'utils/media-queries';
import AnchorLink from 'components/ui/AnchorLink';
import { colors } from 'theme';
import Icon from 'components/ui/Icon';
import { NavLink } from 'components/router';
import ContactsList from './FooterLists/ContactsList';
import FooterLogo from './FooterLogo';

const FooterRightColumn = styled(Column)`
  position: relative;
  border-left: none;
  padding: 2em 0;
  border-top: 1px solid black;
  border-left: none;

  ${media.md`
    padding: 0 0 0 3em;
    border-top: none;
    border-left: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
`;

const LinkWrapper = styled.div`
  border-right: 1px solid ${colors.darkGrey};
  padding: 0 1em 0;
  &:first-child {
    padding: 0 1em 0 0;
  }
  &:last-child {
    border-right: none;
  }
  &:hover {
    color: ${colors.red};
  }
`;

const getName = (name) => {
  switch (name) {
    case 'template_privacy':
      return 'Privacy';
    case 'template_notelegali':
      return 'Note legali';
    case 'template_accessibilita':
      return 'Accessibilità';
    default:
  }
};

const getStaticLinkType = (link, locale) => {
  const name = getName(link.tl_testo_1[locale]);
  switch (link.ty_sottotipo_contenuto) {
    case 1:
      return (
        <AnchorLink role="menuitem" to={link.ln_link_1} _blank align="left">
          {link.oj_media && <Icon src={link.oj_media} />}
          {name}
        </AnchorLink>
      );
    case 2:
      return (
        <NavLink role="menuitem" to={`/PaginaInformativa/${link.id_contenuto}`} _blank>
          {link.oj_media && <Icon src={link.oj_media} />}
          <Text value={name} size="f7" letterSpacing="0.05em" />
        </NavLink>
      );
    case 3:
      return (
        <AnchorLink
          role="menuitem"
          download={`${link.oj_media2}`}
          downloadName={link.nm_nome_media2}
          align="left"
        >
          {name}
        </AnchorLink>
      );
    default:
      return null;
  }
};

getStaticLinkType.displayName = 'Static Link types';

const FooterRight = ({ staticLinks, locale }) => (
  <FooterRightColumn xs="12" md="6">
    <FooterLogo alt="Logo WeMi Footer" src={footerLogo} />
    <div style={{ padding: '.5em 0' }}>
      <ContactsList />
    </div>
    <Row fluid padding=".5em 0 2em">
      {staticLinks.map((el) => (
        <LinkWrapper key={el.id_contenuto}>{getStaticLinkType(el, locale)}</LinkWrapper>
      ))}
    </Row>
    <FooterLogo alt="Loghi partner" src={partnersLogos} fluid />
  </FooterRightColumn>
);
FooterRight.displayName = 'FooterRight';
export default FooterRight;
