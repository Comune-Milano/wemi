/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import yup from 'libs/Form/validation/yup';
import { Form } from 'libs/Form/components/Form';
import { fiscalCodeRegex, emailRegex } from 'libs/Form/validation/regex';
import { Row } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import InserimentoDomanda from 'components/navigation/InserimentoDomandaTCB';
import Header from 'components/ui2/Header';
import withAuthentication from 'hoc/withAuthentication';
import { AMMINISTRATORE } from 'types/userRole';
import Text from 'components/ui/Text';
import checkAdmin from 'utils/functions/checkAdmin';
import { PAGE_HOME_URL } from 'types/url';
import { withRouter } from 'react-router';

const TCB_IDO = ({
  locale,
  loaded,
  userProfile,
  history,
}) => {
  const { datiLogin } = userProfile;

  const formValidationSchema = yup.object().shape({
    cfRicerca: yup
      .string()
      .typeError('Codice fiscale non valido.')
      .matches(fiscalCodeRegex, 'Codice fiscale non valido.'),
    codicefiscale: yup
      .string()
      .typeError('Codice fiscale non valido.')
      .required()
      .matches(fiscalCodeRegex, 'Codice fiscale non valido.'),
    nome: yup
      .string()
      .trim()
      .typeError('Inserire un nome valido')
      .required(),
    cognome: yup
      .string()
      .trim()
      .typeError('Inserire un cognome valido')
      .required(),
    servizioSelezionato: yup
      .string()
      .typeError('Inserire una mansione'),
    email: yup
      .string()
      .typeError('Email non valida')
      .matches(emailRegex, 'Email non valida'),
    orarioselezionato: yup
      .string()
      .typeError('Inserire una tipologia di orario'),
  });


  const initialFormDataset = {
    cfRicerca: '',
    nome: '',
    cognome: '',
    codicefiscale: '',
    servizioSelezionato: undefined,
    email: '',
    orarioselezionato: undefined,
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
      slash: 'Richieste servizi Tate,Colf e Badanti',
      url: `admin/${datiLogin && datiLogin.idCittadino ? datiLogin.idCittadino : null}/richiesteTcb`,
    },
    {
      slash: 'Inserimento domanda cittadino',
      url: '',
    },
  ];

  if (!checkAdmin(datiLogin)) {
    history.push(PAGE_HOME_URL);
  }

  return (
    <Wrapper>
      {datiLogin && datiLogin.Profilo === AMMINISTRATORE ? (
        <>
          <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
          <Row fluid>
            <Header title="Inserimento domanda cittadino" fontSize="f4" color="primary" />
            <Row fluid>
              <Text weight="bold" color="primary" size="f4" value="Ricerca cittadino per CF" intlFormatter margin="1em 0 1em 0" />
            </Row>
            <Form initialDataset={initialFormDataset} validationSchema={formValidationSchema} validateOnChange>
              {
                ({ setFormField, resetFormFields, dataset, errors, touched, handleFieldBlur, isFormValid }) => (
                  <InserimentoDomanda
                    setFormField={setFormField}
                    resetFormFields={resetFormFields}
                    dataset={dataset}
                    errors={errors}
                    touched={touched}
                    handleFieldBlur={handleFieldBlur}
                    isFormValid={isFormValid}
                  />
                )
              }
            </Form>
          </Row>
        </>
      )
        : null}
    </Wrapper>
  );
};

TCB_IDO.displayName = 'TCB_IDO';


const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,
});
const mapDispatchToProps = ({
});
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(withRouter(TCB_IDO)));