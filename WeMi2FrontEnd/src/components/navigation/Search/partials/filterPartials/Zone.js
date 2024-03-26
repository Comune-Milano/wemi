import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import Accordion from 'components/ui/Accordion';
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import Button from 'components/ui/Button';
import Chip from 'components/ui/Chip';
import MunicipioModal from './MunicipioModal';
import Loader from 'components/ui/Loader';
import {resetField} from 'redux-modules/actions/authActions';
import {getInputAddress as getInputAddressQ,
  getMunicipio as getMunicipioQ } from './municipioGraphQL';
import { AddFilter } from '../../../../../redux-modules/actions/authActions';


const Zone = ({indirizzo, MunicipioSelezionato, loaded, resetField, getValue,filtri }) => {
  const [open, openModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("")
  
  return (
    <>
      <Column xs="12" padding="0 0 10px">
        <Accordion
          headerColor="primary"
          headerBgColor="white"
          headerColorOpen="primary"
          headerBgColorOpen="white"
          arrowOpenColor="primary"
          arrowClosedColor="primary"
          headerPadding="0"
          arrowSize="f5"
          AccordionHeader={() => (
            <Row fluid justifycontent="space-between">
              <Column xs="11" padding="0">
                <Text 
                  value="Municipio di Milano" 
                  transform="uppercase" 
                  letterSpacing="0.05em"
                  intlFormatter 
                  size="f7"
                  letterSpacing="0.05em" 
                />
              </Column>
            </Row>
          )}
          AccordionBody={() => (
            <>
             <Row fluid margin="1em 0">
                <Button
                  onClick={()=> {openModal(!open);  
                     resetField('InputAddress');
                   resetField('MunicipioSelezionato');}}
                  value="filtra per municipio"
                />
              </Row>
               {MunicipioSelezionato && filtri&& filtri.municipio !==0 && !open&& MunicipioSelezionato.cercaMunicipio && selectedAddress !== "" && <>
              <Row fluid margin="1em 0 0.2em" justifycontent="center">
                <Text tag="p" color="darkGrey" value="Stai cercando per i municipi: " intlFormatter size="f7" />
              </Row> 
               <Row fluid justifycontent="center">
             
                <Chip
                  margin="10px 5px"
                  padding="5px 10px"
                  width="100%"
                  removeChip={async () => {
                    
                    await resetField('InputAddress');
                    await resetField('MunicipioSelezionato');
                    getValue.bind(this);
                     getValue(0);
                  }}
                  size="f7"
                  bgcolor="grey"
                  color="darkGrey"
                >
                  <div style={{width: "85%", textTransform: "capitalize"}}>
      
                  <Text tag="p" color="darkGrey" value={MunicipioSelezionato.cercaMunicipio.nmMunicipio} intlFormatter size="f7" />
                 <Text tag="p" color="darkGrey" value={selectedAddress.name.toLowerCase()} intlFormatter size="f7" />
                 
                  </div>

                </Chip>
           
              </Row>
              </>} 
            </>
          )}
        />
      </Column>
      <Hr height="0.5px" color="grey" width="90%" left="5%" top="0" bottom="1em" />
      <MunicipioModal modalOpen={open} openModal={openModal}
      getValue={getValue.bind(this)}
      setSelectedAddress={setSelectedAddress}
      selectedAddress={selectedAddress} />
    </>
  )
}

const mapStoreToProps = store => ({
  indirizzo: store.graphql.InputAddress,
  filtri: store.user.filtri,
  loaded: store.graphql.loaded,
  MunicipioSelezionato: store.graphql.MunicipioSelezionato
})
const mapDispatchToProps = ({
  resetField

})

export default connect(mapStoreToProps, mapDispatchToProps)(Zone)
