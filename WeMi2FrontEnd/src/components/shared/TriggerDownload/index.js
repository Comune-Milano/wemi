import React from 'react';
import { isFunction } from 'utils/functions/typeCheckers';

const TriggerDownload = ({
  dataCallback,
  onDownloadStart,
  onDownloadDone,
  fileName,
  children,
}) => {
  const anchorRef = React.useRef();

  const triggerClick = () => {
    if (isFunction(onDownloadStart)) {
      onDownloadStart();
    }

    dataCallback()
      .then(data => {
        anchorRef.current.setAttribute('href', data);
        anchorRef.current.click();

        if (isFunction(onDownloadDone)) {
          onDownloadDone();
        }

        return data;
      });
  };

  return (
    <>
      <a
        style={{ display: 'none', height: 0, width: 0 }}
        ref={anchorRef}
        download={fileName}
      />
      { isFunction(children) ? children({ triggerClick }) : children }
    </>
  );
};

TriggerDownload.displayName = 'TriggerDownload';
export default TriggerDownload;
