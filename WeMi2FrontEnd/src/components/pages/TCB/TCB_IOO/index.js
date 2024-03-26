/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Row } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import yup from 'libs/Form/validation/yup';
import withAuthentication from 'hoc/withAuthentication';
import Wrapper from 'components/navigation/NavigationWrapper';
import InserimentoCandidatura from 'components/navigation/InserimentoCandidaturaTCB_IOO';
import Header from 'components/ui2/Header';
import { fiscalCodeRegex, emailRegex } from 'libs/Form/validation/regex';

import { Form } from 'libs/Form/components/Form';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import checkAdmin from 'utils/functions/checkAdmin';
import { withRouter } from 'react-router';
import { PAGE_HOME_URL } from 'types/url';

const TCB_IOO = ({
    locale,
    userProfile,
    loaded,
    history
}) => {
  const { datiLogin } = userProfile;

  const formValidationSchema = yup.object().shape({
    codicefiscale: yup
            .string()
            .typeError('Codice fiscale non valido.')
            .required()
            .matches(fiscalCodeRegex, 'Codice fiscale non valido.'),
        nome: yup
            .string()
            .typeError('Inserire un nome valido')
            .required(),
    cognome: yup
            .string()
            .typeError('Inserire un cognome valido')
            .required(),
    email: yup
        .string()
        .typeError('Inserire un cognome valido')
        .matches(emailRegex, 'Codice fiscale non valido.'),
  });

    const initialFormDataset = {
        nome: '',
        cognome: '',
        codicefiscale: '',
        email:''
    };

  const BreadcrumbPath = [

    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Gestione canditature Tate, Colf E Badanti',
      url: `admin/${getObjectValue(datiLogin, 'idCittadino',)}/candidatureLavoratoriTcb`,
    },
    {
      slash: 'Inserimento candidatura lavoratore',
      url: 'r/InserimentoCandidatura',
    },
  ];

  if (!checkAdmin(datiLogin)) {
    history.push(PAGE_HOME_URL);
  }

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      <Header title="Inserimento candidatura lavoratore" fontSize="f4" color="primary" />
      <Form initialDataset={initialFormDataset} validationSchema={formValidationSchema} validateOnChange>
        {
                    ({ setFormField, resetFormFields, dataset, errors, touched, handleFieldBlur, isFormValid }) => (
                      <InserimentoCandidatura
                        setFormField={setFormField}
                        resetFormFields={resetFormFields}
                        dataset={dataset}
                        errors={errors}
                        touched={touched}
                        handleFieldBlur={handleFieldBlur}
                        isFormValid={isFormValid}
                        datiLogin={datiLogin}
                      />
                    )}
      </Form>
    </Wrapper>
  );
};

TCB_IOO.displayName = 'TCB_IOO';

export default (withAuthentication(withRouter(TCB_IOO)));
