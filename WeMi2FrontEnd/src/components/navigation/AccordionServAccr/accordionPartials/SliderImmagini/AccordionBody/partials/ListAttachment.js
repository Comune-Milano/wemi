import React from 'react';
import { Row } from 'components/ui/Grid';
import { InputFileAttachment } from 'components/pages/SchedaEntePage/shared';
import { fileToBase64 } from 'utils/functions/fileToBase64';
import { bytesToMb } from 'utils/functions/bytesToMb';
import { ChildrenImage } from './style';
import { MAX_SIZE_UPLOAD } from './constants';
import ModalError from './ModalError';

const ListAttachmentComponent = ({
  Form,
  UpdateValue,
  Modifica,
}) => {
  const [modalError, setModalError] = React.useState({ open: false });

  const handleUploadLogo = React.useCallback(async (key, files) => {
    if (!files) {
      return;
    }
    const file = files[0];
    const fileBase64 = await fileToBase64(file);
    const sliderJson = Form.slider;
    sliderJson[key] = { ...sliderJson[key], name: file.name, file: fileBase64, type: file.type };
    await UpdateValue('slider', sliderJson);
  });

  const handleRemoveLogo = React.useCallback(async (key, value) => {
    const sliderJson = Form.slider;
    sliderJson[key] = { id: sliderJson[key]?.id, iwPath: sliderJson[key]?.iwPath, name: sliderJson[key]?.name, file: undefined };
    await UpdateValue(key, value);
  });

  const onError = React.useCallback((info) => {
    const iterator = info.entries();
    let infoError = iterator.next().value;
    infoError = iterator.next().value;
    setModalError({
      open: true,
      name: infoError[0].name,
      size: bytesToMb(infoError[0].size),
    });
  });

  const keySliders = React.useRef(Object.keys(Form.slider || {}));
  const keySliderLength = React.useRef(keySliders.current?.length);
  return (
    <Row fluid>
      {
        keySliders.current.map((key, index) => {
          const isLast = keySliderLength.current === (index + 1);
          return (
            <InputFileAttachment
              key={`slider-${index.toString}`}
              placeholder="Allega il file"
              label={`Slider ${index + 1}`}
              removeLabel="Rimuovi immagine per slider"
              maxDimension={MAX_SIZE_UPLOAD}
              value={Form.slider[key]}
              onAdd={(value) => handleUploadLogo(key, value)}
              onRemove={() => handleRemoveLogo(key)}
              accept="image/*"
              disabled={!Modifica?.campi}
              noBorder={isLast}
              onError={(info) => { onError(info); }}
              hideError
            >
              <ChildrenImage
                file={Form.slider[key]?.file}
              />
            </InputFileAttachment>
          );
        })
      }
      <ModalError
        openModal={modalError.open}
        setOpenModal={setModalError}
        nomeFile={modalError.name}
        dimensioneFile={modalError.size}
      />
    </Row>
  );
};

ListAttachmentComponent.displayName = 'List attachment section';

export const ListAttachment = React.memo(ListAttachmentComponent);
