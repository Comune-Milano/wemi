import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { ImageContainer, Image } from './utilsForHeaderBox';

const CategoriesHeaderBoxContent = ({ categories }) => (
  <Row fluid margin="0">
    {categories.map((category, index) => {
      const isLast = index === categories.length - 1;
      return (
        <Column key={`category-${index.toString()}`} padding="0" sizepadding={{ xs: '3em 0 0 0', sm: '2em 0 0 0', md: isLast ? '0 0 0 4em' : '0 4em 0 0', lg: isLast ? '0 0 0 2em' : '0 4em 0 0', xl: isLast ? '0 0 0 4em' : '0 4em 0 0' }} justifycontent="center" alignitems="center" sm="6">
          <ImageContainer to={category.link} width="auto" aria-label={category.title}>
            <Image src={category.image} />
          </ImageContainer>
          <Text
            value={category.title}
            transform="uppercase"
            letterSpacing="0.05em"
            color="darkGrey"
            whitespace="pre-line"
            tag="p"
            size="f7_5"
            align="center"
            lineHeight="175%"
            weight="normal"
          />
        </Column>
      );
    })}
  </Row>
);

CategoriesHeaderBoxContent.displayName = 'CategoriesHeaderBoxContent';

export default CategoriesHeaderBoxContent;
