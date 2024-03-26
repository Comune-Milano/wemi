import React, { useState, useEffect,useRef } from 'react'
import { Row, Column } from 'components/ui/Grid'
import Input from 'components/ui/Input';
import { AddParameters } from 'redux-modules/actions/goi003Actions';
import { connect } from 'react-redux';

const FormSedeSecondaria = ({
  FormSecondariaProps,
  redux_sede,
  AddParameters,
  Key,
  disabilitaModificaCampi,
}) => {

  const {
    
    titolo, 
    FlagEnte,
    Data,
    stato,
    disabilitaPerSalvare,
    inputDisabled,
  } = FormSecondariaProps;
  const [errore_indirizzo, set_errore_indirizzo] = useState(false)
  const [errore_cap, set_errore_cap] = useState(false)
  const [errore_citta, set_errore_citta] = useState(false)
  const [errore_provincia, set_errore_provincia] = useState(false)
  const [upd, setUpd] = useState(false)
  const formRef=useRef()


  useEffect(() => {
    if (upd !== FormSecondariaProps)
      setUpd(FormSecondariaProps)
  })

      if (upd !== FormSecondariaProps)
      setUpd(FormSecondariaProps)

  return (
    <form ref={formRef} >
    <Row fluid>
    {upd === FormSecondariaProps ?
    <>
      <Row>
        <Column lg="6" md="6" xs="12">

          <Input material
            id='txIndirizzo1'
            initialValue={Data && Data.indirizzo ? Data.indirizzo : ''}
            color={errore_indirizzo ? 'red' : 'primary'}
            disabled={disabilitaModificaCampi}            
            intlLabel='Indirizzo principale '
            required
            onBlur={(event) => {
                let sedi = redux_sede.sedi

                sedi.map((ele) => { if (ele.nomeSede == titolo) ele.indirizzo.indirizzo = event.target.value })
               

                AddParameters({ ...redux_sede, sedi: sedi })
 
            }}
            onChange={(event) => {
              set_errore_indirizzo(event.target.value == "")

            //   AddParameters({ ...redux_sede, validita:formRef.current.checkValidity()})              
            //    set_errore_indirizzo(event.target.value == "")
             }}
          />


        </Column>
        <Column lg="6" md="6" xs="12">
          <Input material
            intlLabel='CAP '
            required
            initialValue={Data && Data.cap ? Data.cap : ''}
            color={errore_cap ? 'red' : 'primary'}
            disabled={disabilitaModificaCampi}
            onBlur={(event) => {      
                let sedi = redux_sede.sedi
                sedi.map((ele) => { if (ele.nomeSede === titolo) ele.indirizzo.cap = event.target.value })
                set_errore_cap(event.target.value === "")

                AddParameters({ ...redux_sede, sedi: sedi })   
            }}
          
            onChange={(event) => {
            //   AddParameters({ ...redux_sede, validita:formRef.current.checkValidity()})              
            //    set_errore_cap(event.target.value == "")
            set_errore_cap(event.target.value == "")

             }}
          />
        </Column>
      </Row>
      <Row>
        <Column lg="6" md="6" xs="12">
          <Input material
            initialValue={Data && Data.citta ? Data.citta : ''}
            disabled={disabilitaModificaCampi}
            color={errore_citta ? 'red' : 'primary'}
            intlLabel='Città '
            required
            onBlur={(event)=>{
               let sedi = redux_sede.sedi
                sedi.map((ele) => { if (ele.nomeSede == titolo) ele.indirizzo.citta = event.target.value })
               set_errore_citta(event.target.value == "")
                
                AddParameters({ ...redux_sede, sedi: sedi , validita:formRef.current.checkValidity()})
            }}
             onChange={(event) => {
            //   AddParameters({ ...redux_sede, validita:formRef.current.checkValidity()})              
            //    set_errore_citta(event.target.value == "")
            set_errore_citta(event.target.value == "")

             }}
             

           
         
          />
        </Column>
        <Column lg="6" md="6" xs="12">
          <Input material
            initialValue={Data && Data.provincia ? Data.provincia : ''}
            intlLabel='Provincia '
            required
            color={errore_provincia ? 'red' : 'primary'}
            disabled={disabilitaModificaCampi}
            onBlur={(event) => { 
                let sedi = redux_sede.sedi
                sedi.map((ele) => { if (ele.nomeSede === titolo) ele.indirizzo.provincia = event.target.value })
               set_errore_provincia(event.target.value === "") 
                AddParameters({ ...redux_sede, sedi: sedi })              
            }}
             onChange={(event) => {
            //   AddParameters({ ...redux_sede, validita:formRef.current.checkValidity()})              
            //    set_errore_provincia(event.target.value == "")
            set_errore_provincia(event.target.value == "")

            }}
          />
        </Column>
      </Row>
      </> 
      
      :

      <>
      <Row>
        <Column lg="6" md="6" xs="12">

          <Input material
            id='txIndirizzo1'
            color={errore_indirizzo ? 'red' : 'primary'}
            intlLabel='Indirizzo principale '
            required
          />
        </Column>
        <Column lg="6" md="6" xs="12">
          <Input material
            intlLabel='CAP '
            required
            color={errore_cap ? 'red' : 'primary'}
    
          />
        </Column>
      </Row>
      <Row>
        <Column lg="6" md="6" xs="12">
          <Input material
            color={errore_citta ? 'red' : 'primary'}
            intlLabel='Città '
            required
          />
        </Column>
        <Column lg="6" md="6" xs="12">
          <Input material
            intlLabel='Provincia '
            required
            color={errore_provincia ? 'red' : 'primary'}
          />
        </Column>
          </Row> </>}
    </Row>
   
    </form>
  )
}
const mapStoreToProps = (store) => ({
  redux_sede: store.goi003
})
const mapDispatchToProps = ({
  AddParameters
})
export default connect(mapStoreToProps, mapDispatchToProps)(FormSedeSecondaria)
