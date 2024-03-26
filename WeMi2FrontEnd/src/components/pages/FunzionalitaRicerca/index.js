/** @format */

import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea';
import Input from 'components/ui/Input';
import NavLink from 'components/router/NavLink';
import { SearchButton, SearchSelect, SearchInput } from 'components/navigation/Searchbox/partials';
import Wrapper from 'components/navigation/NavigationWrapper';
import Loader from 'components/ui/Loader';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import media from 'utils/media-queries';
import { connect } from "react-redux";
import { serviziByCategoria as serviziByCategoriaQ, InoltraEmailRichiesta as InoltraEmailRichiestaQ, matchParole as matchParoleQ } from './RicercaGraphQL';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { isNullOrUndefined } from 'util';
import Button from 'components/ui2/Button';


const DivCard = styled.div`
  display: flex;
  justify-content: space-between;
  algin-items: center;
  text-align: center;
  border: 2px solid #aa0e26 !important;
  border-radius: 15px;
  width: 100%;
  min-height: 9rem;
  transition: all .2s linear;
  &:hover {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
      transition: all .2s linear;
  }
  >div {
    padding: 
  }  
`;

const DivBarra = styled.div`
  border-right: 15px solid #aa0e26;
  max-height: none;
  height: 100%;
`;

const DivText = styled.div`
padding: 20px 0px;
`;

const BackgroundInoltra = styled.div`
border: 2px solid #aa0e26 !important;
margin-top: .5em;
text-align:center;
width: 97%;
`;

const ButtonInoltra = styled(Button)`
width:30%;
${media.xs`
width: 60%;
`}
${media.sm`
width: 60%;
`}
${media.md`
width: 30%;
`}
${media.lg`
width: 30%;
`}
`;

const ColumnBarra = styled(Column)`
  padding: 0px 0px 0px 20px;
`;

const BackgroundSearch = styled.div`

`;

const FunzionalitaRicerca = ({  graphqlRequest,matchParoleRicerca, locale, serviziRichiesti, search }) => {
  let regexEmail = /(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  const [valueTextArea, setValueTextArea] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    if(search && search.input ){
      if(search.input.idCategoria)
        graphqlRequest(serviziByCategoriaQ(search.input.idCategoria))
      else
        graphqlRequest(matchParoleQ(search.input))
      }
  },[]);

  const [valueSelect, setValueSelect] = useState(search ? search.select: {id:0, value: ''});
  const [valueInput, setValueInput] = useState(search?search.input:undefined);
  // let valoreTestuale,valoreSelect;
  // if(!first&&search){
  //   if(search.input)
  //     setValueInput(search.input);
  //   if(search.select)
  //     setValueSelect(search.select);
  //   setFirst(true);
  // }
  const getValueSelected = (value) => {
    setValueSelect(value)
  }
  const newValueInput = (value) => {
     setValueInput(value)
  }

  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: 'homepage',
    },
    {
      slash: 'Risultati Ricerca',
      url: 'FunzionalitaDiRicerca',
    },
  ]
  if(search){
    let searchResults;
    if(search.input && search.input.idCategoria &&serviziRichiesti)
      searchResults = serviziRichiesti.serviziAll
    else if(matchParoleRicerca)
      searchResults = matchParoleRicerca;

  return (

    <Wrapper>
      <Row>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      </Row>
      <Row fluid padding="20px 0">
        <Text size="f3" value="Risultati" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
        <Text size="f3" value="della tua " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
        <Text size="f3" value="ricerca" color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
      </Row>


      <BackgroundSearch>
      <Row justifycontent="space-around" padding="0 0 0.5em">
      <SearchInput  setValueInput={setValueInput} valoreInput={valueInput} onChange={newValueInput} funzionalitaRicerca/>
      <SearchSelect getValue={getValueSelected} valoreSelect={valueSelect} funzionalitaRicerca />
      <SearchButton input={valueInput} select={valueSelect}  funzionalitaRicerca/>
    </Row>
      </BackgroundSearch>
    {search.input? 
      
      <>
        {isNullOrUndefined(searchResults)?
          
          <Loader size="2em" margin="0 auto" width="auto"/>:
          search && search.input && 
          searchResults.length>0? 
          <Column xs="12" padding="1.5em 0">
             <Row fluid padding="1em 0"><Text value={`Hai ricercato '${ typeof valueInput==="string"? 
        valueInput: valueInput.txTitoloCategoria[locale].toLowerCase()}'`} color="red" size="f6"  /></Row>
            <BackgroundInoltra>
                         
            <Row justifycontent="center">
            
              {searchResults.map((ele,i) => (
                <Column lg={4} md={4} sm={12} xs={12} key={i}>
                  <NavLink to={`/c/${ele.categoriaPrincipaleServizio[0].idCategoria}/r/${ele.id_servizio}`} width="100%">
                  <Button
                    label={ele.txTitoloServizio[locale]}
                    fontSize="f6"
                    autowidth
                   />

                  </NavLink>
                </Column>
              ))}
            </Row>
            </BackgroundInoltra>

            </Column>
            :<BackgroundInoltra>
             
             <DivText>
             <Text value="Non è stato trovato nessun servizio per la ricerca effettuata. Prova ad utilizzare i nostri suggerimenti automatici." size="f6" />
             <div/>
             <Text value="Se comunque non hai trovato niente, prova a descrivercelo e proveremo a proporti una soluzione." size="f6" />
             </DivText>

             <Row padding="1.3em" fluid justifycontent="center">
             <Input material intlPlaceholder="Inserisci la tua e-mail" intlLabel="e-mail" color="aa0e26" 
             inputValue={email}
             getValue={setEmail} />
             </Row>

             <Row padding="1em" fluid justifycontent="center">
             <TextArea color="aa0e26" width="70%" material name="Informazioni Aggiuntive"
            intlPlaceholder="Scrivi qui" size="f7" getValue={setValueTextArea} />
             </Row>
              
             <Row padding="1.3em" fluid justifycontent="center">
              {valueTextArea && email && regexEmail.test(email)?
              <ButtonInoltra label="Inoltra richiesta" onClick={()=>{
                   const dati = {emailText: valueTextArea, emailAddress: email}
                    graphqlRequest(InoltraEmailRichiestaQ(dati))
                }}></ButtonInoltra>
              : 
              <ButtonInoltra type="disabled" label="Inoltra richiesta" disabled></ButtonInoltra>}
             </Row>

           </BackgroundInoltra>}
      
      
      </>: null}
        
       
    </Wrapper>
  );}
  else 
  return ( window.location.href = `/`)&& <Loader />
};

FunzionalitaRicerca.displayName = 'FunzionalitaRicerca';

const mapDispatchToProps = ({
  graphqlRequest,
});

const mapStoreToProps = store => ({
  search: store.search.parametriRicerca,
  serviziRichiesti: store.graphql.RichiestaServizi,
  matchParoleRicerca: store.graphql.matchParoleRicerca,
  locale: store.locale,
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(FunzionalitaRicerca);
