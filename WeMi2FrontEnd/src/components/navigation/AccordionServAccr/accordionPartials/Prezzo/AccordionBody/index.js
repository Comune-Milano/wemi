import React from 'react';
import moment from 'moment';
import { Row, Column } from 'components/ui/Grid';
import Hr from 'components/ui/Hr';
import Text from 'components/ui/Text';
import Input from 'components/ui2/Input';
import DatePicker from 'components/ui2/DatePicker';
import Button from 'components/ui2/Button';
import Modal from 'components/ui2/Modal';

import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import RadioGroup from 'components/ui2/RadioGroup';
import TextArea from 'components/ui2/TextArea';
import ModalePrezzi from 'components/shared/ModalePrezziServizio';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import ListinoPrezzi from './ListinoPrezzi';
import SimulatorePrezzo from './SimulatorePrezzo';
import { BorderedRow } from './prezzo.styled';

const radioGroupGratuitoPagamento = [
  { id: 3, label: 'Pagamento' },
  { id: 0, label: 'Gratuito' },
];
const radioGroupGratuito = [
  { id: 1, label: 'Pagato attraverso finanziamento' },
  { id: 2, label: 'Con volontari' },
];

const getSelectedGratuitoPagamento = codice => {
  switch (codice) {
    case 1:
    case 2:
      return { id: 0 };
    case 3:
      return { id: 3 };
    default: return {};
  }
};

const getSelectedGratuito = codice => {
  switch (codice) {
    case 1: return { id: 1 };
    case 2: return { id: 2 };
    default: return {};
  }
};

const calcolaPrezzo = (listinoPrezzi) => {
  const individuale = listinoPrezzi.find(el => (
    el.qtPersoneDa === 1
  ));
  let prezzoIndividuale = null;
  let prezzoCondiviso = Number.POSITIVE_INFINITY;
  if (individuale && individuale.offerta.length > 0) {
    prezzoIndividuale = individuale.offerta.reduce((acc, el) => (
      acc > el.valore ? el.valore : acc
    ), Number.POSITIVE_INFINITY);
  }
  for (let i = 0; i < listinoPrezzi.length; i += 1) {
    const el = listinoPrezzi[i];
    if (!(el.qtPersoneA === 1 && el.qtPersoneDa === 1)) {
      const min = el.offerta.reduce((acc, of) => (
        acc > of.valore / el.qtPersoneA ? of.valore / el.qtPersoneA : acc
      ), Number.POSITIVE_INFINITY);
      prezzoCondiviso = prezzoCondiviso > min ? min : prezzoCondiviso;
    }
  }
  prezzoCondiviso = prezzoCondiviso === Number.POSITIVE_INFINITY ? null : prezzoCondiviso;
  return [prezzoIndividuale, prezzoCondiviso];
};

const PrezzoBody = ({
  Form,
  SetForm,
  Modifica,
  userProfile,
}) => {
  const [openSimulatorePrezzo, setOpenSimulatorePrezzo] = React.useState(false);
  const [openModalePrezzo, setOpenModalePrezzo] = React.useState(false);
  const [selectedRadioGratuitoPagamento, setSelectedRadioGratuitoPagamento] = React.useState(
    getSelectedGratuitoPagamento(Form.cdTipoOffertaServizio)
  );
  const [selectedRadioGratuito, setSelectedRadioGratuito] = React.useState(
    getSelectedGratuito(Form.cdTipoOffertaServizio)
  );
  const isAmministratore = checkAdmin(userProfile.datiLogin);

  // struttura json per dati prezzo
  const priceModalData = {
    EstraiDettaglioAmministrativoServizioEnte: {
      service: Form.service,
      js_dati_prezzo: { ...Form },
      ente: {
        nm_ente: Form.nomeEnte,
      },
    },
  };
  const handleRadioGratuitoPagamento = radio => {
    setSelectedRadioGratuitoPagamento(radio);
    updateState({
      cdTipoOffertaServizio: radio.id,
      txTitoloFinanziamento: '',
      listinoPrezzi: [],
    });
    if (radio.id === 3) {
      setSelectedRadioGratuito({});
    }
  };

  const updateField = field => (
    (value) => {
      SetForm(oldState => ({
        ...oldState,
        [field]: value,
      }));
    }
  );

  const updateState = state => {
    SetForm(oldState => ({
      ...oldState,
      ...state,
    }));
  };
  const pagamento = selectedRadioGratuitoPagamento.id === 3;
  const finanziamento = selectedRadioGratuito.id === 1;
  const volontari = selectedRadioGratuito.id === 2;
  const [prezzoIndividuale, prezzoCondiviso] = calcolaPrezzo(Form.listinoPrezzi);
  let labelPrezzoMinimo = "Il prezzo minimo dell'offerta calcolato è ";
  if (!(prezzoIndividuale || prezzoCondiviso)) {
    labelPrezzoMinimo = 'Nessuna offerta selezionata';
  }

  const showWarningMinQt = Form.listinoPrezzi.some(prezzo => (
    prezzo.offerta.some(offerta => offerta.qtUnitaDa < Form.qtMinimaUnita)
  ));
  return (
    <>
      <Row fluid>
        <Column xs="12" md="4">
          <Row>
            <RadioGroup
              disabled={!Modifica.campi}
              radioItems={radioGroupGratuitoPagamento}
              selectedItem={selectedRadioGratuitoPagamento}
              onChange={handleRadioGratuitoPagamento}
              checkcolor="blue"
            />
          </Row>
          <Row>
            <Column xs="12" padding="0 0 0 20px">
              {
                selectedRadioGratuitoPagamento.id === 0 ?
                (
                  <RadioGroup
                    disabled={!Modifica.campi}
                    radioItems={radioGroupGratuito}
                    selectedItem={selectedRadioGratuito}
                    onChange={(radio) => {
                      updateState({
                        cdTipoOffertaServizio: radio.id,
                        txTitoloFinanziamento: '',
                        listinoPrezzi: [],
                      });
                      setSelectedRadioGratuito(radio);
                    }}
                    checkcolor="blue"
                  />
                )
                : null
              }
            </Column>
          </Row>
        </Column>
        <Column xs="12" md="8">
          <BorderedRow>
            <Column xs="5" padding="0">
              <Text
                value="Tipologia unità prezzo"
                size="f6"
                color="darkGrey"
              />
            </Column>
            <Column xs="7" padding="0">
              <Text
                value={Form.unitaPrezzo}
                size="f6"
                weight="bold"
                color="darkGrey"
              />
            </Column>
          </BorderedRow>
          {
            finanziamento ?
            (
              <BorderedRow>
                <Column xs="5" padding="0">
                  <Text
                    value="Inserire riferimento al finanziamento"
                    size="f6"
                    color="darkGrey"
                  />
                </Column>
                <Column xs="7" padding="0">
                  <Input
                    required
                    disabled={!Modifica.campi}
                    hoverColor="blue"
                    color="blue"
                    label="titolo finanziamento"
                    inputValue={Form.txTitoloFinanziamento}
                    onChange={updateField('txTitoloFinanziamento')}
                  />
                </Column>
              </BorderedRow>
            )
            : null
          }
          <BorderedRow flex justifycontent="space-between">
            <Column xs="3" padding="0">
              <Text
                value="Periodo di validità"
                size="f6"
                color="darkGrey"
              />
            </Column>
            <Column xs="4" padding="0">
              <DatePicker
                required
                color="blue"
                hoverColor="blue"
                disabled={!Modifica.campi}
                label="Da"
                selectedDate={Form.dataInizio}
                onChange={updateField('dataInizio')}
              />
            </Column>
            <Column xs="4" padding="0">
              <DatePicker
                color="blue"
                hoverColor="blue"
                disabled={!Modifica.campi}
                label="A"
                selectedDate={Form.dataFine}
                error={Form.dataFine && moment(Form.dataInizio).isAfter(moment(Form.dataFine)) ? 'La data di fine deve essere successiva alla data di inizio' : null}
                onChange={updateField('dataFine')}
              />
            </Column>
          </BorderedRow>
          {/* <BorderedRow>
            <Column xs="8" padding="0">
              <Row>
                <Text
                  value="Servizio erogabile per minimo numero unità"
                  size="f6"
                  color="darkGrey"
                />
              </Row>
              {
                showWarningMinQt ?
                (
                  <Row>
                    <Text
                      value="Alcuni intervalli di unità inseriti non rispettano questa limitazione, verifica il risultato sul RIEPILOGO PREZZI."
                      size="f6"
                      color="red"
                      weight="bold"
                    />
                  </Row>
                )
                : null
              }
            </Column>
            <Column xs="3" padding="0">
              <Input
                disabled={!Modifica.campi}
                hoverColor="blue"
                type="number"
                color="blue"
                label="N° minimo unità"
                inputValue={Form.qtMinimaUnita}
                onChange={updateField('qtMinimaUnita')}
              />
            </Column>
          </BorderedRow> */}
          <BorderedRow>
            {
              pagamento ?
              (
                <Column xs="12" padding="0">
                  <Text
                    value={labelPrezzoMinimo}
                    size="f6"
                    color="darkGrey"
                  />
                  {
                    prezzoIndividuale && prezzoCondiviso ?
                    (
                      <>
                        <Text
                          value={`€${prezzoIndividuale.toFixed(2)}`}
                          size="f6"
                          weight="bold"
                          color="darkGrey"
                        />
                        <Text
                          value=" individuale "
                          size="f6"
                          color="darkGrey"
                        />
                        <Text
                          value={`€${prezzoCondiviso.toFixed(2)}`}
                          size="f6"
                          weight="bold"
                          color="darkGrey"
                        />
                        <Text
                          value=" condiviso"
                          size="f6"
                          color="darkGrey"
                        />
                      </>
                    )
                    :
                    null
                  }
                  {
                    !(prezzoIndividuale && prezzoCondiviso) && (prezzoIndividuale || prezzoCondiviso) ?
                    (
                      <Text
                        value={`€${(prezzoCondiviso || prezzoIndividuale).toFixed(2)}`}
                        size="f6"
                        weight="bold"
                        color="darkGrey"
                      />
                    )
                    :
                    null
                  }
                </Column>
              )
              : null
            }
          </BorderedRow>
        </Column>
      </Row>
      <Row fluid>
        <Column xs="12" md="6">
          <Text
            value="Inserisci il tuo listino"
            size="f3"
            color="blue"
          />
          <Hr width="100%" height="1px" color="grey" top="0px" bottom="0.2em" />
        </Column>
        <Column xs="12" md="3">
          <Button
            color="blue"
            label="riepilogo prezzi"
            width="auto"
            onClick={() => { setOpenModalePrezzo(true); }}
          />
        </Column>
        <Column xs="12" md="3">
          <Button
            color="blue"
            label="Simulatore spesa"
            width="auto"
            disabled={finanziamento || volontari}
            onClick={() => { setOpenSimulatorePrezzo(true); }}
          />
        </Column>
      </Row>
      <Row>
        <Column xs="12">
          <ListinoPrezzi
            listino={Form.listinoPrezzi}
            setListino={updateField('listinoPrezzi')}
            isFree={finanziamento || volontari}
            disabled={!Modifica.campi}
          />
        </Column>
      </Row>
      <Row>
        <Column xs="12">
          <TextArea
            disabled={!Modifica.campi}
            label="Note relative al prezzo"
            hoverColor="blue"
            color="blue"
            inputValue={Form.txNoteAlPrezzo}
            onChange={updateField('txNoteAlPrezzo')}
          />
        </Column>
      </Row>
      {
          Form.note || isAmministratore ? (
            <Row>
              <Column xs="12">
                <TextArea
                  disabled={!Modifica.note}
                  label="Indicazioni della redazione wemi"
                  bgColor="yellow"
                  bgAlpha={0.2}
                  hoverColor="blue"
                  color="blue"
                  inputValue={Form.note}
                  onChange={updateField('note')}
                />
              </Column>
            </Row>
    )
      : null }
      <Modal
        title="SIMULATORE DI SPESA"
        width="60%"
        open={openSimulatorePrezzo}
        setOpenModal={setOpenSimulatorePrezzo}
        color="blue"
      >
        {
          openSimulatorePrezzo ?
          (
            <SimulatorePrezzo
              listinoPrezzi={Form.listinoPrezzi}
              qtMinimaUnita={Form.qtMinimaUnita}
            />
          )
          : null
        }
      </Modal>
      <ModalePrezzi
        externalData={priceModalData}
        open={openModalePrezzo}
        setOpen={() => setOpenModalePrezzo(false)}
      />
    </>
  );
};

PrezzoBody.displayName = 'Body prezzo';


export default withAuthentication(PrezzoBody);
