import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui/Button';
import Radio from 'components/ui/Radio';
import MultiSelect from 'components/ui/MultiSelect';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text';
import { EnteServizioErogatoTable as EnteServizioErogatoTableQ } from './LeftSectionGraphQL';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';

const DivCard = styled.div`
padding: 1.7em 3em;
justify-content: center;
`;

const DivBorder = styled.div`
border: 1px solid;
height: 100%;

`;

const MyMultiSelect = styled(MultiSelect)`
width: 100%;
`;

const MyInput = styled(Input)`
width: 100%;
`;

const MyButton = styled(Button)`
width: 50%;
`;

const MyColumn1 = styled(Column)`
// display: -webkit-inline-box;
justify-content: center;
// padding: 20px 0px 0px 0px;
`;

const MyText = styled(Text)`
margin-left: 1em;
background-color: white;
margin-top: -1.1em;
position: absolute;
padding: 0.3em;
`;

const CategorieAccreditate = ({ contenutoByTyS, graphqlRequest, error }) => {
    const servAccTy = 13

    const [ItemSelected, SetItemSelected] = useState('Seleziona una categoria');



    const handleMultiSelect = (option) => {
        SetItemSelected(option.value)
      }
     
         

    return (
        <DivBorder>
            <MyText value="Ricerca" size="f5" />

            <DivCard>
                <Row justifyContent="center">
                    <MyColumn1 lg={12} md={12} >
                        {contenutoByTyS ?
                            <MyMultiSelect
                                material
                                name="Categoria"
                                items={contenutoByTyS}
                                intlFormatter
                                intlPlaceholder="Categoria"
                                getValue={handleMultiSelect}
                            />
                            : null}
                    </MyColumn1>
                </Row>
                <Row justifyContent="center">

                    <MyColumn1 lg={12} md={12} >
                        <div width="100%" justifyContent="center">
                            <MyInput material
                                intlPlaceholder="Nome ente"
                                intlLabel="Nome ente"
                            />
                        </div>
                    </MyColumn1>
                </Row>

                <Row justifyContent="center" padding='1em'>
                    <MyButton value="Applica Ricerca" />
                </Row>
            </DivCard>

        </DivBorder>
    )
};



CategorieAccreditate.displayName = 'CategorieAccreditate';

export default CategorieAccreditate;
