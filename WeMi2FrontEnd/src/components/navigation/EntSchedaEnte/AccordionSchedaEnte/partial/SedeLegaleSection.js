import React, {useState} from 'react'
import Accordion from 'components/ui/Accordion'
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text'; 
import TextArea from 'components/ui/TextArea'
import FormSede from './FormSede'
import AccordionBodyWrapper from './AccordionBodyWrapper'
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';


const SedeLegaleSection = ({
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
    const isAmministratore = checkAdmin(userProfile.datiLogin);
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
          <div>
            <div>
              <Text weight="bold" value={Data.titolo} intlFormatter size="f4" />
            </div>
            <div>
              <Text value={Data.sottoTitolo} intlFormatter size="f8" />
            </div>
          </div>
        )}
        
        children={
          <>
         
         <AccordionBodyWrapper>
            <FormSede 
              Data={Data}
              setControllo={setControllo}
              controllo={controllo}
              Key={Key}
              FlagEnte={FlagEnte}
              ruolo={ruolo}
              stato={stato}
              disabilitaPerSalvare={disabilitaPerSalvare}
              inputDisabled={!FlagEnte}
              disabilitaModificaCampi={disabilitaModificaCampi}
            />

            <Row>
              <Column lg="12">
                {
                  isAmministratore || Data.note ?
                  <TextArea material
                    id='note5'
                    name="Indicazioni della redazione WeMi"
                    preserveLineBreaks
                    backgroundColor="yellow"
                    disabledBackgroundColor="yellow"
                    initialValue={Data.note}
                    readOnly ={disableNotes ? 'true' : 'false'}
                    getValue={(value)=>{ CatchNotes(value) }} ></TextArea>
                  :null
                }
              </Column>
            </Row>

</AccordionBodyWrapper>
          </>
        }
      />
    )
}

export default withAuthentication(SedeLegaleSection);
