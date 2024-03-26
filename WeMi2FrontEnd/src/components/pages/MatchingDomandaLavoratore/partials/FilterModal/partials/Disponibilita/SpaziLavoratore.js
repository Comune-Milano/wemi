import React from 'react';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import Text from 'components/ui/Text';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';
import { labelSpaziLavoratore, labelTipologiaOrario } from 'components/pages/MatchingDomandaLavoratore/labels';
import { TIPOLOGIA_ORARIO } from 'components/pages/MatchingDomandaLavoratore/constants/tipologiaorario';

const SpaziLavoratoreList = ({ filterList, selectedFilters, setPopupFilters }) => {
  const keyMezzaGiornataConvivente = attributo.LS_MEZZA_GIORNATA_CONVIVENTE.ty_dominio_tcb;

  const valuesMezzaGiornataConvivente = mapFilterList(filterList, keyMezzaGiornataConvivente);

  const keySpaziConvivente = attributo.LS_SPAZI_CONVIVENTE.ty_dominio_tcb;

  const valuesSpaziConvivente = mapFilterList(filterList, keySpaziConvivente);

  const keySpaziConvivenzaRidotta = attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.ty_dominio_tcb;

  const valuesSpaziConvivenzaRidotta = mapFilterList(filterList, keySpaziConvivenzaRidotta);

  const { [labelTipologiaOrario]: tipologiaOrario } = selectedFilters;

  if (!tipologiaOrario || !tipologiaOrario.id) {
    return null;
  }

  return (
    <>
      {/**
         * Mezza giornata convivente
         */}
      {tipologiaOrario.id === TIPOLOGIA_ORARIO.CONVIVENZA ? (
        <>
          <Row fluid margin="0.5em 0 0 0">
            <Text
              value="Mezza giornata di riposo"
              color="primary"
              size="f7"
              weight="bold"
            />
          </Row>
          <Row fluid margin="0.5em 0 0 0">
            {valuesMezzaGiornataConvivente.map(mezzagiornata => (
              <Column md="6" xs="12" padding="0" key={mezzagiornata.id}>
                <Checkbox
                  width="fit-content"
                  value={selectedFilters[labelSpaziLavoratore.mezzagiornata] && selectedFilters[labelSpaziLavoratore.mezzagiornata].includes(mezzagiornata.id)}
                  onChange={(value) => setPopupFilters(labelSpaziLavoratore.mezzagiornata, checkBoxSelection(selectedFilters[labelSpaziLavoratore.mezzagiornata], value, mezzagiornata.id))}
                  label={mezzagiornata.value}
                  checkcolor="primary"
                />
              </Column>
            ))}
          </Row>
        </>
      )
        : null}
      {/**
         * Spazi convivente
         */}
      {tipologiaOrario.id === TIPOLOGIA_ORARIO.CONVIVENZA ? (
        <>
          <Row fluid margin="0.5em 0 0 0">
            <Text
              value="Spazi convivente"
              color="primary"
              size="f7"
              weight="bold"
            />
          </Row>
          <Row fluid margin="0.5em 0 0 0">
            {valuesSpaziConvivente.map(spazioConvivente => {
              if (spazioConvivente.id !== 0) {
                return (
                  <Column md="6" xs="12" padding="0" key={spazioConvivente.id}>
                    <Checkbox
                      width="fit-content"
                      value={selectedFilters[labelSpaziLavoratore.spazioConvivente] && selectedFilters[labelSpaziLavoratore.spazioConvivente].includes(spazioConvivente.id)}
                      onChange={(value) => setPopupFilters(labelSpaziLavoratore.spazioConvivente, checkBoxSelection(selectedFilters[labelSpaziLavoratore.spazioConvivente], value, spazioConvivente.id))}
                      label={spazioConvivente.value}
                      checkcolor="primary"
                    />
                  </Column>
                );
              }
            })}
          </Row>
        </>
) : null}
      {/**
         * Spazi convivenza ridotta
         */}
      {tipologiaOrario.id === TIPOLOGIA_ORARIO.CONVIVENZA_RIDOTTA ? (
        <>
          <Row fluid margin="0.5em 0 0 0">
            <Text
              value="Spazi convivenza ridotta"
              color="primary"
              size="f7"
              weight="bold"
            />
          </Row>
          <Row fluid margin="0.5em 0 0 0">
            {valuesSpaziConvivenzaRidotta.map(spazioConvivenzaRidotta => {
              if (spazioConvivenzaRidotta.id !== 0) {
                return (
                  <Column md="6" xs="12" padding="0" key={spazioConvivenzaRidotta.id}>
                    <Checkbox
                      width="fit-content"
                      value={selectedFilters[labelSpaziLavoratore.spazioConvivenzaRidotta] && selectedFilters[labelSpaziLavoratore.spazioConvivenzaRidotta].includes(spazioConvivenzaRidotta.id)}
                      onChange={(value) => setPopupFilters(labelSpaziLavoratore.spazioConvivenzaRidotta, checkBoxSelection(selectedFilters[labelSpaziLavoratore.spazioConvivenzaRidotta], value, spazioConvivenzaRidotta.id))}
                      label={spazioConvivenzaRidotta.value}
                      checkcolor="primary"
                    />
                  </Column>
                );
              }
            })}
          </Row>
        </>
) : null}
    </>
  );
};

SpaziLavoratoreList.displayName = 'Lista spazi lavoratore';

export const SpaziLavoratore = SpaziLavoratoreList;
