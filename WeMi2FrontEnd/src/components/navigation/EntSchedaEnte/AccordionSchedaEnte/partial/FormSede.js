import React, {useState,useEffect} from 'react'
import {Row, Column} from 'components/ui/Grid'
import Input from 'components/ui/Input';
import {AddParameters} from 'redux-modules/actions/goi003Actions';
import {connect} from 'react-redux';

const FormSede = ({
  Data,
  redux_sede,
  setControllo,
  controllo,
  AddParameters,
  inputDisabled,
  Key,
  secondaria,
  ruolo,
  FlagEnte,
  stato,
  disabilitaPerSalvare,
  disabilitaModificaCampi,
})=>{

 
    const [errore_indirizzo , set_errore_indirizzo] = useState(false)
    const [errore_cap , set_errore_cap] = useState(false)
    const [errore_citta , set_errore_citta] = useState(false)
    const [errore_provincia , set_errore_provincia] = useState(false)

   
  


    return(
      <>
      
          <Row>
              <Column lg="6" md="6" xs="12">
                
                <Input material
                  id='txIndirizzo1'
                  initialValue={Data&& Data.indirizzo? Data.indirizzo :''}
                  color = {errore_indirizzo? 'red':'primary'}
                  disabled={disabilitaModificaCampi}
                  intlLabel='Indirizzo principale '
                  required
                  onBlur={(event) => {
                    setControllo(!controllo)
                    set_errore_indirizzo(event.target.value=="")
                   
                    Data.indirizzo = event.target.value;
                  
                    if(Key &&Key.sede_principale && Key.sede_principale.indirizzo)
                    Key.sede_principale.indirizzo.txIndirizzo=event.target.value}
                  }
                />
              
          
              </Column>
              <Column lg="6" md="6" xs="12">
                <Input material
                 
                  intlLabel='CAP '
                  required
                  initialValue={Data&& Data.cap? Data.cap :''}
                 
                  color = {errore_cap? 'red':'primary'}
                  disabled={disabilitaModificaCampi}
                  
                  onBlur={(event) => {
                    setControllo(!controllo)
                    set_errore_cap(event.target.value=="")
                    Data.cap = event.target.value;
                   
                   
                    if(Key &&Key.sede_principale && Key.sede_principale.indirizzo)
                    Key.sede_principale.indirizzo.txCAP=event.target.value}
                  }
                />
              </Column>
            </Row>
            <Row>
              <Column lg="6" md="6" xs="12">
                <Input material  
                  initialValue={Data&& Data.citta? Data.citta :''}
   
                 
                  disabled={disabilitaModificaCampi}
                  
                  color = {errore_citta? 'red':'primary'}
                  intlLabel='Città '
                  required
                  onBlur={(event) => {
                    setControllo(!controllo)
                    set_errore_citta(event.target.value=="")
                    Data.citta = event.target.value;
                    
                   
                    if(Key &&Key.sede_principale && Key.sede_principale.indirizzo)
                    Key.sede_principale.indirizzo.txCitta=event.target.value}
                  }
                />
              </Column>
              <Column lg="6" md="6" xs="12">
                <Input material
                  initialValue={Data&& Data.provincia? Data.provincia :''}
            
                 
                  intlLabel='Provincia '
                  required
                  color = {errore_provincia? 'red':'primary'}
                  disabled={disabilitaModificaCampi}
                  
                  onBlur={(event) => {
                    setControllo(!controllo)
                    set_errore_provincia(event.target.value=="")
                    Data.provincia = event.target.value;
                  
                   
                    if(Key &&Key.sede_principale && Key.sede_principale.indirizzo)
                    Key.sede_principale.indirizzo.txProvincia=event.target.value}
                  }
                />
              </Column>
            </Row>
            </>
    )
}
const mapStoreToProps =(store) => ({
  redux_sede: store.goi003
})
const mapDispatchToProps = ({
  AddParameters
})
export default connect(mapStoreToProps,mapDispatchToProps)(FormSede)