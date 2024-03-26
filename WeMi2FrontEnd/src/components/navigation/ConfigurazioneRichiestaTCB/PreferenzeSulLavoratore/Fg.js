/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FadeInWrapper from '../partials/FadeInWrapper';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import FieldTitle from '../partials/FieldTitle';
import { getTCBServiceName } from '../utils';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';

const Fg = ({
    dataset,
    setFormField,
    estraiDatiInizializzazione,
    servizioTCB,
    locale

}) => {
    useEffect(() => {
        estraiDatiInizializzazione.forEach(element => {
            if (element.cd_attributo === 42) {
                setFormField('auto', true)
            } else {
                if (element.cd_attributo === 43) {
                    setFormField('patente', true)
                }
            }
        });
    }, [])
    const flag = [
        {
            tx: `Il/la ${getTCBServiceName(servizioTCB, locale)} deve avere la patente`,
            key: 'patente'

        },
        {
            tx: `Il/la ${getTCBServiceName(servizioTCB, locale)} deve essere automunito/a`,
            key: 'auto'
        }
    ]

    return (
        <>
            <Row fluid margin='2em 0 0 0'>
                {flag.map((ele) => {
                    return (
                        <Column padding='0' key={ele.key}>
                            <Checkbox
                                value={dataset[ele.key]}
                                onChange={(value) => { setFormField(ele.key, value) }}
                                label={ele.tx}
                                checkcolor={'primary'}
                                width="auto"
                            />
                        </Column>
                    )
                })}
            </Row>

        </>
    );
};

Fg.displayName = 'Fg';

const mapDispatchToProps = ({

});

const mapStoreToProps = store => ({

});

export default connect(mapStoreToProps, mapDispatchToProps)(Fg);
