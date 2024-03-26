import React from 'react';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { Row } from 'components/ui/Grid';
import { useNavHeight } from 'hooks/useNavHeight';
import SortResults from '../SortResults';
import { SectionTitle } from './DesktopHeader.styled';

const DesktopHeader = ({
  numeroEntiSelezionati,
  filtriHeader,
  handleSingleFilter,
  indirizzo,
  openModal,
  handleForward,
}) => {
  const navHeight = useNavHeight();

  return (
    <>
      <SectionTitle fluid justifycontent="space-between" alignitems="center" top={navHeight || 0}>
        <Text
          weight="bold"
          tag="h2"
          value={`${numeroEntiSelezionati} ${numeroEntiSelezionati === 1 ? 'ente selezionato' : 'enti selezionati'}`}
          transform="uppercase"
          letterSpacing="0.05em"
          color="black"
          size="f6"
        />
        <Button
          autowidth
          disabled={numeroEntiSelezionati === 0}
          fontSize="f6"
          onClick={() => {
            if (!indirizzo) {
              openModal();
            } else {
              handleForward();
            }
          }}
          label="Richiedi informazioni e disponibilità"
          color="blue"
        />
      </SectionTitle>
      <Row fluid justifycontent="flex-end">
        <SortResults
          value={filtriHeader.orderBy}
          handleValue={(value) => {handleSingleFilter('orderBy', value)}}
        />
      </Row>
    </>
  );
};

DesktopHeader.displayName = 'Desktop header';

export default React.memo(DesktopHeader);