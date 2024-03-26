import React from 'react';
import Label from 'components/ui/Label';
import {Row} from 'components/ui/Grid';

const LabelSezione = ({value})=>(
    <Row fluid padding="1em 0" alignitems="center" flex>
    <Label
        value={value}
        width="auto"
        weight="bold"
        transform="uppercase"
        intlFormatter
        display="-webkit-inline-box"
        color="primary"
        bgcolor="grey"
        margin="0"
        size="f8"
    />
</Row>
    
)
LabelSezione.displayName ='LabelSezione';
export default LabelSezione;