/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Column } from 'components/ui/Grid';
import { ResetEnti, AddFilter } from 'redux-modules/actions/authActions';
import Select from 'components/ui2/Select';
import { resetField, graphqlRequest } from 'redux-modules/actions/authActions';
import { fonts, colors } from 'theme';

const SortResults = ({
  props,
  enti,
  ResetEnti,
  filtri,
  AddFilter,
}) => {
  const { label, items } = props;

  const [sortValue, setSortValue] = useState(
    {
      id: items && items[0] ? items[0].id : 0,
      value: items && items[0] ? items[0].tl_valore_testuale : ''
    }
  );

  useEffect(() => {
    switch(sortValue.value){
      case 'Prezzo crescente':
      AddFilter({ ...filtri, order: 1 });
      break;
      case 'Prezzo decrescente':
      AddFilter({ ...filtri, order: 2 });
      break;
      case 'Valutazioni degli utenti': 
      AddFilter({ ...filtri, order: 3 });
      break;
      default:
      AddFilter({ ...filtri, order: 1 });
    }
    ResetEnti([])
  }, [sortValue])

  if (enti) {

    const getValue = valore => {
      setSortValue(valore);
    };

    const SortSelect = items && items.map((item) => (
      {
        id: item.id,
        value: item.tl_valore_testuale,
      }
    ));

    return (
      <Column xs="12" md="5" lg="4" padding="1em 0">
        <Select
          label={label}
          name={label}
          items={SortSelect}
          selectedValue={sortValue}
          clickedSelectedItem={()=> {return null}}
          placeholder={label}
          clickedItem={(value) => { getValue(value) }}
        />
      </Column>
    );
  } return null;
};

SortResults.displayName = 'SortResults';

function mapStateToProps(state) {
  const { user } = state;
  const { array } = user;
  return {
    array,
    enti: state.graphql.array,
    filtri: state.user.filtri,
    loaded: state.graphql.loaded,
  };
}
const mapDispatchToProps = {
  ResetEnti,
  AddFilter,
  graphqlRequest,
  resetField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SortResults);
