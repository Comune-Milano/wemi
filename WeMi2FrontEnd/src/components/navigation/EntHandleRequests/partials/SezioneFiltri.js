import React from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Select from 'components/ui2/Select';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { FilterIndexAdd } from 'redux-modules/actions/entEriActions';
import Switch from 'components/ui2/Switch';
import Button from 'components/ui2/Button';
import Input from 'components/ui2/Input';
import DatePicker from 'components/ui2/DatePicker';
import withAuthentication from 'hoc/withAuthentication';
import moment from 'moment';
import { noop } from 'utils/functions/noop';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { feedbackState, requestStates, serviceTipology } from '../constants';

const SezioneFiltri = ({ isEnte, isFeedback }) => {
  const { dataset, setFormField, errors } = useFormContext();

  return (
    <>
      <Column xs="12" md="10" padding="0">
        <Row fluid margin="1em 0 0" justifycontent="space-between">
          {!isFeedback ? (
            <Column md="4" flex alignitems="top" padding="0" margin="1em 0">
              <Select
                material
                color="blue"
                name="Stato richiesta"
                items={requestStates}
                clickedItem={(value) => {
                  setFormField('statoRichiesta', value);
                }}
                clickedSelectedItem={() => setFormField('statoRichiesta', requestStates[0])}
                selectedValue={dataset.statoRichiesta}
                label="Stato richiesta"
              />
            </Column>
          )
            : null}
          {!isEnte ? (
            <Column md="4" direction="column" alignitems="center" justifycontent="space-between" padding="0" margin="1em 0">
              <Input
                color="blue"
                width="100%"
                material
                error={errors.nomeEnte}
                inputValue={dataset.nomeEnte}
                label="Nome dell'ente"
                onChange={(value) => setFormField('nomeEnte', value)}
                placeholder="Nome ente"
                size="f7"
              />
            </Column>
          ) : null}
        </Row>
        <Row fluid margin="0" justifycontent="space-between">
          <Column md="4" mdShift="1" padding="0" flex alignitems="center" margin="1em 0">
            <Select
              material
              color="blue"
              name="Stato Feedback"
              items={feedbackState}
              clickedItem={(value) => {
                setFormField('statoFeedback', value);
              }}
              clickedSelectedItem={() => setFormField('statoFeedback', feedbackState[0])}
              selectedValue={dataset.statoFeedback}
              label="Stato Feedback"
            />
          </Column>
          <Column md="6" flex alignitems="top" padding="1em 0" margin="1em 0" justifycontent="space-between">
            <Text value="Filtra Richieste con messaggi utente senza risposta" intlFormatter size="f7" padding="0 1em 0 0" color="blue" />
            <Switch
              checkcolor="blue"
              value={dataset.statoChat}
              onChange={(value) => setFormField('statoChat', value)}
              size="f7"
            />
          </Column>
        </Row>
      </Column>

      <Column xs="12" md="10" padding="0">
        <Row fluid margin="1em 0" justifycontent="space-between">
          <Column md="3" direction="column" alignitems="center" mdShift="1" padding="0" margin="1em 0">
            <Input
              color="blue"
              width="100%"
              material
              error={errors.richiedente}
              inputValue={dataset.richiedente}
              label="Richiedente"
              onChange={(value) => setFormField('richiedente', value)}
              placeholder="Nome e cognome del richiedente"
              size="f7"
            />
          </Column>

          <Column md="3" mdShift="1" padding="0" margin="1em 0">
            <DatePicker
              value={moment(dataset.dataRichiesta).format('DD/MM/YYYY')}
              color="blue"
              label="Richieste a partire da:"
              onChange={(value) => { setFormField('dataRichiesta', value); }}
              material
            />
          </Column>

          <Column md="3" alignitems="top" mdShift="1" padding="0" margin="1em 0">
            <Select
              material
              maxLength="15"
              color="blue"
              name="Tipologia Servizio"
              items={serviceTipology}
              clickedItem={(value) => {
                setFormField('tipologia', value);
              }}
              clickedSelectedItem={() => {
                setFormField('tipologia', serviceTipology[0]);
              }}
              selectedValue={dataset.tipologia}
              label="Tipologia"
            />
          </Column>

          <Column xs="12" md="2" alignitems="top" padding="0" margin="1em 0" sizepadding={{ md: '1em 0 0 0' }}>
            <Button
              type="submit"
              color="blue"
              label="cerca"
              onClick={noop}
            />
          </Column>
        </Row>

      </Column>
    </>
  );
};
const mapStoreToProps = (store) => ({
  filtri: store.entEri,
});
const mapDispatchToProps = {
  FilterIndexAdd,
  graphqlRequest,
};

SezioneFiltri.displayName = 'SezioneFiltri';
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(SezioneFiltri));
