/** @format */

import React, { useState } from 'react';
// import {connect} from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import { SearchButton, SearchSelect, SearchInput } from 'components/navigation/Searchbox/partials';

const Searchbar = ({ contenuto }) => {

  const [valueSelect, setValueSelect] = useState({id: 0, value: ''});
  const [valueInput, setValueInput] = useState(undefined);

  

  const getValueSelected = (value) => {
    setValueSelect(value)
    
  }

  

  return (
    <Column xs="10" xsShift="1" padding="0 0 0.5em">
      <Row justifycontent="space-around"  fluid>
      <SearchInput categorie={contenuto} setValueInput={setValueInput} valoreInput={valueInput} />
      <SearchSelect getValue={getValueSelected} valoreSelect={valueSelect} />
      <SearchButton input={valueInput} select={valueSelect} />
      </Row>
    </Column>
  )
};



export default Searchbar;