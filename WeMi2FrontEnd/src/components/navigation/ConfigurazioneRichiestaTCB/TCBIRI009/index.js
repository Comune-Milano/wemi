/** @format */

import React, { useState, useEffect, useRef } from 'react';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui/FaIcon';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import { isNullOrUndefined } from 'util';
import { TCBSecondStepper, graphqlRequest, TCBRequired, TCBConfig009 } from 'redux-modules/actions/authActions';

import { FormTCBIRI009 } from './partials';
import FadeInWrapper from '../partials/FadeInWrapper';
import {
  estraiMansioniAnimali as estraiMansioniAnimaliQ,
  estraiDatiConfigurazioneRichiesta009 as estraiDatiConfigurazioneRichiesta009Q,
} from './estraiDominiTcb';
import { inserisciModificaDatiRichiesta009 as inserisciModificaDatiRichiesta009M } from './InserisciDatiRichiesta009';

const TCBIRI009 = ({
  step,
  setStep,
  // stepsNumber,
  graphqlRequest,
  locale,
  loaded,
  required,
  TCBRequired,
  TCBConfig009,
  config009,
  datiRichiesta009,
  idRequest,
  // setUnsaved,
  // unsaved,
  // tabChange,
  // setTabChange,
  mansioniAnimali,
  nextStep,
}) => {
  const [mansioniValue, setMansioniValue] = useState(true);
  const [animaliFlag, setAnimaliFlag] = useState({ id: 0, value: 'No' });
  const [altriAnimaliFlag, setAltriAnimaliFlag] = useState({ id: 0, value: 'No' });
  const [numeroCaniValue, setNumeroCaniValue] = useState(0);
  const [numeroGattiValue, setNumeroGattiValue] = useState(0);
  const [dettaglioAnimaliValue, setDettaglioAnimaliValue] = useState('');


  const [firstTime, setFirstTime] = useState(true);
  const isFirstStepUpdate = useRef(true);

  const saveData = async (stepChange) => {
    if (idRequest !== 0) {
      graphqlRequest(inserisciModificaDatiRichiesta009M({
        idRichiestaTcb: idRequest,
        arrayConfig: createArrayConfig().filter(el => !isNullOrUndefined(el.cd_val_attributo)),
      }));
      graphqlRequest(estraiDatiConfigurazioneRichiesta009Q(idRequest));
    }
    TCBRequired({
      ...required,
      required009: false,
    });
    setStep.bind(this);
    setStep(stepChange);
  };

  useEffect(() => {
    if (isFirstStepUpdate.current) {
      isFirstStepUpdate.current = false;
      return;
    }
    if (!nextStep || !nextStep.clicked) {
      return;
    }
    saveData(nextStep.clicked);
  }, [nextStep]);

  useEffect(() => {
    // Gestisco il salvataggio in relazione alla navigazione
    // if (tabChange && tabChange.step === 5 && unsaved) {
    //   saveData(tabChange);
    // }

    // Estraggo valori selezionabili
    if (!mansioniAnimali && loaded === 2) graphqlRequest(estraiMansioniAnimaliQ());
    if ((!datiRichiesta009 && idRequest !== 0)) graphqlRequest(estraiDatiConfigurazioneRichiesta009Q(idRequest));

    // Setto valori iniziali
    if (firstTime && datiRichiesta009 && datiRichiesta009.idRichiestaTcb !== -1) {
      setMansioniValue(required && required.required009 && config009 && config009.mansioni ? config009.mansioni.map(mans => ({ id: mans.id, value: mans.value })) :
      datiRichiesta009.mansioni.map(mans => ({ id: mans.tyDominioTcb, value: mans.txTitoloMansione[locale] })));
      setAnimaliFlag(required && required.required009 && config009 && config009.animaliFlag ? config009.animaliFlag === '1' ? { id: 1, value: 'si' } : { id: 0, value: 'no' } :
      !isNullOrUndefined(datiRichiesta009.animaliFlag) ? datiRichiesta009.animaliFlag.flag === '1' ? { id: 1, value: 'Si' } : { id: 0, value: 'No' } : { id: 0, value: 'No' });
      setAltriAnimaliFlag(required && required.required009 && config009 && config009.altriAnimaliFlag ? config009.altriAnimaliFlag === '1' ? { id: 1, value: 'si' } : { id: 0, value: 'no' } :
      !isNullOrUndefined(datiRichiesta009.altriAnimaliFlag) ? datiRichiesta009.altriAnimaliFlag.flag === '1' ? { id: 1, value: 'Si' } : { id: 0, value: 'No' } : { id: 0, value: 'No' });
      setNumeroCaniValue(required && required.required009 && config009 && !isNullOrUndefined(config009.numeroCani) ? parseInt(config009.numeroCani) :
      !isNullOrUndefined(datiRichiesta009.numeroCani) && datiRichiesta009.numeroCani.nrVal ? parseInt(datiRichiesta009.numeroCani.nrVal) : 0);
      setNumeroGattiValue(required && required.required009 && config009 && !isNullOrUndefined(config009.numeroGatti) ? parseInt(config009.numeroGatti) :
      !isNullOrUndefined(datiRichiesta009.numeroGatti) && datiRichiesta009.numeroGatti.nrVal ? parseInt(datiRichiesta009.numeroGatti.nrVal) : 0);
      setDettaglioAnimaliValue(required && required.required009 && config009 && !isNullOrUndefined(config009.dettaglioAnimali) ? config009.dettaglioAnimali :
      !isNullOrUndefined(datiRichiesta009.dettaglioAnimali) && datiRichiesta009.dettaglioAnimali.txVal ? datiRichiesta009.dettaglioAnimali.txVal : 0);
      setFirstTime(false);
    }
    checkRequired();
  }, [
    // tabChange,
    // unsaved,
    animaliFlag,
    mansioniValue,
    numeroGattiValue,
    numeroCaniValue,
    altriAnimaliFlag,
    dettaglioAnimaliValue,
    !datiRichiesta009,
  ]);

  const checkRequired = () => {
    if (
      (animaliFlag.id === 1 && (numeroCaniValue <= 0 && numeroGattiValue <= 0)) ||
      (altriAnimaliFlag.id === 1 && !dettaglioAnimaliValue)) {
      TCBRequired({
        ...required,
        required009: true,
      });
    } else {
      TCBRequired({
        ...required,
        required009: false,
      });
    }
  };

  const getAnimaliFlag = (value) => {
    if (animaliFlag.id === 0) setAnimaliFlag(value);
    else setAnimaliFlag({ id: 0, value: 'no' });
    TCBConfig009({
      ...config009,
      animaliFlag: animaliFlag.id === 0 ? '1' : '0',
    });
      // setTabChange(false)
      // setUnsaved(5)
  };

  const getAltriAnimaliFlag = (value) => {
    if (altriAnimaliFlag.id === 0) setAltriAnimaliFlag(value);
    else setAltriAnimaliFlag({ id: 0, value: 'no' });
    TCBConfig009({
      ...config009,
      altriAnimaliFlag: altriAnimaliFlag.id === 0 ? '1' : '0',
    });
      // setTabChange(false)
      // setUnsaved(5)
  };

  const getNumeroCaniValue = (value) => {
    setNumeroCaniValue(parseInt(value, 10));
    TCBConfig009({
      ...config009,
      numeroCani: parseInt(value, 10),
    });
      // setTabChange(false)
      // setUnsaved(5)
  };

  const getNumeroGattiValue = (value) => {
    setNumeroGattiValue(parseInt(value, 10));
    TCBConfig009({
      ...config009,
      numeroGatti: parseInt(value, 10),
    });
      // setTabChange(false)
      // setUnsaved(5)
  };

  const getDettaglioAnimaliValue = (value) => {
    setDettaglioAnimaliValue(value);
    TCBConfig009({
      ...config009,
      dettaglioAnimali: value,
    });
      // setTabChange(false)
      // setUnsaved(5)
  };


  const getMansioniValue = (value) => {
    let found = -1;
    const array = mansioniValue.length > 0 ? mansioniValue : [];
    for (let i = 0; i < array.length; i += 1) if (array[i].id === value.id) found = i;
    if (found === -1) array.push(value);
    else array.splice(found, 1);
    setMansioniValue(array);
    TCBConfig009({
      ...config009,
      mansioni: array,
    });
    // setTabChange.bind(this);
      // setTabChange(false)
      // setUnsaved(5)
  };
  const getValues = {
    getAnimaliFlag,
    getAltriAnimaliFlag,
    getMansioniValue,
    getNumeroCaniValue,
    getNumeroGattiValue,
    getDettaglioAnimaliValue,
  };

  const stateValues = {
    animaliFlag,
    altriAnimaliFlag,
    mansioniValue,
    numeroCaniValue,
    numeroGattiValue,
    dettaglioAnimaliValue,
  };


  let createArrayConfig = () => {
    const arr = valConfig;
    if (mansioniValue.length > 0) {
      mansioniValue.forEach(el => {
        arr.push({
          cd_attributo: 59,
          cd_val_attributo: el.id,
        });
      });
    }

    return arr;
  };

  let valConfig = [
    {
      cd_attributo: 48,
      cd_val_attributo: 1,
      fg_val: datiRichiesta009 && datiRichiesta009.animaliFlag && config009 && config009.animaliFlag &&
        datiRichiesta009.animaliFlag.flag !== config009.animaliFlag ? config009.animaliFlag
          : config009 && config009.animaliFlag ? config009.animaliFlag : animaliFlag.id.toString(),
    },
    {
      cd_attributo: 45,
      cd_val_attributo: 1,
      fg_val: datiRichiesta009 && datiRichiesta009.altriAnimaliFlag && config009 && config009.altriAnimaliFlag &&
        datiRichiesta009.altriAnimaliFlag.flag !== config009.altriAnimaliFlag ? config009.altriAnimaliFlag
          : config009 && config009.altriAnimaliFlag ? config009.altriAnimaliFlag : altriAnimaliFlag.id.toString(),
    },
    {
      cd_attributo: 74,
      cd_val_attributo: 1,
      nr_val: datiRichiesta009 && datiRichiesta009.numeroCani && config009 && config009.numeroCani &&
        datiRichiesta009.numeroCani.nrVal !== config009.numeroCani ? parseInt(config009.numeroCani)
          : config009 && config009.numeroCani ? parseInt(config009.numeroCani) : undefined,
    },
    {
      cd_attributo: 75,
      cd_val_attributo: 1,
      nr_val: datiRichiesta009 && datiRichiesta009.numeroGatti && config009 && config009.numeroGatti &&
        datiRichiesta009.numeroGatti.nrVal !== config009.numeroGatti ? parseInt(config009.numeroGatti)
          : config009 && config009.numeroGatti ? parseInt(config009.numeroGatti) : undefined,
    },
    {
      cd_attributo: 83,
      cd_val_attributo: 1,
      tx_val: datiRichiesta009 && datiRichiesta009.dettaglioAnimali && config009 && config009.dettaglioAnimali &&
        datiRichiesta009.dettaglioAnimali.txVal !== config009.dettaglioAnimali ? config009.dettaglioAnimali
          : config009 && config009.dettaglioAnimali ? config009.dettaglioAnimali : undefined,
    },
  ];

  return (
    <FadeInWrapper fluid>
      <Column xs="12" flex direction="column" padding="1em 0">
        <Row fluid>
          <Text value="Cura degli animali" size="f7" color="blue" weight="bold" tag="p" />
          <Text value="In questa sezione ti chiediamo di dirci se sono presenti animali e se necessitano di accudimento." size="f7" />

        </Row>
        <FormTCBIRI009
          getValues={getValues}
          stateValues={stateValues}
          mansioniAnimali={mansioniAnimali && mansioniAnimali}
          locale={locale}
          loaded={loaded}
        />

        <Row fluid justifycontent="center">
          <Column xs="4" padding="1em 0.5em 1em 0">
            <Button value="Indietro" onClick={() => { setStep.bind(this); step > 1 ? setStep(step - 1) : setStep(1); }} child="1">
              <FaIcon
                noShadow
                absolute
                left="1em"
                radius="50%"
                icon="\f104"
                color="white"
                fontSize="f7"
                height="1em"
                width="1em"
              />
            </Button>
          </Column>
          <Column xs="4" padding="1em 0 1em 0.5em">
            <Button
              value="Continua"
              onClick={() => saveData(null)}
              child="2"
            >
              <FaIcon
                noShadow
                absolute
                right="1em"
                radius="50%"
                icon="\f109"
                color="white"
                fontSize="f7"
                height="1em"
                width="1em"
              />
            </Button>
          </Column>
        </Row>

      </Column>
    </FadeInWrapper>
  );
};

TCBIRI009.displayName = 'TCBIRI009';

const mapDispatchToProps = ({
  TCBSecondStepper,
  TCBRequired,
  TCBConfig009,
  graphqlRequest,
});

const mapStoreToProps = store => ({
  Stepper: store.stepperTCB,
  mansioniAnimali: store.graphql.EstraiMansioniAnimali,
  datiRichiesta009: store.graphql.EstraiDatiConfigurazioneRichiesta009,
  config009: store.requestTCB.config009,
  required: store.requestTCB.requiredTabs,
  loaded: store.graphql.loaded,
  locale: store.locale,

});
export default connect(mapStoreToProps, mapDispatchToProps)(TCBIRI009);
