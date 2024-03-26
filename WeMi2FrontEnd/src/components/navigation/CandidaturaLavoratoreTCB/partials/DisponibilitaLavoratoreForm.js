import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { GroupFieldTitle, FadeInWrapper, StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import Checkbox from 'components/ui2/Checkbox';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { ID_SERVIZIO_COLF, getNomeServizioTCB } from 'types/tcbConstants';
import { useDepChange } from 'hooks/useDepChange';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import TextAccordion from 'components/ui2/TextAccordion';
import { convertObjectToBin } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import {
  TipologiaOrarioForm,
  AltreDisponibilita,
  SedeLavoro,
  AltreDisponibilitaSedeLavoro,
  TipologiaContratto,
} from './disponibilitaFormPartials';
import { inserisciModificaDisponibilitaCandidaturaLavoratore as inserisciModificaDisponibilitaCandidaturaLavoratoreQ } from './graphql/inserisciModificaDisponibilitaCandidaturaLavoratore';
import ButtonsNavigation from './ButtonsNavigation';


export const DisponibilitaLavoratoreForm = ({
  idServizioRiferimento,
  idLavoratore,
  idOperatore,
  changeStep,
  stepCandidate,
  moveToNextStep,
  moveToPrevStep,
  saveCurrentStep,
}) => {
  const {
    dataset,
    setFormField,
    validateForm,
    isFormDirty,
  } = useFormContext();

  const performRequestInserisciModificaDisponibilitaCandidaturaLavoratore = useStatelessGraphQLRequest(
    inserisciModificaDisponibilitaCandidaturaLavoratoreQ
  );

  const [, setCheckboxTipologia] = useState(null);

  useEffect(() => {
    if (idServizioRiferimento === ID_SERVIZIO_COLF) {
      setFormField(
        'checkboxesTipologieOrario',
        dataset.checkboxesTipologieOrario.filter(el => (el.id !== 4 && el.id !== 5 && el.id !== 6))
      );
    }

    setCheckboxTipologia(getCheckboxesTipologia(dataset.checkboxesTipologieOrario));
  }, []);

  const getCheckboxesTipologia = (checkboxesTipologieOrario) => {
    const convivenza = checkboxesTipologieOrario.find(el => el.id === 1);
    const convivenzaRidotta = checkboxesTipologieOrario.find(el => el.id === 2);
    const fullTimePartTimeAdOre = checkboxesTipologieOrario.find(el => el.id === 3);
    const presenzaNotturna = checkboxesTipologieOrario.find(el => el.id === 4);
    const weekend = checkboxesTipologieOrario.find(el => el.id === 5);
    const assistenzaNotturna = checkboxesTipologieOrario.find(el => el.id === 6);

    return {
      convivenza: convivenza ? convivenza.checked : false,
      convivenzaRidotta: convivenzaRidotta ? convivenzaRidotta.checked : false,
      fullTimePartTimeAdOre: fullTimePartTimeAdOre ? fullTimePartTimeAdOre.checked : false,
      presenzaNotturna: presenzaNotturna ? presenzaNotturna.checked : false,
      weekend: weekend ? weekend.checked : false,
      assistenzaNotturna: assistenzaNotturna ? assistenzaNotturna.checked : false,
    };
  };

  const handleChangeMultiSelect = (event, data, formFieldName) => {
    const newData = data.map(item => {
      const isAffectedItem = item.id === event.id;
      return {
        ...item,
        checked: isAffectedItem ? !item.checked : item.checked,
      };
    });

    setFormField(formFieldName, newData);
  };

  const handleChangeSelect = (event, data, formFieldName) => {
    let formData;
    const oldSelectedValue = data.find(el => el.checked);
    if (oldSelectedValue) {
      if (oldSelectedValue.id === event.id) {
        event.checked = false;
      } else {
        event.checked = true;
        oldSelectedValue.checked = false;
      }
      const dataFiltered = data.filter(el => el.id !== event.id && el.id !== oldSelectedValue.id);
      formData = [...dataFiltered, event, oldSelectedValue].sort((itemA, itemB) => itemA.id - itemB.id);
    } else {
      event.checked = true;
      const dataFiltered = data.filter(el => el.id !== event.id);
      formData = [...dataFiltered, event].sort((itemA, itemB) => itemA.id - itemB.id);
    }
    setFormField(formFieldName, formData);
  };


  const getCallbackSalvataggio = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }
    return () => performRequestInserisciModificaDisponibilitaCandidaturaLavoratore({
      input: {
        idLavoratore,
        idServizioRiferimento,
        checkboxesTipologieOrario: dataset.checkboxesTipologieOrario,
        convivenzaMezzaGiornataDiRiposo: dataset.convivenzaMezzaGiornataDiRiposo,
        convivenzaStipendioProposto: dataset.convivenzaStipendioProposto,
        convivenzaSpaziAccettabili: dataset.convivenzaSpaziAccettabili,
        convivenzaTestoSpazioAccettabileAltro: dataset.convivenzaTestoSpazioAccettabileAltro,
        convivenzaRidottaStipendioProposto: dataset.convivenzaRidottaStipendioProposto,
        convivenzaRidottaSpaziAccettabili: dataset.convivenzaRidottaSpaziAccettabili,
        convivenzaRidottaTestoSpazioAccettabileAltro: dataset.convivenzaRidottaTestoSpazioAccettabileAltro,
        convivenzaRidottaCalendario: convertObjectToBin(dataset.convivenzaRidottaCalendario),
        fullTimePartTimeAdOreStipendioProposto: dataset.fullTimePartTimeAdOreStipendioProposto,
        fullTimePartTimeAdOreCalendario: convertObjectToBin(dataset.fullTimePartTimeAdOreCalendario),
        assistenzaNotturnaStipendioProposto: dataset.assistenzaNotturnaStipendioProposto,
        assistenzaNotturnaCalendario: convertObjectToBin(dataset.assistenzaNotturnaCalendario),
        weekendStipendioProposto: dataset.weekendStipendioProposto,
        weekendCalendario: convertObjectToBin(dataset.weekendCalendario),
        presenzaNotturnaStipendioProposto: dataset.presenzaNotturnaStipendioProposto,
        presenzaNotturnaCalendario: convertObjectToBin(dataset.presenzaNotturnaCalendario),
        nrOreSettminali: dataset.nrOreSettminali,
        tipologiaContratto: dataset.tipologiaContratto,
        breviTrasferte: dataset.breviTrasferte,
        lungheTrasferte: dataset.lungheTrasferte,
        vacanzaConLaFamiglia: dataset.vacanzaConLaFamiglia,
        vacanzaConAssistito: dataset.vacanzaConAssistito,
        straordinari: dataset.straordinari,
        lavorareACasaConAnimali: dataset.lavorareACasaConAnimali,
        prendereCuraAnimali: dataset.prendereCuraAnimali,
        lavorareInCasaDiFamiglieNumerose: dataset.lavorareInCasaDiFamiglieNumerose,
        grandezzaDellaCasa: dataset.grandezzaDellaCasa,
        accudirePersoneConPatologie: dataset.accudirePersoneConPatologie,
        sedeDiLavoro: creaArrSedeDiLavoro(),
        lavoroFuoriMilano: dataset.lavoroFuoriMilano,
        sostituzioniBrevi: dataset.sostituzioniBrevi,
        sostituzioniLunghe: dataset.sostituzioniLunghe,
        preferenzeGenereAssistito: dataset.preferenzeGenereAssistito,
        svegliarsiDiNotte: dataset.svegliarsiDiNotte,
        nrMaxBambiniDaAccudire: parseInt(dataset.nrMaxBambiniDaAccudire, 10),
        fasceEtaBambini: dataset.fasceEtaBambini,
        occuparsiDiAnziani: dataset.occuparsiDiAnziani,
        occuparsiDiCoppieDiAnziani: dataset.occuparsiDiCoppieDiAnziani,
      },
    });
  };
  /**
   * A callback to run when a step candidate mutation is detected.
   * @param {*} step
   */
  const onStepCandidateChange = step => {
    changeStep(step, validateForm, getCallbackSalvataggio());
  };

  // React to any change to the step candidate.
  useDepChange(onStepCandidateChange, stepCandidate);

  useBusSubscribe(
    'SALVA_ADMIN',
    getCallbackSalvataggio(),
    isNullOrUndefined(idOperatore)
  );

  const creaArrSedeDiLavoro = () => {
    const arr = dataset.sedeDiLavoro.slice();
    const selezionatoTuttiMunicipi = arr.some(ele => (
       (ele.id === 0 && ele.checked)
    ));
    if (selezionatoTuttiMunicipi) {
      arr.forEach(ele => {
        ele.checked = true;
      });
    }

    return arr;
  };


  return (
    <Row fluid justifycontent="space-between">
      <StepTitle
        title={`Disponibilità ${getNomeServizioTCB(idServizioRiferimento).toLowerCase()}`}
      />

      {dataset.checkboxesTipologieOrario && idServizioRiferimento !== ID_SERVIZIO_COLF ? (
        <Row fluid>
          <GroupFieldTitle
            marginTop="0"
            title="PER QUALE TIPOLOGIA DI ORARIO VUOI DARE LA TUA DISPONIBILITÀ?"
          />
          <Row fluid>
            <Row>
              {dataset.checkboxesTipologieOrario.map((tipoOrario) => (
                <Column padding="0" lg="5" md="6" sm="5" key={tipoOrario.id.toString()}>
                  <Checkbox
                    style={{ flexBasis: '45%' }}
                    fontSize="f7"
                    width="fit-content"
                    checkcolor="primary"
                    label={tipoOrario.value}
                    value={tipoOrario.checked}
                    onChange={isChecked => {
                      const dataCopy = dataset.checkboxesTipologieOrario.map(el => ({ ...el }));

                      const selectedCheckbox = dataCopy.find(el => el.id === tipoOrario.id);
                      selectedCheckbox.checked = isChecked;

                      setFormField('checkboxesTipologieOrario', dataCopy);

                      setCheckboxTipologia(getCheckboxesTipologia(dataCopy));
                    }}
                  />
                </Column>
                ))}
            </Row>
          </Row>
        </Row>
      ) : (
        <Row fluid>
          <GroupFieldTitle
            marginTop="0"
            title="PER QUALE TIPOLOGIA DI ORARIO VUOI DARE LA TUA DISPONIBILITÀ?"
          />
          <Row fluid>
            {dataset.checkboxesTipologieOrario.map((tipoOrario) => (
              <Column padding="0" lg="5" md="6" sm="5" key={tipoOrario.id.toString()}>
                <Checkbox
                  fontSize="f7"
                  width="fit-content"
                  checkcolor="primary"
                  label={tipoOrario.value}
                  value={tipoOrario.checked}
                  onChange={isChecked => {
                    const dataCopy = dataset.checkboxesTipologieOrario.map(el => ({ ...el }));

                    const selectedCheckbox = dataCopy.find(el => el.id === tipoOrario.id);
                    selectedCheckbox.checked = isChecked;

                    setFormField('checkboxesTipologieOrario', dataCopy);

                    setCheckboxTipologia(getCheckboxesTipologia(dataCopy));
                  }}
                />
              </Column>
                ))}
          </Row>
        </Row>
    )}

      {/* GENERO FORM DINAMICI CHE SI MODIFICANO IN BASE ALLA TIPOLOGIA DI ORARIO */}
      <Row fluid margin="2em 0">
        {
          dataset.checkboxesTipologieOrario.map(tipoOrario => {
            if (tipoOrario.checked) {
              return (
                <FadeInWrapper key={tipoOrario.id.toString()} margin="1em 0">
                  <TextAccordion
                    label={tipoOrario.value !== 'Weekend' ? `Inserisci le informazioni relative al contratto di ${tipoOrario.value}` :
                    `Inserisci le informazioni relative al contratto ${tipoOrario.value}`}
                    size="f7"
                    color="primary"
                  >
                    <TipologiaOrarioForm
                      tipoOrario={tipoOrario}
                      idServizioRiferimento={idServizioRiferimento}
                      handleChangeMultiSelect={handleChangeMultiSelect}
                      handleChangeSelect={handleChangeSelect}
                    />
                  </TextAccordion>
                </FadeInWrapper>
              );
            }
          })
        }
      </Row>
      <TipologiaContratto
        handleChangeMultiSelect={handleChangeMultiSelect}
      />
      <AltreDisponibilita
        idServizioRiferimento={idServizioRiferimento}
        handleChangeMultiSelect={handleChangeMultiSelect}
      />
      <SedeLavoro
        handleChangeMultiSelect={handleChangeMultiSelect}
        NumeroMunicipi={dataset.sedeDiLavoro.length}
      />
      <AltreDisponibilitaSedeLavoro idServizioRiferimento={idServizioRiferimento} />
      <ButtonsNavigation
        moveNextValid
        onMoveBack={() => moveToPrevStep(validateForm, getCallbackSalvataggio())}
        onMoveNext={moveToNextStep ? () => moveToNextStep(validateForm, getCallbackSalvataggio()) : undefined}
        onSave={saveCurrentStep ? () => saveCurrentStep(getCallbackSalvataggio()) : undefined}
      />
    </Row>
  );
};

DisponibilitaLavoratoreForm.displayName = 'DisponibilitaLavoratoreForm';
export default DisponibilitaLavoratoreForm;
