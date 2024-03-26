import React from 'react';
import Button from 'components/ui2/Button';

const DownloadButton = ({
  dataCallback,
  disabled,
  label,
}) => {
  const onButtonClick = () => {
    let element = document.createElement('a');
    dataCallback()
      .then(data => {
        element.setAttribute('href', data.data);
        element.setAttribute('download', data.fileName);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      });
  };

  return (
    <>
      <Button
        type="button"
        disabled={disabled}
        width="100%"
        label={label}
        color="primary"
        size="f7"
        onClick={() => {
          onButtonClick();
        }}
        padding="0.4em 1em"
      />
    </>
  );
};

DownloadButton.displayName = 'DownloadButton';

export default DownloadButton;
