import React from 'react';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import Text from 'components/ui/Text';
import InputNumber from 'components/ui2/InputNumber';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';
import { labelAltriValori, labelAnniEsperienza } from 'components/pages/MatchingDomandaLavoratore/labels';
import RadioGroup from 'components/ui2/RadioGroup';
import { CD_TIPOLOGICA_TATA } from 'types/tcbConstants';

const AltriValoriList = ({
  filterList,
  selectedFilters,
  setPopupFilters,
}) => {
  const keyGenere = attributo.CD_RIC_SESSO_ASSISTITO.ty_dominio_tcb;

  const genere = mapFilterList(filterList, keyGenere);

  const valuesGenere = genere.map(element => ({
    label: element.value,
    id: element.id,
  }));

  const keySuperficieCasa = attributo.LS_DISPONIBILITA_SUPERFICI_CASA.ty_dominio_tcb;

  const valuesSupeficieCasa = mapFilterList(filterList, keySuperficieCasa);

  const keyOreSettimanali = attributo.LS_FASCE_ORE_SETTIMANALI.ty_dominio_tcb;

  const valuesOreSettimanali = mapFilterList(filterList, keyOreSettimanali);

  // const keyOrarioLavoro = attributo.LS_ORARIO_LAVORO.ty_dominio_tcb;

  // const valuesOrarioLavoro = mapFilterList(filterList, keyOrarioLavoro);

  const keyTipologiaContratto = attributo.LS_TIPOLOGIA_CONTRATTO.ty_dominio_tcb;

  const valuesTipologiaContratto = mapFilterList(filterList, keyTipologiaContratto);

  const keyMunicipio = null;

  const valuesMunicipio = mapFilterList(filterList, keyMunicipio);

  const { [labelAnniEsperienza.workerType]: workerType } = selectedFilters;

  return (
    <>
      {/**
         * Genere
         */}
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Genere"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        <RadioGroup
          radioItems={valuesGenere}
          fontSize="f7"
          checkcolor="primary"
          display="inline-flex"
          spacing="0 1em 0 0"
          selectedItem={selectedFilters[labelAltriValori.genere]}
          onChange={(value) => setPopupFilters(labelAltriValori.genere, value)}
          // label={genere.value}
          // checkcolor="primary"
        />
        {/* {valuesGenere.map(genere => (
          <Column md="4" xs="12" padding="0" key={genere.id}>
            <RadioGroup
              value={selectedFilters[labelAltriValori.genere]}
              onChange={(value) => setPopupFilters(labelAltriValori.genere, value)}
              label={genere.value}
              checkcolor="primary"
            />
          </Column>
          ))} */}

      </Row>
      {/**
         * Superficie casa
         */}
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Superficie casa"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">

        {valuesSupeficieCasa.map(superficie => (
          <Column md="6" xs="12" padding="0" key={superficie.id}>
            <Checkbox
              width="fit-content"
              value={selectedFilters[labelAltriValori.superficie] && selectedFilters[labelAltriValori.superficie].id === superficie.id}
              onChange={(value) => {
                if (value) {
                  return setPopupFilters(labelAltriValori.superficie,
                    { id: superficie.id, value: superficie.nrValoreMaxRif, min: superficie.nrValoreMinRif });
                }
                return setPopupFilters(labelAltriValori.superficie,
                  undefined);
              }
              }
              label={superficie.value}
              checkcolor="primary"
            />
          </Column>
          ))}
      </Row>
      {/**
         * Ore Settimanali
         */}
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Ore Settimanali"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">

        {valuesOreSettimanali.map(oraSettimanale => (
          <Column md="6" xs="12" padding="0" key={oraSettimanale.id}>
            <Checkbox
              width="fit-content"
              value={selectedFilters[labelAltriValori.oraSettimanale] && selectedFilters[labelAltriValori.oraSettimanale].includes(oraSettimanale.id)}
              onChange={(value) => setPopupFilters(labelAltriValori.oraSettimanale, checkBoxSelection(selectedFilters[labelAltriValori.oraSettimanale], value, oraSettimanale.id))}
              label={oraSettimanale.value}
              checkcolor="primary"
            />
          </Column>
          ))}
      </Row>
      {/**
         * Orario di lavoro
         */}
      {/* <Row fluid margin="0.5em 0 0 0">
          <Text
            value="Ore di lavoro"
            color="primary"
            size="f7"
            weight="bold"
          />
        </Row>
        <Row fluid margin="0.1em 0">
          {valuesOrarioLavoro.map(orarioLavoro => {
            return (
              <Column md="6" xs="12" padding="0">
                <Checkbox
                  value={selectedFilters[labelAltriValori.orarioLavoro] && selectedFilters[labelAltriValori.orarioLavoro].includes(orarioLavoro.id)}
                  onChange={(value) => setPopupFilters(labelAltriValori.orarioLavoro, checkBoxSelection(selectedFilters[labelAltriValori.orarioLavoro], value, orarioLavoro.id))}
                  label={orarioLavoro.value}
                  checkcolor="primary"
                />
              </Column>
            );
          })}
        </Row> */}
      {/**
         * Tipologia contratto
         */}
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Tipologia contratto"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        {valuesTipologiaContratto.map(tipologiaContratto => (
          <Column md="6" xs="12" padding="0" key={tipologiaContratto.id}>
            <Checkbox
              width="fit-content"
              value={selectedFilters[labelAltriValori.tipologiaContratto] && selectedFilters[labelAltriValori.tipologiaContratto].includes(tipologiaContratto.id)}
              onChange={(value) => setPopupFilters(labelAltriValori.tipologiaContratto, checkBoxSelection(selectedFilters[labelAltriValori.tipologiaContratto], value, tipologiaContratto.id))}
              label={tipologiaContratto.value}
              checkcolor="primary"
            />
          </Column>
          ))}
      </Row>
      {/**
         * Municipio
         */}
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Municipi"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        {valuesMunicipio.map(municipio => (
          <Column md="6" xs="12" padding="0" key={municipio.id}>
            <Checkbox
              width="fit-content"
              value={selectedFilters[labelAltriValori.municipio] && selectedFilters[labelAltriValori.municipio].includes(municipio.id)}
              onChange={(value) => setPopupFilters(labelAltriValori.municipio, checkBoxSelection(selectedFilters[labelAltriValori.municipio], value, municipio.id))}
              label={municipio.value}
              checkcolor="primary"
            />
          </Column>
          ))}
      </Row>
      {/**
         *  Numero Bambini
         */}
      {workerType.id === CD_TIPOLOGICA_TATA ? (
        <Row fluid margin="0.5em 0 0 0" justifycontent="space-around" display="flex" alignitems="center">
          <Column padding="0" xs="12" flex>
            <Text
              value="Numero massimo di bambini che si è disposti ad accudire: "
              size="f7"
              color="black"
              margin="0 0.5em 0 0"
            />
            <InputNumber
              onChange={(value) => setPopupFilters(labelAltriValori.maxBambini, parseInt(value, 10))}
              onInputChange={(value) => setPopupFilters(labelAltriValori.maxBambini, parseInt(value, 10))}
              value={Number.parseInt(selectedFilters[labelAltriValori.maxBambini], 10) || 0}
              minValue={0}
              maxValue={5}
              size="f7"
              iconColor="primary"
              textColor="black"
            />
          </Column>
        </Row>
      )


        : null}

    </>
  );
};


AltriValoriList.displayName = 'AltriValoriList';

export const AltriValori = AltriValoriList;
