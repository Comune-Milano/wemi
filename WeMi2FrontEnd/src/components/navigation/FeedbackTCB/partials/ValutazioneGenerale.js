import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { MyColumn } from 'components/navigation/FeedbackTCB/shared/mycolumn';
import Rating from 'components/ui2/Rating';

const ValutazioneGeneraleComponent = ({ disabled }) => {
  const { dataset, setFormField } = useFormContext();

  const RatingWemi = {
    title: 'Valutare in generale da 1 a 5 il servizio offerto da WeMi',
    stars: dataset.valutazioneGenerale,
    disabled,
    id: 'valutazioneGenerale',
  };

  return (
    <Row fluid alignitems="center" padding="1em 0 0 0">
      <Column xs="12" sm="8" md="9" lg="9" padding="0 1.5rem 0 0" alignself="center">
        <Text
          intlFormatter
          value={RatingWemi.title}
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
          color="primary"
          size="f6"
          padding="0 0.2rem 0 0"
        />
      </Column>
      <MyColumn xs="12" sm="4" md="3" lg="3" flex justifycontent="flex-end" padding="0" alignself="center">
        <Rating
          fontSize="f6"
          color="primary"
          onClick={(valore) => { setFormField(RatingWemi.id, valore); }}
          stars={RatingWemi.stars}
          readOnly={RatingWemi.disabled}
          border
          spacingRight="0.2em"
        />
      </MyColumn>
    </Row>
  );

};

ValutazioneGeneraleComponent.displayName = 'Valutazione generale rating wemi';

export const ValutazioneGenerale = ValutazioneGeneraleComponent;
