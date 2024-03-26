import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { Column, Row } from 'components/ui/Grid';
import useWindowSize from 'hooks/useWindowSize';

export const DataProcessingModal = ({
  isOpen,
  onVisibilityChange,
  onClickNext,
}) => {
  const windowSize = useWindowSize();

  const isMobileDevice = ['xs', 'sm'].indexOf(windowSize) > -1;

  return (
    <Modal
      title="Trattamento dei dati"
      fontSize="f6"
      color="primary"
      open={isOpen}
      setOpenModal={onVisibilityChange}
    >
      <Row justifycontent="center">
        <Text
          {...(!isMobileDevice ? { whitespace: 'break-spaces' } : {})}
          weight="semiBold"
          margin="0 0 2rem 0"
          tag="p"
          align="center"
          value={`Come indicato nell'informativa pubblicata nella sezione Privacy,\r\nvi ricordiamo che in questa sezione del portale la titolarità del trattamento dei dati\r\n è dell'Ente del terzo settore a cui si richiedono informazioni o disponibilità di servizi.`}
        />
        <Text
          {...(!isMobileDevice ? { whitespace: 'break-spaces' } : {})}
          weight="semiBold"
          margin="0 0 3.8rem 0"
          tag="p"
          align="center"
          value={`L'informativa relativa al trattamento dei dati effettuato da ciascun ente\r\n è disponibile nella sezione info di ogni servizio.`}
        />
        <Column xs="12">
          <Button
            autowidth
            display="block"
            margin="0 auto"
            label="Prosegui"
            padding="0.4em 3.4em"
            onClick={onClickNext}
          />
        </Column>
      </Row>
    </Modal>
  );
};

DataProcessingModal.displayName = 'DataProcessingModal';
