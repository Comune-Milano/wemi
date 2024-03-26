import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';

const Img = styled.img`
  max-width: 70px;
  max-height: max-content;
  ${media.sm`
    max-width: 250px;
  `}

`;

export const ChildrenImage = ({
  file,
}) => (
  <Img
    alt="no-file"
    src={file}
  />
);

ChildrenImage.displayName = 'Children reusable for files image';