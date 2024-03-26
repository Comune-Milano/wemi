/** @format */

import React, {useState} from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import Input from 'components/ui/Input';
import FaIcon from 'components/ui/FaIcon';


const DivPadding = styled.div`
padding:50px;
`;

const FaIconTest = styled(FaIcon)`
float: right;  
`;

 
const SedeComponent = () => {
  const [AggiungiSede, setAggiungiSede] = useState(false);
return(
  <div>
{AggiungiSede == false?(
<DivPadding>
     <FaIconTest fontSize="f5" color="black" icon="\f00d" onClick={() => setAggiungiSede(true)}/>
    <div>
      <Row>
      <Column lg="12">
        <Text value='Nome Sede' />
      </Column>
        </Row>
        <Row>
            <Column lg="12">
              <Input material intlPlaceholder='' intlLabel='Indirizzo' />
            </Column>
        </Row>
        <Row>
            <Column lg="2">
              <Input material intlPlaceholder='' intlLabel='CAP'/>
            </Column>
            <Column lg="7">
              <Input material intlPlaceholder='' intlLabel='Città' />
            </Column>
            <Column lg="3">
              <Input material intlPlaceholder='' intlLabel='Provincia'/>
            </Column>
        </Row>
        </div>
  </DivPadding>
  )
:null}
  </div>
)
};

SedeComponent.displayName = 'SedeComponent';


export default SedeComponent;
