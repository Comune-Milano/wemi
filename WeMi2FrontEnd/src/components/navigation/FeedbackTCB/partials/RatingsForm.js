import React, { Fragment } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { MyColumn } from 'components/navigation/FeedbackTCB/shared/mycolumn';
import Rating from 'components/ui2/Rating';

const RatingsFormComponent = ({ disabled }) => {
  const { dataset, setFormField } = useFormContext();

  const categoryRating = [
    {
      title: 'la velocità nel rispondere alla richiesta',
      stars: dataset.valutazioneVelocita,
      disabled,
      id: 'valutazioneVelocita',
    },
    {
      title: 'la facilità di utilizzo del servizio',
      stars: dataset.valutazioneFacilità,
      disabled,
      id: 'valutazioneFacilità',
    },
    {
      title: "l'adeguatezza dei profili proposti",
      stars: dataset.valutazioneAdeguatezza,
      disabled,
      id: 'valutazioneAdeguatezza',
    },
  ];

  return (
    <Fragment>
      <Row fluid>
        <Text
          intlFormatter
          value="Più in dettaglio Ti chiediamo di valutare, con un voto che va da 1 a 5 "
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
          color="black"
          size="f6"
          padding="0 0.2rem 0 0"
          margin="4em 0 1em 0"
        />
      </Row>
      {categoryRating.map((rating, i) => (
        <Row fluid margin="0" alignitems="center" key={i.toString()} padding="1em 0 0 0">
          <Column xs="12" sm="8" md="9" lg="9" padding="0 1.5rem 0 0" alignself="center">
            <Text
              intlFormatter
              value={rating.title}
              transform="uppercase"
              letterSpacing="0.05em"
              color="primary"
              weight="bold"
              size="f6"
              padding="0 0.2rem 0 0"
            />
          </Column>
          <MyColumn xs="12" sm="4" md="3" lg="3" flex justifycontent="flex-end" padding="0" alignself="center">
            <Rating
              fontSize="f6"
              color="primary"
              readOnly={rating.disabled}
              onClick={(valore) => { setFormField(rating.id, valore); }}
              stars={rating.stars}
              border
              spacingRight="0.2em"
            />
          </MyColumn>
        </Row>
      ))}
    </Fragment>
  );

};

RatingsFormComponent.displayName = 'Valutazioni per wemi';

export const RatingsForm = RatingsFormComponent;
