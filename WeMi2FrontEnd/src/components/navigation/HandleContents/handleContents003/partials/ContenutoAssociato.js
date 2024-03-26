/** @format */

import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import MultiSelect from 'components/ui/MultiSelect';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { contenutoAssociatoByTy as contenutoAssociatoByTyQ } from './ContenutiAssociatiGraphQL';

const ContenutoAssociato = ({
    json,
    graphqlRequest,
    getValue,
    contAss,
    contenutoAssociatoByTy,
    draft,
    locale,
    loaded,
    valorilabel,
    location,
}) => {
    const [ associati, setAssociati ] = useState(contAss ? contAss : []);
    const first = useRef(true);

    useEffect(() => {
        if ((!contenutoAssociatoByTy && first.current && draft && loaded === 2) || 
            (first.current && loaded === 2 && draft && 
                contenutoAssociatoByTy &&
                contenutoAssociatoByTy.contenutoByTy.ty_Contenuto !== json.CONTENUTO_ASSOCIATO.ty_Contenuto
            )
        ) {
            graphqlRequest(contenutoAssociatoByTyQ(json.CONTENUTO_ASSOCIATO.ty_Contenuto));
            if (draft && 
                draft.associati &&
                draft.associati[0].id_contenuto_rif !== null && draft.associati[0].tl_testo_1 !== null
            ) {
                setAssociati(
                    draft.associati.map(
                        (elemento) => ({
                            id: elemento.id_contenuto_rif,
                            value: elemento.tl_testo_1[locale]
                        })
                    )
                );
            }
            first.current = false;
        }

        if(location.pathname.indexOf(':new') !== -1 && first.current) {
            graphqlRequest(contenutoAssociatoByTyQ(json.CONTENUTO_ASSOCIATO.ty_Contenuto))
            first.current = false;
        }
    }, [contAss, draft, associati])

    const ContenutiAssociatiArr = contenutoAssociatoByTy && contenutoAssociatoByTy.contenutoByTy.map(cntAss => {
        return {
            value: cntAss.id_contenuto,
            textValue: cntAss.tl_testo_1[locale]
        }
    })

    return (
        <Column xs="12" md="4" padding="0.5em 0 0" >
            <Row fluid>
                {<Text value={valorilabel.contenuto_associato} size="f7" color="blue" weight="bold" />}
            </Row>
            <Row justifycontent="space-between" fluid flex direction="column">

                <Column xs="12" padding="1em 0 0">

                    {ContenutiAssociatiArr &&
                        <MultiSelect
                            color="blue"
                            selectedArrDefault={associati && associati}
                            material
                            getValue={getValue.bind(this)}
                            name="Seleziona contenuti da associare"
                            items={ContenutiAssociatiArr}
                            intlPlaceholder="Seleziona contenuti da associare"
                        />}
                </Column>
                {/* {draft && draft.associati.length > 0 && draft.associati[0].id_contenuto_rif && <Row fluid padding="0">
                    <Text tag="p" value={'Attualmente associato con: '} size="f8" color="darkGrey" weight="bold" padding="0.5em 0.5em 0 0" />
                        {draft.associati.map(ass => {
                            return (
                                <Row fluid>
                                <Text tag="p" value={ass.tl_testo_1[locale]} size="f8" color="darkGrey" padding="0.5em 0.5em 0 0" />
                                </Row>
                            )
                        })}
                </Row>} */}
            </Row>
        </Column>
    )
};

ContenutoAssociato.displayName = 'ContenutoAssociato';


const mapDispatchToProps = {
    graphqlRequest,
};

function mapStateToProps(state) {
    const { graphql, locale } = state;
    const { contenutoAssociatoByTy, loaded } = graphql;
    return {
        contenutoAssociatoByTy,
        locale,
        loaded
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ContenutoAssociato));

