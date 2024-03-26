import React, { Fragment } from 'react';
import { Row } from 'components/ui/Grid';
import {
  InputFileAttachment,
} from 'components/pages/SchedaEntePage/shared';
import { fileToBase64 } from 'utils/functions/fileToBase64';
import { MAXIMUM_FILE_SIZE } from 'types/maxInput';
import { ChildrenImage, ChildrenPdf } from './style';
import { MAX_SIZE_UPLOAD } from './constants';
import ModalError from './ModalError';

const ListAttachmentComponent = ({
  dataset = {},
  setFormFieldAttachments,
  disabled,
  errors = {},
  touched = {},
  handleFieldBlur,
  keySection,
}) => {
  const [errorFilesSize, setErrorFilesSize] = React.useState(false);

  const checkSize = (currentSize) => {
    // se la somma delle dimensioni dei file appena inseriri superano MAXIMUM_FILE_SIZE non vengono allegati
    let size = currentSize;
    size += dataset.logo.size || 0;
    Object.values(dataset.documents).forEach(document => {
      size += document.size || 0;
    });
    const errorSize = size > MAXIMUM_FILE_SIZE.byte;
    setErrorFilesSize(errorSize);
    return errorSize;
  };

  const handleUploadLogo = async (key, files) => {
    if (!files) {
      return;
    }

    const file = files[0];
    if (checkSize(file.size)) {
      return;
    }
    const fileBase64 = await fileToBase64(file);
    await setFormFieldAttachments(key, { name: file.name, file: fileBase64, type: file.type, size: file.size });
    await handleFieldBlur(`${keySection}.${key}`);
  };

  const handleRemoveLogo = async (key, value) => {
    await setFormFieldAttachments(key, value);
    await handleFieldBlur(`${keySection}.${key}`);
  };


  const handleUpload = async (key, files) => {
    if (!files) {
      return;
    }

    const file = files[0];
    if (checkSize(file.size)) {
      return;
    }
    const fileBase64 = await fileToBase64(file);
    const newDocuments = Object.assign({}, dataset.documents);
    const document = newDocuments[key];

    if (!document) {
      return;
    }

    const resultDocuments = newDocuments;
    resultDocuments[key] = {
      domain: document.domain,
      isRequired: document.isRequired,
      fieldName: key,
      name: file.name,
      file: fileBase64,
      type: file.type,
      size: file.size,
    };

    await setFormFieldAttachments('documents',
      resultDocuments);
    await handleFieldBlur(`${keySection}.documents.${key}`);
  };

  const handleRemove = async (key) => {
    const newDocuments = Object.assign({}, dataset.documents);
    const document = newDocuments[key];
    if (!document) {
      return;
    }
    newDocuments[key] = {
      domain: document.domain,
      isRequired: document.isRequired,
      fieldName: key,
    };
    const resultDocuments = newDocuments;
    await setFormFieldAttachments('documents', resultDocuments);
    await handleFieldBlur(`${keySection}.documents.${key}`);
  };
  const maxDimension = MAX_SIZE_UPLOAD;
  return (
    <Fragment>
      <Row fluid>
        <InputFileAttachment
          placeholder="Allega il logo"
          label="Logo"
          removeLabel="Rimuovi il logo"
          required
          maxDimension={maxDimension}
          value={dataset.logo}
          onAdd={(value) => handleUploadLogo('logo', value)}
          onRemove={() => handleRemoveLogo('logo')}
          accept="image/*"
          disabled={disabled}
          error={touched.logo && errors.logo ? errors.logo : undefined}
          handleFieldBlur={() => handleFieldBlur(`${keySection}.logo`)}
        >
          <ChildrenImage
            file={dataset.logo?.file}
          />
        </InputFileAttachment>
      </Row>
      {Object.values(dataset.documents).map((document) => {
        const { fieldName, isRequired } = document;
        const { documents: errorsDocument } = errors;
        const { documents: touchedDocument } = touched;
        const errorField = errorsDocument || {};
        const touchField = touchedDocument || {};
        return (
          <Row fluid margin="2em 0 0 0" key={fieldName}>
            <InputFileAttachment
              label={fieldName}
              required={isRequired}
              removeLabel={`Rimuovi il documento: ${document.fieldName}`}
              value={document}
              maxDimension={maxDimension}
              onAdd={(value) => handleUpload(fieldName, value)}
              onRemove={() => handleRemove(fieldName)}
              accept="application/pdf"
              disabled={disabled}
              error={touchField[fieldName] && errorField[fieldName] ? errorField[fieldName] : undefined}
              handleFieldBlur={() => handleFieldBlur(`${keySection}.documents.${fieldName}`)}
            >
              <ChildrenPdf
                fileName={document?.name}
              />
            </InputFileAttachment>
          </Row>
        );
      })}
      <ModalError
        open={errorFilesSize}
        setOpenModal={setErrorFilesSize}
      />
    </Fragment>
  );
};

ListAttachmentComponent.displayName = 'List attachment section';

export const ListAttachment = React.memo(ListAttachmentComponent);
