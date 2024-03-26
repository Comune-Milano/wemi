/** @format */

import React, { useEffect, useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import Text from 'components/ui/Text';
import NavLink from 'components/router/NavLink';
import TextArea from 'components/ui2/TextArea';
import RadioGroup from 'components/ui2/RadioGroup';
import yup from 'libs/Form/validation/yup';
import { transformsFloatingValue } from 'libs/trasformers/numberTrasformers';
import Button from 'components/ui2/Button';
import DatePicker from 'components/ui2/DatePicker';
import withAuthentication from 'hoc/withAuthentication';
import { Form } from 'libs/Form/components/Form';
import styled from 'styled-components';
import moment from 'moment';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { accettaRichiestaServizioEnte as accettaRichiestaServizioEnteM } from './graphql/FormAccettazioneGraphql';
const FormInput = ({
  datiRichiesta,
}) => {
  const [initialFormDataset, setInitialFormDataset] = useState();
  const updateDatiRichiestaEnte = useStatelessGraphQLRequest(accettaRichiestaServizioEnteM);


  useEffect(() => {
    if (datiRichiesta) {
      const initialImportoValue = `${getObjectValue(datiRichiesta, 'im_costo_totale_calcolato', '')}`.replace('.', ',');

      setInitialFormDataset({
        fromDate: getObjectValue(datiRichiesta, 'richiestaServizioBase.dt_periodo_richiesto_dal', moment().add(1, 'days')),
        toDate: getObjectValue(datiRichiesta, 'richiestaServizioBase.dt_periodo_richiesto_al', moment().add(1, 'days')),
        importoValue: initialImportoValue,
        fgAltreModPagamento: true,
      });
    }
  }, [datiRichiesta.data]);

  const ColumnDate = styled(Column)`
position: relative;
`;

  const radioArr = [
    {
      id: 1,
      label: '24h',
    },
    {
      id: 2,
      label: '48h',
    },
    {
      id: 3,
      label: '72h',
    },
    {
      id: 4,
      label: '7 giorni',
    },
    {
      id: 5,
      label: '45 giorni',
    },
  ];

  const creaDataScadenza = (id) => {
    const TimeStamp = new Date();
    const ora = TimeStamp.getTime();
    let scadenzaMil;
    switch (id) {
      case 1:
        {
          scadenzaMil = ora + 24 * 3600000;
          break;
        }
      case 2:
        {
          scadenzaMil = ora + 48 * 3600000;
          break;
        }
      case 3:
        {
          scadenzaMil = ora + 72 * 3600000;
          break;
        }
      case 4:
        {
          scadenzaMil = ora + 168 * 3600000;
          break;
        }
      case 5:
        {
          scadenzaMil = ora + 1080 * 3600000;
          break;
        }
      default: scadenzaMil = 0;
    }
    return moment(scadenzaMil).format();
  };

  const maxLengthBoxModPagamento = 800;

  const formValidationSchema = yup.object().shape({
    fgAltreModPagamento: yup.boolean(),
    fromDate: yup
    .date()
    .typeError('Formato errato')
    .min(moment().startOf('day').toDate(), 'Inserire una data valida')
    .required(),
    importoValue: yup
      .number()
      .transform((_, value) => transformsFloatingValue(value))
      .positive()
      .max(100000, 'Inserire un importo valido ')
      .min(0, 'Inserire un importo valido ')
      .typeError('Inserire un importo valido')
      .required(),
    modPagamento: yup
      .string()
      .when('importoValue',
      {
        is: (value) => value > 0,
        then: mp => mp
        .max(maxLengthBoxModPagamento, `Sono stati inseriti più di ${maxLengthBoxModPagamento} caratteri`)
        .required('Inserire la modalità di pagamento concordata'),
      }),
    nominativoOperatore: yup
      .string()
      .typeError('Inserire un nominativo Operatore valido'),
    toDate: yup
      .date()
      .typeError('Formato errato')
      .required()
      .when(
        'fromDate',
        (fromDate, formvalidationSchema) => (fromDate && formvalidationSchema.min(fromDate, 'Inserire una data maggiore '))
      ),
    valueRadio: yup.object()
      .shape({
        id: yup.number().required(),
        label: yup.string().required(),
      }),
  });


  return (
    <>
      <Row fluid>
        {initialFormDataset && (
        <Form
          initialDataset={initialFormDataset}
          validationSchema={formValidationSchema}
          onChangeValidationDebounce={100}
          validateOnChange
        >
          {
            ({ dataset, isFormValid, touched, setFormField, handleFieldBlur, errors }) => (
              <>
                <Row fluid margin="1em 0">
                  <Column xs="12" md="4" lg="4" padding="0 2em 0 0" flex alignitems="center">
                    <Text
                      value="Durata della validità disponibilità:"
                      weight="bold"
                      transform="uppercase"
                      letterSpacing="0.05em"
                      color="primary"
                    />
                  </Column>
                  <Column xs="12" md="8" padding="0">
                    <RadioGroup
                      radioItems={radioArr}
                      width="auto"
                      selectedItem={dataset.valueRadio}
                      onChange={(value) => setFormField('valueRadio', value)}
                      // onBlur={() => handleFieldBlur('valueRadio')}
                      display="inline-flex"
                      spacing="0 1em 0 0"
                      fontSize="f7"
                      checkcolor="primary"
                    />
                  </Column>
                </Row>
                {Number(dataset.importoValue.replace(/,/, '.')) > 0 && (
                <Row fluid margin="2em 0 0 0">
                  <Column xs="12" md="7" padding="0">
                    <TextArea
                      onChange={(value) => { setFormField('modPagamento', value); }}
                      inputValue={dataset.modPagamento}
                      required
                      label="Modalità di pagamento concordata"
                      maxLength={maxLengthBoxModPagamento}
                      placeholder="Scrivi qui la modalità di pagamento concordata (es. pagamento in sede, con voucher, con bonifico bancario su IBAN..., etc.)"
                    />
                  </Column>
                </Row>
              )}
                <Row fluid margin="0">
                  <Column xs="12" md="3" padding="2em 0 0">
                    <Input
                      required
                      onBlur={() => { handleFieldBlur('importoValue'); }}
                      error={touched.importoValue && errors.importoValue}
                      inputValue={`${dataset.importoValue}`}
                      label="Importo Totale"
                      onChange={(value) => {
                        if (!value || Number(value) === 0) {
                          setFormField('modPagamento', undefined);
                        }
                        setFormField('importoValue', value);
                      }}
                    />
                  </Column>
                  <Column xs="12" md="3" mdShift="1" padding="2em 0 0">
                    <Input
                      onBlur={() => { handleFieldBlur('nominativoOperatore'); }}
                      inputValue={dataset.nominativoOperatore}
                      error={touched.name && errors.name}
                      label="Nominativo operatore"
                      onChange={(value) => setFormField('nominativoOperatore', value)}
                    />
                  </Column>
                </Row>
                <Row fluid margin="0">
                  <ColumnDate xs="12" md="3" padding="2em 0 0">
                    <DatePicker
                      required
                      selectedDate={moment(dataset.fromDate).format('DD/MM/YYYY')}
                      onBlur={() => handleFieldBlur('fromDate')}
                      onChange={(value) => setFormField('fromDate', value)}
                      label="Dal giorno"
                      error={touched.fromDate && errors.fromDate}
                    />
                  </ColumnDate>
                  <ColumnDate xs="12" md="3" mdShift="1" padding="2em 0 0">
                    <DatePicker
                      required
                      selectedDate={moment(dataset.toDate).format('DD/MM/YYYY')}
                      onBlur={() => handleFieldBlur('toDate')}
                      onChange={(value) => setFormField('toDate', value)}
                      label="Al giorno"
                      error={touched.toDate && errors.toDate}
                    />

                  </ColumnDate>
                </Row>
                <Row fluid margin=" 0">
                  <Column xs="12" md="7" padding="2em 0 0">
                    <TextArea
                      onChange={(value) => { setFormField('TextArea', value); }}
                      inputValue={dataset.TextArea}
                      label="Informazioni Aggiuntive"
                      maxLength={STRING_MAX_VALIDATION.value}
                      placeholder="Scrivi qui le informazioni aggiuntive"
                    />
                  </Column>
                </Row>
                <Row fluid margin="1em 0">
                  <Column xs="12" md="7" padding="0">
                    <Row fluid justifycontent="space-between">
                      <Column xs="4" padding="1em 0">
                        <NavLink
                          width="100%"
                          to={`/e/${window.location.pathname.split('e/')[1].split('/handleRequests')[0]}/handleRequests`}
                        >
                          <Button
                            type="button"
                            label="Annulla"
                            name="cancel"
                          />
                        </NavLink>
                      </Column>

                      <Column xs="4" padding="1em 0">
                        {isFormValid ? (
                          <NavLink
                            width="100%"
                            to={`/e/${window.location.pathname.split('e/')[1].split('/handleRequests')[0]}/handleRequests`}
                          >
                            <Button
                              type="button"
                              label="Conferma"
                              name="send-button"
                              onClick={async () => {
                                updateDatiRichiestaEnte({
                                  datiUpdate: {
                                    idRichiestaEnte: datiRichiesta.id_richiesta_servizio_ente,
                                    validita: creaDataScadenza(dataset.valueRadio.id),
                                    cognomeLavoratore: dataset.surname,
                                    nominativoOperatore: dataset.nominativoOperatore,
                                    importoTotale: transformsFloatingValue(dataset.importoValue),
                                    disponibilitaDa: moment(dataset.fromDate).format('YYYY-MM-DD'),
                                    disponibilitaA: moment(dataset.toDate).format('YYYY-MM-DD'),
                                    infoAggiuntive: dataset.TextArea ?
                                    `${dataset.TextArea}
${!dataset.modPagamento ? '' : `MODALITÀ DI PAGAMENTO CONCORDATA: ${dataset.modPagamento}`}` :
`${dataset.modPagamento ? `MODALITÀ DI PAGAMENTO CONCORDATA: ${dataset.modPagamento}` : ''}`,
                                    fgAltreModPagamento: dataset.fgAltreModPagamento ? '1' : '0',
                                  },
                                });
                              }
                            }
                            />
                          </NavLink>
                          ) : (
                            <Button
                              type="button"
                              label="Conferma"
                              name="disabled-button"
                              disabled
                            />
                          )}

                      </Column>

                    </Row>

                  </Column>
                </Row>

              </>
            )
          }
        </Form>
      )}
      </Row>
    </>
  );
};


FormInput.displayName = 'FormInput';

export default withAuthentication(FormInput);
