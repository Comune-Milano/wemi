import React from 'react';
import { isFunction } from 'utils/functions/typeCheckers';
import Text from 'components/ui/Text';

const DownloadAnchorButton = ({
  dataCallback,
  src,
  onDownloadDone,
  buttonProps,
}) => {
  const anchorRef = React.useRef();

  const onButtonClick = () => {
    dataCallback()
      .then(data => {
        anchorRef.current.setAttribute('href', data);
        anchorRef.current.click();

        if (isFunction(onDownloadDone)) {
          onDownloadDone(data);
        }
      });
  };

  return (
    <>
      <a
        style={{ cursor: "pointer" }}
        ref={anchorRef}
        download
      >
        <Text
          onClick={onButtonClick}
          value={buttonProps.label}
          fontStyle="italic"
          color={buttonProps.labelColor}
          decoration="underline"
          {...buttonProps}
        />
      </a>
    </>
  );

  // React.useEffect(() => {
  //   if (src) {
  //     href.current.click();
  //     if(setOpen){
  //       setOpen(false);
  //     }
  //   }
  // }, [src])
  // return (
  //   <a
  //     ref={href}
  //     href={src}
  //     download
  //   >
  //     {children}
  //   </a>
  // )
}

DownloadAnchorButton.displayName = 'Auto click';

export default DownloadAnchorButton;