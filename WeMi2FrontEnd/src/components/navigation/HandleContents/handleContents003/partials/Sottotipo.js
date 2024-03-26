/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Radio from 'components/ui/Radio';
import Checkbox from 'components/ui/Checkbox';

const Sottotipo = ({ json, getValue, selectedValue, TYCont }) => {
    const [exclusive, setExclusive] = useState(false)

 
    useEffect(() => {
        if(selectedValue.id === 99)
        setExclusive(true)
        else setExclusive(false)
        
    })



    

   


    const radioSottotipoCnt = [
        {
            id: 1,
            value: 'Link Esterno'
        },
        {
            id: 2,
            value: 'Pagina Informativa'
        },
        {
            id: 3,
            value: 'Link a media file'
        },
    ]

    const checks = [{
        value: 99,
        textValue: 'si'
    }]


    return (
        <>
            {json.ty_sotto_tipo_Contenuto && TYCont === 4 ?
                <Column xs="12" md="6" padding="0.5em 0 1em">
                    <Row fluid >
                        <Text value="Categoria di tipo TCB ad uso esclusivo del CdMi: " size="f7" padding="0 5rem 0 0" color="blue" weight="bold" />
                        {   checks.map((check,index) => (
                                <Checkbox
                                    key={index.toString()}
                                    getValue={getValue.bind(this)}
                                    selectedValue={selectedValue}
                                    boxWidth="1.2em"
                                    boxHeight="1.2em"
                                    fontSize="f7"
                                    type="checkbox"
                                    value={check.value}
                                    defaultvalue={false}
                                    checkcolor="blue"
                                    label={check.textValue}
                                    bordercolor="blue"
                                />
                            ))}
                    </Row>
                </Column>
                : <Column xs="12" md="6" padding="0.5em 0 1em">
                    <Row fluid>
                        <Text value="Sottotipo Contenuto: " size="f7" color="blue" weight="bold" />
                    </Row>
                
                    {radioSottotipoCnt.map((radio,index) => (
                        <Radio
                            key={index.toString()}
                            display="inline-flex"
                            groupName="items2"
                            getValue={getValue.bind(this)}
                            selectedValue={selectedValue}
                            fontSize="f7"
                            value={radio.id}
                            label={radio.value}
                            spacing="0.5em 1em 0.5em 0"
                            bordercolor="blue"
                            checkcolor="blue"
                        />))}
                </Column>
            }
        </>
    );
};

Sottotipo.displayName = 'Sottotipo';

export default Sottotipo;
