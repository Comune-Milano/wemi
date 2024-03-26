import React, { useState } from 'react';
import yup from 'libs/Form/validation/yup';
import Checkbox from 'components/ui2/Checkbox';
import Text from 'components/ui/Text';
import InputNumber from 'components/ui2/InputNumber';
import Button from 'components/ui2/Button';
import Tooltip from 'components/ui2/Tooltip';
import RadioGroup from 'components/ui2/RadioGroup';
import Input from 'components/ui2/Input';
import { GroupContainer } from './Common.Styled';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { moneyFormat } from 'utils/formatters/moneyFormat';

const FilterSection = ({
  orari,
  livelliInquadramento,
  indennita,
  filtri,
  setFiltri,
  importiMinimi,
  onClick,
}) => {
  const [openRadioGroup, setOpenRadioGroup] = React.useState(
    !filtri.tipologiaOrario.id || !filtri.livelloContrattuale.id
  );
  let orarioName = orari.filter(el => el.id === filtri.tipologiaOrario.id);
  let livelloName = livelliInquadramento.filter(el => el.id === filtri.livelloContrattuale.id);

  orarioName = orarioName.length > 0 ? orarioName[0].label : '';
  livelloName = livelloName.length > 0 ? livelloName[0].label : '';
  const openCheckBox = [3, 5].indexOf(filtri.tipologiaOrario.id) >= 0;

  filtri.tariffaBase = getObjectValue(importiMinimi, `${filtri.tipologiaOrario.id}.${filtri.livelloContrattuale.id}`, null);
  const handleFiltri = (nomeCampo, value) => {
    setFiltri({
      ...filtri,
      [nomeCampo]: value,
    });
  };

  const getMassimoOre = (tipologiaOrario) => {
    /*
      1 => "Convivenza"
      2 => "Convivenza Ridotta"
      3 => "Non Conviventi (Full time, part time, a ore)"
      4 => "Presenza notturna"
      5 => "WeekEnd"
      6 => "Assistenza Notturna"
    */
    switch (tipologiaOrario) {
      case 1: return 54;
      case 2: return 30;
      case 3:
      case 5:
      case 6: return 40;
      case 4: return 25;
      default: return null;
    }
  };
  
  const maxOreSettimanali = getMassimoOre(filtri.tipologiaOrario.id);
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
        value => (value >= filtri.tariffaBase)),
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

  return (
    <>
      <Text
        tag="h3"
        value="inserisci le informazioni per calcolare il preventivo"
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
                  value="Stai calcolando il preventivo per"
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
                onClick={() => setOpenRadioGroup(true)}
                style={{ textDecoration: 'underline', margin: '0 0 2em 0', cursor: 'pointer', outline: 'none' }}
              >
                <Text
                  tag="span"
                  value="Modifica"
                  size="f7"
                  color="black"
                />
              </div>
            </GroupContainer>
          )
          :
          (
            <React.Fragment>
              <GroupContainer>
                <Text
                  tag="h5"
                  value="tipologia orario"
                  weight="bold"
                  margin="0 0 1em 0"
                  size="f7"
                  color="black"
                  transform="uppercase"
                  letterSpacing="0.05em"
                />
                <RadioGroup
                  radioItems={orari}
                  selectedItem={filtri.tipologiaOrario}
                  //error={touched.tipologiaOrario && erroreTipologiaOrario}
                  onChange={(value) => {
                    //setTouched({...touched,  tipologiaOrario: true}); 
                    handleFiltri('tipologiaOrario', value)
                  }}
                  checkcolor="primary"
                  display="inline-grid"
                />
              </GroupContainer>
              <GroupContainer>
                <Text
                  tag="h5"
                  value="Livello inquadramento"
                  weight="bold"
                  margin="0 0 1em 0"
                  size="f7"
                  color="black"
                  transform="uppercase"
                  letterSpacing="0.05em"
                />
                <RadioGroup
                  selectedItem={filtri.livelloContrattuale}
                  onChange={(value) => {
                    handleFiltri("livelloContrattuale", value)
                  }}
                  radioItems={livelliInquadramento}
                  checkcolor="primary"
                  display="inline-grid"
                />
              </GroupContainer>
            </React.Fragment>
          )
      }
      {
        openCheckBox ?
          (
            <GroupContainer>
              <Text
                tag="h4"
                value="Seleziona le indennità che vorresti applicare"
                weight="bold"
                margin="0 0 1em 0"
                size="f7"
                color="black"
                transform="uppercase"
                letterSpacing="0.05em"
              />
              <Checkbox
                label={`${moneyFormat(indennita.indennitaPranzo, true)} (Pranzo/Colazione)`}
                value={filtri.indennitaPranzo}
                onChange={(value) => handleFiltri('indennitaPranzo', value)}
                checkcolor="primary"
              />
              <Checkbox
                label={`${moneyFormat(indennita.indennitaCena, true)} (Cena)`}
                value={filtri.indennitaCena}
                onChange={(value) => handleFiltri('indennitaCena', value)}
                checkcolor="primary"
              />
              <Checkbox
                label={`${moneyFormat(indennita.indennitaAlloggio, true)} (Alloggio)`}
                value={filtri.indennitaAlloggio}
                onChange={(value) => handleFiltri('indennitaAlloggio', value)}
                checkcolor="primary"
              />
            </GroupContainer>
          )
          : null
      }
      <GroupContainer>
        <Text
          tag="h4"
          value="retribuzione proposta"
          transform="uppercase"
          letterSpacing="0.05em"
          margin="0 0 0.5em 0"
          weight="bold"
          size="f7"
          color="black"
        />
        {
          filtri.tariffaBase ?
            (
              <p style={{ marginBottom: "1em" }}>
                <Text
                  tag="span"
                  value="La paga minima per questo servizio è"
                  weight="bold"
                  size="f8"
                  color="black"
                />
                <Text
                  tag="span"
                  value={moneyFormat(filtri.tariffaBase, true)}
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
          label={'Paga proposta'}
          placeholder={"€" + (filtri.tipologiaOrario.id === 3 || filtri.tipologiaOrario.id === 5 ? "/ora" : "/mese")}
          onChange={(value) => { setTouched({ ...touched, retribuzione: true }); handleFiltri('retribuzione', value) }}
          error={touched.retribuzione && erroreRetribuzione}
          inputValue={filtri.retribuzione}
          type="number"
          required
          min={filtri.tariffaBase || 0}
        />
      </GroupContainer>
      <GroupContainer>
        <Text
          tag="h4"
          value="Ore settimanali"
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
          size="f7"
          color="black"
          margin="0 0 0.5em 0"
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
      <GroupContainer>
        <Tooltip
          position="bottom"
          color="white"
          bgcolor="blue"
          value="Per calcolare il tuo preventivo inserisci le informazioni richieste"
          posAdjustment="0%"
          preventOnHover={!disableButton}
        >
          <Button
            label="Calcola preventivo"
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