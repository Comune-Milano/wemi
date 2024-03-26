import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import Header from './Header';
import { modalAttestazione } from './costants';

const HeaderAttestazione = () => (
  <Header
    label={modalAttestazione.attestazioneTitle}
  />
);

const ModalAttestazione = React.memo(({
  open,
  setOpen,
  color = "blue"
}) => {

  return (
    <Modal
      customModal
      header={HeaderAttestazione}
      open={open}
      setOpenModal={() => setOpen(!open)}
      color="blue"
      width="90%"
      mobileFullScreen="true"
    >
      <Row fluid>
        <Column padding="0">
          <Text
            value={modalAttestazione.attestazioneSubTitle}
            color={color}
            transform="uppercase"
            weight="bold"
            lineHeight="175%"
            size="f6"
            letterSpacing="0.05em"
          />
        </Column>
        <Column padding="0">
          {modalAttestazione.attestazioneTextTop?.map((ele, index) => (
            <React.Fragment key={`TextTopModalAttestazione-${index}`}>
              <Text
                value={ele.text}
                weight={ele.bold ? "bold" : ""}
                lineHeight="175%"
                size="f7"
              />
              {
                ele.block ?
                  <br />
                  :
                  <>
                    &nbsp;
                  </>
              }
            </React.Fragment>
          ))}
        </Column>
        <Column padding="0" margin="1.8em 0 0 0">
          <Text
            value={modalAttestazione.attestazioneTextCenter}
            lineHeight="175%"
            size="f7"
          />
        </Column>
        <Column padding="0" margin="1.8em 0 0 0">
          {
            modalAttestazione.attestazioneTextBottom?.map((ele, index) => (
              <React.Fragment key={`TextBottomModalAttestazione-${index}`}>
                <Text
                  value={ele.text}
                  lineHeight="175%"
                  size="f7"
                />
                <br />
              </React.Fragment>
            ))
          }
        </Column>
      </Row>
    </Modal >
  );
});

ModalAttestazione.displayName = 'ModalAttestazioneNavigation';

export default ModalAttestazione;