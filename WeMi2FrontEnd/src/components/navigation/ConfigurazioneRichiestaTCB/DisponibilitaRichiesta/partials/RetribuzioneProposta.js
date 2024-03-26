/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import GroupFieldTitle from '../../partials/GroupFieldTitle';
import Button from 'components/ui2/Button';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import Input from 'components/ui2/Input';
import Text from 'components/ui/Text';
import { parseStringifiedFloat } from 'utils/functions/parseStringifiedFloat';
import { idPersoneAutoSufficienti } from 'components/shared/domanda-tcb/costants';

const RetribuzioneProposta = ({
  setFormField,
  retribuzione,
  handleFieldBlur,
  orario,
  touched,
  errors,
  callback,
  livelloContrattuale,
  isMinoreDiSeiAnni,
  isBadante,
  personeAutoSufficienti,
  getTariffaBase,
  isLivelloUnico
}) => {

  const isPiuDiUnaPersonaNonAutosufficiente = isBadante && personeAutoSufficienti?.id === idPersoneAutoSufficienti.piuDiUna;
  const labelPaga = ((isMinoreDiSeiAnni && !isLivelloUnico) || isPiuDiUnaPersonaNonAutosufficiente) ? 'La paga minima comprensiva di indennità è ' : 'La paga minima è ';

  const minimoRetribuzione = getTariffaBase(orario.id, livelloContrattuale.id, isPiuDiUnaPersonaNonAutosufficiente);


  return (
    <>
      <GroupFieldTitle
        title={`Qual è la retribuzione proposta (${(orario.id === 3 || orario.id === 5 ? " all'ora " : " al mese ")})?`}
        required
      />
      {minimoRetribuzione ?
        <p style={{ marginBottom: "1em" }}>
          <Text
            tag="span"
            value={labelPaga}
            weight="bold"
            size="f7"
            color="black"
          />
          <Text
            tag="span"
            value={moneyFormat(parseStringifiedFloat(minimoRetribuzione), true)}
            weight="bold"
            size="f7"
            color="primary"
          />
          <Text
            tag="span"
            value={orario.id === 3 || orario.id === 5 ? "/ora" : "/mese"}
            weight="bold"
            size="f8"
            color="primary"
          />
        </p>
        : null
      }
      <Row fluid margin="0" alignitems="center">
        <Column xs="12" md="5" padding="0">
          <Input
            name={'retribuzione'}
            label={'Paga proposta'}
            placeholder={"€" + (orario.id === 3 || orario.id === 5 ? "/ora" : "/mese")}
            onBlur={() => { handleFieldBlur('retribuzione') }}
            onChange={(value) => { setFormField('retribuzione', value) }}
            error={touched.retribuzione && errors["retribuzione"]}
            inputValue={retribuzione}
            type="number"
            required
            min={parseStringifiedFloat(minimoRetribuzione) || 0}
            max={999999}
          />
        </Column>
        <Column xs="12" md="7" padding="1em 0 0 0" sizepadding={{ md: "0 0 0 1em" }}>
          <Button
            label="Simula costo"
            color="primary"
            width='13rem'
            onClick={callback}
          />
        </Column>
      </Row>
    </>
  )
};

RetribuzioneProposta.displayName = 'RetribuzioneProposta';

export default RetribuzioneProposta;