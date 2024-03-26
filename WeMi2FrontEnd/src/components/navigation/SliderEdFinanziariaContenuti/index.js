import React, { useState } from 'react';
import { Form } from 'libs/Form/components/Form';
import { Title, Description, Summary, Order, UploadImage, NewButtons, EditButtons, Code, Subtitle } from 'components/shared/Contents';
import { Column, Row } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { withRouter } from 'react-router-dom';
import Loader from 'components/ui2/Loader';
import { saveSlider } from './graphql';
import validationSchema from './schema';


const FormSlider = ({
  isEdit = false,
  dataset = {},
  history,
  url = '',
}) => {
  const save = useStatelessGraphQLRequest(saveSlider);
  const [isPending, setIsPending] = useState();
  const onSave = React.useCallback((values) => {
    setIsPending(true);
    save({
      input: {
        id: isEdit ? values.id : undefined,
        title: values.title,
        description: values.description,
        progressive: Number.parseInt(values.order, 10),
        image: {
          blob: values.media1?.file,
          mime: values.media1?.mime,
          name: values.media1?.name,
          id: values.media1?.id,
        },
        code: values.code ? values.code : null,
      },
    }).then(async () => {
      await setIsPending(false);
      history.push(url);
    });
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
      {({ errors }) => (
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
                  <Code label="Codice contenuto" />
                </Column>
              </Row>
              <Subtitle value="Valori Testuali" />
              <Title />
              <Description />
              <Subtitle value="Immagine Slider" />
              <UploadImage label="Immagine" placeholder="Upload immagine" name="media1" error={errors['media1.file']} />
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

FormSlider.displayName = 'FormSlider';

export default withRouter(FormSlider);
