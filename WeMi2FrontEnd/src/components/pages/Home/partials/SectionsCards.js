
import React, { useEffect } from 'react';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import Text from 'components/ui/Text';
import { Column } from 'components/ui/Grid';
import ListCardsService from 'components/shared/ListCardsService';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getContentAllSections } from '../GraphQLHomepage';
import Wrapper from './Wrapper';
import { HOME_ANCHORS } from '../constants/anchors';

const SectionsCards = ({ onSectionsRender }) => {
  // estrazione dati cards
  const [allSections] = useGraphQLRequest(
    undefined,
    getContentAllSections,
    {},
    true,
    data => data.list?.map((contentCard, index) => {
      const res = { title: undefined, description: undefined, img: undefined, isRight: false, color: undefined };
      res.title = contentCard.title;
      res.description = contentCard.description;
      res.color = contentCard.color;
      res.img = contentCard.image?.path;
      res.link = contentCard.link;
      res.isRight = index % 2 === 1;

      return res;
    })
  );
  // contenuto delle card
  const cards = allSections.data || new Array(4);
  // caricamento dati
  const loaded = !allSections.isLoading && !allSections.pristine;

  useEffect(() => {
    if (loaded) {
      onSectionsRender();
    }
  }, [loaded]);

  return (
    <Wrapper paddingTop="3.05rem" paddingBottom="0" paddingBottomMd="0" id={HOME_ANCHORS.scopriServizi}>
      <Column padding="0">
        <BackgroundTitle
          label="Scopri i servizi"
          bgColor="primary"
          size={bgTitleSizes.small}
        />
      </Column>
      <Column padding="0" lg="6" md="7" sm="8" xs="12" margin="1.5em 0 0 0" sizepadding={{ md: '0', lg: '0 3.3rem 0 0' }}>
        <Text
          size="f7"
          color="black"
          value="Clicca sull’area di tuo interesse per scoprire con semplicità tutti i servizi offerti."
        />
      </Column>
      <ListCardsService
        list={cards}
        isLoading={!loaded}
      />
    </Wrapper>
  );
};

SectionsCards.displayName = 'SectionsCards';

export default React.memo(SectionsCards);
