/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import Wrapper from 'components/navigation/NavigationWrapper';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Loader from 'components/ui2/Loader';
import NavLink from 'components/router/NavLink';
import ServiziJson from 'mocks/CategoriaServiziJson';
import media from 'utils/media-queries';
import Stepper from 'components/ui2/Header/Stepper';
import Button from 'components/ui2/Button';
import { colors, fonts } from 'theme'
import { graphqlRequest, AddEnte, RemoveEnte, resetField } from 'redux-modules/actions/authActions';
import {
  mansioneAll as mansioneAllQ,
  listaDestinatari as listaDestinatariQ,
  fasciaOrariaAll as fasciaOrariaAllQ,
  tipoOffertaAll as tipoOffertaAllQ,
  enteByServizio as enteByServizioQ,
  tipoServizio as tipoServizioQ,
  servizioPK as servizioPKQ,
  serviziByCategoria as serviziByCategoriaQ
} from './SearchGraphQL';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { EstraiCategoriaPrincipale } from 'components/navigation/EstraiCategoriaPrincipale';

const Sezione = styled(Row)`
  padding: 0;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "1em")};
`;

const CategoryTitle = styled.h2`
  color: ${colors.black};
  font-size: ${fonts.size.f4};
  font-weight: bold;
  text-transform: capitalize;
`;

const CategoryDescription = styled.p`
  color: ${colors.black};
  margin-top: 1em;
`;


const SectionHeader = styled.h3`
color: ${colors.primary};
font-weight: bold;
text-transform: uppercase;
`;


const CategoryLogo = styled.img`
  max-width: 20em;
  display: block;
  width:100%;

  ${media.xs`
    margin-left: auto;
    margin-right: auto;
  `}
`;


const CategoryPage = ({ pathname, match, graphqlRequest, AddEnte, servizi, locale, loaded, RemoveEnte, enti, filtri, resetField, EnteByServiceSearch }) => {
  let CategoriaRiferimento = servizi && servizi.serviziAll && servizi.serviziAll[0] &&
    EstraiCategoriaPrincipale(servizi.serviziAll[0].categoriaPrincipaleServizio, window.location.pathname.split('c/')[1])


  useEffect(()=>{
    resetField('EnteByServiceSearch');
    resetField('filtri');
  },[resetField]);
  useEffect(() => {
    window.scrollTo(0, 0)
    graphqlRequest(serviziByCategoriaQ(parseInt(window.location.pathname.split('c/')[1])));

    if (filtri) {
      filtri.order = undefined
      filtri.orario = undefined
      filtri.destinatariLiv1 = undefined
      filtri.openLiv2 = undefined
      filtri.tipologia = undefined
      filtri.offerta = undefined
    }

  }, [graphqlRequest, filtri]);

  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: ``
    },
    {
      slash: loaded === 2 && CategoriaRiferimento ? CategoriaRiferimento.txTitoloCategoria[locale] : 'Categoria...',
      url: CategoriaRiferimento && `c/${CategoriaRiferimento.idCategoria}`
    },
  ];

  const steps = [
    {
      title: 'Scegli il servizio',
      color: 'primary',
      link: null,
      active: true
    },
    {
      title: 'Seleziona gli enti',
      color: 'orange',
      link: null,
      active: false
    },
    {
      title: 'Richiedi il servizio',
      color: 'green',
      link: null,
      active: false
    }
  ];



  return (
    <>

      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Stepper steps={steps} />
        {
          loaded === 2 && servizi ? <>
            <Sezione fluid>
              <Column xs="12" padding="0">
                <CategoryTitle>
                  {CategoriaRiferimento && CategoriaRiferimento.txTitoloCategoria[locale].toLowerCase()}
                </CategoryTitle>
              </Column>
            </Sezione>

            <Sezione>
              <Column xs="12" md="4" margin="0 0 2em 0" padding="0">
                <CategoryLogo
                  src={CategoriaRiferimento && CategoriaRiferimento.media && CategoriaRiferimento.media.oj_media}
                  alt={`Logo ${CategoriaRiferimento && CategoriaRiferimento.txTitoloCategoria[locale]}`}
                />
                <CategoryDescription>
                  <Text tag="strong"
                    value={ServiziJson.description1}
                  />
                  &nbsp;
                  <Text tag="span"
                    value={ServiziJson.description2}
                  />
                </CategoryDescription>
              </Column>

              <Column xs="12" md="8" padding="0" sizepadding={{ md: '0 0 0 2em' }}>              
                <Text
                  tag="h3"
                  value={ servizi.serviziAll.length ? "Scegli il servizio" : 'Non sono presenti servizi per la categoria selezionata.'}
                  size={"f6"}
                  weight="bold"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  color="primary"
                />

                <Sezione fluid>
                  {servizi.serviziAll.map((el, index) => {
                    if (el.id_servizio !== -1) {
                      return (
                        <NavLink key={index} id={index} tabIndex="-1" to={`${match.url}/r/${el.id_servizio}`} margin="1em 1em 0 0">
                          <Button
                            label={el.txTitoloServizio[locale]}
                            fontSize="f6"
                            autowidth
                            onClick={() => {
                              resetField('filtri')
                              graphqlRequest(mansioneAllQ());
                              graphqlRequest(tipoOffertaAllQ());
                              graphqlRequest(tipoServizioQ());
                              graphqlRequest(listaDestinatariQ());
                              graphqlRequest(fasciaOrariaAllQ());
                              graphqlRequest(servizioPKQ(el.id_servizio, el && el.categoriaPrincipaleServizio[0] && el.categoriaPrincipaleServizio[0].idCategoria));
                              if (enti) {
                                enti.map(el => { RemoveEnte(el) })
                              }
                              else {
                                return null;
                              }
                            }}
                          >
                          </Button>
                        </NavLink>
                      )
                    } else return (
                      <Text value="Non è stato trovato alcun servizio associato alla categoria richiesta." size="f7" color="black" tag="p"
                        padding="1em 0" />
                    )
                  }
                  )}
                </Sezione>
              </Column>
            </Sezione>
          </>
            :
            <Loader margin="6em auto" />
        }
      </Wrapper>

    </>
  );
}
CategoryPage.displayName = 'CategoryPage';

const mapStoreToProps = store => ({
  pathname: store.routing.pathname,
  servizi: store.graphql.servizi,
  enti: store.user.enti,
  filtri: store.user.filtri,
  loaded: store.graphql.loaded,
  locale: store.locale,
  EnteByServiceSearch: store.graphql.EnteByServiceSearch
});


const mapDispatchToProps = ({
  graphqlRequest,
  AddEnte,
  RemoveEnte,
  resetField
});


export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(injectIntl(CategoryPage));
