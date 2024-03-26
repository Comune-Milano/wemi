import React from 'react';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import { getObjectValue } from 'utils/extensions/objectExtensions';

const TitleRequestCounterComponent = ({ isFeedback, richiesteEnte }) => {
  if (!isFeedback) {
    return null;
  }

  const countDaRichiedere = getObjectValue(richiesteEnte, 'countDaRichiedere', 0);
  const countDaConfermare = getObjectValue(richiesteEnte, 'countDaConfermare', 0);
  return (
    <Row fluid justifycontent="center" margin="0.5em 0">
      <Text
        value={`Ci sono ${countDaRichiedere} feedback da richiedere e ${countDaConfermare} da confermare`}
        color="darkGrey"
      />
    </Row>
  );
};

TitleRequestCounterComponent.displayName = 'Title request component';

export const TitleRequestCounter = TitleRequestCounterComponent;
