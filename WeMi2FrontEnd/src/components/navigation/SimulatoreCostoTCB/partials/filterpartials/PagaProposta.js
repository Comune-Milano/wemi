import React from 'react'
import Hr from 'components/ui/Hr';
import { Row, Column } from 'components/ui/Grid';
import Label from 'components/ui/Label';
import Input from 'components/ui/Input';
import styled from 'styled-components';
import media from 'utils/media-queries';
import FaIcon from 'components/ui/FaIcon';
import Tooltip from 'components/ui/Tooltip';

const Container = styled.div`
  ${media.md``}
`;

const PagaProposta = ({
  addParameter,
  parametri,
}) =>(
  <>
    <Container>
    <Label
            value="Configurazione"
            weight="bold"
            transform="uppercase"
            intlFormatter
            color="primary"
            bgcolor="grey"
            size="f7"
          />
        
           {/* <Column xs="12" padding="1rem 0 0 0">
           <Text    
            color="darkGrey"
            size="f8"
            value={'} />
           </Column> */}
            <Column xs="12" padding="1em 0">
           <Row justifycontent="space-between" fluid display="flex" alignitems="center" margin="1em 0 0.5em">
           
           <Input
           required
              material
              onBlur={(event)=>{addParameter({...parametri,pagaProposta: parseInt(event.target.value)})}}
              intlLabel="Paga Proposta"
              intlPlaceholder="Inserire valore numerico"
              width="85%"
            />
             <Tooltip 
                    left
                    width="12em"
                    fontSize="f8"
                    textTT={'La paga minima oraria o mensile prevista dal contratto è di€ ${euroMassimo}'}
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
            </Row>
            <Hr height="0.5px" color="grey" width="90%" left="5%" top="0" bottom="1em" />
               {/* <Column xs="12" padding="1rem 0 0 0">
               <Text    
                color="darkGrey"
                size="f8"
                value=""/>
               </Column> */}
               <Row justifycontent="space-between" fluid display="flex" alignitems="center" margin="1em 0 0.5em">
              
               <Input
               required
                  material
                  onBlur={(event)=>{addParameter({...parametri,oreSettimanali: parseInt(event.target.value)})}}
                  intlLabel="Ore settimanali"
                  intlPlaceholder="Inserire valore numerico"
                  type="number"
                  width="85%"
                />
                 <Tooltip 
                        left
                        width="12em"
                        fontSize="f8"
                        textTT={'Il numero massimo di ore previsto dal contratto è di ${oreMassime} '}
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
                        
                </Row> 
                </Column> 
            </Container>
            </>
         
);


PagaProposta.displayName = 'PagaProposta';
export default PagaProposta;