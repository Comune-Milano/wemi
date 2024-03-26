import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import {
  CategoryLogo,
  CategoryDescription,
} from '../SearchServices.style';

const CategorySection = ({
  categoryName,
  categoryMedia,
  categoryDescription,
}) => (
  <>
    <Row fluid justifycontent="center">
      <CategoryLogo
        src={categoryMedia}
        alt={`Logo ${categoryName}`}
      />
      <CategoryDescription>
        <Text
          tag="p"
          value={categoryDescription}
          margin="0"
        />
      </CategoryDescription>
    </Row>
  </>
  );

CategorySection.displayName = 'Sezione categoria';

export default CategorySection;
