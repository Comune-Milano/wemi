/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import media from 'utils/media-queries';
import Text from 'components/ui/Text';
import NavLink from 'components/router/NavLink';
import { colors } from 'theme';
import { matchPath } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import withAuthentication from 'hoc/withAuthentication';
import Wrapper from './partials/Wrapper';

const BreadcrumbList = styled.ol`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  li {
    &:first-child {
      > div {
        ${media.xs`
          display: inline-block;
        `}

        ${media.md`
          display: none;
        `}
      }
    }
  }
`;

const BreadcrumbItem = styled.li`
  display: inline-flex;
  width: 100%;
  align-items: center;
  height: 100%;

  &:first-child {
    a {
      ${media.md`
        padding: 0.2rem 2rem 0.2rem 0;
      `}
    }
  }
  
  &:last-child {
    a {
      pointer-events: none;

      span {
        font-weight: bold;
        color: ${colors.black};
        text-transform: ${props => props.ignoreCase ? '' : 'uppercase'};
      }
    }
  }

  a {
    padding: 0.2rem 2rem 0.2rem 2rem;
    text-align: left;

    span {
      color: ${colors.darkGrey}
      text-transform: ${props => props.ignoreCase ? '' : 'lowercase'};
      &:first-letter {
      text-transform: ${props => props.ignoreCase ? '' : 'uppercase'};
      }
    }

    &:hover, &:focus, &:focus-within {
      span {
        color: ${colors.primary};
        text-decoration: underline;
      }
    }
  
  }

  ${media.md`
    width: auto;
  `}

`;

const StyledArrow = styled.div`
  box-sizing: border-box;
  height: 0.6em;
  width: 0.6em;
  display: inline-block;
  border-style: solid;
  border-color: ${colors.primary};
  border-width: 0px 3px 3px 0px;
  color: ${colors.primary};
  transform: rotate(${props => props.right ? '-45deg' : props.left ? '135deg' : '0deg'});
  margin: 0 0.1rem 0 0;
`;


const Breadcrumbs = ({
  intl, 
  pathSlashes, 
  locale,
  userProfile, 
  location,
  ignoreCase,
}) => {
  const datiLogin = userProfile !== null ? userProfile.datiLogin : undefined;
  const ente = datiLogin && datiLogin.Profilo === 'E';
  const admin = datiLogin && datiLogin.Profilo === 'A';
  let isPathMatched = false;

  return (
    <Wrapper aria-label="Breadcrumb">
      <BreadcrumbList>
        {pathSlashes && pathSlashes.map((pathSlash, index) => {
          if (!isPathMatched) {
            const pathMatched = matchPath(location.pathname.replace('/',''), {
              path: pathSlash.url,
              exact: true,
              strict: true,
            });

            isPathMatched = pathMatched || false;
            let toUrl = '';
            if (pathSlash && pathSlash.url) {
              toUrl = pathSlash.url.indexOf('/') === 0 ? pathSlash.url : `/${pathSlash.url}`;
            }

            if (pathSlash.slash !== null) {
              return (
                <BreadcrumbItem ignoreCase={ignoreCase} e={ente || admin} key={`BreadcrumbItem-${index.toString()}`}>
                  <StyledArrow
                    e={ente || admin}
                    right
                  />
                  <NavLink
                    to={{
                      pathname: toUrl || '/',
                      state: pathSlash.state,
                      search: pathSlash.search,
                    }}
                    aria-current={index === (pathSlashes.length - 1) ? 'page' : null}
                    width="fit-content"
                  >
                    <Text
                      padding="0"
                      size="f6"
                      intlFormatter={pathSlash.slash && !(typeof pathSlash.slash === "object")}
                      value={pathSlash.slash ? typeof pathSlash.slash === "object" ? pathSlash.slash[locale] :
                        pathSlash.activeIntl ?
                          intl.formatMessage({ id: pathSlash.slash }) : pathSlash.slash : ' '} />
                  </NavLink>
                </BreadcrumbItem>
              )
            }
          }
          return null;
        })}
      </BreadcrumbList>
    </Wrapper>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';

const mapStateToProps = state => ({
  routing: state.routing,
  servizio: state.user.service,
  loaded: state.graphql.loaded,
});

export default connect(mapStateToProps)(withRouter(withAuthentication(injectIntl(Breadcrumbs))));
