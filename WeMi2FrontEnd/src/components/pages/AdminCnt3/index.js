import React, { useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import {
    EstraiContenutoCompleto as EstraiContenutoCompletoQ,
    datiEssenziali as datiEssenzialiQ,
    getAllSections as getAllSectionsQ,
} from './adminGraphQL3';
import { connect } from 'react-redux';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import HandleContents003 from '../../navigation/HandleContents/handleContents003';
import RedirectAdmin from 'components/router/RedirectAdmin';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { tipologiaContenutoPK as tipologiaContenutoPKQ } from './graphql/tipologiaContenuto';

const Cont003 = ({ userProfile, contenutoTy, listaPrezzi, CNT003EstrazioneDati, datiEssenziali, tipologiaContenutoPK, graphqlRequest, locale, match }) => {
    const { tyCnt } = match.params;

    const typeContenuto = parseInt(tyCnt, 10);

    /**
     * Request to get the description of the selected type of contents
     */
    const [tipologiaContenuto] = useGraphQLRequest(
        undefined,
        tipologiaContenutoPKQ,
        {
            typeContenuto
        },
        true
    );

    const EstraiContenutoCompleto = CNT003EstrazioneDati && window.location.pathname.split('crud/')[1] !== ':new' ? CNT003EstrazioneDati.EstraiContenutoCompleto : null;
    const EstraiUnitaPrezzo = CNT003EstrazioneDati ? CNT003EstrazioneDati.EstraiUnitaPrezzo : listaPrezzi ? listaPrezzi : null;
    const EstraiListaCategorieAccreditamento = CNT003EstrazioneDati ? CNT003EstrazioneDati.EstraiListaCategorieAccreditamento : null
    const NMcont = tipologiaContenuto.data && tipologiaContenuto.data.ty_contenuto;
    const IDcont = EstraiContenutoCompleto ? EstraiContenutoCompleto.id_contenuto : '';
    const TYcont = parseInt(window.location.pathname.split('cnt/')[1].split('/crud')[0]);

    let today = '';
    const inizioVal = () => {
        let day = new Date();
        let year = day.toJSON().split('T')[0].split('-')[0];
        let month = day.toJSON().split('T')[0].split('-')[1].split('-')[0];
        let dayValue = day.toJSON().split('T')[0].split('-')[2];
        today = `${year}-${month}-${dayValue}`;

        return today
    }

    const { datiLogin } = userProfile;
    const validitaAdmin = checkAdmin(datiLogin);

    useEffect(() => {
        if (validitaAdmin) {
            if (
                (!EstraiContenutoCompleto && window.location.pathname.split('crud/')[1] !== ':new')
                ||
                (window.location.pathname.split('crud/')[1] !== ':new' &&
                    EstraiContenutoCompleto.id_contenuto !== parseInt(window.location.pathname.split('crud/')[1]))
            ) {
                graphqlRequest(EstraiContenutoCompletoQ(parseInt(window.location.pathname.split('crud/')[1])))
            }
            graphqlRequest(datiEssenzialiQ());
        }
    }, [graphqlRequest, tipologiaContenutoPK, datiLogin]);

    const BreadcrumbPath = [
        {
            slash: 'Home',
            url: ''
        },
        {
            slash: 'Area personale',
            url: 'areaPersonale'
        },
        {
            slash: 'Gestione Contenuti',
            url: `admin/${window.location.pathname.split('admin/')[1].split('/cnt')[0]}/cnt`
        },
        {
            slash: window.location.pathname.split('cnt/')[1].split('/crud')[0] === "1" ? "Gestione Voci menu Livello 1" :
                window.location.pathname.split('cnt/')[1].split('/crud')[0] === "2" ? "Gestione Voci menu Livello 2" :
                    window.location.pathname.split('cnt/')[1].split('/crud')[0] === "3" ? "Gestione Categorie Livello 1" :
                        window.location.pathname.split('cnt/')[1].split('/crud')[0] === "4" ? "Gestione Categorie Livello 2" :
                            window.location.pathname.split('cnt/')[1].split('/crud')[0] === "5" ? "Gestione Mansioni" :
                                window.location.pathname.split('cnt/')[1].split('/crud')[0] === "6" ? "Gestione Servizi" :
                                    window.location.pathname.split('cnt/')[1].split('/crud')[0] === "7" ? "Gestione Spazi Singoli WeMi" :
                                        window.location.pathname.split('cnt/')[1].split('/crud')[0] === "8" ? "Gestione Testimonials: Scheda singola" :
                                            window.location.pathname.split('cnt/')[1].split('/crud')[0] === "9" ? "Gestione Testimonials: Scheda introduttiva" :
                                                window.location.pathname.split('cnt/')[1].split('/crud')[0] === "10" ? "Gestione Contenuti Aspecifici" :
                                                    window.location.pathname.split('cnt/')[1].split('/crud')[0] === "11" ? "Gestione Footer: Colonna 2" :
                                                        window.location.pathname.split('cnt/')[1].split('/crud')[0] === "12" ? "Gestione Hero Slider" :
                                                            window.location.pathname.split('cnt/')[1].split('/crud')[0] === "13" ? "Gestione Categorie Accreditamento" :
                                                                window.location.pathname.split('cnt/')[1].split('/crud')[0] === "15" ? "Gestione Target Livello 1" :
                                                                    window.location.pathname.split('cnt/')[1].split('/crud')[0] === "16" ? "Gestione Target Livello 2" :
                                                                        window.location.pathname.split('cnt/')[1].split('/crud')[0] === "17" ? "Gestione Sostegni Economici" :
                                                                            window.location.pathname.split('cnt/')[1].split('/crud')[0] === "18" ? "Gestione Qualifiche" :
                                                                                "Gestione Carousel"
            ,
            url: `admin/${window.location.pathname.split('admin/')[1].split('/cnt')[0]}/cnt/${window.location.pathname.split('cnt/')[1].split('/crud')[0]}`
        },
        {
            slash: EstraiContenutoCompleto && EstraiContenutoCompleto.id_contenuto !== -1 ? `Modifica contenuto "${EstraiContenutoCompleto.tl_testo_1[locale]}"` : `Inserisci nuovo in "${NMcont}"`,
            url: IDcont ? `admin/${window.location.pathname.split('admin/')[1].split('/cnt')[0]}/cnt/${window.location.pathname.split('cnt/')[1].split('/crud')[0]}/crud/${window.location.pathname.split('crud/')[1]}` : `admin/${window.location.pathname.split('admin/')[1].split('/cnt')[0]}/cnt/${window.location.pathname.split('cnt/')[1].split('/crud')[0]}/crud/${window.location.pathname.split('crud/')[1]}`
        },
    ];

    inizioVal();

    return (

        <Wrapper>
            {!validitaAdmin ?
                <RedirectAdmin />
                :
                <>
                    <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
                    <Row fluid padding="20px">
                        <Text
                            size="f3"
                            value="Gestione"
                            color="darkGrey"
                            transform="uppercase"
                            letterSpacing="0.05em"
                            padding="0 0.5em 0 0"
                        />
                        <Text
                            size="f3"
                            value={NMcont}
                            color="darkGrey"
                            transform="uppercase"
                            letterSpacing="0.05em"
                            weight="bold"
                            padding="0 0.5em 0 0"
                        />
                    </Row>
                    <Row fluid padding="1em 20px">
                        {EstraiContenutoCompleto &&
                            <Column xs="12" padding="0 0 0.5em">
                                <Text
                                    value="ID contenuto: "
                                    size="f7"
                                    color="darkGrey"
                                    letterSpacing="0.05em"
                                    transform="uppercase"
                                    padding="0 0.5em 0 0"
                                />
                                <Text
                                    value={IDcont}
                                    weight="bold"
                                    color="blue"
                                />
                            </Column>}
                        <Column xs="12" padding="0 0 0.5em">
                            <Text
                                value="Numero Versione: "
                                size="f7"
                                color="darkGrey"
                                transform="uppercase"
                                padding="0 0.5em 0 0"
                                letterSpacing="0.05em"
                            />
                            <Text value={EstraiContenutoCompleto ? EstraiContenutoCompleto.pg_versione : 1} weight="bold" color="blue" />
                        </Column>

                        <Column xs="12" padding="0">
                            <Text
                                value="Periodo validità: "
                                size="f7"
                                color="darkGrey"
                                transform="uppercase"
                                letterSpacing="0.05em"
                                padding="0 0.5em 0 0"
                            />
                            <Text value={EstraiContenutoCompleto ?
                                `${moment(EstraiContenutoCompleto.dt_inizio_val).format('L')} - ${moment(EstraiContenutoCompleto.dt_fine_val).format('L')}`
                                : inizioVal() && `${moment(today).format('L')} - N/D`} weight="bold" color="blue" />
                        </Column>
                    </Row>
                    <Row fluid padding="0 20px" justifycontent="space-between">
                        <HandleContents003
                            max={contenutoTy && contenutoTy.length}
                            TYcont={TYcont}
                            IDcont={IDcont}
                            initialValue={EstraiContenutoCompleto && EstraiContenutoCompleto.ty_sottotipo_contenuto}
                            inizioVal={today}
                            EstraiUnitaPrezzo={EstraiUnitaPrezzo}
                            EstraiContenutoCompleto={EstraiContenutoCompleto}
                            EstraiListaCategorieAccreditamento={EstraiListaCategorieAccreditamento}
                            Dati={datiEssenziali}
                        />
                    </Row>
                </>
            }
        </Wrapper>
    )
};

const mapDispatchToProps = {
    graphqlRequest,
};

function mapStateToProps(state) {
    const { graphql, locale } = state;
    const { contenutoTy, selectServizi, EstraiUnitaPrezzo, CNT003EstrazioneDati, contenutoAss, mediaAll, error, tipologiaContenutoPK, loaded } = graphql;
    return {
        listaPrezzi: EstraiUnitaPrezzo,
        datiEssenziali: selectServizi,
        CNT003EstrazioneDati,
        contenutoAss,
        mediaAll,
        contenutoTy,
        tipologiaContenutoPK,
        locale,
        loaded,
        error
    };
}

Cont003.displayName = 'Cont003';
const Cont003WithAuth = withRouter(withAuthentication(Cont003));
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cont003WithAuth);