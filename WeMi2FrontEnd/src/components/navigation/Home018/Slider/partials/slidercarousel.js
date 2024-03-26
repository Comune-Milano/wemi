
import React from 'react';
import Text from 'components/ui/Text';
import withRouter from 'react-router/withRouter';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import { StyledCaptionWrapper, StyledDescription, StyledTitle } from './slidercarousel.styled';

/**
 * The caption associated to the slider carousel for Homepage 0-18.
 */
export const SliderCarouselCaption = ({
  image,
  title,
  subtitle,
  widthDescription = {
    md: '55%',
    lg: '40%',
    xl: '30%',
    xxl: '25%',
  },
}) => (
  <StyledCaptionWrapper src={image}>
    {/* Title */}
    <StyledTitle>
      <BackgroundTitle
        label={title}
        bgColor="blue"
        size={bgTitleSizes.small}
      />
    </StyledTitle>
    {/* Subtitle */}
    {
      subtitle ? (
        <StyledDescription width={widthDescription}>
          <Text
            size="f6"
            value={subtitle}
            whitespace="pre-line"
          />
        </StyledDescription>
      )
        : null
    }
  </StyledCaptionWrapper>
);

SliderCarouselCaption.displayName = 'SliderCarouselCaption';
export default withRouter(SliderCarouselCaption);
