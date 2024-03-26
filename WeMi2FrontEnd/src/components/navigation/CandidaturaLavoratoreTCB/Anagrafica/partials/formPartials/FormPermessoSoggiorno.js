/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import DatePicker from 'components/ui2/DatePicker';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import RadioGroup from 'components/ui2/RadioGroup';
import moment from 'moment';

const RadioItems = [
  {
    id: 1,
    label: 'Si (specificare le informazioni del permesso di soggiorno)'
  },
  {
    id: 2,
    label: 'No',
  },
];

const RadioItemsDataScadenza = [
  {
    id: 1,
    label: 'Si, ho fatto la richiesta di rinnovo'
  },
  {
    id: 2,
    label: 'No, non ho fatto la richiesta di rinnovo',
  },
];



const FormPermessoSoggiorno = ({
  dataset,
  setFormField,
  errors,
  touched,
  handleFieldBlur,
}) => {
  
  // constante con la quale abbiamo il controllo se la data di scadenza è minore della data odierna
  const isDataScadenzaBeforeToday = moment(dataset.dataScadenza).startOf('day').toDate() < moment().startOf('day').toDate();

  return (
    <>
      <Row fluid justifycontent="space-between">
        <GroupFieldTitle
          title="permesso di soggiorno"
        />
        <Row fluid>
          <RadioGroup
            radioItems={RadioItems}
            onBlur={() => handleFieldBlur('permessoSoggiorno.checkPermessoSoggiorno')}
            error={touched['permessoSoggiorno.checkPermessoSoggiorno'] && errors['permessoSoggiorno.checkPermessoSoggiorno']}
            selectedItem={RadioItems.find(el => el.id === dataset.checkPermessoSoggiorno)}
            onChange={(value) => {
              setFormField('permessoSoggiorno', {
                checkRichiestaRinnovo: dataset.checkRichiestaRinnovo,
                dataRichiestaRinnovo: dataset.dataRichiestaRinnovo,
                checkPermessoSoggiorno: value.id,
                motivo: dataset.motivo,
                numero: dataset.numero,
                dataRilascio: dataset.dataRilascio,
                dataScadenza: dataset.dataScadenza,
                rilasciatoDa: dataset.rilasciatoDa,
              })
            }}
            fontSize="f7"
            checkcolor="primary"
            display="inline-grid"
            style={{ width: 'fit-content' }}
          />
        </Row>
      </Row>

      {dataset.checkPermessoSoggiorno === 1 ?
        (
          <>
            <Row fluid margin="1em 0 0 0">
              <Column xs="12" md="6" padding="0 1em 1em 0">
                <Input
                  label="Motivo del permesso di soggiorno"
                  onChange={(value) => {
                    setFormField('permessoSoggiorno', {
                      checkRichiestaRinnovo: dataset.checkRichiestaRinnovo,
                      dataRichiestaRinnovo: dataset.dataRichiestaRinnovo,
                      checkPermessoSoggiorno: dataset.checkPermessoSoggiorno,
                      motivo: value,
                      numero: dataset.numero,
                      dataRilascio: dataset.dataRilascio,
                      dataScadenza: dataset.dataScadenza,
                      rilasciatoDa: dataset.rilasciatoDa,
                    });
                  }}
                  onBlur={() => { handleFieldBlur('permessoSoggiorno.motivo'); }}
                  inputValue={dataset.motivo}
                  error={touched['permessoSoggiorno.motivo'] && errors['permessoSoggiorno.motivo']}
                  required
                />
              </Column>
              <Column xs="12" md="6" padding="0 1em 1em 0">
                <Input
                  label="N° permesso di soggiorno"
                  onChange={(value) => {
                    setFormField('permessoSoggiorno', {
                      checkRichiestaRinnovo: dataset.checkRichiestaRinnovo,
                      dataRichiestaRinnovo: dataset.dataRichiestaRinnovo,
                      checkPermessoSoggiorno: dataset.checkPermessoSoggiorno,
                      motivo: dataset.motivo,
                      numero: value,
                      dataRilascio: dataset.dataRilascio,
                      dataScadenza: dataset.dataScadenza,
                      rilasciatoDa: dataset.rilasciatoDa,
                    });
                  }}
                  onBlur={() => { handleFieldBlur('permessoSoggiorno.numero'); }}
                  inputValue={dataset.numero}
                  error={touched['permessoSoggiorno.numero'] && errors['permessoSoggiorno.numero']}
                  required
                />
              </Column>
              <Column xs="12" md="6" padding="0 1em 1em 0">
                <DatePicker
                  required
                  label="Data di rilascio"
                  onBlur={() => handleFieldBlur('permessoSoggiorno.dataRilascio')}
                  onChange={(day) => {
                    setFormField('permessoSoggiorno', {
                      checkRichiestaRinnovo: dataset.checkRichiestaRinnovo,
                      dataRichiestaRinnovo: dataset.dataRichiestaRinnovo,
                      checkPermessoSoggiorno: dataset.checkPermessoSoggiorno,
                      motivo: dataset.motivo,
                      numero: dataset.numero,
                      dataRilascio: day,
                      dataScadenza: dataset.dataScadenza,
                      rilasciatoDa: dataset.rilasciatoDa,
                    });
                  }}
                  selectedDate={dataset.dataRilascio}
                  error={touched['permessoSoggiorno.dataRilascio'] && errors['permessoSoggiorno.dataRilascio']}
                />
              </Column>
              <Column xs="12" md="6" padding="0 1em 1em 0">
                <Input
                  label="Rilasciato dalla questura di"
                  onChange={(value) => {
                    setFormField('permessoSoggiorno', {
                      checkRichiestaRinnovo: dataset.checkRichiestaRinnovo,
                      dataRichiestaRinnovo: dataset.dataRichiestaRinnovo,
                      checkPermessoSoggiorno: dataset.checkPermessoSoggiorno,
                      motivo: dataset.motivo,
                      numero: dataset.numero,
                      dataRilascio: dataset.dataRilascio,
                      dataScadenza: dataset.dataScadenza,
                      rilasciatoDa: value,
                    });
                  }}
                  inputValue={dataset.rilasciatoDa}
                  onBlur={() => { handleFieldBlur('permessoSoggiorno.rilasciatoDa'); }}
                  error={touched['permessoSoggiorno.rilasciatoDa'] && errors['permessoSoggiorno.rilasciatoDa']}
                  required
                />
              </Column>
              <Column xs="12" md="6" padding="0 1em 1em 0">
                <DatePicker
                  required
                  label="Data di scadenza"
                  onBlur={() => handleFieldBlur('permessoSoggiorno.dataScadenza')}
                  onChange={(day) => {
                    setFormField('permessoSoggiorno', {
                      checkRichiestaRinnovo: !isDataScadenzaBeforeToday ? dataset.checkRichiestaRinnovo : false,
                      dataRichiestaRinnovo: dataset.dataRichiestaRinnovo,
                      checkPermessoSoggiorno: dataset.checkPermessoSoggiorno,
                      motivo: dataset.motivo,
                      numero: dataset.numero,
                      dataRilascio: dataset.dataRilascio,
                      dataScadenza: day,
                      rilasciatoDa: dataset.rilasciatoDa,
                    });
                  }}
                  selectedDate={dataset.dataScadenza}
                  marginTooltip="0 0 0 15.5em"
                  error={touched['permessoSoggiorno.dataScadenza'] && errors['permessoSoggiorno.dataScadenza']}
                />
              </Column>
            </Row>
            {isDataScadenzaBeforeToday ?
            <Row fluid margin="1em 0 0 0" >
            <RadioGroup
              radioItems={RadioItemsDataScadenza}
              selectedItem={RadioItemsDataScadenza.find(el => 
              dataset.checkRichiestaRinnovo ? el.id === 1 : el.id === 2)}
              onChange={(value) => {
                if (value.id) {
                  setFormField('permessoSoggiorno', {
                            checkRichiestaRinnovo: value.id === 1,
                            dataRichiestaRinnovo: dataset.dataRichiestaRinnovo,
                            checkPermessoSoggiorno: dataset.checkPermessoSoggiorno,
                            motivo: dataset.motivo,
                            numero: dataset.numero,
                            dataRilascio: dataset.dataRilascio,
                            dataScadenza: dataset.dataScadenza,
                            rilasciatoDa: dataset.rilasciatoDa,
                          });
                        }
              }}
              fontSize="f7"
              checkcolor="primary"
              display="inline-grid"
            />
          </Row>
              : null
            }
            {(dataset.checkRichiestaRinnovo && isDataScadenzaBeforeToday) &&
                <Column xs="12" md="6" padding="1em 1em 1em 0">
                  <DatePicker
                    required
                    label="Data della richiesta di rinnovo"
                    onBlur={() => handleFieldBlur('permessoSoggiorno.dataRichiestaRinnovo')}
                    onChange={(day) => {
                      setFormField('permessoSoggiorno', {
                        checkRichiestaRinnovo: dataset.checkRichiestaRinnovo,
                        dataRichiestaRinnovo: day,
                        checkPermessoSoggiorno: dataset.checkPermessoSoggiorno,
                        motivo: dataset.motivo,
                        numero: dataset.numero,
                        dataRilascio: dataset.dataRilascio,
                        dataScadenza: dataset.dataScadenza,
                        rilasciatoDa: dataset.rilasciatoDa,
                      });
                    }}
                    selectedDate={dataset.dataRichiestaRinnovo}
                    error={touched['permessoSoggiorno.dataRichiestaRinnovo'] && errors['permessoSoggiorno.dataRichiestaRinnovo']}
                  />
                </Column>}
          </>
        )
        : null}
    </>
  );
};

FormPermessoSoggiorno.displayName = 'FormPermessoSoggiorno';

export default FormPermessoSoggiorno;
