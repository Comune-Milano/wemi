import React, { useEffect, Fragment } from 'react';
import { useLogger } from 'services/Logger';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';

const SocialsComponent = ({
  dataset = {},
  setFormFieldAttachments,
  disabled,
  errors = {},
  touched = {},
  handleFieldBlur,
  keySection,
}) => {
  const logger = useLogger();

  useEffect(() => {
    logger.log(dataset);
  }, []);

  return (
    <Fragment>
      <Row fluid margin="2em 0 0 0">
        <Column xs="12" md="6" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="Web"
            inputValue={dataset.webLink}
            disabled={disabled}
            // placeholder="Inserisci il link web"
            onChange={(value) => setFormFieldAttachments('webLink', value)}
            error={touched.webLink && errors.webLink ? errors.webLink : ''}
            onBlur={() => handleFieldBlur(`${keySection}.webLink`)}
          />
        </Column>
        <Column xs="12" md="6" padding="0">
          <Input
            label="Facebook"
            error={touched.facebookLink && errors.facebookLink ? errors.facebookLink : ''}
            onBlur={() => handleFieldBlur(`${keySection}.facebookLink`)}
            inputValue={dataset.facebookLink}
            // placeholder="Inserisci il link facebook"
            disabled={disabled}
            onChange={(value) => setFormFieldAttachments('facebookLink', value)}
          />
        </Column>
      </Row>
      <Row fluid margin="2em 0 0 0">
        <Column xs="12" md="6" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="Instagram"
            error={touched.instagramLink && errors.instagramLink ? errors.instagramLink : ''}
            onBlur={() => handleFieldBlur(`${keySection}.instagramLink`)}
            inputValue={dataset.instagramLink}
            // placeholder="Inserisci il link instagram"
            disabled={disabled}
            onChange={(value) => setFormFieldAttachments('instagramLink', value)}
          />
        </Column>
        <Column xs="12" md="6" padding="0">
          <Input
            label="Twitter"
            error={touched.twitterLink && errors.twitterLink ? errors.twitterLink : ''}
            onBlur={() => handleFieldBlur(`${keySection}.twitterLink`)}
            inputValue={dataset.twitterLink}
            // placeholder="Inserisci il link twitter"
            disabled={disabled}
            onChange={(value) => setFormFieldAttachments('twitterLink', value)}
          />
        </Column>
      </Row>
      <Row fluid margin="2em 0 0 0">
        <Column xs="12" md="6" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="Youtube"
            // placeholder="Inserisci il link youtube"
            error={touched.youtubeLink && errors.youtubeLink ? errors.youtubeLink : ''}
            onBlur={() => handleFieldBlur(`${keySection}.youtubeLink`)}
            inputValue={dataset.youtubeLink}
            disabled={disabled}
            onChange={(value) => setFormFieldAttachments('youtubeLink', value)}
          />
        </Column>
      </Row>
    </Fragment>
  );
};

SocialsComponent.displayName = 'Socials section';

export const Socials = React.memo(SocialsComponent);
