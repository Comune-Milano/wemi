import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Row, Column } from "components/ui/Grid";
import Text from "components/ui/Text";
import MultiSelect from "components/ui/MultiSelect";
import { dominioByTipoS as dominioByTipoSQ } from './RightSectionGraphQL';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';

const DivCard = styled.div`
  height: 331px;
  padding: 3em;
  justify-content: center;
`;

const DivBorder = styled.div`
  border-style: solid;
  border-width: 1px 1px 1px 0px;
`;

const MyColumn1 = styled(Column)`
  justify-content: center;
`;

const MyText = styled(Text)`
  margin-left: 1em;
  background-color: white;
  margin-top: -1.1em;
  position: absolute;
  padding: 0.3em;
`;

const StatoServizio = ({ dominioByTipoS, graphqlRequest, error }) => {

  const tyDominio = 'STATO_COMPILAZ_SRV'

  const [ItemSelected, SetItemSelected] = useState('Seleziona una categoria');

  useEffect(() => {
    graphqlRequest(dominioByTipoSQ(tyDominio));
  }, []);

  const handleMultiSelect = (option) => {
    SetItemSelected(option.value)
  }

  return (
    <DivBorder>
      <MyText value="Stato" size="f5" />
      <DivCard>
        <Row justifyContent="center">
          <MyColumn1 lg={8} md={8}>
            {dominioByTipoS ?
              <MultiSelect
                material
                name="Stato del servizio"
                items={dominioByTipoS}
                intlFormatter
                intlPlaceholder="Stato del servizio"
                getValue={handleMultiSelect}
              />
              : null}
          </MyColumn1>
        </Row>
      </DivCard>
    </DivBorder>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { dominioByTipoS, error } = graphql;
  return {
    dominioByTipoS,
    error
  };
}

StatoServizio.displayName = 'StatoServizio';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatoServizio);
