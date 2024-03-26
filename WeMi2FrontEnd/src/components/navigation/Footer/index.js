/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { Row } from 'components/ui/Grid';
import { getFooterLinks as getFooterLinksQ } from './partials/FooterGraphQL';
import { estraiVociMenu as estraiVociMenuQ, estraiVociMenuPreviewLivello1 as estraiVociMenuPreviewLivello1Q, estraiVociMenuPreviewLivello2 as estraiVociMenuPreviewLivello2Q } from '../Navbar/menuGraphQL';


import { Wrapper, FooterRight, FooterLeft } from './partials';

const Footer = ({
  locale,
  graphqlRequest,
  footerLinks,
  VociMenu,
  estraiVociMenuPreviewLivello1,
  estraiVociMenuPreviewLivello2,
  preview,
}) => {
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [staticLinks, setStaticLinks] = useState([]);

  useEffect(() => {
    graphqlRequest(
      getFooterLinksQ(preview)
);
  }, []);


  useEffect(() => {
    if (isNaN(preview) && !VociMenu) {
      graphqlRequest(estraiVociMenuQ());
    } else if (preview == 1 && !estraiVociMenuPreviewLivello1) {
      graphqlRequest(estraiVociMenuPreviewLivello1Q());
    } else if (preview == 2 && !estraiVociMenuPreviewLivello2) {
      graphqlRequest(estraiVociMenuPreviewLivello2Q());
    }
  }, [preview]);

  useEffect(() => {
    const arr1 = []; const
arr2 = [];
    if (footerLinks) {
      footerLinks.col2.forEach(el => {
        if (el.tl_testo_1[locale] === 'template_privacy' ||
          el.tl_testo_1[locale] === 'template_notelegali' ||
          el.tl_testo_1[locale] === 'template_accessibilita') {
          arr1.push(el);
        } else {
          arr2.push(el);
        }
      });
    }
    setStaticLinks(arr1);
    setFilteredLinks(arr2);
  }, [footerLinks]);

  return (
    <>
      {filteredLinks.length ? (
        <Wrapper preview={preview} role="contentinfo">
          <Row justifycontent="space-between">
            <FooterLeft
              navigationLinks={isNaN(preview) && VociMenu ?
                VociMenu.estraiVociMenu :
                preview === 1 && estraiVociMenuPreviewLivello1 ?
                  estraiVociMenuPreviewLivello1.estraiVociMenuPreviewLivello1
                  :
                  preview === 2 && estraiVociMenuPreviewLivello2 ?
                    estraiVociMenuPreviewLivello2.estraiVociMenuPreviewLivello2
                    : undefined
              }
              links={filteredLinks}
            />
            <FooterRight staticLinks={staticLinks} locale={locale} />
          </Row>
        </Wrapper>
      )
        : null}
    </>
  );
};
Footer.displayName = 'Footer';
const mapDispatchToProps = {
  graphqlRequest,
};

const mapStoreToProps = store => ({
  VociMenu: store.graphql.VociMenu,
  footerLinks: store.graphql.queryFooter,
  estraiVociMenuPreviewLivello1: store.graphql.estraiVociMenuPreviewLivello1,
  estraiVociMenuPreviewLivello2: store.graphql.estraiVociMenuPreviewLivello2,
  locale: store.locale,
});

export default connect(mapStoreToProps, mapDispatchToProps)(Footer);
