import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';

export const BodyModalFilesSizeExeceeded = ({ handleCloseButtonClick, remainingSpace }) => (
  <Row fluid justifycontent="center" padding="0">
    <Column
      xs="12"
      justifycontent="center"
      padding="0 0 0.4rem 0"
    >
      <Text
        tag="p"
        size="f7"
        align="center"
        value={`Attenzione! Con l'ultimo file è stato superato il limite massimo di 8MB che si possono trasferire con una sola transazione. Si consigli di caricare e salvare i file uno alla volta o di caricare file di dimensioni più piccole di ${remainingSpace} MB.`}
        whitespace="pre-wrap"
      />
    </Column>
    <Column
      flex
      xs="12"
      justifycontent="center"
      padding="1rem 0"
    >
      <Button
        autowidth
        label="CHIUDI"
        color="red"
        onClick={() => { handleCloseButtonClick(false); }}
      />
    </Column>
  </Row>
    );

BodyModalFilesSizeExeceeded.displayName = 'BodyModalFilesSizeExeceeded';
