import React from 'react';
import headerImage from 'images2/home-inclusione/homepage-inclusione.jpg';
import { Row, Column } from 'components/ui/Grid';
import { HeaderImageHomeInclusione } from './index.styled';
import { Cards, HEADER } from './constants';
import { CategoriaButton, GuidaPerMilano } from './partials';

const HomeInclusioneNavigation = () => (
  <>
    <HeaderImageHomeInclusione
      imageSrc={headerImage}
      titleBgColor="orange"
      descriptionSize="f6"
      titleSize="f5"
      title={HEADER.title}
      description={HEADER.description}
      letterSpacingDescription="0"
      mdIsMobile
      descriptionColumnMd="7"
      descriptionColumnLg="5"
      titleTransform="none"
    />
    <Row fluid margin="7rem 0">
      <Column xs="12" md="12" lg="7" sizepadding={{ xs: '0 1rem 0 1rem', md: '0 4rem 0 4rem', lg: '0 1rem 0 4rem', xl: '0 4rem 0 4rem' }}>
        <Row justifycontent="center">
          {
            Cards.map((element, index) => (
              <CategoriaButton
                element={element}
                key={index.toString()}
              />
            ))
          }
        </Row>
      </Column>
      <Column xs="12" md="12" lg="5" sizepadding={{ xs: '5rem 0 1rem 0', md: '5rem 4rem 0 4rem' }}>
        <GuidaPerMilano />
      </Column>
    </Row>
  </>
);

HomeInclusioneNavigation.displayName = 'HomeInclusioneComponentNavigation';
export default HomeInclusioneNavigation;
