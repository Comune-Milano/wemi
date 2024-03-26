
import React from 'react';
import { connect } from 'react-redux';
import { graphqlRequest, CategoriaHomePage, scrollIntoView } from 'redux-modules/actions/authActions';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { FooterJson } from 'mocks/FooterJson';
import { StyledList, StyledListItem } from './StyledList';
import UsefulLinks from '../UsefulLinks';
import { MenuLiv1 } from './MenuLivello1';


const NavigationLinksList = ({
  navigationLinks,
  links,
  locale,
}) => (
  <StyledList role="menu">
    <Row fluid justifycontent="space-between">
      <Column xs="12" md="6" padding="0 1em 0 0">
        {navigationLinks && navigationLinks.map((footerNav, index) => (
            !footerNav.footerColDx &&
            MenuLiv1(footerNav, index, locale)
          ))
          }
      </Column>
      <Column xs="12" md="6" padding="0">
        {navigationLinks && navigationLinks.map((footerNav, index) => (
            footerNav.footerColDx &&
            MenuLiv1(footerNav, index, locale)
          ))
          }
        <Row fluid margin="0">
          <StyledListItem role="none">
            <Text
              value={FooterJson.columnRight.title}
              intlFormatter
              color="inherit"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f7"
              weight="bold"
              align="left"
            />
          </StyledListItem>
        </Row>
        <UsefulLinks links={links} />
      </Column>
    </Row>
  </StyledList>
  );

NavigationLinksList.displayName = 'NavigationLinksList';

const mapDispatchToProps = {
  scrollIntoView,
  CategoriaHomePage,
  graphqlRequest,
};

const mapStoreToProps = store => ({
  scrollIntoView: store.user.scrollIntoView,
  locale: store.locale,

});
export default connect(mapStoreToProps, mapDispatchToProps)(NavigationLinksList);
