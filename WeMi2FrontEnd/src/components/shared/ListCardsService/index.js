import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Card from 'components/ui2/Card';
import CardLoading from 'components/ui2/CardLoading';

const ListCardsService = ({
  list = [],
  padding = { left: { sm: '0', lg: '0 0.7rem 0 0' }, right: { sm: '0', lg: '0 0 0 0.7rem' } },
  isLoading,
}) => (
  <Row fluid margin="2rem 0 0 0">
    {
      list?.map((card, index) => (
        <Column lg="6" padding="0" sizepadding={card.isRight ? padding.right : padding.left} margin="1.4rem 0 0 0" key={`card-${card.title}-${index.toString()}`}>
          {
            isLoading ?
              <CardLoading />
              : (
                <Card
                  title={card.title}
                  description={card.description}
                  color={card.color}
                  img={card.img}
                  link={card.link}
                  isLoading={isLoading}
                />
              )}
        </Column>
      ))
    }
  </Row>
);

ListCardsService.displayName = 'ListCardsService';

export default ListCardsService;
