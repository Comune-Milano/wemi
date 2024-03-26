import React, { Fragment, useState } from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import styled, { css } from 'styled-components';
import InputFile from 'components/ui2/InputFile';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import { colors, fonts } from 'theme';
import { isFunction } from 'utils/functions/typeCheckers';
import { DEFAULT_MAX_SIZE } from 'components/ui2/InputFile/utils/constants';
import { UploadFileError } from './errors/constants';

const P = styled.p`
  color: ${colors.darkGrey};
  font-size: ${fonts.size.f6};
  overflow: hidden;
  text-overflow: ellipsis;
  sup {
    color: ${colors.red};
    font-size: ${fonts.size.f7_5};
  }
`;

const SectionAttachment = styled(Row)`
  ${props => !props.noBorder ? css`
    border-bottom: 1px solid ${colors.darkGrey};
    `
    : ''
  }
  ${props => props.error ? css`
    border-bottom: 1px solid ${props.theme.colors.red};
  ` : ''}
`;

const Container = styled.div`
  padding: 0 1em 1em 1em;
  display: flex;
  width: 100%;
`;

const InputFileAttachmentComponent = ({
  label,
  value,
  onAdd,
  onRemove,
  required,
  placeholder = 'Allega il file',
  accept,
  multiple,
  children,
  onError,
  disabled,
  error,
  removeLabel,
  handleFieldBlur,
  maxDimension = DEFAULT_MAX_SIZE,
  noBorder,
  hideError,
  className = '',
}) => {
  const props = {
    label,
    value,
    onAdd,
    onRemove,
    required,
    placeholder,
    accept,
    multiple,
    children,
    onError,
    disabled,
    error,
    removeLabel,
    handleFieldBlur,
    maxDimension,
  };

  const [errorObject, setErrorObject] = useState([]);

  const handleError = (faults) => {
    if (isFunction(onError)) {
      onError(faults);
    }
    const errors = [];
    faults.forEach((fault) => {
      const errorClient = new UploadFileError(fault, props);
      if (errorClient.code) {
        errors.push(errorClient);
      }
    });
    setErrorObject(errors);
  };

  return (
    <Fragment>
      <SectionAttachment className={className} error={error} noBorder={noBorder} fluid flex alignitems="flex-start" margin="1em 0 0 0">
        <Container onBlur={handleFieldBlur}>
          <div style={{ width: '30%' }}>
            <P>
              {label}
              {required ? <sup>*</sup> : null}
              :
            </P>
          </div>
          <div style={{ width: '70%', paddingLeft: '2em', display: 'flex' }}>
            <div style={{ display: 'block' }}>
              <div>
                <InputFile
                  onChange={(values) => {
                    onAdd(values);
                    setErrorObject([]);
                  }}
                  maxDimension={maxDimension}
                  label={`aggiungi ${label}`}
                  id="upload-file"
                  accept={accept}
                  multiple={multiple}
                  onError={handleError}
                  icon="plus"
                  disabled={disabled}
                />
              </div>
              <div style={{ margin: '0.5em 0 0 0' }}>
                <ButtonIcon
                  icon="minus"
                  color="red"
                  aria-controls="filename"
                  name="remove-file"
                  aria-label={removeLabel}
                  onClick={() => {
                    onRemove(value);
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
                  {children}
                </a>
              </div>
            )
              : (
                <div style={{ display: 'flex', margin: '0.5em 0.5em 0 0.5em' }}>
                  <Text value={placeholder} color="darkGrey" size="f7" />
                </div>
              )}
          </div>
        </Container>
        {
          error && !(errorObject.length > 0) ? (
            <Text
              value={error.file}
              color="red"
            />
          )
            : null
        }
        {
          !hideError && errorObject.length > 0 ? (
            errorObject.map(fault => (
              <Text
                value={fault.message}
                color="red"
              />
            ))
          )
            : null
        }
      </SectionAttachment>
    </Fragment>
  );
};
InputFileAttachmentComponent.displayName = 'Input File Attachment';

export const InputFileAttachment = InputFileAttachmentComponent;
