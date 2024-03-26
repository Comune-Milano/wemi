/** @format */

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {graphqlRequest} from 'redux-modules/actions/authActions';
import {getInputAddress as getInputAddressQ,
  getMunicipio as getMunicipioQ } from './municipioGraphQL';
import styled, { css } from 'styled-components';
import Hr from 'components/ui/Hr';
import Text from 'components/ui/Text';
import Modal from 'components/ui/Modal';
import Input from 'components/ui/Input';
import Loader from 'components/ui/Loader';
import Button from 'components/ui/Button';
import { Row, Column } from 'components/ui/Grid';
import { colors, fonts } from 'theme';
import { isUndefined, isNull } from 'util';

const InputColumn = styled(Column)`
    position: relative;
    transition: all .2s ease-in-out;
 
    ${props => props.inputValue && css`   
    * {
      text-transform: capitalize!important;
      font-weight: bold!important;
      transition: all 0.1s linear;
    }
    `}
    
`

const SearchBtn = styled(Button)`
transition: all .2s ease-in-out;

    position: absolute;
    right: 0.5em;
    top: 10%;
`

const Results = styled(Column)`
    max-height: 8em;
    transition: all .2s ease-in-out;

`

const AlertLabel = styled.div`
    padding: 0.25em 0.5em;
    text-align: center;
    background-color: ${props => colors[props.bgColor]};
    color: ${colors.white};
    width: auto;
    max-width: fit-content;
    margin:  ${props => props.mauto ? 'auto' : '1em 0'};
    border-radius: 5px;
`

const StyledOptionGroup = styled.div`
padding: 0.5em 0;
  ${props =>
    props.show
      ? css`
        transition: all .2s ease-in-out;
            opacity: 1;
            border: 2px solid ${({ theme }) => theme.colors.primary};
          border-top: none;
          max-height: 8em;
          overflow: auto;
          height: auto;
          width: 100%;
          div {
            z-index: 4;
            visibility: visible;
          }
        `
      : css`
      opaicty: 0;
          transition: all .2s ease-in-out;
          max-height: 0;
          div {
            visibility: hidden;
          }
        `}
`;

const StyledOption = styled.div`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.inherit};
  border-left: 1px solid ${({ theme }) => theme.colors.grey};
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 0.5em 1em;
  font-size: ${props => fonts.size[props.size]};

    text-transform: capitalize;

  &:last-child {
    border-radius: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }
  &:selected {
    background-image: url('/check.png');
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: 2px 8px;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.grey};
    transition: all 0.2s linear;
    cursor: pointer;
  }
`;


const Header = ({headerValue}) => 
(<Row direction="column" padding="0"  >
  <Text value= {headerValue} size="f3" color="primary"/>
  <Hr height="0.25em" width="30%" left="0" color="primary" top="2px" />
  </Row>
);

const MunicipioModal = ({
  modalOpen, 
  openModal, 
  graphqlRequest,
  indirizzo, 
  loaded, 
  selectedAddress, setSelectedAddress, 
  getValue,
  MunicipioSelezionato
}) => {
    
    const [show, setShow] = useState(false);
   const [indirrizoValue, setIndirizzoValue] = useState("");
   const [inputValue, setInputValue] = useState("");
   const [richiestaInviata, setRichiestaInviata] = useState(false);

   useEffect(() => {}, [indirrizoValue])

   const getIndirizzoValue = (value) => {
          setIndirizzoValue(value.toLowerCase())  
    }

    const searchAddress = (event) => {
      event.preventDefault();
      setRichiestaInviata(false)
      setShow(true);
      graphqlRequest(getInputAddressQ(indirrizoValue))
    }

    const getSelectedAddress = (address) => {
      setRichiestaInviata(false);
      setSelectedAddress.bind(this);
      setSelectedAddress(address);
      setInputValue(address.name.toLowerCase());
      setShow(false);
    }

    const selectMunicipio = () => {
      graphqlRequest(getMunicipioQ(selectedAddress));
      setRichiestaInviata(true)
      setShow(false)
    }

    const sendMunicipioToFiltri = () => {
      getValue.bind(this);
      MunicipioSelezionato && getValue(MunicipioSelezionato)
    }

    const xModalFunc = (open) => {
      openModal.bind(this)
      openModal(open);
      setRichiestaInviata(false);
      sendMunicipioToFiltri();
    }

    const resetAssocia = () => {
      setInputValue(null); 
      setRichiestaInviata(false);
    }
      
    
    return(
        <Modal 
        onClick={(event) => {event.preventDefault(); event.stopPropagation();}} 
        open={modalOpen}
        openModal={xModalFunc}
        marginTop="8%" 
        border={`1px ${colors.primary} solid`} radius="0" 
        bgcolorIcon='blue'
        iconRadius="50%" 
        iconHeight="2em"
        iconWidth="2em"
        header={Header} headerValue="Trova il municipio" 
        width="50%" 
        responsiveWidth="1.8"
        iconcolor="white"
        noBackdropClose>
  
    <Row fluid margin="0">
    <Column xs={10} xsShift="1" padding="20px 0" justify-content="center">
    <Text tag="p" color="darkGrey" 
    value="Inserisci l'indirizzo dove vuoi ricevere o recarti per il servizio selezionato." 
    intlFormatter size="f7" />
    </Column>
    <InputColumn xs={10} xsShift="1" margin="20px auto auto auto" padding="0" justify-content="center" 
    inputValue={inputValue !== "" ? inputValue : null}>
        <form>
          <Input getValue={getIndirizzoValue} material intlLabel="Indirizzo" 
          intlPlaceholder={"Scrivi qui..."} 
          onFocus={() => resetAssocia()}
          initialValue={inputValue !== "" ? inputValue : null}
          reEdit
         autocomplete="off" />
          <SearchBtn submit type="primary" value="Cerca" height="80%" autowidth onClick={(event) => searchAddress(event)} />
          </form>
    </InputColumn>
    <Results xs={10} xsShift="1" padding="0" justify-content="center" >
    {loaded=== 2 && indirizzo && indirizzo.cercaVia && indirizzo.cercaVia.length > 0 ? 
        <StyledOptionGroup show={show} onClick={() => setRichiestaInviata(false)}>
            { indirizzo.cercaVia.map((item,index) => ( 
            <StyledOption key={index.toString()} size="f6" onClick={() => getSelectedAddress(item)}>
            {item.name.toLowerCase()}
            </StyledOption>))}        
        </StyledOptionGroup> 
       : show && loaded === 1 ?  <Loader size="2em" margin="0 auto" width="auto"/> : 
       show && indirizzo && indirizzo.cercaVia && indirizzo.cercaVia.length === 0 ?  <AlertLabel bgColor="red">Non è stata trovata alcuna corrispondenza.</AlertLabel> : null}
       </Results>
       <Column xs={6} xsShift="3" padding="1em 0" margin="1em auto" justify-content="center">
       {loaded === 1 && richiestaInviata ? <Loader size="2em" margin="0 auto" width="auto"/> : 
         loaded === 2 && richiestaInviata && !isUndefined(MunicipioSelezionato)
         &&!isNull(MunicipioSelezionato.cercaMunicipio) ? 
         <AlertLabel bgColor="green" mauto>Associazione riuscita.</AlertLabel> :
         loaded === 2 && richiestaInviata && !isUndefined(MunicipioSelezionato)
         &&isNull(MunicipioSelezionato.cercaMunicipio) ? 
        //  <AlertLabel bgColor="red" mauto>Seleziona un indirizzo!</AlertLabel> 
        <AlertLabel bgColor="red" mauto>Associazione non riuscita!</AlertLabel> 
         :
         <Button 
         type={inputValue === null || inputValue === "" ? "disabled" : "primary" }
         disabled={inputValue === null || inputValue === ""}
         value="Associa"  
         mauto 
         onClick={()=> selectMunicipio()}/>      
      } 
    </Column>
      </Row>
  
    </Modal>
    )
};
const mapStoreToProps = store => ({
  indirizzo: store.graphql.InputAddress,
  loaded: store.graphql.loaded,
  MunicipioSelezionato: store.graphql.MunicipioSelezionato
})
const mapDispatchToProps = ({
  graphqlRequest

})
export default connect(mapStoreToProps, mapDispatchToProps)(MunicipioModal);
