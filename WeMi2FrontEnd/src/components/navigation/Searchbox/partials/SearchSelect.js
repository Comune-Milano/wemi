/** @format */

import React, {useEffect,useState} from 'react';
import { SearchboxJson } from 'mocks/SearchboxJson';
import { Column } from 'components/ui/Grid';
import Select from 'components/ui/Select';
import Text from 'components/ui/Text';
import {HandleScrollDown} from 'components/ui/HandleScroll';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { CategorieZone as CategorieZoneQ } from './SearchSelectGraphQL';
import { connect } from 'react-redux';

const SearchSelect = ({graphqlRequest,  aree, locale, valoreSelect, getValue,funzionalitaRicerca}) => {
  const scrollDown = HandleScrollDown();

  useEffect(() => {
    graphqlRequest(CategorieZoneQ())
  }, [graphqlRequest]);


  return(
    <>
  <Column xs="12" md="5" padding={funzionalitaRicerca? "1em 1em 0 0" : ""}>
    {SearchboxJson.selectText.map((text,index) => (
      <Text key={index.toString()} size="f7" weight={text.weight} value={text.label} intlFormatter color="black" />
    ))}
    <br />

    <Select
      upward={scrollDown === 0 ? true : false}
      name={SearchboxJson.selectItems.name}
      getValue={getValue.bind(this)}
      selectedValue={valoreSelect}
      maxHeight="3rem"
      maxLength="30"
      items={aree && aree.allAree? aree.allAree.map(elemento => 
        ({value: elemento.idArea, textValue: elemento.txTitoloArea[locale].toUpperCase()})): []}
      intlPlaceholder=""
    />
  </Column>
  </>
)};

const mapDispatchToProps = ({
  graphqlRequest,
});

const mapStoreToProps = store => ({
  categoria: store.graphql.CategoriaTesto,
  aree: store.graphql.CategorieLivello1,
  locale: store.locale
})

SearchSelect.displayName = 'SearchSelect';

export default connect(mapStoreToProps,mapDispatchToProps)(SearchSelect);
