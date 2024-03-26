import React from 'react'
import Accordion from 'components/ui/Accordion'
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import TextArea from 'components/ui/TextArea';
import Text from 'components/ui/Text'; 
import AccordionBodyWrapper from './AccordionBodyWrapper'

const EnteSection = ({Data,stato,ruolo,spazi,categorie,email,statoScheda})=>{

  const categorieOrdinate=()=>{
    let arr=[]
    categorie.map((el,i)=>{
      if(i==0)
      arr.push(el)
      else
      arr.push(" "+el)
    })
    return arr
  }

  const spaziOrdinati=()=>{
    let arr=[]
    spazi.map((el,i)=>{
      if(i==0)
      arr.push(el)
      else
      arr.push(" "+el)
    })
    return arr
  }
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
          <>
          <AccordionBodyWrapper>
            <Row>
              <Column lg="3">
                <Input material disabled intlLabel="Ente ID" intlPlaceholder={ Data.ente_id} />
              </Column>
              <Column lg="3">
                <Input material disabled intlLabel="Partita IVA" intlPlaceholder={Data.partita_iva} />
              </Column>

              <Column lg="6">
                <Input material disabled intlLabel="Nome Chiave Ente" intlPlaceholder={Data.nome_chiave_ente} />
              </Column>
            </Row>
            <Row>
              
              <Column lg="6">
                <Input material disabled intlLabel="Nome Completo Regione Sociale"intlPlaceholder={Data.ragione_sociale} />
              </Column>
              <Column lg="6">
                <Input material disabled intlLabel="Spazi Wemi Gestiti" intlPlaceholder={spazi?spaziOrdinati(): ''} />
              </Column>
              
              <Column lg="6">
                <Input material disabled intlLabel="Email Amministratore Ente" intlPlaceholder={ email? email: ''} />
              </Column>
              <Column lg="3">
                <Input material disabled intlLabel="Stato" intlPlaceholder={ statoScheda} />
              </Column>
              <Column lg="3">
                <Input material disabled intlLabel="Operatori servizi WeMi" intlPlaceholder={ Data.nr_operatori_servizi_wemi } type="number" />
              </Column>
              <Column lg="12">
                <TextArea
                  material
                  name="Categorie Accreditate"
                  value={categorie? categorieOrdinate() :''}
                  readOnly="true"
                  intlFormatter
                />
              </Column>
              
            </Row>
            </AccordionBodyWrapper>
          </>
        }
      />
    )
}

export default EnteSection