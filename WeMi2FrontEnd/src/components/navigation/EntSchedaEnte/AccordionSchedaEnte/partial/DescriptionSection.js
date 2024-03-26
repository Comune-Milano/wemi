import React, { useState } from 'react';
import Accordion from 'components/ui/Accordion'
import { Row, Column } from 'components/ui/Grid';
import TextArea2 from 'components/ui2/TextArea';
import Text from 'components/ui/Text'; 
import TextArea from 'components/ui/TextArea'
import Tooltip from 'components/ui/Tooltip'
import FaIcon from 'components/ui/FaIcon'
import AccordionBodyWrapper from './AccordionBodyWrapper'
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';

const DescriptionSection = ({
  Data,
  controllo,
  setControllo,
  FlagEnte,
  CatchNotes,
  Key,
  locale,
  stato,
  ruolo,
  disabilitaModificaCampi,
  userProfile,
  disableNotes
})=>{
  const [descrizione, setDescrizione] = useState("");

  const resultDescrizione = function checkDescrizione(){ 
    if(descrizione){
      return descrizione;
    }

    if(Data && Data.descrizione){
      return Data.descrizione;
    }

    return "";
  }();
  const isAmministratore = checkAdmin(userProfile.datiLogin);
  const[erroreDescrizione,setErroreDescrizione] = useState(false);
    return(
        <Accordion 
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
        AccordionHeader={() => (
          <Text weight="bold" value={Data.titolo} intlFormatter size="f4" />
        )}
        
        children={
          <AccordionBodyWrapper>
            <Row>
              <Column lg="12">
                <Tooltip component={FaIcon} restComp={{ icon: '\f059', fontSize: 'f7' }} textTT={Data.tooltip}
                  right color="white" bgcolor="primary" style={{ padding: '0', margin: '0' }} />
                  
                 
                <TextArea2 
                  material
                  id='tl_descrizione_ente'
                  label='Descrizione'
                  inputValue={resultDescrizione}
                  color = {erroreDescrizione?"red":"primary"}                
                  required
                  disabled = {disabilitaModificaCampi}
                  onChange={(value) => {
                    setDescrizione(value);
                    Data.descrizione = value;
                  }}
                  onBlur ={(event) => {
                    setControllo(!controllo)
                    if(event.target.value===''){
                      setErroreDescrizione(true)
                    }else{
                      setErroreDescrizione(false)
 
                    }
                    Data.descrizione = event.target.value
                    if(Key && Key.tl_descrizione_ente && locale)
                    Key.tl_descrizione_ente[locale]=event.target.value
                    
                  }}
                  
                />
             
              </Column>
            </Row>
            <Row>
              <Column lg="12">
                {
                  isAmministratore || Data.nota ?
                  <TextArea material
                    preserveLineBreaks
                    backgroundColor="yellow"
                    disabledBackgroundColor="yellow"
                    id='note3'
                    name="Indicazioni della redazione WeMi"
                    readOnly = {disableNotes ? 'true' : 'false'}
                    initialValue={Data.nota}
                    getValue={(value)=>
                                //Data.note = value.value
                                CatchNotes( value)
                              }
                    ></TextArea>
                  :null
                }
              </Column>
            </Row>
            </AccordionBodyWrapper>
        }
      />
    )
}

export default withAuthentication(DescriptionSection);
