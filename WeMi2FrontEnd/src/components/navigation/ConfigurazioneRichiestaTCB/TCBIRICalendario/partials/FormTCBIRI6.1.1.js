/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { TCBSecondStepper } from 'redux-modules/actions/authActions';
import { Disponibilita} from './formpartials/form6-1partials';

const FormTCBIRI6_1_1 = () => {
    
    return (
        <>
                <Disponibilita />
        </>
    );
}


FormTCBIRI6_1_1.displayName = ' FormTCBIRI6_1_1';

const mapDispatchToProps = ({
    TCBSecondStepper
});

const mapStoreToProps = store => ({
    Stepper: store.stepperTCB
})
export default connect(mapStoreToProps, mapDispatchToProps)(FormTCBIRI6_1_1);