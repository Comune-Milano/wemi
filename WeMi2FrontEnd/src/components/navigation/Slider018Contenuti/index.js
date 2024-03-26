import React, { useState } from 'react';
import { Form } from 'libs/Form/components/Form';
import { Title, SubtitleArea, Summary, Order, UploadImage, NewButtons, EditButtons, Subtitle, Code } from 'components/shared/Contents';
import { Column, Row } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { withRouter } from 'react-router-dom';
import Loader from 'components/ui2/Loader';
import { saveSection } from './graphql';
import validationSchema from './schema';
import { useErrorManager } from 'errors/services/useErrorManager';

const NuovoContenutoSlider = ({
  isEdit = false,
  dataset = {},
  history,
  url = '',
}) => {
  const save = useStatelessGraphQLRequest(saveSection, {}, false, false, true);
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
          subtitle: values.subtitle,
          progressive: Number.parseInt(values.order, 10),
          image: {
            blob: values.media1?.file,
            mime: values.media1?.mime,
            name: values.media1?.name,
            id: values.media1?.id,
          },
          link: values.link,
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
                <Column md="6" padding="0">
                  <Code
                    label="Codice contenuto"
                  />
                </Column>
              </Row>
              <Subtitle value="Valori Testuali" />
              <Title />
              <SubtitleArea />
              <Subtitle value="Immagine Slider" />
              <UploadImage label="Immagine" placeholder="Upload immagine" removeLabel="elimina immagine inserita" name="media1" error={errors['media1.file']} />
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

NuovoContenutoSlider.displayName = 'NuovoContenutoSlider';

export default withRouter(NuovoContenutoSlider);
