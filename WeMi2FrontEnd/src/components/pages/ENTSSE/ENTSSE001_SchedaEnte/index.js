/** @format */

import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { entePK as entePKQ } from './EnteGraphQL';
import Icon from 'components/ui/Icon';
import FaIcon from 'components/ui/FaIcon';
import SocialNetworkBar from 'components/navigation/SocialNetworkBar';
import Text from 'components/ui/Text';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Row, Column } from 'components/ui/Grid';
import Wrapper from 'components/navigation/NavigationWrapper';
import SchedaEnte from 'components/navigation/SchedaEnte';
import { enteByServizio as enteByServizioQ } from '../../Category/SearchGraphQL';
import { isNullOrUndefined } from 'util';


const socialbarArray = [
    {
        linkType: 'desktop',
        iconBgColor: 'primary',
        iconColor: "white",
        socicon: false,
        url: 'https://www.gmail.com'
    },
    {
        linkType: 'mail',
        iconBgColor: 'primary',
        iconColor: "white",
        socicon: true,
        url: 'https://www.gmail.com'
    },
    {
        linkType: 'facebook',
        iconBgColor: 'primary',
        iconColor: "white",
        socicon: true,
        url: 'https://www.facebook.com/coopcomin.org/'
    },
    {
        linkType: 'instagram',
        iconBgColor: 'primary',
        iconColor: "white",
        socicon: true,
        url: 'https://www.instagram.com'
    },

    {
        linkType: 'twitter',
        iconBgColor: 'primary',
        iconColor: "white",
        socicon: true,
        url: 'https://www.instagram.com'
    },
];

const SchedaEntePage = ({ graphqlRequest, loaded, ente, locale, categoriaSelezionata }) => {
    if (loaded === 0 || !ente || !ente.entePK || (ente && ente.entePK &&
        parseInt(window.location.pathname.split('ente/')[1]) !== parseInt(ente.entePK.id_ente)))
        graphqlRequest(entePKQ(parseInt(window.location.pathname.split('ente/')[1])))

        useEffect(() => {
            graphqlRequest(enteByServizioQ(parseInt(window.location.pathname.split('r/')[1].split('/ente')[0])));
          }, [graphqlRequest]);

    const BreadcrumbPath = [
        {
            slash: "Home",
            url: ''
        },
        {
            slash: categoriaSelezionata && categoriaSelezionata.servizioPK.categoriaPrincipaleServizio[0].txTitoloCategoria,
            url: window.location.pathname.split('it/')[1].split('/r')[0]
        },
        {
            slash: categoriaSelezionata && categoriaSelezionata.servizioPK.txTitoloServizio[locale],
            url: window.location.pathname.split('it/')[1].split('/ente')[0]
        },
        {
            slash: "Scheda ente",
            url: window.location.pathname.split('it/')[1]
        }

    ]

    return (
        <Wrapper>
            <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
            {ente && ente.entePK &&
<>
                     <Row fluid justifycontent="flex-start" padding="0 20px">
                        <Column xs="12" padding="20px 20px 10px 0" flex alignitems="center" >
                             {!isNullOrUndefined(ente.entePK.datiEnte && ente.entePK.datiEnte.media) ? <Icon src={ente.entePK.datiEnte.media.oj_media} width="6em" height="6em" /> : <></>} 
                            <Text padding="0 0 0 0.5em" transform="uppercase" letterSpacing="0.05em" value={ente.entePK.nm_ente} size="f1" color="darkGrey" />
                        </Column>
                   
                    </Row> 

                    <Row fluid justifycontent="space-between" padding="0 20px 2em">
                         <Column xs="12" md="9" lg="8" padding="0.5em 0 1em">
                             {ente.entePK.datiEnte && <>
                            <Text value={ente.entePK.datiEnte.sedeEnte && ente.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo ? ente.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo.txIndirizzo: ' '} size="f7" color="darkGrey" padding="0 .4em 0 0" />
                            <Text value={ente.entePK.datiEnte.sedeEnte && ente.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo ? ente.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo.txCap: ' ' } size="f7" color="darkGrey" padding="0 .5em 0 0" />
                            <Text value={ente.entePK.datiEnte.sedeEnte && ente.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo && `- ${ente.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo.txCitta}`} size="f7" color="darkGrey" padding="0 2em 0 0" />
                            <span style={{ display: 'inline-block' }}>
                                <FaIcon
                                    display="inline-block"
                                    transform="rotate(90deg)"
                                    icon="\f095"
                                    fontSize="f7"
                                    pointer
                                    noShadow
                                    color="primary"
                                    padding=".4em 0 .4em .6em"
                                    height="1.7em"
                                    width="1.7em"
                                />
                                <Text value={`+ ${ente.entePK.datiEnte.js_referente.txTelefono}`} size="f7" color="darkGrey" padding="0 2em 0 0" />
                            </span>
                            </>}
                        </Column> 
                        <Column xs="6" sm="4" mdShift="0" md="3" lg="2" padding="0">
                            <SocialNetworkBar socialBarArray={socialbarArray} socialUrl={ente.entePK.datiEnte && { social: ente.entePK.datiEnte.js_altre_info, mail: ente.entePK.datiEnte.js_referente }}
                                iconHeight="1em"
                                iconWidth="1em"
                                fontSize="f6"
                                iconPadding="1em" />
                        </Column>
                    </Row>
                    <SchedaEnte ente={ente.entePK} locale={locale} />
                </>
            }
        </Wrapper>
    )
};
const mapStoreToProps = store => ({
    locale: store.locale,
    loaded: store.graphql.loaded,
    ente: store.graphql.entePK,
    categoriaSelezionata: store.graphql.EnteByServiceSearch,
});

const mapDispatchToProps = ({
    graphqlRequest
})

export default connect(mapStoreToProps, mapDispatchToProps)(SchedaEntePage);
