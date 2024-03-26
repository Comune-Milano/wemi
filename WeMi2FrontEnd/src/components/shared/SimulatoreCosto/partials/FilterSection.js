import React, { useState } from 'react';
import yup from 'libs/Form/validation/yup';
import Text from 'components/ui/Text';
import InputNumber from 'components/ui2/InputNumber';
import Button from 'components/ui2/Button';
import Tooltip from 'components/ui2/Tooltip';
import RadioGroup from 'components/ui2/RadioGroup';
import Input from 'components/ui2/Input';
import { GroupContainer } from './Common.Styled';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import TiologiaOrariaRadioGroup from './TiologiaOrariaRadioGroup';
import TitleModalInfo from './TitleModalInfo';
import { BodyModalInfo } from '../utils';
import { retribuzioneProposta } from '../utils';
import * as tipologiaOrarioCostanti from 'types/tipologiaOrario';
import VittoAlloggio from './VittoAlloggio';
import EtaBambini from '../../domanda-tcb/EtaBambini';
import PersoneAutoSufficienti from '../../domanda-tcb/PersoneAutoSufficienti';
import { getNomeServizioTCB, ID_SERVIZIO_TATA, ID_SERVIZIO_BADANTE } from 'types/tcbConstants';
import { idLivelloContrattuale } from 'types/idLivelloContrattuale';
import { isNumber } from 'utils/functions/typeCheckers';
import { getMassimoOre } from '../utils';

const FilterSection = ({
  orari,
  orarioName,
  tipologiaContratto,
  livelliInquadramento,
  livelloName,
  indennita,
  filtri,
  handleFiltri,
  importiMinimi,
  onClick,
  textToModal,
  annoRif,
  idServizio,
  isMinoreDiSeiAnni,
  isPiuDiUnaPersonaNonAutosufficiente,
  maxOre=[]
}) => {
  const [openRadioGroup, setOpenRadioGroup] = React.useState(
    !(isNumber(filtri.tipologiaOrario.id) && isNumber(filtri.livelloContrattuale.id))
  );

  filtri.tariffaBase = getObjectValue(importiMinimi, `${filtri.tipologiaOrario.id}.${filtri.livelloContrattuale.id}`, null);
  filtri.imImportoIndennitaBadante = getObjectValue(importiMinimi, `${filtri.tipologiaOrario.id}.imImportoIndennitaBadante`);
  filtri.imImportoIndennitaTata = getObjectValue(importiMinimi, `${filtri.tipologiaOrario.id}.imImportoIndennitaTata`);

  const getTariffaBase = () => {
    if (isMinoreDiSeiAnni) {
      const value = Number.parseFloat(filtri.imImportoIndennitaTata + filtri.tariffaBase).toFixed(2);
      return value;
    }
    if (isPiuDiUnaPersonaNonAutosufficiente) {
      const value = Number.parseFloat(filtri.imImportoIndennitaBadante + filtri.tariffaBase).toFixed(2);
      return value;
    }
    return filtri.tariffaBase;
  };

  // costanti con il tipo di servizio selezionato  
  const isTata = idServizio === ID_SERVIZIO_TATA;
  const isBadante = idServizio === ID_SERVIZIO_BADANTE;

  // costanti con il livello contrattuale selezionato 
  const isLivelloDS = idLivelloContrattuale.livelloDs === filtri.livelloContrattuale?.id;
  const isLivelloCS = idLivelloContrattuale.livelloCs === filtri.livelloContrattuale?.id;
  const isLivelloUNICO = idLivelloContrattuale.livelloUnico === filtri.livelloContrattuale?.id;

  // tipologia Full-time / part-time / a ore (Non Conviventi)
  const nonConviventi = filtri.tipologiaOrario?.id === tipologiaOrarioCostanti.NON_CONVIVENTI;
  // tipologia Weekend
  const weekend = filtri.tipologiaOrario?.id === tipologiaOrarioCostanti.WEEKEND;
  // tipologia Convivenza ridotta
  const convivenzaRidotta = filtri.tipologiaOrario?.id === tipologiaOrarioCostanti.CONVIVENZA_RIDOTTA;

  const maxOreSettimanali = getMassimoOre(maxOre, filtri.tipologiaOrario.id);
  const schema = yup.object().shape(({
    tipologiaOrario: yup
      .object()
      .test('requiredOrario',
        'Selezionare tipologia orario',
        value => (value.id)),
    livelloContrattuale: yup
      .object()
      .test('requiredLivelloContrattuale',
        'Selezionare livello contrattuale',
        value => (value.id >= 0)),
    retribuzione: yup
      .number()
      .typeError('inserire una retribuzione valida')
      .required('inserire una retribuzione valida')
      .test('condizioniRetribuzione',
        'importo non valido',
        value => (value >= getTariffaBase())
      ),
    tipologiaContratto: yup
      .object()
      .shape({
        id: yup
          .number()
          .required(),
        label: yup
          .string()
      }),
    etaBambini: yup.array()
      .test('isTata',
        'età non selezionata',
        (value) => isTata && !isLivelloUNICO ? value.filter(el => el.checked).length > 0 : true),
    personeAutoSufficienti: yup.object()
      .test('isBadante',
        'Persone non autosufficienti da assistere non selezionato',
        (value) => (isBadante && (isLivelloDS || isLivelloCS)) ? isNumber(value?.id) : true),
    oreSettimanali: yup
      .number()
      .required()
      .test('condizioniOre',
        'orario non valido',
        value => (value > 0 && (!maxOreSettimanali || value <= maxOreSettimanali))),
  }));

  const [touched, setTouched] = useState({});
  let erroreRetribuzione = null;
  try {
    schema.validateSyncAt('retribuzione', filtri);
  } catch (err) {
    erroreRetribuzione = err.errors[0];
  }
  let erroreOreSettimanali = null;
  try {
    schema.validateSyncAt('oreSettimanali', filtri);
  } catch (err) {
    erroreOreSettimanali = err.errors[0];
  }
  let erroreLivelloContrattuale = null;
  try {
    schema.validateSyncAt('livelloContrattuale', filtri);
  } catch (err) {
    erroreLivelloContrattuale = err.errors[0];
  }

  let disableButton;
  try {
    schema.validateSync(filtri, { abortEarly: false });
    disableButton = false;
  } catch (error) {
    disableButton = true;
  }

  const labelPaga = (isMinoreDiSeiAnni || isPiuDiUnaPersonaNonAutosufficiente) ? "La paga minima comprensiva di indennità è " : "La paga minima è ";

  return (
    <>
      <Text
        tag="h3"
        value={"inserisci le informazioni per calcolare quanto ti costa assumere un/una " + getNomeServizioTCB(idServizio)}
        transform="uppercase"
        letterSpacing="0.05em"
        weight="bold"
        size="f7"
        color="primary"
        margin="0 0 2.5em 0"
      />
      {
        !openRadioGroup ?
          (
            <GroupContainer>
              <div style={{ marginBottom: "0.2rem" }}>
                <Text
                  tag="h5"
                  value="Stai calcolando il costo per"
                  weight="normal"
                  size="f7"
                  color="black"
                  margin='0 0 0.2rem 0'
                />
                <Text
                  tag="strong"
                  value={`${orarioName}, ${livelloName}`}
                  weight="bold"
                  size="f7"
                  color="black"
                />
              </div>
              <div
                role="button"
                tabIndex="1"
                style={{ margin: '0 0 2em 0', cursor: 'pointer', outline: 'none' }}
              >
                <Tooltip
                  position="bottom"
                  color="white"
                  bgcolor="blue"
                  value="Attenzione: le modifiche fatte nel simulatore non vengono aggiornate nelle pagine della richiesta"
                >
                  <Text
                    tag="span"
                    value="Modifica"
                    size="f7"
                    color="black"
                    decoration="underline"
                    onClick={() => setOpenRadioGroup(true)}
                  />
                </Tooltip>
              </div>
            </GroupContainer>
          )
          :
          (
            <TiologiaOrariaRadioGroup
              openRadioGroup={openRadioGroup}
              orari={orari}
              filtri={filtri}
              handleFiltri={handleFiltri}
              livelliInquadramento={livelliInquadramento}
              textToModal={textToModal}
              indennita={indennita}
              maxOre={maxOre}
            />
          )
      }
      <GroupContainer>
        <TitleModalInfo
          label="tipologia contratto"
          modalTitle="tipologia contratto"
          modalBody={BodyModalInfo["tipologiaContratto"]}
          required
        />
        <RadioGroup
          radioItems={tipologiaContratto}
          selectedItem={filtri.tipologiaContratto}
          onChange={(value) => {
            handleFiltri('tipologiaContratto', value);
          }}
          checkcolor="primary"
          display="inline-grid"
        />
      </GroupContainer>
      <GroupContainer>
        {isTata && !isLivelloUNICO ?
          <EtaBambini
            handleState={handleFiltri}
            state={filtri}
            required
          />
          : null
        }
        {isBadante && (isLivelloDS || isLivelloCS) ?
          <PersoneAutoSufficienti
            handleState={handleFiltri}
            state={filtri}
          />
          : null
        }
      </GroupContainer>
      <GroupContainer>
        <TitleModalInfo
          label={"retribuzione proposta"}
          modalTitle="retribuzione proposta"
          modalBody={retribuzioneProposta(annoRif)}
          required
        />
        {
          filtri.tariffaBase ?
            (
              <p style={{ marginBottom: "1em" }}>
                <Text
                  tag="span"
                  value={labelPaga}
                  weight="bold"
                  size="f8"
                  color="black"
                />
                <Text
                  tag="span"
                  value={moneyFormat(getTariffaBase(), true)}
                  weight="bold"
                  size="f8"
                  color="primary"
                />
                <Text
                  tag="span"
                  value={filtri.tipologiaOrario.id === 3 || filtri.tipologiaOrario.id === 5 ? "/ora" : "/mese"}
                  weight="bold"
                  size="f8"
                  color="primary"
                />
              </p>
            )
            : null
        }
        <Input
          name={'retribuzione'}
          label={`Paga ${(filtri.tipologiaOrario.id === tipologiaOrarioCostanti.NON_CONVIVENTI || filtri.tipologiaOrario.id === tipologiaOrarioCostanti.WEEKEND) ? "oraria" : "mensile"} proposta`}
          placeholder={"€" + (filtri.tipologiaOrario.id === tipologiaOrarioCostanti.NON_CONVIVENTI || filtri.tipologiaOrario.id === tipologiaOrarioCostanti.WEEKEND ? "/ora" : "/mese")}
          onChange={(value) => { handleFiltri('retribuzione', value); }}
          onBlur={() => { setTouched({ ...touched, retribuzione: true }); }}
          required
          error={touched.retribuzione && erroreRetribuzione}
          inputValue={filtri.retribuzione}
          type="number"
          min={getTariffaBase() || 0}
        />
      </GroupContainer>
      <GroupContainer>
        <TitleModalInfo
          label="Ore settimanali"
          modalTitle="Ore settimanali"
          modalBody={BodyModalInfo["oreSettimanali"](maxOre)}
          required
        />
        <InputNumber
          value={Number.parseInt(filtri.oreSettimanali, 10) || 0}
          error={touched.oreSettimanali && erroreOreSettimanali}
          onChange={(value) => { setTouched({ ...touched, oreSettimanali: true }); handleFiltri('oreSettimanali', value); }}
          onInputChange={(value) => { setTouched({ ...touched, oreSettimanali: true }); handleFiltri('oreSettimanali', value); }}
          minValue={0}
          maxValue={maxOreSettimanali}
          margin="0 0 2em 0"
        />
      </GroupContainer>
      <VittoAlloggio
        nonConviventi={nonConviventi}
        weekend={weekend}
        convivenzaRidotta={convivenzaRidotta}
        handleFiltri={handleFiltri}
        filtri={filtri}
      />
      <GroupContainer>
        <Tooltip
          position="bottom"
          color="white"
          bgcolor="blue"
          value="Per calcolare il costo inserisci tutte le informazioni obbligatorie richieste"
          posAdjustment="0%"
          preventOnHover={!disableButton}
        >
          <Button
            label="Calcola il costo"
            disabled={disableButton}
            onClick={onClick}
            color="primary"
          />
        </Tooltip>
      </GroupContainer>
    </>
  );
};

FilterSection.displayName = 'Filtri simulatore TCB';

export default FilterSection;