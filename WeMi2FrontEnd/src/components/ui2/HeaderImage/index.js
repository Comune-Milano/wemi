
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { HeaderImageWrapper } from './partials/ImageWrapper';
import { HeaderImageCaptionWrapper } from './partials/ImageCaptionWrapper';
import { HeaderImageDescription } from './partials/ImageDescription';
import { BackgroundTitle } from '../BackgroundTitle';
import { HeaderImageDivCaption, HeaderImageDiv } from './style';

export const HeaderImage = ({
  title,
  description,
  imageSrc,
  titleBgColor,
  titleTransform,
  margin,
  className,
  titleColor,
  descriptionColor,
  descriptionSize,
  descriptionPadding,
  descriptionLineHeight,
  captionMinHeight,
  captionPadding,
  letterSpacingDescription,
  mdIsMobile,
  descriptionColumnLg = '5',
  descriptionColumnMd = '5',
}) => (
  <HeaderImageWrapper imageSrc={imageSrc} className={className}>
    <HeaderImageDivCaption>
      <HeaderImageDiv>
        <HeaderImageCaptionWrapper
          minHeight={captionMinHeight}
          padding={captionPadding}
          margin={margin}
          mdIsMobile={mdIsMobile}
        >
          <BackgroundTitle
            label={title}
            bgColor={titleBgColor || 'blue'}
            size="small"
            color={titleColor || 'white'}
            transform={titleTransform}
          />

          <Row padding="0" margin="0">
            <Column padding="0" margin="1.5rem 0 0 0" xs="12" sm="12" md={descriptionColumnMd} lg={descriptionColumnLg}>
              <HeaderImageDescription
                description={description}
                color={descriptionColor}
                size={descriptionSize}
                padding={descriptionPadding}
                lineHeight={descriptionLineHeight}
                letterSpacingDescription={letterSpacingDescription}
              />
            </Column>
          </Row>
        </HeaderImageCaptionWrapper>
      </HeaderImageDiv>
    </HeaderImageDivCaption>
  </HeaderImageWrapper>
);

HeaderImage.displayName = 'HeaderImage';
