import React from 'react';
import {connect} from 'react-redux';
import { Row,Column } from 'components/ui/Grid';
import Hr from 'components/ui/Hr';
import Select from 'components/ui/Select';
import FaIcon from 'components/ui/FaIcon';
import Tooltip from 'components/ui/Tooltip';
import Label from 'components/ui/Label';
// import {tipologiaConvivenza} from '../ConfigurazioneJson';
const Convivenza = ({parametri,addParameter,tipologiaConvivenza,locale,calcolaPreventivo}) => {
    let tipoConvivenza = tipologiaConvivenza.map((elemento) => ({
        value: elemento.cd_dominio_tcb,
        textValue: elemento.tl_valore_testuale[locale]
    }))
    return(
    <>
    <Label
           value="Convivenza"
           weight="bold"
           transform="uppercase"
           intlFormatter
           color="primary"
           bgcolor="grey"
           size="f7"
           display="flex"
            withIcon
            icona={() =>( <Tooltip 
              left
              width="12em"
              horizzontalShift="-3.5em"
              fontSize="f8"
              textTT={tipoConvivenza.description}
              color="white"
              bgcolor="primary">
                  <FaIcon 
                  radius="50%" 
                  icon="\f128"
                  bgcolor="primary"
                  color="white"
                  fontSize="f9" 
                  height="2em"
                  width="2em" 
                  />  
              </Tooltip>

            )}
          />
            {/* {tipoConvivenza.map((tipologia,index) => ( */}
          <Row  fluid margin="1em 0 0.5em"  justifycontent="space-between" alignitems="center" display="flex">
             
                <Select
                    required
                    maxLength="15"
                    // display="flex"
                    getValue={(value)=>{addParameter({...parametri,convivenza: {value, description: tipoConvivenza.description}});
                    if(calcolaPreventivo)
                    calcolaPreventivo()}}
                    selectedValue={parametri.convivenza ? parametri.convivenza.value : {}}
                    items={tipoConvivenza}
                    fontSize="f7"
                    spacing=".5em"
                    // value={tipologia.value}
                    // defaultvalue={false}
                    checkcolor="blue"
                    // label={tipologia.textValue}
                    bordercolor="primary"
                />
           
                </Row>
                {/* ))} */}
            </>
)};
const mapStoreToProps = store =>({
    tipologiaConvivenza: store.graphql.simulatoreCosto.tipoOrarioLavoroAll,
    locale: store.locale
  })

export default connect(mapStoreToProps)(Convivenza);