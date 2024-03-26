/** @format */

import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { graphqlRequest, CategoriaSelezionata } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Row, Column } from 'components/ui/Grid';
import Loader from 'components/ui/Loader';
import Wrapper from 'components/navigation/NavigationWrapper';
import { EstraiDettaglioAmministrativoServizioEnte as EstraiDettaglioAmministrativoServizioEnteQ } from './ServizioEnteGraphQL';
import ServizioOffertoEnte from 'components/navigation/ServizioOffertoEnte';
import { isNullOrUndefined } from 'util';

const StyledText = styled(Text)`
    display: inline-block;
`
const ServizioEntePage = ({
    graphqlRequest,
    servizioErogato,
    locale,
    loaded,
    match,
}) => {
    let BreadcrumbPath = [];

    useEffect(() => {
        const { idServizio, idEnte } = match.params;
        graphqlRequest(EstraiDettaglioAmministrativoServizioEnteQ(
            idServizio,
            idEnte,
        ));
    }, [graphqlRequest])

    //SCHEDA ENTE VALORIZZAZIONE ESTETICA PREMENDO SULLA I

    if (!isNullOrUndefined(window.location.pathname.split('/ente')[1])) {
        BreadcrumbPath = [
            {
                slash: 'Home',
                url: '',
            },
            {
                slash: servizioErogato && servizioErogato.service.categoriaPrincipaleServizio[0].txTitoloCategoria[locale],
                url: window.location.pathname.split('it/')[1].split('/r')[0]
            },
            {
                slash: servizioErogato && servizioErogato.service.txTitoloServizio[locale],
                url: window.location.pathname.split('it/')[1].split('/e')[0]
            },
            {
                slash: "Scheda Ente",
                url: window.location.pathname.split('it/')[1].split('/s')[0]
            },
            {
                slash: servizioErogato && `${servizioErogato && servizioErogato.service.txTitoloServizio[locale]} offerto da ${servizioErogato && servizioErogato.ente.nm_ente}`,
                url: window.location.pathname.split('it/')[1]
            }
        ]
    }

    // SCHEDA ENTE DA CITTADINO
    else if (!isNullOrUndefined(window.location.pathname.split('/idRequestsIndex')[1])){
        
        BreadcrumbPath = [
            {
                slash: 'Home',
                url: ''
            },
            {
                slash: 'Area Personale',
                url: 'areaPersonale'
            },
            {
                slash: 'indice richieste e servizi acquistati',
                url: window.location.pathname.split('it/')[1].split('/s')[0]
            },
            {
                slash: servizioErogato && `${servizioErogato && servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale]} offerto da ${servizioErogato && servizioErogato.EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente}`,                
                url: window.location.pathname.split('it/')[1]
            }
        ]

    }

    //SCHEDA ENTE VALORIZZAZIONE ESTETICA PREMENDO SUL NOME ENTE
    else if(!isNullOrUndefined(window.location.pathname.split('/scheda')[1])){
        BreadcrumbPath = [
            {
                slash: 'Home', 
                url: ''
            },
            {
                slash: servizioErogato && servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service.categoriaPrincipaleServizio[0].txTitoloCategoria[locale],
                url: `${window.location.pathname.split('it/')[1].split('/r')[0]}`
            },
            {
                slash: servizioErogato && servizioErogato && servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale],
                url: `${window.location.pathname.split('it/')[1].split('/s')[0]}`
            },
            {
                slash:  servizioErogato && `${servizioErogato && servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale]} offerto da ${servizioErogato && servizioErogato.ente.nm_ente}`,                
                url: `${window.location.pathname.split('it/')[1]}`
            }
        ]
    }

    //SCHEDA ENTE DA ACCETTAZIONE O RIFIUTO
    else if(!isNullOrUndefined(window.location.pathname.split('/handleRequests')[1])){
        BreadcrumbPath = [
            {
                slash: 'Home', 
                url: ''
            },
            {
                slash: 'Area Personale',
                url: 'areaPersonale'
            },
            {
                slash: 'Gestione richieste servizi ente',
                url: `e/${window.location.pathname.split('e/')[1].split('/handleRequests')[0]}/handleRequests/`
            },
            {
                slash: window.location.pathname.split('/AccettaRichiesta')[1]? `Conferma Accettazione`: 'Conferma Chiusura',
                url: `e/${window.location.pathname.split('e/')[1].split('/s')[0]}`
            },
            {
                slash:  servizioErogato && `${servizioErogato &&
                                              servizioErogato.EstraiDettaglioAmministrativoServizioEnte && 
                                              servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service && 
                                              servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio &&
                                              servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale]} 
                                              offerto da 
                                              ${servizioErogato && 
                                                servizioErogato.ente &&
                                                servizioErogato.ente.nm_ente}`,                
                url: `${window.location.pathname.split('it/')[1]}`
            }
        ]
    }

    return (
        
        <Wrapper>
            <>
                 <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} /> 
                <Row fluid flex alignitems="center" justifycontent="flex-start" padding="0 20px">
                    <Column xs="12" padding="20px 0"   >
                        {servizioErogato && loaded === 2 ?
                        <>
                        <StyledText 
                            padding="0 0.4em 0 0" 
                            transform="uppercase"
                            letterSpacing="0.05em"
                            value={servizioErogato &&
                                   servizioErogato.EstraiDettaglioAmministrativoServizioEnte && 
                                   servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service && 
                                   servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio &&
                                   servizioErogato.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale]}
                            size="f1" color="darkGrey" />
                        <StyledText 
                            padding="0 0.4em 0 0" 
                            transform="uppercase" 
                            letterSpacing="0.05em" 
                            value="offerto da"
                            size="f1" 
                            color="darkGrey" 
                        />
                        <StyledText 
                            padding="0 0.4em 0 0" 
                            transform="uppercase"
                            letterSpacing="0.05em" 
                            value={servizioErogato &&
                                   servizioErogato.EstraiDettaglioAmministrativoServizioEnte && 
                                   servizioErogato.EstraiDettaglioAmministrativoServizioEnte.ente &&
                                   servizioErogato.EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente}
                            size="f1" 
                            color="darkGrey" 
                        />
                            </>
                            : <Loader  size="2em" margin="0 auto" width="auto"/>}
                    </Column>
                   
                </Row>
            </>

            {servizioErogato && loaded === 2 &&
                <ServizioOffertoEnte servizioErogato={servizioErogato} />
            }

        </Wrapper>
        
    )
};

const mapStoreToProps = store => ({
    locale: store.locale,
    loaded: store.graphql.loaded,
    servizioErogato: store.graphql.EstraiDettaglioAmministrativoServizioEnte,
    errorGraphQL: store.graphql.error,
    categoria: store.categoriaRichiesta,
    ricercaServizio: store.EnteByServiceSearch,
    ente: store.graphql.entPK
});

const mapDispatchToProps = ({
    graphqlRequest,
    CategoriaSelezionata
})

export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(ServizioEntePage));
