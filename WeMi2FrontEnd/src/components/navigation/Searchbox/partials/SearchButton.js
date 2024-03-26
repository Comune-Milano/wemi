/** @format */

import React from 'react';
import {NavLink} from 'react-router-dom';
// import { SearchboxJson } from 'mocks/SearchboxJson';
import { Column } from 'components/ui/Grid';
// import Button from 'components/ui/Button';
import FaIcon from 'components/ui/FaIcon';
// import styled from 'styled-components';
 import {matchParole as matchParoleQ,serviziByCategoria as serviziByCategoriaQ} from './SearchSelectGraphQL';
import { graphqlRequest,resetField } from 'redux-modules/actions/authActions';
import { searchHomepage } from 'redux-modules/actions/searchActions';
import { connect } from 'react-redux';
import { isNullOrUndefined } from 'util';



const SearchButton = ({searchHomepage,graphqlRequest, input,select,resetField,funzionalitaRicerca}) => (
  <Column xs="12" md="1" flex alignitems="flex-end" justifycontent="center" padding={funzionalitaRicerca? "1em 1em 0 0" : ""}>
      <NavLink to="/FunzionalitaDiRicerca" width="100%" >
        <FaIcon radius="50%" icon="\f002" fontSize="f7" color="white" bgcolor="blue" height="3rem" width="3rem" 
        onClick={()=>{
          searchHomepage({input,select});
          resetField('matchParoleRicerca');
          resetField('RichiestaServizi');
        if(input&& isNullOrUndefined(input.idCategoria)){
          graphqlRequest(matchParoleQ(input))
        }
        else if(input&& input.idCategoria){
          graphqlRequest(serviziByCategoriaQ(input.idCategoria))
        }
        
        }} />
    {/* <Button height="3rem" value={SearchboxJson.button} onClick={()=>searchHomepage({input,select})} /> */}
    </NavLink>
  </Column>
);
const mapDispatchToProps = {
  searchHomepage,
  graphqlRequest,
  resetField
};
SearchButton.displayName = 'SearchButton';
export default connect(null,mapDispatchToProps)(SearchButton);
