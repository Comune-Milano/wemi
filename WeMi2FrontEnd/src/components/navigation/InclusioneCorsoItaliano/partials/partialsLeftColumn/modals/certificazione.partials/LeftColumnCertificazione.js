import React from 'react';
import Text from 'components/ui/Text';
import { modalCertificazione } from '../costants';
import { ColumnBackgroundBorder } from '../CorsoItaliano.modals.styled';

const LeftColumnCertificazione = () => (
  <>
    {modalCertificazione.certificazioneQuantoCosta.table.columnSx?.map((ele, index) => (
      <ColumnBackgroundBorder background={ele.background} right={ele.right} bottomGrey={ele.bottomGrey} padding="0.8em 0 0.8em 0" textAlign="center" key={`columnSxTableChiRilascia-${index}`}>
        <Text
          value={ele.text}
          color={ele.color}
          lineHeight="175%"
          size="f7"
          padding="0.8em 0 0.8em 0"
          letterSpacing="0.05em"
        />
      </ColumnBackgroundBorder>
    ))}
  </>
);

LeftColumnCertificazione.displayName = 'LeftColumnCertificazioneNavigation';

export default LeftColumnCertificazione;
