import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { StyledHashLink, Img, WrapperText, ColumnBorderStepper } from './styled';

const StepperListImages = ({
  content = [],
  imgWidth = '9em',
  imgHeight = '9em',
  mdSize = '4',
  lgSize = '4',
  widthBorder = { lg: '100%', xl: '100%' },
  className,
  marginLastXl = '0 5em 0 0',
  marginLastLg = '0 2rem 0 0',
}) => {
  const contentLength = content.length;

  return (
    <Row fluid flex className={className}>
      {
        content.map((imgLink, index) => {
          const isLast = contentLength === (index + 1);
          const sizepadding = isLast ? { md: '0 1em 0 0', lg: '0 0 0 0', xl: '0 1em 0 0' } : {};
          return (
            <Column padding="0" sizepadding={sizepadding} md={mdSize} lg={lgSize} flex justifycontent="center" alignitems="center" key={`StepperListImages-item-${index.toString()}`}>
              <Column padding="0" sizemargin={isLast ? { lg: marginLastLg, xl: marginLastXl } : {}} justifycontent="center" alignitems="center">
                <StyledHashLink
                  to={`#${imgLink.tag}`}
                  scroll={el => {
                    window.scrollTo({ behavior: 'smooth', top: el.offsetTop });
                  }}
                >
                  <Img
                    alt={imgLink.title}
                    src={imgLink.img}
                    width={imgWidth}
                    height={imgHeight}
                  />
                </StyledHashLink>
                <WrapperText padding="0">
                  <Text
                    value={imgLink.title}
                    lineHeight="175%"
                    tag="div"
                    align="center"
                    color="darkGrey"
                    size="f7"
                    weight="normal"
                    letterSpacing="0.05em"
                  />
                </WrapperText>
              </Column>
              {
                isLast ?
                  null
                  : (
                    <Column padding="0" sizepadding={{ lg: '0', xl: '0 0.8rem 0 0.8rem' }}>
                      <ColumnBorderStepper top widthLg={widthBorder.lg} widthXl={widthBorder.xl} color="grey" />
                    </Column>
                  )
              }
            </Column>
          );
        })
      }
    </Row>
  );
};

StepperListImages.displayName = 'StepperListImages';

export default StepperListImages;
