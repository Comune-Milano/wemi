import React from 'react';

import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const TITLE = 'Candidatura';
const SUBTITLE_1 = 'In questa sezione ti chiediamo per quale servizio tra baby-sitter, colf e badante vuoi candidarti.';
const SUBTITLE_2 = 'Se vuoi puoi candidarti per più servizi.';

export const Header = () => (
  <>
    <Row fluid margin="0 0 1.5rem 0">
      <Text
        size="f4"
        tag="h3"
        weight="bold"
        color="black"
        value={TITLE}
      />
    </Row>
    <Row fluid margin="0 0 1.5rem 0">
      <Text
        value={SUBTITLE_1}
      />
      <Text
        value={SUBTITLE_2}
      />
    </Row>
  </>
);

Header.displayName = 'Candidatura TCB Step - Header';
