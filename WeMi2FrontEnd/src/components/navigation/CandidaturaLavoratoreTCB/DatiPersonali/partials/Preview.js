
import React, { useState } from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import ImageCropper from 'components/ui2/ImageCropper';
import userPlaceholder from 'images2/user_image_placeholder.png';
import Button from 'components/ui2/Button';
import { Row, Column } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { getCroppedImg } from 'components/ui2/ImageCropper/getCroppedImg';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { inserisciModificaFototessera as inserisciModificaFototesseraM } from '../DatiPersonaliGraphQL';
import { codiciAttributo } from '../../constants/CodiciAttributo';

const Image = styled.div`
  background-image: url(${props => props.src});
  background-position: center left;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 4rem;
  ${media.xs`
    height: 10rem;
    margin: 2em 0 0 0;
  `};
  ${media.sm`
    height: 10rem;
  `};
  ${media.md`
    height: 10rem;
  `};
  ${media.lg`
    height: 15rem;
  `};
`;

const Preview = ({
  dataset,
  setFormField,
  idLavoratore,
}) => {
  const { setFormFields } = useFormContext();
  const inserisciModificaFototessera = useStatelessGraphQLRequest(inserisciModificaFototesseraM);

  const [cropDataState, setCropDataState] = useState({
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
    cropShape: 'round',
    showGrid: false,
  });

  const onCropChange = crop => {
    setCropDataState({ ...cropDataState, crop });
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setFormField('croppedAreaPixels', croppedAreaPixels);
  };

  const onZoomChangeCropper = zoom => {
    setCropDataState({ ...cropDataState, zoom });
  };

  const onZoomChangeSlider = zoom => {
    setCropDataState({ ...cropDataState, zoom });
  };

  const onClickSaveHandler = () => {
    if (dataset.foto && dataset.croppedAreaPixels) {
      getCroppedImg(dataset.foto, dataset.croppedAreaPixels).then(file => {
        inserisciModificaFototessera({
          input: {
            file,
            idAllegato: dataset.idAllegato,
            cdAttributoFoto: codiciAttributo.IMG_FOTO,
            idUtente: idLavoratore,
          },
        }).then((response) => {
          setFormFields({
            foto: undefined,
            fotoCropped: file,
            idAllegato: response?.id_allegato,
          });
        });
      });
    }
  };

  return (
    <>
      {(() => {
        if (dataset.foto) {
          return (
            <Row fluid justifycontent="center">
              <ImageCropper
                imageSrc={dataset.foto.file}
                cropData={cropDataState}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChangeCropper={onZoomChangeCropper}
                onZoomChangeSlider={onZoomChangeSlider}
              />
              <Column xs="6" sm="4" md="4" padding="0">
                <Button
                  color="primary"
                  fontSize="f7"
                  label="Salva"
                  onClick={onClickSaveHandler}
                />
              </Column>
            </Row>
          );
        }

        if (dataset.fotoCropped) {
          return <Image src={dataset.fotoCropped} />;
        }

        return <Image src={userPlaceholder} />;
      })()}
    </>
  );
};

Preview.displayName = 'Preview';

export default (Preview);
