import React, { useState } from 'react';
import { Form } from 'libs/Form/components/Form';
import { Title, Summary, Order, NewButtons, EditButtons, Code, Subtitle, SectionList } from 'components/shared/Contents';
import { Column, Row } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { withRouter } from 'react-router-dom';
import Loader from 'components/ui2/Loader';
import { saveArea } from './graphql';
import validationSchema from './schema';
import { useErrorManager } from 'errors/services/useErrorManager';

const FormArea = ({
  isEdit = false,
  dataset = {},
  history,
  url = '',
}) => {
  const save = useStatelessGraphQLRequest(saveArea, {}, false, false, true);
  const errorManager = useErrorManager();
  const [isPending, setIsPending] = useState();
  const onSave = React.useCallback(async (values) => {
    setIsPending(true);
    let redirect = true;
    try {
      await save({
        input: {
          id: isEdit ? values.id : undefined,
          title: values.title,
          // description: values.description,
          progressive: Number.parseInt(values.order, 10),
          sections: (values.sections || []).map(section => section.id),
          code: values.code,
        },
      })
    } catch (error) {
      // gestione errore
      redirect = false;
      errorManager.handleError(error);
    }
    setIsPending(false);
    if (redirect) {
      history.push(url);
    }
  }, [history, url, save, setIsPending]);

  const onCancel = React.useCallback(() => {
    history.push(url);
  }, [url, history]);

  return (
    <Form
      initialDataset={dataset}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnMount
    >
      {({ dataset, setFormField }) => (
        <React.Fragment>
          {isPending ? <Loader overlay label="Operazione in corso" /> : null}
          <Row>
            <Column xs="12" md="6" padding="0">
              <Summary isEdit={isEdit} id={dataset.id} version={dataset.version} startDate={dataset.startDate} endDate={dataset.endDate} />
              <Row alignitems="center">
                <Column xs="12" md="6" sizepadding={{ xs: '1rem 0', md: '0 1rem 0 0' }}>
                  <Order />
                </Column>
                <Column xs="12" md="6" sizepadding={{ xs: '1rem 0', md: '0 0 0 1rem' }}>
                  <Code label="Codice Area" />
                </Column>
              </Row>
              <Subtitle value="Valori Testuali" />
              <Title />
              {/* <Description /> */}
              <Subtitle value="Contenuti Associati" />
              <SectionList selectedValue={dataset.sections} handleSelected={(sectionSelected) => setFormField('sections', sectionSelected)} />
            </Column>
          </Row>
          {!isEdit ? (
            <NewButtons
              onCreate={(values) => {
                onSave(values);
              }}
              onCancel={onCancel}
            />
          ) : (
            <EditButtons
              onUpdate={(values) => {
                onSave(values);
              }}
              onCancel={onCancel}
            />
          )}
        </React.Fragment>
      )}
    </Form>

  );
};

FormArea.displayName = 'Form section';

export default withRouter(FormArea);
