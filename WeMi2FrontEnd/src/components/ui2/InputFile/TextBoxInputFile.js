
import React, { useRef } from 'react';
import { injectIntl } from 'react-intl';
import FaIcon from 'components/ui2/FaIcon';
import propTypes from './propTypes';
import Input from '../Input';
import styled from 'styled-components';
import { fonts } from 'theme';
import { handleFileUpload } from './utils/handleFileUpload';

const RelativeForm = styled.form`
position: relative;
width: 21em;
> button {
  &:hover {
    cursor: pointer;
  }
  position: absolute;
  right: 1em;
  top: calc((100% - ${fonts.size.f5})/2 + 3px);
    outline: none;
}

`;

const TextBoxInputFile = ({
  onChange,
  setInputFileName,
  inputFileName,
  onError,
  error,
  maxDimension,
  multiple,
  allFiles,
  disabled,
  accept,
  intl,
  intlLabel,
  label,
  id,
  colorTooltip,
  positionTooltip
}) => {
  const inputFileRef = useRef();

  const inputLabel = intlLabel ?
    intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
    label;

  const handleClick = (event) => {
    if (!disabled) {
      event.preventDefault();
      inputFileRef.current.click();
    }
  };

  return (
    <React.Fragment>
      <RelativeForm>
        <Input
          onChange={(value) => setInputFileName(value)}
          placeholder={inputLabel}
          inputValue={inputFileName}
          error={ error }
          colorTooltip={colorTooltip}
          positionTooltip={positionTooltip}
          disabled={disabled}
        />
        <button
          type="submit"
          onClick={handleClick}
          style={{
            height: fonts.size.f5,
            border: 'none',
            backgroundColor: 'transparent',
            padding: 0,
          }}
          disabled={disabled}
        >
            <FaIcon
              fontSize="f5"
              icon="plus"
              color={inputFileName.trim().length > 0 && !disabled ? 'primary' : 'darkGrey'}
              aria-controls="filename"
              aria-label={inputLabel || 'Scegli un file'}
            />
        </button>
      </RelativeForm>
      {
        !disabled ?
          (
            <input
              id={id}
              ref={inputFileRef}
              type="file"
              accept={accept}
              onChange={async (event) => {
                await handleFileUpload(
                  event,
                  maxDimension,
                  accept,
                  onChange,
                  onError,
                  allFiles
                );
                inputFileRef.current.value = ''
              }}
              style={{ display: 'none' }}
              multiple={multiple}
            />
          )
          :
          null
      }
    </React.Fragment>
  );
};


TextBoxInputFile.displayName = 'TextBoxInputFile';


TextBoxInputFile.propTypes = propTypes;


export default injectIntl(TextBoxInputFile);
