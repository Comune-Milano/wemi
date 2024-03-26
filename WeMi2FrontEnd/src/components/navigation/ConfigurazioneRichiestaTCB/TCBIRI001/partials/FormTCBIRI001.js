/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui/Checkbox';
import Select from 'components/ui/Select';
import Input from 'components/ui/Input';
import Tooltip from 'components/ui/Tooltip';
import FaIcon from 'components/ui/FaIcon';
import styled from 'styled-components';
import { colors } from 'theme';
import { CD_TIPOLOGICA_TATA, CD_TIPOLOGICA_COLF, CD_TIPOLOGICA_BADANTE } from 'types/tcbConstants';

const FormRow = styled(Row)`
  border-top: 1px solid ${colors.grey};
  &:last-child {
  border-bottom: 1px solid ${colors.grey};
  }
`

const FormTCBIRI001 = ({
  beneficiario,
  config001,
  datiRichiesta001,
  getBenFlag,
  getNumeroPersone,
  numeroPersone,
  orario,
  getOrario,
  modifica,
  casaFlag,
  orariTCB,
  locale,
  loaded,
  getCasaFlag,
  servizio,
  idServizio,
}) => {

  const checks = [{
    value: 1,
    textValue: 'si'
  }]

  const selectArr = orariTCB ? orariTCB.map(el => {
    return {
      value: el.cd_dominio_tcb,
      textValue: el.tl_valore_testuale[locale]
    }
  })
    : [];

  return (
    <Column xs="12" md="10" mdShift="1" padding="2em 0" >
      {idServizio !== CD_TIPOLOGICA_TATA ?
        <FormRow padding="1em 0" flex direction="column">
          <Column xs="12" padding="0" flex justifycontent="space-between">
            <Text value="È lei il beneficiario?" size="f6" color="darkGrey" />
            {checks.map((check, index) => (
              <Checkbox
                key={index.toString()}
                getValue={getBenFlag.bind(this)}
                selectedValue={beneficiario}
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
        </FormRow> : null}
      {idServizio !== CD_TIPOLOGICA_COLF ?
        <FormRow padding="1em 0" flex direction="column">
          <Column xs="12" padding="0" flex justifycontent="space-between">
            <Row fluid justifycontent="space-between" flex alignitems="flex-end">
              <Column xs="12" sm="6" md="5" lg="6" padding="0">
                {idServizio === CD_TIPOLOGICA_BADANTE ?
                  <Text value="Di quante persone si dovrà prendere cura la/il badante?" size="f6" color="darkGrey" />
                  :
                  idServizio === CD_TIPOLOGICA_TATA ?
                    <Text value="Di quanti bambini si dovrà prendere cura la baby-sitter?" size="f6" color="darkGrey" />
                    :
                    null}
              </Column>
              <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
                {loaded &&
                  <Input
                    required
                    max={999}
                    min={1}
                    disabled={modifica}
                    initialValue={datiRichiesta001 ? datiRichiesta001.numeroPersone : numeroPersone}
                    getValue={getNumeroPersone.bind(this)}
                    material
                    label={idServizio === CD_TIPOLOGICA_TATA ? "Numero di bambini" : "Numero di persone"}
                    type="number"
                  />}
                {numeroPersone && numeroPersone > 999 ? <Text color="red" size="f8" tag="p" padding="1em 0" value="Valore non valido." /> : null}


              </Column>
            </Row>
          </Column>
        </FormRow> : null}
      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0">
          <Row fluid justifycontent="space-between" flex alignitems="flex-end">
            <Column xs="12" sm="6" md="5" lg="6" padding="0">
              {idServizio === CD_TIPOLOGICA_BADANTE ?
                <Text value="Quale orario di lavoro dovrà fare la/il badante?" size="f6" color="darkGrey" />
                : idServizio === CD_TIPOLOGICA_TATA ?
                  <Text value="Quale orario di lavoro dovrà fare la baby-sitter?" size="f6" color="darkGrey" />
                  :
                  <Text value="Quale orario di lavoro dovrà fare la/il colf?" size="f6" color="darkGrey" />
              }
            </Column>
            <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
              {orariTCB ?
                <Select
                  maxLength="15"
                  reset
                  required
                  material
                  name="Tipologia orario"
                  getValue={getOrario}
                  selectedValue={orario}
                  items={selectArr && selectArr}
                  labelSelected="tipologia orario"
                /> : null}
            </Column>
          </Row>
        </Column>
      </FormRow>
      {
        servizio && idServizio !== CD_TIPOLOGICA_COLF ?
          <FormRow padding="1em 0" flex justifycontent="space-between">
            <Column xs="8" padding="0" flex >
              <Text value={`La ${idServizio === CD_TIPOLOGICA_BADANTE ? 'badante' : 'baby-sitter'} dovrà prendersi cura della casa?`} size="f6" color="darkGrey" />

            </Column>
            <Column xs="3" padding="0" flex justifycontent="flex-end">
              {checks.map((check, index) => (
                <Checkbox
                  key={index.toString()}
                  getValue={getCasaFlag}
                  selectedValue={casaFlag}
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
              <Tooltip
                right
                alignitems="center"
                padding="0 0 0 1em"
                width="12em"
                fontSize="f8"
                textTT={`Il lorem ipsum dolor sit amet dolor sit amet lorem.`}
                color="white"
                bgcolor="primary">
                <FaIcon
                  radius="50%"
                  icon="\f128"
                  bgcolor="primary"
                  color="white"
                  fontSize="f9"
                  height="2em"
                  width="2em"
                />
              </Tooltip>
            </Column>
          </FormRow>
          : null
      }
    </Column>
  );
};

FormTCBIRI001.displayName = ' FormTCBIRI001';

export default FormTCBIRI001;

