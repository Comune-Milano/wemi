import React from 'react';
import Hr from 'components/ui/Hr';
import MultiSelect from 'components/ui/MultiSelect';
import Label from 'components/ui/Label';
import FaIcon from 'components/ui/FaIcon';
import Tooltip from 'components/ui/Tooltip';
import styled from 'styled-components';
import media from 'utils/media-queries';
// import {livelli} from '../ConfigurazioneJson';
const Container = styled.div`
margin: 1em 0;
${media.md`
`}
`;

const Livello = ({addParameter, parametri,livelli}) => (
    <>
    <Container>
   <Label
            value="Livello"
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
              fontSize="f8"
              textTT={'pipo'}
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
              </Tooltip>)}
          />
             </Container>
             <Container>
           <MultiSelect
           required
             items={livelli.map((elemento,index) => ({
              value: parseInt(index+1),
              textValue: 'Livello'+' '+elemento.cd_categoria_contrattuale.replace(' ','').toString()
            }))}
             color="primary"
             selectedValue = {parametri.livelli ? parametri.livelli.livelliArray: {}}
             getValue={(array) =>{addParameter({...parametri, livelli: {livelliArray: array}})}}
           />
           </Container>
         
         
            </>
);


export default Livello;