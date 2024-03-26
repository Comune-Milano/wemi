/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Label from 'components/ui/Label';
import Input from 'components/ui/Input';
import Checkbox from 'components/ui/Checkbox';
import TextArea from 'components/ui/TextArea';
import styled, { css } from 'styled-components';
import { colors } from 'theme';
import { TCBSecondStepper, graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';


const BorderRow = styled(Row)`
      border-bottom: 1px solid ${colors.grey};
      height: 100%;
`;

const FormRow = styled(Row)`
  border-top: 1px solid ${colors.grey};
  ${props => props.last && css`
  border-bottom: 1px solid ${colors.grey};

  `}
`;

const FormTCBIRI009 = ({
  mansioniAnimali,
  locale, loaded,
  datiRichiesta009,
  stateValues,
  getValues,

 }) => {
  const checks = [{
    value: 1,
    textValue: 'si',
  }];


  return (

    <Column xs="12" padding="2em 0">
      <FormRow padding="1em 0" flex direction="column">
        <Column xs="12" padding="0" flex justifycontent="space-between">
          <Text value="Sono presenti animali in casa?" size="f6" color="darkGrey" />
          {checks.map(check => (
            <Checkbox
              getValue={getValues.getAnimaliFlag.bind(this)}
              selectedValue={stateValues.animaliFlag}
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

      {stateValues.animaliFlag.id === 1 && (
      <>

        {/* PRESENZA CANI */}
        <FormRow padding="1em 0" flex direction="column">
          <Column xs="12" padding="0" flex justifycontent="space-between">
            <Row fluid justifycontent="space-between" flex alignitems="flex-end">
              <Column xs="12" sm="6" md="5" lg="6" padding="0">
                <Text value="Sono presenti cani in casa?" size="f6" color="darkGrey" />
              </Column>
              <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
                <Input
                  required
                  max={999}
                  min={0}
                  initialValue={datiRichiesta009 ? datiRichiesta009.numeroCani : stateValues.numeroCaniValue}
                  getValue={getValues.getNumeroCaniValue.bind(this)}
                  material
                  label="Numero di cani"
                  type="number"
                />

                {/* {numeroAnimali && numeroAnimali > 999 ? <Text color="red" size="f8" tag="p" padding="1em 0" value="Valore non valido." />: null} */}

              </Column>
            </Row>
          </Column>
        </FormRow>

        {/* PRESENZA GATTI */}
        <FormRow padding="1em 0" flex direction="column">
          <Column xs="12" padding="0" flex justifycontent="space-between">
            <Row fluid justifycontent="space-between" flex alignitems="flex-end">
              <Column xs="12" sm="6" md="5" lg="6" padding="0">
                <Text value="Sono presenti gatti in casa?" size="f6" color="darkGrey" />
              </Column>
              <Column xs="12" sm="5" md="6" lg="5" padding="1em 0 0">
                <Input
                  required
                  max={999}
                  min={0}
                  initialValue={datiRichiesta009 ? datiRichiesta009.numeroGatti : stateValues.numeroGattiValue}
                  getValue={getValues.getNumeroGattiValue.bind(this)}
                  material
                  label="Numero di gatti"
                  type="number"
                />

                {/* {numeroAnimali && numeroAnimali > 999 ? <Text color="red" size="f8" tag="p" padding="1em 0" value="Valore non valido." />: null} */}

              </Column>
            </Row>
          </Column>
        </FormRow>

        <FormRow padding="1em 0" flex direction="column">
          <Column xs="12" padding="0" flex justifycontent="space-between">
            <Text value="Sono presenti altri animali?" size="f6" color="darkGrey" />
            {checks.map(check => (
              <Checkbox
                getValue={getValues.getAltriAnimaliFlag.bind(this)}
                selectedValue={stateValues.altriAnimaliFlag}
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
        { stateValues.altriAnimaliFlag.id === 1 && (
        <FormRow padding="1em 0" flex direction="column" last>
          <Text value="Quali altri animali sono presenti?" size="f6" color="darkGrey" padding="0 0 1.5em" />
          <TextArea
            material
            width="100%"
            noIntl
            initialValue={stateValues.dettaglioAnimaliValue.length > 0 ? stateValues.dettaglioAnimaliValue : null}
            getValue={getValues.getDettaglioAnimaliValue.bind(this)}
            placeholder="Es. canarini, criceto..."
            name="Altri animali"
          />
        </FormRow>
  )}

        <Row fluid margin="2em 0 1em">
          <Label
            required
            value="Mansioni richieste"
            width="auto"
            weight="bold"
            display="inline-flex"
            transform="uppercase"
            color="primary"
            bgcolor="grey"
            margin="0"
            size="f8"
          />
        </Row>
        <Row fluid justifycontent="space-between">
          {mansioniAnimali && mansioniAnimali.map((ele, index) => (
            <Column padding="0" alignitems="flex-start" xs="5" justifycontent="space-between" flex>
              <BorderRow fluid padding="1em 0" alignitems="flex-start" flex justifycontent="space-between">
                <Checkbox
                  alignTop
                  getValue={getValues.getMansioniValue.bind(this)}
                  selectedValue={stateValues.mansioniValue}
                  boxWidth="1.2em"
                  boxHeight="1.2em"
                  fontSize="f7"
                  type="checkbox"
                  value={ele.cdDominioTcb}
                  label={ele.txTitoloMansione[locale]}
                  defaultvalue={false}
                  checkcolor="primary"
                  bordercolor="primary"
                />
              </BorderRow>
            </Column>
            ))}
        </Row>

      </>
)}


    </Column>
  );
};

FormTCBIRI009.displayName = ' FormTCBIRI009';

const mapDispatchToProps = ({
  TCBSecondStepper,
  graphqlRequest,
});

const mapStoreToProps = store => ({
  Stepper: store.stepperTCB,
  mansioni: store.graphql.mansioni,
  estraiDatiRichiestaVoceMenu2: store.graphql.estraiDatiRichiestaVoceMenu2,
  InserisciDatiRichiestaVoceMenu2: store.graphql.InserisciDatiRichiestaVoceMenu2,
  error: store.graphql.error,
});
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(FormTCBIRI009);
