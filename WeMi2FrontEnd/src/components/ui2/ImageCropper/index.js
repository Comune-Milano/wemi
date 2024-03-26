import React from "react";
import styled from "styled-components";
import Cropper from "react-easy-crop";
import Slider from "rc-slider";
const { Handle } = Slider;

const StyledDivCropper = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 220px;
  width: 100%;
`;

const StyledDivControls = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  width: inherit;
  padding: 2em;
`;

const sliderHandle = props => {
  const { value, dragging, index, ...restProps } = props;
  return <Handle value={value} {...restProps} />;
};
sliderHandle.displayName = "sliderHandle";

const cropSize = {
  width: 200,
  height: 200,
};

export const ImageCropper = ({
  imageSrc,
  cropData,
  onCropChange,
  onCropComplete,
  onZoomChangeCropper,
  onZoomChangeSlider
}) => {
  return (
    <>
      <StyledDivCropper>
        <Cropper
          image={imageSrc}
          crop={cropData.crop}
          zoom={cropData.zoom}
          aspect={cropData.aspect}
          cropShape={cropData.cropShape}
          showGrid={cropData.showGrid}
          cropSize={cropSize}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChangeCropper}
          restrictPosition={false}
        />
      </StyledDivCropper>
      <StyledDivControls>
        <Slider
          min={1}
          max={3}
          step={0.1}
          onChange={onZoomChangeSlider}
          defaultValue={cropData.zoom}
          value={cropData.zoom}
          handle={sliderHandle}
        />
      </StyledDivControls>
    </>
  );
};

ImageCropper.displayName = "ImageCropper";
export default ImageCropper;
