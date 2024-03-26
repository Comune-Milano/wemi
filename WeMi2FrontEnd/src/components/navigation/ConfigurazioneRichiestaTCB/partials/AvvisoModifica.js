/** @format */

import React, { useState, useEffect } from 'react';
import Text from 'components/ui/Text';
import Modal from 'components/ui/Modal';
import MultiSelect from 'components/ui/MultiSelect';
import Button from 'components/ui/Button';
import { Row, Column } from 'components/ui/Grid';
import { colors, fonts } from 'theme';


const Header = ({ headerValue }) =>
  (<Row direction="column" padding="3em 0 0" justifycontent="center" fluid >
    <Text align="center" value={`Attenzione!`} size="f6" weight="bold" color="red" tag="p" />
  </Row>
  );

const AvvisoModifica = ({
  servizioTCB,
  locale,
  open,
  setOpen,
bodyValue
}) => {

  const [selectedBen, setSelectedBen] = useState([])
  const [disabled, setDisabled] = useState(bodyValue.alert === 'cambio' ? false : true)

  let benArr = [];

  if(bodyValue && bodyValue.alert && bodyValue.alert === 'nrBen') {
    benArr = bodyValue.info.beneficiari.map((el, index) => {
        return {
          value: el.pgBen,
          textValue: el.nomeBen && el.nomeBen.txVal ? el.nomeBen.txVal : `Beneficiario ${index +1}`
        }
    })
  }


  return (
    <Modal
      onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}
      open={open}
      noHiddenOver
      openModal={setOpen.bind(this)}
      radius="0px"
      marginTop="12%"
      border={`1px ${colors.primary} solid`}
      bgcolorIcon='red'
      iconRadius="50%"
      iconHeight="2em"
      iconWidth="2em"
      header={Header}
      headerValue={servizioTCB && {servizioTCB, locale}}
      headerHeight="auto"
      width="45%"
      responsiveWidth="1.8"
      iconcolor="white"
      noBackdropClose>

      <Row fluid padding="0 3em" justifycontent="center"> 
      {typeof bodyValue.info === 'string' ? <>
        {bodyValue.alert === 'navigazione' &&  <>
        <Text align="center" value={`Le modifiche effettuate nella sezione "${bodyValue.info && bodyValue.info.toUpperCase()}" non sono state salvate.`}
          size="f7" color="darkGrey" padding="0" />
              <Text align="center" value={`Cosa vuoi fare?`}
          size="f7" color="darkGrey" padding="0" />       
          </>}
        {bodyValue.alert === 'cambio' && 
        <Text align="center" value={`Se deselezioni questa casella tutti i dati inseriti relativamente alla sezione "${bodyValue.info && bodyValue.info.toUpperCase()}" saranno rimossi.`}
          size="f7" color="darkGrey" padding="0" />}

    <Row fluid justifycontent="space-around">
        <Column xs="4" padding="3em 0">
            <Button 
            value={ bodyValue.alert === 'cambio' ? "Annulla" : "Ignora"}
            size="f7" type="cancel" 
                      onClick={() => {
                        setOpen.bind(this); 
                        setOpen(!open);
                        if(bodyValue.annullaFunc){
                          bodyValue.annullaFunc.bind(this); 
                          bodyValue.annullaFunc();} }
                        } />          
        </Column>
        <Column xs="4" padding="3em 0">
            <Button 
            value={ bodyValue.alert === 'cambio' ? "Continua" : "Salva"}
            size="f7" 
            type="default"
            onClick={() => {
              bodyValue.continuaFunc.bind(this); 
              bodyValue.continuaFunc(true); 
              setOpen.bind(this); 
              setOpen(!open)}} />       
        </Column>
        
        </Row>
        </>:
        bodyValue.alert === 'nrBen' ? <>
        <Text align="center" value={`Se modifichi il numero di beneficiari, tutte le informazioni inserite nella sezione 
        "${bodyValue.info && bodyValue.info.idServizio === 1 ? 'BAMBINI DA ACCUDIRE' : 
        bodyValue.info && bodyValue.info.idServizio === 3 ? 'PERSONE DA ASSISTERE' : ''}" riferite ad uno dei beneficiari andranno perse.`}
          size="f7" color="darkGrey" padding="0" />
              <Text align="center" value={`Seleziona ed elimina almeno ${bodyValue.diff} beneficiari, altrimenti annulla.`}
          size="f7" color="darkGrey" padding="1em 0" />      
        
              <Row fluid>
<Column xs="8" xsShift="2" padding="0">
  {benArr ?
     <MultiSelect maxLength="15"
     reset
     required
       material
       name={`Lista ${bodyValue.info && bodyValue.info.idServizio === 1 ? 'bambini' : 
       bodyValue.info && bodyValue.info.idServizio === 3 ? 'beneficiari' : '' } `}
       getValue={(value) => {setSelectedBen(value); value.length >= bodyValue.diff ? setDisabled(false) : setDisabled(true) }}
       items={benArr ? benArr : []}
     />
  : null}
  </Column> 
   </Row>

        
    <Row fluid justifycontent ="space-around">
        <Column xs="4" padding="3em 0">
            <Button 
            value={"Annulla"}
            size="f7" type="cancel" 
                      onClick={() => {
                        setOpen.bind(this); 
                        setOpen(!open);
                        if(bodyValue.annullaFunc){
                          bodyValue.annullaFunc.bind(this); 
                          bodyValue.annullaFunc();} }
                        } />          
        </Column>
        <Column xs="4" padding="3em 0">
            <Button 
            value={ bodyValue.alert === 'cambio' ? "Continua" : bodyValue.alert === 'nrBen' ? 'Elimina' : "Salva"}
            size="f7"
            disabled={disabled}
            type={disabled && bodyValue.alert === 'nrBen' ? "disabled" : "default"}
            onClick={() => {
              bodyValue.continuaFunc.bind(this); 
              bodyValue.continuaFunc(true, selectedBen.map(el => {return el.id})); 
              setOpen.bind(this); 
              setOpen(!open)}} /> 
        </Column>
        </Row>    
        </> : null}
        </Row>
    </Modal>
  )
};

export default AvvisoModifica;
