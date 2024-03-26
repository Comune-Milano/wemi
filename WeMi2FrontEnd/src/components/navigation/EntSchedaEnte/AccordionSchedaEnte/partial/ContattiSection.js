import React, { useState } from 'react';
import Accordion from 'components/ui/Accordion';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text'; 
import TextArea from 'components/ui/TextArea';
import Tooltip from 'components/ui/Tooltip';
import FaIcon from 'components/ui/FaIcon';
import AccordionBodyWrapper from './AccordionBodyWrapper';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';


const ContattiSection = ({
  Data,
  setControllo,
  controllo,
  FlagEnte,
  CatchNotes,
  Key,
  ruolo,
  stato,
  disabilitaPerSalvare,
  userProfile,
  disabilitaModificaCampi,
  disableNotes,
}) =>{
  const[erroreReferente,setErroreReferente]=useState(false)
  const[erroreTelefono,setErroreTelefono]=useState(false)
  const[erroreMail,setErroreMail]=useState(false)
  const isAmministratore = checkAdmin(userProfile.datiLogin);
    return(
        <Accordion
        AccordionHeader={() => (
          <div>
            <Text weight="bold" value={Data.titolo} intlFormatter size="f4" />
          </div>
        )}
        headerBgColorOpen="blue"
        headerBgColor="grey"
        maxHeight="none"
        headerColorOpen="white"
        headerColor="blue"
        arrowOpenColor="white"
        arrowClosedColor="blue"
        arrowSize="f1"
        headerPadding="0.75rem 1.25rem"
        aperto={false}
        children={
          <AccordionBodyWrapper>
            <Row>
              <Column lg="4">
                <Tooltip component={FaIcon} restComp={{ icon: '\f059', fontSize: 'f7' }} textTT={Data.tooltip[0].label}
                  right color="white" bgcolor="primary" style={{ padding: '0', margin: '0' }} />
                <Input material
                initialValue={Data&& Data.referente? Data.referente :''}
                color = {erroreReferente?"red":"primary"}
                
                 
                  intlLabel='Referente'
                  disabled = {disabilitaModificaCampi}
                  required
                  onBlur ={(event) => {
                   setControllo(!controllo)
                   if(event.target.value === ''){
                     setErroreReferente(true)
                   } else {
                    setErroreReferente(false)

                   }
                    Data.referente = event.target.value;
                    Key.js_referente.txReferente=event.target.value
                  }}
                />
              </Column>

              <Column lg="4">
                <Tooltip component={FaIcon} restComp={{ icon: '\f059', fontSize: 'f7' }} textTT={Data.tooltip[1].label}
                  right color="white" bgcolor="primary" style={{ padding: '0', margin: '0' }} />
                <Input material
                  initialValue={Data&& Data.telefono? Data.telefono :''}
                color = {erroreTelefono?"red":"primary"}
                 
                  intlLabel='Telefono'
                  disabled = {disabilitaModificaCampi}
                  required
                  onBlur ={(event) => {
                    setControllo(!controllo)
                    if(event.target.value===''){
                      setErroreTelefono(true)
                    }else{
                     setErroreTelefono(false)
 
                    }
                    Data.telefono = event.target.value;
                    Key.js_referente.txTelefono=event.target.value

                  }}
                />
              </Column>

              <Column lg="4">
                <Tooltip component={FaIcon} restComp={{ icon: '\f059', fontSize: 'f7' }} textTT={Data.tooltip[2].label}
                  right color="white" bgcolor="primary" style={{ padding: '0', margin: '0' }} />
                <Input material
                 initialValue={Data&& Data.telefono_secondario? Data.telefono_secondario :''}
                  
                  disabled = {disabilitaModificaCampi}
                  intlLabel='Telefono Secondario'
                  onChange={(event) => {
                    Data.telefono_secondario = event.target.value;
                    Key.js_referente.txTelefonoSecondario=event.target.value

                  }}
                />
              </Column>
            </Row>

            <Row>
              <Column lg="4">
                <Tooltip component={FaIcon} restComp={{ icon: '\f059', fontSize: 'f7' }} textTT={Data.tooltip[3].label}
                  right color="white" bgcolor="primary" style={{ padding: '0', margin: '0' }} />
                <Input material
                initialValue={Data&& Data.email? Data.email :''}
                required
                color = {erroreMail?"red":"primary"}                
                  intlLabel='Mail'
                  disabled = {disabilitaModificaCampi}
                  onChange={(event) => {
                    setControllo(!controllo)
                    if(event.target.value===''){
                      setErroreMail(true)
                    }else{
                     setErroreMail(false)
 
                    }
                    Data.email = event.target.value;
                    Key.js_referente.txEmail=event.target.value

                  }}
                />
              </Column>

              <Column lg="4">
                <Tooltip component={FaIcon} restComp={{ icon: '\f059', fontSize: 'f7' }} textTT={Data.tooltip[4].label}
                  right color="white" bgcolor="primary" style={{ padding: '0', margin: '0' }} />
                <Input material
                 initialValue={Data&& Data.email_secondaria? Data.email_secondaria :''}
              
                 
                  intlLabel='Mail Secondaria'
                  disabled = {disabilitaModificaCampi}
                  onChange={(event) => {
                    Data.email_secondaria = event.target.value;
                    Key.js_referente.txEmailSecondaria=event.target.value

                  }}
                />
              </Column>
            </Row>

            <Row>
              <Column lg="12">
                {
                  isAmministratore || Data.note ?
                  <TextArea material
                    preserveLineBreaks
                    backgroundColor="yellow"
                    disabledBackgroundColor="yellow"
                    id='note7'
                    name="Indicazioni della redazione WeMi"
                    initialValue={Data.note}
                    readOnly={disableNotes ? 'true' : 'false'}
                    getValue={(value)=> CatchNotes(value)} ></TextArea>
                  :null
                }
              </Column>
            </Row>
            </AccordionBodyWrapper>
        }
      />
    )
}

export default withAuthentication(ContattiSection)