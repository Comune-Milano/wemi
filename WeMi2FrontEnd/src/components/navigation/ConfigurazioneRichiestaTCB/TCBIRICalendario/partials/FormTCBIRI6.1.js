/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { TCBSecondStepper } from 'redux-modules/actions/authActions';
import { Riposo, SpaziPrevisti, Stipendio, TipologiaOrario } from './formpartials/form6-1partials';
import { LabelSezione } from './formpartials/commonpartials';
import { servizioSelezionato } from '../utils';

const FormTCBIRI6_1 = ({tipologiaOrario }) => {
    return (
        <> 
                <TipologiaOrario />
                {tipologiaOrario ?
                tipologiaOrario.id === 1 ? 
                <LabelSezione value={`Informazioni  per ${servizioSelezionato()} convivente`}/>
                : tipologiaOrario.id === 2 ? <LabelSezione value={`Informazioni  per ${servizioSelezionato()} con convivenza ridotta`} /> 
                : tipologiaOrario.id === 3 ? <LabelSezione value={`Informazioni  per ${servizioSelezionato()} non convivente`} />
                : tipologiaOrario.id === 5 ? <LabelSezione value={`Informazioni  per ${servizioSelezionato()}  weekend`} />
                : tipologiaOrario.id === 4 || tipologiaOrario.id === 6
                ? <LabelSezione value={`Informazioni  per ${servizioSelezionato()} assistenza notturna`}/>
                : null
                :null}
                <Riposo />
                {/* <Sistemazione /> */}
                <SpaziPrevisti />
                <Stipendio />
 </>
    );
}


FormTCBIRI6_1.displayName = ' FormTCBIRI6_1';

const mapDispatchToProps = ({
    TCBSecondStepper,
});

const mapStoreToProps = store => ({
    Stepper: store.stepperTCB,
    tipologiaOrario: store.requestTCB.configDisponibilita.tipologiaOrario,
    configDisponibilita: store.requestTCB.configDisponibilita
})
export default connect(mapStoreToProps, mapDispatchToProps)(FormTCBIRI6_1);