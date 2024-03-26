import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from 'components/ui/Text'
import FaIcon from 'components/ui/FaIcon'
import { colors } from 'theme';

const PrincipalDiv= styled.div`
    padding: ${props => props.padding ? props.padding : "1em"}; 
    border: ${props => props.padding ? props.border : `01px solid ${colors.primary}`};
`

const TitleDiv = styled.div`
    margin: ${props=> props.title_margin ? props.title_margin : "0 20px"};
    display : flex;
   
`
const BodyDiv = styled.div`

`

const SectionChip = ({Titolo, children, remove})=>{
    const [upd, setUpd] = useState(false);

    useEffect(()=>{
        if(upd !== children) 
        setUpd(children)
    },[children])
    return(
        <PrincipalDiv>
        <TitleDiv>
        <Text value={Titolo} intlFormatter size="f6" />
        {remove && <FaIcon noShadow onClick={() => {remove.bind(this); remove(Titolo) }} margin="0 1em" icon="\f00d" color="primary" fontSize={"f6"} />}
        </TitleDiv>
        <BodyDiv>
            {children}
        </BodyDiv>
        </PrincipalDiv>
    )
}

export default SectionChip