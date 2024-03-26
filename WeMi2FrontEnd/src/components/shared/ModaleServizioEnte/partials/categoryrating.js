/** @format */
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Rating from 'components/ui2/Rating';
import React from 'react';
import { RatingColumn, TextColumn } from '../components.styled';
import useWindowSize from 'hooks/useWindowSize';
import { WINDOW_SIZE } from 'types/windowSize';

const CategoryRating = ({ categories }) => {
  const windowSize = useWindowSize();

  const isMobile = WINDOW_SIZE.windowSizesSmall.includes(windowSize);

  if (isMobile) {
    return (
      categories.map((rating, index) => {
        return (
          <Row fluid margin="0" alignitems="center" key={rating.title} padding={index === 0 ? '' : '1em 0 0 0'}>
            <RatingColumn xs="3" sm="5" md="3" lg="3" flex padding="0">
              <Rating
                fontSize="f6"
                color="primary"
                readOnly
                stars={rating.stars}
                border
                spacingRight="0.2em"
              />
            </RatingColumn>
            <TextColumn xs="8" sm="7" md="9" lg="9" padding="0" sizepadding={{ xs: '0', sm: '0 1.2em 0 0' }}>
              <Text
                value={rating.title}
                transform="uppercase"
                color="black"
                weight="bold"
                size="f7"
                letterSpacing="0.05em"
              />
            </TextColumn>
          </Row>
        );
      })
    );
  }
  return (
    categories.map((rating, index) => {
      return (
        <Row fluid margin="0" alignitems="center" key={rating.title} padding={index === 0 ? '' : '0.8rem 0 0 0'}>
          <TextColumn xs="12" sm="7" md="9" lg="9" padding="0 1.2em 0 0">
            <Text
              value={rating.title}
              transform="uppercase"
              color="black"
              weight="bold"
              size="f7"
              letterSpacing="0.05em"
            />
          </TextColumn>
          <RatingColumn xs="12" sm="5" md="3" lg="3" flex padding="0" alignself="start">
            <Rating
              fontSize="f6"
              color="primary"
              readOnly
              stars={rating.stars}
              border
              spacingRight="0.2em"
            />
          </RatingColumn>
        </Row>
      );
    })
  );
};

CategoryRating.displayName = 'CategoryRating';

export default React.memo(CategoryRating);
