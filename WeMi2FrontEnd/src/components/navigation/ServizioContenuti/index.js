import React, { useState } from 'react';
import { Form } from 'libs/Form/components/Form';
import { Title, Description, Summary, Order, NewButtons, EditButtons, Code, Subtitle } from 'components/shared/Contents';
import { Column, Row } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { withRouter } from 'react-router-dom';
import Loader from 'components/ui2/Loader';
import TextArea from 'components/ui2/TextArea';
import Select from 'components/ui2/Select';
import { useErrorManager } from 'errors/services/useErrorManager';
import { CATEGORIE_LIVELLO_2, MANSIONI, TARGET_LIVELLO_1 } from 'types/contenuti/typeContenuto';
import { saveService } from './graphql';
import validationSchema from './schema';

const FormService = ({
  isEdit = false,
  dataset = {},
  publishedCategories,
  level2Categories,
  mansioniAll,
  destinatariAll,
  priceUnit,
  history,
  url = '',
}) => {
  const save = useStatelessGraphQLRequest(saveService, {}, false, false, true);
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
          description: values.description,
          categoriaAccreditamento: values.accreditationCategory || null,
          unitaPrezzo: values.priceUnit || null,
          txTagsRicerca: values.tags || '',
          progressive: Number.parseInt(values.order, 10),
          associates: values.associates || [],
          code: values.code,
        },
      });
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
      {({ dataset, setFormField, handleFieldBlur }) => (
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
                  <Code label="Codice Servizio" />
                </Column>
              </Row>
              <Subtitle value="Valori Testuali" />
              <Title />
              <Description required={false} />
            </Column>
            <Column xs="12" md="6" sizepadding={{ md: '15.8em 0 0 3em' }} padding="0">
              <Row fluid>
                <Column xs="12" md="7" sizepadding={{ md: '0 1em 0 0' }} padding="0">
                  <Select
                    placeholder="Categoria di accreditamento"
                    name="Categoria di accreditamento"
                    label="Lista categorie di accreditamento"
                    required
                    wrapWords
                    selectedValue={publishedCategories.filter(el => el.id === dataset.accreditationCategory)}
                    items={publishedCategories}
                    clickedItem={(value) => { setFormField('accreditationCategory', value.id); }}
                    clickedSelectedItem={() => { setFormField('accreditationCategory', undefined); }}
                    enableSearch
                  />
                </Column>
                <Column xs="12" md="5" sizepadding={{ xs: '1rem 0 0 0', md: '0 0 0 1em' }} padding="0">
                  <Select
                    placeholder="Unità di prezzo"
                    name="Unità di prezzo"
                    label="Unità di prezzo"
                    required
                    selectedValue={priceUnit.filter(el => el.id === dataset.priceUnit)}
                    items={priceUnit}
                    clickedItem={(value) => { setFormField('priceUnit', value.id); }}
                    clickedSelectedItem={() => { setFormField('priceUnit', undefined); }}
                    enableSearch
                  />
                </Column>
              </Row>
              <Row fluid margin="1rem 0 0 0">
                <Select
                  placeholder="Categoria di Livello 2 correlate"
                  name="Categoria di Livello 2 correlate"
                  label="Categoria di Livello 2 correlate"
                  selectedValue={dataset.associates?.filter(el => el.type === CATEGORIE_LIVELLO_2).map((el) => ({
                    id: el.id,
                    value: el.title,
                  }))}
                  items={level2Categories}
                  clickedSelectedItem={(value) => {
                    const newSelectedItems = (dataset.associates || [])
                      .slice().filter((el) => el.id !== value.id);
                    setFormField('associates', newSelectedItems);
                  }}
                  clickedItem={(value) => {
                    const newSelectedItems = (dataset.associates || []).slice().concat({ id: value.id, type: CATEGORIE_LIVELLO_2, title: value.value });
                    setFormField('associates', newSelectedItems);
                  }}
                  multi
                  wrapWords
                  enableSearch
                />
              </Row>
              <Row fluid margin="1rem 0 0 0">
                <Select
                  placeholder="Mansioni correlate"
                  name="Mansioni correlate"
                  label="Mansioni correlate"
                  selectedValue={dataset.associates?.filter(el => el.type === MANSIONI).map((el) => ({
                    id: el.id,
                    value: el.title,
                  }))}
                  items={mansioniAll}
                  clickedSelectedItem={(value) => {
                    const newSelectedItems = (dataset.associates || [])
                      .slice().filter((el) => el.id !== value.id);
                    setFormField('associates', newSelectedItems);
                  }}
                  clickedItem={(value) => {
                    const newSelectedItems = (dataset.associates || []).slice().concat({ id: value.id, type: MANSIONI, title: value.value });
                    setFormField('associates', newSelectedItems);
                  }}
                  multi
                  wrapWords
                  enableSearch
                />
              </Row>
              <Row fluid margin="1rem 0 0 0">
                <Select
                  placeholder="Target di livello 1"
                  name="Target di livello 1"
                  label="Target di livello 1"
                  selectedValue={dataset.associates?.filter(el => el.type === TARGET_LIVELLO_1).map((el) => ({
                    id: el.id,
                    value: el.title,
                  }))}
                  items={destinatariAll}
                  clickedSelectedItem={(value) => {
                    const newSelectedItems = (dataset.associates || [])
                      .slice().filter((el) => el.id !== value.id);
                    setFormField('associates', newSelectedItems);
                  }}
                  clickedItem={(value) => {
                    const newSelectedItems = (dataset.associates || []).slice().concat({ id: value.id, type: TARGET_LIVELLO_1, title: value.value });
                    setFormField('associates', newSelectedItems);
                  }}
                  multi
                  wrapWords
                  enableSearch
                />
              </Row>
              <Row fluid margin="1rem 0 0 0">
                <TextArea
                  material
                  placeholder="Inserire tags di ricerca"
                  label="Tags Ricerca"
                  inputValue={dataset.tags}
                  onChange={(value) => { setFormField('tags', value); }}
                  error={undefined}
                  onBlur={() => handleFieldBlur('tags')}
                />
              </Row>
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

FormService.displayName = 'Form service';

export default withRouter(FormService);
