/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { TCBSecondStepper } from 'redux-modules/actions/authActions';
import { LabelSezione } from './formpartials/commonpartials';
import {
    TrasferteBrevi,
    TrasferteLunghe,
    DisponibilitaVacanzaBambino,
    DisponibilitaVacanzaFamiglia,
    Straordinari,
} from './formpartials/form6-3partials';
const FormTCBIRI6_3 = () => {

    return (
        <>
          <LabelSezione value="Richiedi altre disponibilità" />  
          <TrasferteBrevi />
          <TrasferteLunghe />
          <DisponibilitaVacanzaFamiglia />
          <DisponibilitaVacanzaBambino />
          <Straordinari />
        </>
    );
}


FormTCBIRI6_3.displayName = ' FormTCBIRI6_3';

const mapDispatchToProps = ({
  TCBSecondStepper,
});

const mapStoreToProps = store => ({
  Stepper: store.stepperTCB,
});
export default connect(mapStoreToProps, mapDispatchToProps)(FormTCBIRI6_3);