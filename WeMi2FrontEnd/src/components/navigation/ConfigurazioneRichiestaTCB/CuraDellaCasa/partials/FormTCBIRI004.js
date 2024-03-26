/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui/Checkbox';
import Select from 'components/ui/Select';
import Input from 'components/ui/Input';
import Label from 'components/ui/Label';
import styled from 'styled-components';
import { colors } from 'theme';
import { giardinoFlagSelected } from './costants';

const FormRow = styled(Row)`
  border-top: 1px solid ${colors.grey};
  &:last-child {
  border-bottom: 1px solid ${colors.grey};
  }
`


const FormTCBIRI004 = (
  { servizioTCB,
    numeroStanze,
    superficieCasa,
    altro,
    numeroBagni,
    caratteristicheAbitazione,
    mansioniColf,
    stateValues,
    getValues,
    locale, loaded,
    requiredError,
    config004
  }
) => {


  const checks = [{
    value: 1,
    textValue: 'si'
  }]

  const superficieCasaArr = superficieCasa && superficieCasa.map(el => {
    return {
      value: el.cdDominioTcb,
      textValue: el.tlValoreTestuale[locale]
    }
  })

  const numeroStanzeArr = numeroStanze && numeroStanze.map(el => {
    return {
      value: el.cdDominioTcb,
      textValue: el.tlValoreTestuale[locale]
    }
  })

  const numeroBagniArr = numeroBagni && numeroBagni.map(el => {
    return {
      value: el.cdDominioTcb,
      textValue: el.tlValoreTestuale[locale]
    }
  })

  const caratteristicheAbitazioneArr = caratteristicheAbitazione && caratteristicheAbitazione.map(el => {
    return {
      value: el.cdDominioTcb,
      textValue: el.tlValoreTestuale[locale]
    }
  })


  const mansioniColfArr = mansioniColf && mansioniColf.length > 0 && mansioniColf.map(el => {
    return {
      value: el.cdDominioTcb,
      textValue: el.txTitoloMansione[locale]
    }
  })



  return (
    <Column xs="12" padding="2em 0" >

      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0">
          <Row fluid justifycontent="space-between">
            <Column xs="12" sm="6" lg="7" padding="0">
              <Text
                value="Quanto misura la superficie della casa?"
                size="f6"
                color="darkGrey"
                aria-label="Superficie della casa"
                tabindex="0"
              />
            </Column>
            <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
              <Select
                reset
                maxLength="15"
                required
                material
                name="Superficie casa"
                color={requiredError && stateValues.superficieCasaValue.id === -1 ? 'red' : 'primary'}
                getValue={getValues.getSuperficieCasaValue.bind(this)}
                selectedValue={stateValues.superficieCasaValue}
                items={superficieCasaArr ? superficieCasaArr : []}
                labelSelected="superficie casa"
              />
            </Column>
          </Row>
        </Column>
      </FormRow>

      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0">
          <Row fluid justifycontent="space-between">
            <Column xs="12" sm="6" lg="7" padding="0">
              <Text value="Quante stanze ha la casa?" size="f6" color="darkGrey" />
            </Column>
            <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
              <Select
                reset
                maxLength="15"
                material
                name="Numero stanze"
                getValue={getValues.getNumeroStanzeValue}
                selectedValue={stateValues.numeroStanzeValue}
                items={numeroStanzeArr ? numeroStanzeArr : []}
                labelSelected="numero stanza"
              />
            </Column>
          </Row>
        </Column>
      </FormRow>


      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0">
          <Row fluid justifycontent="space-between">
            <Column xs="12" sm="6" lg="7" padding="0">
              <Text value="Quanti bagni?" size="f6" color="darkGrey" />
            </Column>
            <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
              <Select
                reset
                maxLength="15"
                material
                name="Numero bagni"
                getValue={getValues.getNumeroBagniValue}
                selectedValue={stateValues.numeroBagniValue}
                items={numeroBagniArr ? numeroBagniArr : []}
                labelSelected="numero bagni"
              />
            </Column>
          </Row>
        </Column>
      </FormRow>


      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0" flex justifycontent="space-between">
          <Text value="Dispone di una terrazza/ un balcone?" size="f6" color="darkGrey" />
          {checks.map((check, index) => (
            <Checkbox
              key={index.toString()}
              getValue={getValues.getTerrazzaFlag.bind(this)}
              selectedValue={stateValues.terrazzaFlag}
              boxWidth="1.2em"
              boxHeight="1.2em"
              fontSize="f7"
              type="checkbox"
              value={check.value}
              defaultvalue={false}
              checkcolor="primary"
              label={check.textValue}
              bordercolor="primary"
            />
          ))}
        </Column>
      </FormRow>

      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0" flex justifycontent="space-between">
          <Row fluid justifycontent="space-between">
            <Column xs="12" sm="6" lg="7" padding="0">

              <Text value="A che piano si trova?" size="f6" color="darkGrey" />

            </Column>
            <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
              {loaded === 2 && <Input
                getValue={getValues.getPianoValue.bind(this)}
                material
                label={"Piano"}
                initialValue={config004 ? config004.piano : stateValues.pianoValue}
              />}
            </Column>
          </Row>
        </Column>
      </FormRow>


      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0" flex justifycontent="space-between">
          <Text value="È presente un ascensore?" size="f6" color="darkGrey" />
          {checks.map((check, index) => (
            <Checkbox
              key={index.toString()}
              getValue={getValues.getAscensoreFlag.bind(this)}
              selectedValue={stateValues.ascensoreFlag}
              boxWidth="1.2em"
              boxHeight="1.2em"
              fontSize="f7"
              type="checkbox"
              value={check.value}
              defaultvalue={false}
              checkcolor="primary"
              label={check.textValue}
              bordercolor="primary"
            />
          ))}
        </Column>
      </FormRow>
      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0" flex justifycontent="space-between">
          <Text value="La casa ha il giardino?" size="f6" color="darkGrey" />
          {checks.map((check, index) => (
            <Checkbox
              key={index.toString()}
              getValue={getValues.getGiardinoFlag}
              selectedValue={stateValues.giardinoFlag}
              boxWidth="1.2em"
              boxHeight="1.2em"
              fontSize="f7"
              type="checkbox"
              value={check.value}
              defaultvalue={false}
              checkcolor="primary"
              label={check.textValue}
              bordercolor="primary"
            />
          ))}
        </Column>
        {
        stateValues.giardinoFlag.id === giardinoFlagSelected ?
          <Row fluid padding="1em 0" justifycontent="flex-end">
            <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
              <Input
                type="number"
                required={stateValues.giardinoFlag.id === giardinoFlagSelected}
                getValue={getValues.getEstensioneGiardinoValue.bind(this)}
                material label={"Specificare estensione (mq)"}
                initialValue={stateValues.estensioneGiardino}
                color={requiredError && !stateValues.estensioneGiardino > 0 ? 'red' : 'primary'}
              />
            </Column>
          </Row>
          : null
        }

      </FormRow>


      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0">
          <Row fluid justifycontent="space-between">
            <Column xs="12" sm="6" lg="7" padding="0">
              <Text value="Seleziona la tipologia di abitazione" size="f6" color="darkGrey" />
            </Column>
            <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
              <Select
                reset
                maxLength="15"
                material
                name="Tipologia abitazione"
                getValue={getValues.getCaratteristicheAbitazioneValue.bind(this)}
                selectedValue={stateValues.caratteristicheAbitazioneValue}
                items={caratteristicheAbitazioneArr ? caratteristicheAbitazioneArr : []}
                labelSelected="tipologia abitazione"
              />
            </Column>
          </Row>
        </Column>
      </FormRow>


      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0" flex justifycontent="space-between">
          <Text value="Sono presenti fumatori?" size="f6" color="darkGrey" />
          {checks.map((check, index) => (
            <Checkbox
              key={index.toString()}
              getValue={getValues.getFumatoriFlag.bind(this)}
              selectedValue={stateValues.fumatoriFlag}
              boxWidth="1.2em"
              boxHeight="1.2em"
              fontSize="f7"
              type="checkbox"
              value={check.value}
              defaultvalue={false}
              checkcolor="primary"
              label={check.textValue}
              bordercolor={"primary"}
            />
          ))}
        </Column>
      </FormRow>

      <FormRow padding="2em 0" flex direction="column">
        <Column xs="12" padding="1em 0 0">
          <Label
            required
            value={`Mansioni da svolgere`}
            width="auto"
            weight="bold"
            transform="uppercase"

            display="-webkit-inline-box"
            color="primary"
            bgcolor="grey"
            margin="0"
            size="f8"
          />
        </Column>
        <Column xs="12" padding="1em 0">
          <Text value={`Le chiediamo di  dirci cosa dovrà fare la ${servizioTCB.tl_valore_testuale[locale].toLowerCase()} per la cura della casa.`} size="f6" color="darkGrey" />
        </Column>
        <Row flex justifycontent="space-between" alignitems="flex-start">
          {mansioniColfArr && mansioniColfArr.map((ele, index) => (
            <Column
              key={index.toString()}
              padding="1em 0" alignitems="center" xs="6" justifycontent="space-between" >
              <Checkbox
                getValue={getValues.getMansioniValue.bind(this)}
                selectedValue={stateValues.mansioniValue && stateValues.mansioniValue}
                boxWidth="1.2em"
                boxHeight="1.2em"
                fontSize="f7"
                type="checkbox"
                value={ele.value}
                label={ele.textValue}
                defaultvalue={false}
                checkcolor="primary"
                bordercolor="primary"
              />
              {altro && ele.value === 0 &&
                <Row fluid padding="1em 0">
                  <Input
                    required={altro}
                    color={requiredError && !stateValues.altroValue.length > 0 && stateValues.altro ? 'red' : 'primary'}
                    getValue={getValues.getAltroValue.bind(this)}
                    material label={'Specificare "altro"'}
                    placeholder="Altro..."
                    initialValue={stateValues.altroValue}
                  />
                </Row>
              }
            </Column>

          ))}


        </Row>
      </FormRow>
    </Column>
  );
};

FormTCBIRI004.displayName = ' FormTCBIRI004';

export default FormTCBIRI004;

