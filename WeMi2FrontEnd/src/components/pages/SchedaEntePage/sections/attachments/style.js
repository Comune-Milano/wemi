import React from 'react';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import media from 'utils/media-queries';

export const ChildrenPdf = ({
  fileName,
}) => (
  <div style={{ margin: '0.5em 0 0 0' }}>
    <Text
      value={fileName}
      color="darkGrey"
      size="f7"
      weight="bold"
      tag="p"
    />
  </div>
);

ChildrenPdf.displayName = 'Children reusable for files';

const Img = styled.img`
  max-width: 50px;
  max-height: max-content;
  ${media.sm`
    max-width: 250px;
  `}

`;

export const ChildrenImage = ({
  file,
}) => (
  <Img
    alt="no-logo"
    src={file}
  />
);

ChildrenImage.displayName = 'Children reusable for files image';
