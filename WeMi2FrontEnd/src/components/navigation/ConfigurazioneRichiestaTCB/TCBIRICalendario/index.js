/** @format */

import React, { useEffect, useRef } from 'react';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui/FaIcon';
import { Row, Column } from 'components/ui/Grid';
import FadeInWrapper from '../partials/FadeInWrapper';
import { FormTCBIRI6_1, FormTCBIRI6_1_1, FormTCBIRI6_2, FormTCBIRI6_3 } from './partials';
import { attributi, servizioSelezionato, arrayConfigurazione, cercaArray, cercaValore, cercaValoreStipendio, cercaCalendario, cercaFlagTCBConNota } from './utils';
import { connect } from 'react-redux';
import { graphqlRequest, TCBRequired } from 'redux-modules/actions/authActions';
import {
  estraiInformazioniDisponibilita as estraiInformazioniDisponibilitaQ,
  EstraiFasciaOrariaSettimanale as EstraiFasciaOrariaSettimanaleQ,
  InserisciDatiDisponibilita as InserisciDatiDisponibilitaQ,
  EstraiDatiDisponibilita as EstraiDatiDisponibilitaQ
} from './TCBIRICalendarioGraphQL';
import { TCBDispConfig, TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import { checkValidity } from './utils/validity';
import { isNullOrUndefined } from 'util';
const navigationTabs = [
  {
    tab: 1,
    required: true,
    active: false
  },
  {
    tab: 2,
    required: true,
    active: false
  },
  {
    tab: 3,
    required: true,
    active: false
  },
  {
    tab: 4,
    required: true,
    active: false
  }
];


const TCBIRICalendario = ({
  nextStep,
  TCBRequired,
  required,
  idRequest,
  disponibilita,
  datiMenuNavigazione,
  graphqlRequest,
  locale,
  FasciaOrariaSettimanale,
  config001,
  step,
  setStep,
  InsideStepper,
  TCBDispConfig,
  configDisponibilita,
}) => {
  const isFirstStepUpdate = useRef(true);

  const preCaricaDati = (disp) => {
    const jsonCaricamentoDati = configDisponibilita;
    const disponibilita = !isNullOrUndefined(disp) ? disp.disponibilita : undefined;
    const risultatiSpazio = cercaArray(disponibilita, attributi.LS_SPAZI_CONVIVENTE.cd_attributo);
    const valoreDatabaseStipendio = cercaValoreStipendio(disponibilita, configDisponibilita.tipologiaOrario);
    const calendario = cercaCalendario(disponibilita, configDisponibilita.tipologiaOrario);
    const risultatiRiposo = cercaArray(disponibilita, attributi.LS_MEZZA_GIORNATA_CONVIVENTE.cd_attributo)
    const valoreDBTipologiaContratto = cercaValore(disponibilita, attributi.CD_TIPOLOGIA_CONTRATTO.cd_attributo);
    const valoreNrRichieste = cercaValore(disponibilita, attributi.NR_ORE_RICHIESTE.cd_attributo);
    const risultatoTrasferteBrevi = cercaFlagTCBConNota(disponibilita,attributi.FG_DISP_TRASFERTE_BREVI.cd_attributo);
    const risultatoTrasferteLunghe = cercaFlagTCBConNota(disponibilita, attributi.FG_DISP_TRASFERTE_LUNGHE.cd_attributo);
    const risultatoFamiglia = cercaFlagTCBConNota(disponibilita, attributi.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA.cd_attributo);
    const risultatoAssistito = cercaFlagTCBConNota(disponibilita, attributi.FG_DISPONIBILITA_VACANZA_SOLO_CON_ASSISTITO.cd_attributo);
    const risultatoStraordinari = cercaFlagTCBConNota(disponibilita, attributi.FG_DISPONIBILITA_STRAORDINARI.cd_attributo);

    if (risultatoTrasferteBrevi) {
      jsonCaricamentoDati.trasferteBrevi = risultatoTrasferteBrevi.value === '1';
      jsonCaricamentoDati.notaTrasferteBrevi = risultatoTrasferteBrevi.nota;
    }

    if (risultatoTrasferteLunghe) {
      jsonCaricamentoDati.trasferteLunghe = risultatoTrasferteLunghe.value === '1';
      jsonCaricamentoDati.notaTrasferteLunghe = risultatoTrasferteLunghe.nota;
    }

    if (risultatoFamiglia) {
      jsonCaricamentoDati.disponibilitaVacanzaFamiglia = risultatoFamiglia.value === '1';
      jsonCaricamentoDati.notaDisponibilitaVacanzaFamiglia = risultatoFamiglia.nota;
    }

    if (risultatoAssistito) {
      jsonCaricamentoDati.disponibilitaVacanzaBambino = risultatoAssistito.value === '1';
      jsonCaricamentoDati.notaDisponibilitaVacanzaBambino = risultatoAssistito.nota;
    }

    if (risultatoStraordinari) {
      jsonCaricamentoDati.straordinari = risultatoStraordinari.value === '1';
      jsonCaricamentoDati.notaStraordinari = risultatoStraordinari.nota;
    }

    if (calendario) {
      // jsonCaricamentoDati.calendario = calendario;
      jsonCaricamentoDati.calendario1 = { calendario };
    }
    if (valoreNrRichieste !== null) {
      jsonCaricamentoDati.nrOreRichieste = valoreNrRichieste;
    } else {
      jsonCaricamentoDati.nrOreRichieste = 0;
    }
    if (valoreDBTipologiaContratto !== null) {
      jsonCaricamentoDati.tipoContratto = valoreDBTipologiaContratto;
    }
    if (valoreDatabaseStipendio !== null) {
      jsonCaricamentoDati.stipendio = valoreDatabaseStipendio;
    }
    if (risultatiSpazio !== null && risultatiSpazio.length > 0) {
      jsonCaricamentoDati.spaziPrevisti = risultatiSpazio;
    }
    if (risultatiRiposo !== null && risultatiRiposo.length > 0) {
      jsonCaricamentoDati.giorniSettimana = risultatiRiposo;
    }

    TCBDispConfig({
      ...configDisponibilita,
      stepper: { id: 1 },
      tipologiaOrario: {
        id: config001.orario.id,
        value: config001.orario.value.it ? config001.orario.value.it : config001.orario.value,
      },
      ...jsonCaricamentoDati,
    });
  };

  const InserimentoDati = async (clickedTabs) => {
    await graphqlRequest(InserisciDatiDisponibilitaQ({
      idRichiesta: idRequest,
      arrayConfig: arrayConfigurazione(configDisponibilita, FasciaOrariaSettimanale, locale)
    }));
    await graphqlRequest(EstraiDatiDisponibilitaQ({
      idRichiesta: idRequest,
      arrayConfig: arrayConfigurazione(configDisponibilita, FasciaOrariaSettimanale, locale).map(elemento => elemento.cd_attributo)
    }));
    if (clickedTabs) {
      setStep(clickedTabs);
      TCBDispConfig({
        ...configDisponibilita,
        stepper: { id: 1 },
      });
    }
  };

  const requiredChecker = () => {
    const risultato = checkValidity(configDisponibilita);

    if (risultato.form11 === undefined) {
      if (risultato.form1 && risultato.form2) {
        TCBRequired({ ...required, required006: false });
      } else {
        TCBRequired({ ...required, required006: true });
      }
    } else if (risultato.form11 === false) {
      TCBRequired({ ...required, required006: true });
    } else {
      if (risultato.form1 && risultato.form2) {
        TCBRequired({ ...required, required006: false });
      } else {
        TCBRequired({ ...required, required006: true });
      }
    }
    if (risultato.form1 && risultato.form2 && risultato.form11 === false) {
      TCBRequired({ ...required, required006: true });
    }
  };

  useEffect(() => {
    graphqlRequest(estraiInformazioniDisponibilitaQ());
    graphqlRequest(EstraiDatiDisponibilitaQ({
      idRichiesta: idRequest,
      arrayConfig: arrayConfigurazione(configDisponibilita, FasciaOrariaSettimanale, locale).map(elemento => elemento.cd_attributo)
    }));
  }, [graphqlRequest]);

  // Carica i dati iniziali dal BackEnd
  useEffect(() => {
    preCaricaDati(disponibilita);
  }, [!isNullOrUndefined(disponibilita)]);

  // Verifica validità del form
  useEffect(() => {
    requiredChecker();
  }, [datiMenuNavigazione, configDisponibilita]);

  // Per verificare il cambiamento di tab
  useEffect(() => {
    // Skips the first change to the step.
    if (isFirstStepUpdate.current) {
      isFirstStepUpdate.current = false;
      return;
    }
    // Prevent to proceed to the next step if the form is not valid.
    if (nextStep.clicked !== nextStep.current &&
        required &&
        !required.required006
    ) {
      InserimentoDati(nextStep.clicked);
    }
    setStep(nextStep.clicked);
    TCBDispConfig({
      ...configDisponibilita,
      stepper: { id: 1 },
    });
  }, [nextStep]);

  const tipologiaServizio = servizioSelezionato();
  const validita = checkValidity(configDisponibilita);

  return (
    <FadeInWrapper fluid>
      <Column xs="12" flex direction="column" padding="1em 0">
        <Row fluid>
          <Text value="Disponibilità" size="f7" color="blue" weight="bold" tag="p" />
        </Row>

        <Row padding="0em 0em 1em 0em">
          <Text value={`In questa sezione ti chiediamo di indicare la disponibilità oraria da richiedere alla ${tipologiaServizio}`} size="f7" color="darkGrey" />
        </Row>

        {
          InsideStepper.id === 1 &&
          <FormTCBIRI6_1 tipologiaServizio={tipologiaServizio} />
        }
        {
          InsideStepper.id === 2 && configDisponibilita.tipologiaOrario
          && (configDisponibilita.tipologiaOrario !== 1
            || configDisponibilita.tipologiaOrario !== 5
            || configDisponibilita.tipologiaOrario !== 4) &&
          <FormTCBIRI6_1_1 />
        }
        {
          InsideStepper.id === 3 &&
          <FormTCBIRI6_2 />
        }
        {
          InsideStepper.id === 4 &&
          <FormTCBIRI6_3 />
        }
        <Row fluid justifycontent="center">
          <Column xs="4" padding="1em 0.5em 1em 0">
            <Button
              value="Indietro"
              onClick={() => {
                if (InsideStepper.id > 1 &&
                  configDisponibilita.tipologiaOrario &&
                  InsideStepper.id === 3 && (
                    configDisponibilita.tipologiaOrario.id === 1 ||
                    configDisponibilita.tipologiaOrario.id === 5
                )) {
                  TCBDispConfig({ ...configDisponibilita, stepper: { id: InsideStepper.id - 2 } })
                }
                else if (InsideStepper.id > 1 &&
                  configDisponibilita.tipologiaOrario &&
                  InsideStepper.id !== 3 && (
                    configDisponibilita.tipologiaOrario.id !== 1 ||

                    configDisponibilita.tipologiaOrario.id !== 5
                  )) {
                  TCBDispConfig({ ...configDisponibilita, stepper: { id: InsideStepper.id - 1 } })
                }
                else if (InsideStepper.id > 1

                  && configDisponibilita.tipologiaOrario &&
                  (
                    (configDisponibilita.tipologiaOrario.id >= 2 &&
                      configDisponibilita.tipologiaOrario.id <= 4)
                    ||
                    configDisponibilita.tipologiaOrario.id === 6
                  )) {
                  TCBDispConfig({ ...configDisponibilita, stepper: { id: InsideStepper.id - 1 } });
                }
                else {
                  setStep(step - 1);
                }
              }}
              child="1"
            >
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
            {configDisponibilita.tipologiaOrario &&
              (configDisponibilita.tipologiaOrario.id === 1 || configDisponibilita.tipologiaOrario.id === 5) &&
              (InsideStepper.id === 1 && validita.form1
                || InsideStepper.id === 3 && validita.form2
                || InsideStepper.id === 4 && validita.form3)
              || (configDisponibilita.tipologiaOrario &&
                (configDisponibilita.tipologiaOrario.id !== 1 || configDisponibilita.tipologiaOrario.id !== 5) &&
                (InsideStepper.id === 1 && validita.form1 ||
                  InsideStepper.id === 2 && validita.form11
                  || InsideStepper.id === 3 && validita.form2
                  || InsideStepper.id === 4 && validita.form3))
              ?
              <Button
                value="Continua"
                onClick={
                  () => {
                    if (InsideStepper.id < navigationTabs.length &&
                      configDisponibilita.tipologiaOrario &&
                      InsideStepper.id === 1 && (
                        configDisponibilita.tipologiaOrario.id === 1 ||

                        configDisponibilita.tipologiaOrario.id === 5
                      )) {
                      TCBDispConfig({ ...configDisponibilita, stepper: { id: InsideStepper.id + 2 } })
                    }
                    else if (InsideStepper.id < navigationTabs.length &&
                      configDisponibilita.tipologiaOrario &&
                      InsideStepper.id !== 1 && (
                        configDisponibilita.tipologiaOrario.id === 1 ||

                        configDisponibilita.tipologiaOrario.id === 5
                      )) {
                      TCBDispConfig({ ...configDisponibilita, stepper: { id: InsideStepper.id + 1 } })
                    }
                    else if (InsideStepper.id < navigationTabs.length

                      && configDisponibilita.tipologiaOrario &&
                      (
                        (configDisponibilita.tipologiaOrario.id >= 2 &&
                          configDisponibilita.tipologiaOrario.id <= 4)
                        ||
                        configDisponibilita.tipologiaOrario.id === 6
                      )) {
                      if (configDisponibilita.nrOreRichieste) {
                        graphqlRequest(EstraiFasciaOrariaSettimanaleQ(configDisponibilita.nrOreRichieste));
                      }
                      TCBDispConfig({ ...configDisponibilita, stepper: { id: InsideStepper.id + 1 } })
                    }
                    else {
                      InserimentoDati();
                      setStep(step + 1);

                    }
                  }
                }

                child="2" >
                <FaIcon
                  noShadow
                  absolute
                  right="1em"
                  radius="50%"
                  icon="\f105"
                  color="white"
                  fontSize="f7"
                  height="1em"
                  width="1em"
                />
              </Button>

              : <Button value="Continua"
                type="disabled"
                disabled
                child="2" >
                <FaIcon
                  noShadow
                  absolute
                  right="1em"
                  radius="50%"
                  icon="\f105"
                  color="white"
                  fontSize="f7"
                  height="1em"
                  width="1em"
                />
              </Button>}

          </Column>
        </Row>

      </Column>
    </FadeInWrapper >
  )
};

TCBIRICalendario.displayName = 'TCBIRI003';

const mapDispatchToProps = ({
  graphqlRequest,
  TCBDispConfig,
  TCBMenuNavigazione,
  TCBRequired,
});

const mapStoreToProps = store => ({
  required: store.requestTCB.requiredTabs,
  InsideStepper: store.requestTCB.configDisponibilita.stepper,
  configDisponibilita: store.requestTCB.configDisponibilita,
  FasciaOrariaSettimanale: store.graphql.FasciaOrariaSettimanale && store.graphql.FasciaOrariaSettimanale.EstraiFasciaOrariaSettimanale,
  config001: store.requestTCB.config001,
  locale: store.locale,
  disponibilita: store.graphql.EstraiDatiDisponibilita && store.graphql.EstraiDatiDisponibilita.EstraiDatiConfigurazioneRichiestaDisponibilita,
  datiMenuNavigazione: store.requestTCB.menuNavigazione,
});

export default connect(mapStoreToProps, mapDispatchToProps)(TCBIRICalendario);
