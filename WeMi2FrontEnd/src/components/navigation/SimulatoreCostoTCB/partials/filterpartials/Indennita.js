import React from 'react';
import {Row} from 'components/ui/Grid';
import Radio from 'components/ui/Radio';
import Label from 'components/ui/Label';
import FaIcon from 'components/ui/FaIcon';
import Tooltip from 'components/ui/Tooltip';
import {mockIndennita} from '../ConfigurazioneJson';

const Indennita = ({addParameter,parametri}) =>(
    <>
    {parametri.convivenza && parametri.convivenza.id===6? 
        <>
        <Label
            value="Indennità"
            weight="bold"
            transform="uppercase"
            intlFormatter
            color="primary"
            bgcolor="grey"
            size="f7"
          />
        {mockIndennita.map((indennita,index)=>
        
        <Row key={index.toString()}fluid margin="1em 0 0.5em"  justifycontent="space-between" alignitems="center" display="flex">
        <Radio
            required
            display="flex"
            getValue={(value)=>{addParameter({...parametri,indennita: value})}}
            selectedValue={parametri.indennita && parametri.indennita}
            fontSize="f7"
            spacing=".5em"
            value={indennita.value}
            defaultvalue={false}
            checkcolor="blue"
            label={indennita.textValue}
            bordercolor="primary"
        />
      
    <Tooltip 
            left
            width="12em"
            horizzontalShift="-3.5em"
            fontSize="f8"
            textTT={`Lorem ipsum dolor sit amet dolor sit amet lorem.`}
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
        )}
         
        </>  
          
          : null} </>
);

Indennita.displayName = 'Indennita';
export default Indennita;