import React, { Fragment } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import WeekCalendarTimePicker from 'components/ui2/WeekCalendarTimePicker';
import Text from 'components/ui/Text';
import TextArea from 'components/ui2/TextArea';
import { defaultCalendar } from 'components/pages/SchedaEntePage/constants';

const FormCitizenAvailabilityComponent = ({
  dataset = {},
  touched = {},
  errors = {},
  handleFieldBlur,
  disabled,
  setDataset,
  keySection,
}) => (
  <Fragment>
    <Row fluid>
      <Column xs="12" md="6" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
        <Input
          tabIndex="0"
          label="E-mail"
          required
          error={touched.email && errors.email ?
              errors.email : ''}
          inputValue={dataset.email}
          disabled={disabled}
          onChange={(value) => setDataset('email', value)}
          onBlur={() => handleFieldBlur(`${keySection}.email`)}
        />
      </Column>
      <Column xs="12" md="6" padding="0">
        <Input
          tabIndex="0"
          label="Telefono"
          required
          error={touched.phoneNumber && errors.phoneNumber ?
              errors.phoneNumber : ''}
          inputValue={dataset.phoneNumber}
          disabled={disabled}
          onChange={(value) => setDataset('phoneNumber', value)}
          onBlur={() => handleFieldBlur(`${keySection}.phoneNumber`)}
        />
      </Column>
    </Row>
    <Row fluid margin="2em 0 0 0">
      {touched.calendario && errors.calendario ?
          (
            <Text
              value={errors.calendario}
              color="red"
              size="f7"
              weigth="bold"
            />
          )

          : null}
      <WeekCalendarTimePicker
        disabled={disabled}
        hideRadio
        error={!!(touched.calendario && errors.calendario)}
        calendar={{ ...defaultCalendar, ...dataset.calendario }}
        sizeLabelDay="f7"
        labelDisabilita="Non disponibile"
        onChange={async (range) => {
          const newObj = {
            ...dataset.calendario,
            ...range,
          };

          await setDataset(
              'calendario',
              newObj
            );
          await handleFieldBlur(`${keySection}.calendario`);
        }}
        bgColor="white"
      />
    </Row>
    <Row fluid margin="2em 0 0 0">
      <TextArea
        label="Note"
        inputValue={dataset.firstContactNote}
        onChange={(newValue) => {
          setDataset('firstContactNote', newValue);
        }}
        disabled={disabled}
      />
    </Row>
  </Fragment>
  );


FormCitizenAvailabilityComponent.displayName = 'Form citizen availability component';

export const FormCitizenAvailability = FormCitizenAvailabilityComponent;
