/** @format */

import React from 'react';
import { connect } from 'react-redux';
import NavLink from 'components/router/NavLink';
import { FooterJson } from 'mocks/FooterJson';
import Text from 'components/ui/Text';
import Icon from 'components/ui/Icon';
import AnchorLink from 'components/ui/AnchorLink';
import { StyledList, StyledListItem } from './StyledList';


const MunicipalityLinksList = ({ links, locale }) => {
  return(
  <StyledList role="menu">
    {links && links.map((link,index) => {
      if (link.ty_sottotipo_contenuto === 3){
        return (
          <StyledListItem clickable role="none" 
          key={index.toString()}
          >
          <AnchorLink role="menuitem" download={`${link.oj_media2}`} downloadName={link.nm_nome_media2} key={index.toString()} align="left">
              <Text value={link.tl_testo_1 !== null ? link.tl_testo_1[locale] : ' '} transform="uppercase" size="f7" letterSpacing="0.05em" />
          </AnchorLink>
          </StyledListItem>
        )
      }
      else if (link.ty_sottotipo_contenuto === 1) {
        return (
          <StyledListItem clickable 
          role="none"
          key={index.toString()}
          >
          <AnchorLink role="menuitem" to={link.ln_link_1} _blank key={index.toString()} align="left">
              {link.oj_media &&
                <Icon src={link.oj_media} />}
              <Text value={link.tl_testo_1 !== null ? link.tl_testo_1[locale] : ' '} transform="uppercase" size="f7" letterSpacing="0.05em"/>
          </AnchorLink>
          </StyledListItem>
        )
      }
      else if (link.ty_sottotipo_contenuto === 2){
        return (
          <StyledListItem 
          key={index.toString()}          
          clickable role="none">
          <NavLink role="menuitem" to={'/PaginaInformativa/'+link.id_contenuto} _blank key={index.toString()}>
              {link.oj_media &&
                <Icon src={link.oj_media} />}
              <Text value={link.tl_testo_1 !== null ? link.tl_testo_1[locale] : ' '}  transform="uppercase" size="f7" letterSpacing="0.05em"/>
          </NavLink>
          </StyledListItem>
        )
      }
    }
    )}

  </StyledList>
)
};

MunicipalityLinksList.displayName = 'MunicipalityLinksList';
const mapStoreToProps = store => ({
  locale: store.locale,
})
export default connect(mapStoreToProps)(MunicipalityLinksList);
