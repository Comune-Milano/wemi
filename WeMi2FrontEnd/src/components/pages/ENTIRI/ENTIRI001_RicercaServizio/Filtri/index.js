import React from 'react';

import Text from 'components/ui/Text';
import Slider from 'components/ui2/Slider';
import Switch from 'components/ui2/Switch';
import Checkbox from 'components/ui2/Checkbox';
import InputNumber from 'components/ui2/InputNumber';
import { Row, Column } from 'components/ui/Grid';
import { isNumber } from 'utils/functions/typeCheckers';
import AddressInput from '../BodyHeader/AddressInput';
import {
  TitleRow,
  ShowFilterWrap,
} from './Filtri.styled';

const Filtri = ({
  numeroMinimoPersone,
  numeroMassimoPersone,
  prezzoMax,
  prezzoMin,
  data,
  filtri,
  handleCheckboxes,
  handleSingleFilter,
  addressInputRef,
  indirizzo,
  setIndirizzo,
}) => {
  const [numeroPersone, setNumeroPersone] = React.useState(filtri.quantitaPersone);
  const [numeroUnita, setNumeroUnita] = React.useState(filtri.quantitaUnita);

  const [prezzo, setPrezzo] = React.useState();

  // Every time a new value for the price filter
  // or the max price is provided then the value
  // of the price slider needs an update.
  React.useEffect(
    () => {
      const priceVal = isNumber(filtri.prezzo) && filtri.prezzo <= prezzoMax ?
        filtri.prezzo :
        prezzoMax;

      setPrezzo(Math.ceil(priceVal));
    },
    [filtri.prezzo, prezzoMax]
  );

  const personsFilterLabel = React.useMemo(
    () => {
      if (numeroMinimoPersone > 1) {
        return `
          Questo servizio è disponibile solo in modalità condivisa.
          Scegli con quante persone condividere il servizio.
        `;
      }

      if (numeroPersone > 1) {
        return `
          Hai scelto di richiedere il servizio in modalità condivisa: 
          questo ti permetterà di ottimizzare i costi.
        `;
      }

      if (numeroMassimoPersone > 1) {
        return `
          Aumentando il numero di persone (da due a più)
          scegli di richiedere il servizio in modalità condivisa.
        `;
      }

      return `
        Il servizio è erogato solo in modalità individuale.
        Eventuali variazioni sul numero di persone non avrà riflessi
        sui risultati mostrati;
      `;
    },
    [data.tipologiaServizi, numeroMassimoPersone, numeroMinimoPersone, numeroPersone]
  );

  const updatePersoneFilter = (value) => {
    if (value && isNumber(parseInt(value, 10))) {
      handleSingleFilter('quantitaPersone', parseInt(value, 10));
    }
  };

  const handleChangePersone = value => {
    setNumeroPersone(value);
    updatePersoneFilter(value);
  };

  const updateUnitaFilter = (value) => {
    if (value && isNumber(parseInt(value, 10))) {
      handleSingleFilter('quantitaUnita', parseInt(value, 10));
    }
  };

  const handleChangeUnita = value => {
    setNumeroUnita(value);
    updateUnitaFilter(value);
  };

  const onBlurInputPersone = () => {
    updatePersoneFilter(numeroPersone);
  };

  const onBlurInputUnita = () => {
    updateUnitaFilter(numeroUnita);
  };

  return (
    <>
      <TitleRow>
        <Text
          weight="bold"
          tag="h2"
          value="Personalizza la richiesta"
          intlFormatter
          transform="uppercase"
          letterSpacing="0.05em"
          color="black"
          size="f6"
          margin="0.64rem 0 0 0"
        />
      </TitleRow>
      <AddressInput
        handleValue={(value) => { handleSingleFilter('municipio', value); }}
        indirizzoValue={indirizzo}
        setIndirizzoValue={setIndirizzo}
        addressInputRef={addressInputRef}
      />
      {
        data.tipologiaServizi.misto || data.tipologiaServizi.condiviso ?
        (
          <Row fluid>
            <Column xs="12" padding="1em 0">
              <Text
                tag="h3"
                value="numero di persone"
                color="black"
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                size="f6"
              />
              <Row alignitems="center" margin="1rem 0">
                <InputNumber
                  value={Number.parseInt(numeroPersone, 10) || 0}
                  onChange={handleChangePersone}
                  onInputChange={setNumeroPersone}
                  onInputBlur={onBlurInputPersone}
                  minValue={numeroMinimoPersone}
                  maxValue={numeroMassimoPersone}
                  margin="0 1rem 0 0"
                  ariaLabel="Numero di persone"
                />
                <Text tag="span" value="Persone" />
              </Row>
              <Text
                tag="p"
                value={personsFilterLabel}
                color="darkGrey"
                size="f6"
              />
            </Column>
          </Row>
        )
        : null
      }
      <Row fluid>
        <Column xs="12" padding="1em 0">
          <Text
            tag="h3"
            value={`numero di ${data.serviceData.tipologiaSostantivo} ${data.serviceData.fgGenereMaschile ? 'richiesti' : 'richieste'}`}
            color="black"
            transform="uppercase"
            letterSpacing="0.05em"
            weight="bold"
            size="f6"
          />
          <Row alignitems="center" margin="1rem 0">
            <InputNumber
              value={Number.parseInt(numeroUnita, 10) || 0}
              onChange={handleChangeUnita}
              onInputChange={setNumeroUnita}
              onInputBlur={onBlurInputUnita}
              minValue={1}
              margin="0 1rem 0 0"
              ariaLabel={`numero di ${data.serviceData.tipologiaSostantivo} ${data.serviceData.fgGenereMaschile ? 'richiesti' : 'richieste'}`}
            />
            <Text
              tag="span"
              transform="capitalize"
              value={data.serviceData.tipologiaSostantivo}
            />
          </Row>
        </Column>
      </Row>
      {/** da mostrare se ci sono servizi gratuiti/pagamento */}
      {
        data.tipologiaServizi.gratuito && data.tipologiaServizi.pagamento ?
        (
          <Row fluid>
            <Column xs="12" padding="1em 0">
              <Text
                tag="h3"
                value="prezzo"
                color="black"
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                size="f6"
              />
              <Switch
                value={filtri.gratuito}
                onChange={(value) => handleSingleFilter('gratuito', value)}
                fontSize="f7"
                label="Solo servizi gratuiti"
                spacing="1em 1.5em 0.5em 0"
                checkcolor="primary"
              />
            </Column>
          </Row>
        )
        : null
      }
      {
        prezzoMin !== prezzoMax ? (
          <Row fluid>
            <ShowFilterWrap shown>
              <Text
                weight="bold"
                tag="h2"
                value="Prezzo massimo"
                transform="uppercase"
                letterSpacing="0.05em"
                intlFormatter
                color="black"
                size="f8"
              />
              <Slider
                ariaLabelForHandle="Prezzo massimo"
                ariaValueTextFormatterForHandle={(value) => `Il prezzo selezionato è: ${value} €`}
                width="100%"
                min={prezzoMin}
                max={prezzoMax}
                onChange={value => {
                  setPrezzo(value);
                }}
                getValue={(value) => {
                  setPrezzo(value);
                  handleSingleFilter('prezzo', parseFloat(value, 10), true);
                }}
                value={prezzo}
                margin="1.5em 0"
              />
            </ShowFilterWrap>
          </Row>
        ) : null
      }
      {
        data.filtriFasceOrarie.length ?
          (
            <Row fluid>
              <Column xs="12" padding="1em 0">
                <Text
                  tag="h3"
                  value="Momento della giornata"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  weight="bold"
                  margin="0 0 1em 0"
                  size="f6"
                />
                {
                  data.filtriFasceOrarie.map((fascia) => (
                    <Row fluid key={fascia.id.toString()}>
                      <Checkbox
                        value={filtri.fasceOrarie.includes(fascia.id)}
                        onChange={() => { handleCheckboxes('fasceOrarie', fascia.id); }}
                        label={fascia.label}
                        labelledby={fascia.label}
                        fontSize="f7"
                        checkcolor="primary"
                        width="auto"
                      />
                    </Row>
                  ))
                }
              </Column>
            </Row>
          ) : null
      }
      {
        data.filtriDestinatari.length ?
          (
            <Row fluid>
              <Column xs="12" padding="1em 0">
                <Text
                  value="Destinatari"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  size="f6"
                  weight="bold"
                  tag="h3"
                  margin="0 0 1em 0"
                  color="black"
                />
                {
                  data.filtriDestinatari.map((destinatario) => (
                    <Row fluid key={destinatario.id.toString()}>
                      <Checkbox
                        value={filtri.destinatari.includes(destinatario.id)}
                        onChange={() => { handleCheckboxes('destinatari', destinatario.id); }}
                        label={destinatario.label}
                        labelledby={destinatario.label}
                        fontSize="f7"
                        checkcolor="primary"
                        width="auto"
                      />
                    </Row>
                  ))
                }
              </Column>
            </Row>
          ) : null
      }
      {
        data.filtriMansioni.length ? (
          <Row fluid>
            <Column xs="12" padding="1em 0">
              <Text
                value="Mansioni"
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                color="black"
                tag="h3"
                margin="0 0 1em 0"
                size="f6"
              />
              {
                data.filtriMansioni.map((mansione) => (
                  <Row fluid key={mansione.id.toString()}>
                    <Checkbox
                      value={filtri.mansioni.includes(mansione.id)}
                      onChange={() => { handleCheckboxes('mansioni', mansione.id); }}
                      label={mansione.label}
                      labelledby={mansione.label}
                      fontSize="f7"
                      checkcolor="primary"
                      width="auto"
                    />
                  </Row>
                ))
              }
            </Column>
          </Row>
        ) : null
      }
    </>
  );
};

Filtri.displayName = 'Filtri';

export default React.memo(Filtri);
