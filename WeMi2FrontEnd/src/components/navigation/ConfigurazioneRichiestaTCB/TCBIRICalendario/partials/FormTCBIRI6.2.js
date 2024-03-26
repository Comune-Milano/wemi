/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { TCBSecondStepper } from 'redux-modules/actions/authActions';
import { TipologiaContratto, DurataContratto, NoteContrattuali } from './formpartials/form6-2partials';
import { LabelSezione } from './formpartials/commonpartials';

const FormTCBIRI6_2 = () => {

    return (
       
          <>
            <LabelSezione value="Tipologia di contratto" />
            <TipologiaContratto/>
            <DurataContratto />
            <NoteContrattuali />
          </>
    );
}


FormTCBIRI6_2.displayName = ' FormTCBIRI6_2';

const mapDispatchToProps = ({
    TCBSecondStepper
});

const mapStoreToProps = store => ({
    Stepper: store.stepperTCB
})
export default connect(mapStoreToProps, mapDispatchToProps)(FormTCBIRI6_2);