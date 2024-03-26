/** @format */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Row } from 'components/ui/Grid';
import { graphqlRequest, CategoriaHomePage, openLoginModal } from 'redux-modules/actions/authActions';
import { HandleScrollDown } from 'components/ui/HandleScroll';
import { Wrapper, MenuIcons, MenuDesktop } from './partials';
import { estraiVociMenu as estraiVociMenuQ, estraiVociMenuPreviewLivello1 as estraiVociMenuPreviewLivello1Q, estraiVociMenuPreviewLivello2 as estraiVociMenuPreviewLivello2Q } from './menuGraphQL';
import { useElementHeightObserver } from 'hooks/useElementHeightObserver';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import { NAV_HEIGHT_CHANGE_EV } from './constants';

const Navbar = ({
  graphqlRequest,
  VociMenu,
  datiLogin,
  openLoginModal,
  preview,
  previewN,
  estraiVociMenuPreviewLivello2,
  estraiVociMenuPreviewLivello1,
  CategoriaHomePage,
  locale,
  ...rest
}) => {
  const scrollDown = HandleScrollDown();

  const navRef = useRef();

  const eventBus = useEventBus();

  useElementHeightObserver(
    navRef.current,
    newNavHeight => eventBus.publish(NAV_HEIGHT_CHANGE_EV, newNavHeight)
  );

  const cambiaCategoria = cat => {
    CategoriaHomePage(cat);
  };

  useEffect(() => {
    if (isNaN(previewN)) {
      graphqlRequest(estraiVociMenuQ());
    } else if (previewN == 1) {
      graphqlRequest(estraiVociMenuPreviewLivello1Q());
    } else {
      graphqlRequest(estraiVociMenuPreviewLivello2Q());
    }
  }, []);

  return (
    <>
      <Wrapper
        id="navigation-menu"
        scrollDown={scrollDown}
        preview={preview}
        aria-label="Barra di navigazione"
        role="menubar"
        ref={navRef}
        {...rest}
      >
        <Row justifycontent="space-between" direction="column" height="100%">
          {/* {!scrollDown && <SwitchLocale />} */}
          {isNaN(previewN) ? (
            <>
              <MenuIcons
                scrollDown={scrollDown}
                cambiaCategoria={cambiaCategoria}
                locale={locale}
                menu={VociMenu && VociMenu.estraiVociMenu}
              />
              <MenuDesktop
                cambiaCategoria={cambiaCategoria}
                locale={locale}
                menu={VociMenu && VociMenu.estraiVociMenu}
              />
            </>
        )
          :
          previewN == 1 ? (
            <>
              <MenuIcons
                cambiaCategoria={cambiaCategoria}
                locale={locale}
                scrollDown={scrollDown}
                menu={estraiVociMenuPreviewLivello1 ?
                  estraiVociMenuPreviewLivello1.estraiVociMenuPreviewLivello1 :
                  VociMenu && VociMenu.estraiVociMenu}
                isPreview
                {...rest}
              />
              <MenuDesktop
                cambiaCategoria={cambiaCategoria}
                locale={locale}
                menu={estraiVociMenuPreviewLivello1 ?
                  estraiVociMenuPreviewLivello1.estraiVociMenuPreviewLivello1 :
                  VociMenu && VociMenu.estraiVociMenu}
                {...rest}
                
              />
            </>
          )
            : (
              <>
                <MenuIcons
                  scrollDown={scrollDown}
                  cambiaCategoria={cambiaCategoria}
                  locale={locale}
                  isPreview
                  menu={estraiVociMenuPreviewLivello2 ?
                  estraiVociMenuPreviewLivello2.estraiVociMenuPreviewLivello2 :
                  VociMenu && VociMenu.estraiVociMenu}
                />
                <MenuDesktop
                  cambiaCategoria={cambiaCategoria}
                  locale={locale}
                  menu={estraiVociMenuPreviewLivello2 ?
                  estraiVociMenuPreviewLivello2.estraiVociMenuPreviewLivello2 :
                  VociMenu && VociMenu.estraiVociMenu}
                />
              </>
          )}
        </Row>
      </Wrapper>
    </>
  );
};
Navbar.displayName = 'Navbar';
// Navbar.propTypes = NavbarPropTypes;

const mapDispatchToProps = {
  graphqlRequest,
  openLoginModal,
  CategoriaHomePage,
};

const mapStoreToProps = store => ({
  datiLogin: store.datiLogin,
  VociMenu: store.graphql.VociMenu,
  estraiVociMenuPreviewLivello1: store.graphql.estraiVociMenuPreviewLivello1,
  estraiVociMenuPreviewLivello2: store.graphql.estraiVociMenuPreviewLivello2,
  categoria: store.user.cat,
  locale: store.locale,
});
export default connect(mapStoreToProps, mapDispatchToProps)(Navbar);
