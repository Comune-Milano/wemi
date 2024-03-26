/** @format */

import React, { useEffect } from 'react';
import { matchPath, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import styled, { css } from 'styled-components';
import CategoryPage from 'components/pages/Category';
import RicercaServizio from 'components/pages/ENTIRI/ENTIRI001_RicercaServizio';
import Wrapper from 'components/navigation/NavigationWrapper';
import {
    PAGE_ENTIRI_URL,
    PAGE_SERVICESEARCH_URL,
} from 'types/url';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Loader from 'components/ui/Loader';
import NavLink from 'components/router/NavLink';
import ServiziJson from 'mocks/CategoriaServiziJson';
import { colors } from 'theme';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Stepper from 'components/ui2/Header/Stepper';



const ENTIRI = ({ locale, loaded, match }) => {
    const BreadcrumbPath = [
        {
            slash: 'Home',
            url: ``
        },

    ]
    const steps = [
        {
            title: 'Scegli il servizio',
            color: 'primary',
            link: match.url.split(`${locale}`)[1],
            active: !window.location.pathname.split(`${match.params.idCategory}`)[1]
        },
        {
            title: 'Seleziona gli enti',
            color: 'orange',
            link: PAGE_SERVICESEARCH_URL,
            active: !!window.location.pathname.split(`${match.params.idCategory}`)[1]
        },
        {
            title: 'Richiedi il servizio',
            color: 'green',
            link: '',
            active: false
        }
    ];

    return (
        <>
            <Wrapper >
                <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
                <Stepper steps={steps} />
                {/* <Route exact path={match.url} render={() => (<CategoryPage match={match} />)} />
                    <Route
                        exact
                        path={match.path + '/r/:idServizio'}
                        component={props => <RicercaServizio {...props} />}
                    /> */}
            </Wrapper>
        </>
    );
}
ENTIRI.displayName = 'ENTIRI';

const mapStoreToProps = store => ({
    locale: store.locale
});

export default connect(
    mapStoreToProps,
)(injectIntl(ENTIRI));
