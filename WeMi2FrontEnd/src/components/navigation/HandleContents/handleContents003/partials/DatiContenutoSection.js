/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';

const DatiContenutoSection = ({ json, getValue, selectedValue, TYCont }) => {

    return (
        <>
            <Column xs="12" md="6" padding="0.5em 0 1em">
                <Row fluid >
                    <Checkbox
                        value={selectedValue && selectedValue[json.key]}
                        onChange={flag => {
                            let tempJson = selectedValue || {};
                            tempJson[json.key] = flag
                            getValue({
                                ...tempJson,
                            })
                        }}
                        checkcolor="primary"
                        label="Inserisci nella colonna di destra del footer"
                        fontSize="f6"
                    />
                </Row>
            </Column>
        </>
    );
};

DatiContenutoSection.displayName = 'DatiContenutoSection';

export default DatiContenutoSection;
