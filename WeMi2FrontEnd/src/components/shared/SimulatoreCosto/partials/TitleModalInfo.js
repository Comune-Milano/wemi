import React from 'react';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import Modal from 'components/ui2/Modal';

const TitleModalInfo = ({
  label,
  modalTitle,
  isColf,
  modalBody,
  margin = '0 0 1em 0',
  required,
  color = 'black',
}) => {
  const [openModalInfo, setOpenModalInfo] = React.useState(false);

  return (
    <>
      <Row fluid flexwrap="initial" justifycontent="space-between" margin={margin}>
        <div style={{ width: 'auto' }}>
          <Text
            value={label}
            weight="bold"
            margin="0 0.5em 0 0"
            size="f7"
            color={color}
            transform="uppercase"
            letterSpacing="0.05em"
          />
          {
            required && (
            <Text
              aria-label="campo obbligatorio"
              value="*"
              padding="0 0 0 0.3em"
              weight="bold"
              color="red"
              padding="0 0.5em 0 0"
            />
          )}
        </div>
        {!isColf && (
          <div style={{ flexShrink: '1' }}>
            <ButtonIcon
              onClick={() => { setOpenModalInfo(true); }}
              color="primary"
              icon="info"
              fontSize="f9"
              name="pulsante informazioni"
              label={`informazioni su ${label}`}
            />
          </div>
        )}
      </Row>
      {openModalInfo ? (
        <Modal
          open={openModalInfo}
          setOpenModal={setOpenModalInfo}
          title={modalTitle}
          letterSpacing="0.05em"
          children={modalBody}
          color="primary"
          fontSize="f6"
        />
      )
        : null
      }
    </>
  );
};

TitleModalInfo.displayName = 'TitleModalInfo';

export default TitleModalInfo;
