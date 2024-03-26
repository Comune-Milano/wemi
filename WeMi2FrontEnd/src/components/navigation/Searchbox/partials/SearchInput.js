/** @format */

import React,{useState} from 'react';
import {connect} from 'react-redux';
import { SearchboxJson } from 'mocks/SearchboxJson';
import { Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text';
import SearchBoxHints from './SearchboxHints';
import styled from 'styled-components'
import {HandleScrollDown} from 'components/ui/HandleScroll'
import { isNullOrUndefined } from 'util';
import { searchHomepage } from 'redux-modules/actions/searchActions';

const ColumnRelative = styled(Column)`
position:relative;
`

const SearchInput = ({ categorie, locale, valoreInput, setValueInput, searchHomepage, search, funzionalitaRicerca }) => {
  const [showHints,setShowHints] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [inputString, setInputString] = useState('');
  const [categorieRicerca, setCategorieRicerca] = useState([]);
  const scrollDown = HandleScrollDown();
  if(!firstTime&&categorie){
    setFirstTime(true);
    setCategorieRicerca(categorie.allCategorie);
  
  }
  const funzione = (value) =>{
    let risultati;
    if(!isNullOrUndefined(categorie)){
      if(value&&value!==''){
      risultati = categorie.allCategorie.filter( elemento => {
          if(elemento.txTitoloCategoria[locale].toLowerCase().includes(value.toLowerCase()))
            return elemento;
      })
      }
      else{
        risultati = categorie.allCategorie;
      }
    }
    setCategorieRicerca(risultati);
    setShowHints(true);
  }
  const getValore = (value) =>{
    funzione(value);
    setInputString(value);
    if(!isNullOrUndefined(inputString))
     setValueInput(value);
    
    
  
  }
  

  return (
  <ColumnRelative xs="12" md="6" padding={funzionalitaRicerca? "1em 1em 0 0" : ""}>
    {SearchboxJson.inputText.map((text,index) => (
      <Text key={index.toString()} size="f7" weight={text.weight} value={text.label} intlFormatter color="black" />
    ))}
    <br />
    <Input 
    onFocus={() =>{ 
        if(valoreInput){
          setValueInput(undefined)
          searchHomepage({...search,input:''})
          setInputString("")
        }}} 
        controlled
        placeholder={SearchboxJson.inputPlaceholder} 
        inputValue={valoreInput? typeof valoreInput==="string"? 
        valoreInput: valoreInput.txTitoloCategoria[locale].toLowerCase(): inputString} 
        getValue={getValore} label=" " noLabel />
     <SearchBoxHints upward={scrollDown === 0 ? true : false} searchResults={categorieRicerca} showHints={showHints} locale={locale} setSelected={ setValueInput} setShowHints = {setShowHints}/>  
  </ColumnRelative>
)};

const mapStoreToProps = store => ({
  locale: store.locale,
  search: store.search && store.search.parametriRicerca,
});
const mapDispatchToProps = ({
  searchHomepage,
});

SearchInput.displayName = 'SearchInput';
export default connect(mapStoreToProps,mapDispatchToProps)(SearchInput);
