import React, { useRef } from 'react';
import { injectIntl } from 'react-intl';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import propTypes from './propTypes';
import { handleFileUpload } from './utils/handleFileUpload';

const InputFile = ({
  onChange,
  onError,
  icon,
  iconSize,
  maxDimension,
  color = 'primary',
  multiple,
  disabled,
  accept,
  intl,
  intlLabel,
  label,
  id,
  ...rest
}) => {
  const inputFileRef = useRef();

  const inputLabel = intlLabel ?
    intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
    label;


  const handleClick = (event) => {
    event.preventDefault();
    inputFileRef.current.click();
  };

  return (
    <React.Fragment>
      <ButtonIcon
        icon={icon || 'paperclip'}
        color={disabled ? 'grey' : color}
        aria-controls="filename"
        aria-label={inputLabel || 'Scegli un file'}
        fontSize={iconSize}
        onClick={disabled ? null : handleClick}
        disabled={disabled}
      />

      {
        !disabled ?
          (
            <input
              id={id}
              ref={inputFileRef}
              type="file"
              accept={accept}
              onChange={async(event) => {
                await handleFileUpload(
                  event,
                  maxDimension,
                  accept,
                  onChange,
                  onError
                  );
                inputFileRef.current.value = '';
              }}
              style={{ display: 'none' }}
              multiple={multiple}
              {...rest}
            />
          )
          :
          null
      }
    </React.Fragment>
  );
};


InputFile.displayName = 'InputFile';


InputFile.propTypes = propTypes;


export default injectIntl(InputFile);
