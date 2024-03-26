import React, { useState } from 'react';
import { Column, Row } from 'components/ui/Grid';
import { useFormField } from 'libs/Form/hooks/useFormField';
import { ChildrenImage } from 'components/pages/SchedaEntePage/sections/attachments/style';
import { fileToBase64 } from 'utils/functions/fileToBase64';
import { UploadFileError } from 'components/pages/SchedaEntePage/shared/inputattachment/errors/constants';
import InputFile from 'components/ui2/InputFile';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import Text from 'components/ui/Text';

const maxDimension = 8 * (10 ** 6);

const ImageUpload = ({
  placeholder = 'Upload media',
  label = 'Media 1',
  removeLabel = '',
  name = '',
  disabled = false,
  error = '',
}) => {
  const props = {
    label,
    value,
    placeholder,
    removeLabel,
  };
  const { value, setValue, touched, handleBlur } = useFormField(name);
  const handleUpload = React.useCallback(async (files) => {
    if (!files) {
      return;
    }

    const file = files[0];
    const fileBase64 = await fileToBase64(file);
    await setValue({ file: fileBase64, mime: file.type, name: file.name });
    handleBlur();
  }, [setValue, handleBlur]);

  const [errorObject, setErrorObject] = useState([]);

  const handleError = React.useCallback((faults) => {
    const errors = [];
    faults.forEach((fault) => {
      const errorClient = new UploadFileError(fault, { ...props, maxDimension });
      if (errorClient.code) {
        errors.push(errorClient);
      }
    });
    setErrorObject(errors);
  }, [setErrorObject, props]);

  return (
    <Row margin="0.5rem 0">
      <Column xs="12" padding="0">
        <Row padding="0.5rem 0">
          <div role="button" onBlur={handleBlur}>
            <div>
              <InputFile
                onChange={(values) => {
                  handleUpload(values);
                  setErrorObject([]);
                }}
                label={`aggiungi ${label}`}
                id="upload-file"
                onError={handleError}
                icon="plus"
                disabled={disabled}
                maxDimension={maxDimension}
                accept="image/*"
                onBlur={() => handleBlur()}
              />
            </div>
            <div style={{ margin: '0.5em 0 0 0' }}>
              <ButtonIcon
                icon="minus"
                color="red"
                aria-controls="filename"
                name="remove-file"
                aria-label={removeLabel}
                onClick={async () => {
                  await setValue();
                  await handleBlur();
                  setErrorObject([]);
                }}
                disabled={disabled}
              />
            </div>
          </div>
          {value?.file ? (
            <div style={{ display: 'flex', margin: '0 0.5em 0 0.5em' }}>
              <a
                tabIndex="0"
                title="Scarica allegato"
                href={value?.file}
                download={value?.name}
              >
                <ChildrenImage
                  file={value?.file}
                />
              </a>
            </div>
          )
            : (
              <div style={{ display: 'flex', margin: '0.5em 0.5em 0 0.5em' }}>
                <Text value={placeholder} color="darkGrey" size="f7" />
              </div>
            )}
        </Row>
        {touched && error && !(errorObject.length > 0) ? (
          <Text
            value={error}
            color="red"
            tag="div"
          />
        )
          : null}
        {errorObject.length > 0 ? (
          errorObject.map(fault => (
            <Text
              value={fault.message}
              color="red"
              tag="div"
            />
          ))
        )
          : null}

      </Column>
    </Row>
  );
};

ImageUpload.displayName = 'Image Upload Content';

export default ImageUpload;
