
import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import AnchorLink from 'components/ui/AnchorLink';
import useWindowSize from 'hooks/useWindowSize';
import { WINDOW_SIZE } from 'types/windowSize';
import Header from './Header';
import { StyledList, StyledListItem } from '../../CorsoItaliano.styled';
import { modalCertificazione } from './costants';
import TableDesktop from './certificazione.partials/TableDesktop';
import TableMobile from './certificazione.partials/TableMobile';

const HeaderCertificazione = () => (
  <Header
    label={modalCertificazione.certificazioneTitle}
  />
);

const ModalCertificazione = React.memo(({
  open,
  setOpen,
  color = "blue"
}) => {
  const windowSize = useWindowSize();
  const isDesktop = WINDOW_SIZE.windowSizesSmall.indexOf(windowSize) === -1;

  return (
    <Modal
      customModal
      header={HeaderCertificazione}
      open={open}
      setOpenModal={() => setOpen(!open)}
      color="blue"
      width="90%"
      mobileFullScreen="true"
    >
      <Row fluid>
        <Column padding="0">
          <Text
            value={modalCertificazione.certificazioneCheCosaE.title}
            color={color}
            transform="uppercase"
            weight="bold"
            lineHeight="175%"
            tag="div"
            size="f6"
            letterSpacing="0.05em"
          />
          <Text
            value={modalCertificazione.certificazioneCheCosaE.textTop}
            lineHeight="175%"
            size="f7"
            tag="div"
          />
          <Text
            value={modalCertificazione.certificazioneCheCosaE.textBottom}
            size="f7"
            lineHeight="175%"
          />
        </Column>
        <Column padding="0" margin="2em 0 0 0">
          <Text
            value={modalCertificazione.certificazioneCheCosaServe.title}
            color={color}
            transform="uppercase"
            weight="bold"
            lineHeight="175%"
            tag="div"
            size="f6"
            letterSpacing="0.05em"
          />
          <Text
            value={modalCertificazione.certificazioneCheCosaServe.text}
            lineHeight="175%"
            size="f7"
            tag="div"
          />
        </Column>
        <Column padding="0" margin="2em 0 0 0">
          <Text
            value={modalCertificazione.certificazioneComeSiOttiene.title}
            color={color}
            transform="uppercase"
            weight="bold"
            lineHeight="175%"
            tag="div"
            size="f6"
            letterSpacing="0.05em"
          />
          <Text
            value={modalCertificazione.certificazioneComeSiOttiene.text}
            lineHeight="175%"
            size="f7"
            tag="div"
          />
        </Column>
        <Column padding="0" margin="2em 0 0 0">
          <Text
            value={modalCertificazione.certificazioneChiRilascia.title}
            color={color}
            transform="uppercase"
            weight="bold"
            lineHeight="175%"
            tag="div"
            size="f6"
            letterSpacing="0.05em"
          />
          <Text
            value={modalCertificazione.certificazioneChiRilascia.text}
            lineHeight="175%"
            size="f7"
            tag="div"
          />
          <StyledList type={`'-  '`}>
            {
              modalCertificazione.certificazioneChiRilascia.list?.map((el, index) => (
                <StyledListItem key={`listChiRilascia-${index}`}>
                  <Text
                    value={el}
                    lineHeight="175%"
                    size="f7"
                    tag="div"
                  />
                </StyledListItem>
              ))
            }
          </StyledList>
        </Column>
        <Column padding="0" margin="2em 0 0 0">
          <Text
            value={modalCertificazione.certificazioneQuantoCosta.title}
            color={color}
            transform="uppercase"
            weight="bold"
            lineHeight="175%"
            tag="div"
            size="f6"
            letterSpacing="0.05em"
          />
          <Text
            value={modalCertificazione.certificazioneQuantoCosta.text1}
            lineHeight="175%"
            size="f7"
            tag="div"
          />
          <Text
            value={modalCertificazione.certificazioneQuantoCosta.text2}
            lineHeight="175%"
            size="f7"
            tag="div"
          />
          {
            isDesktop ? (
              // Table desktop
              <TableDesktop />
            )
              : (
                // Table mobile
                <TableMobile />
              )
          }
        </Column>
        <Row fluid >
          <Text
            value={modalCertificazione.certificazioneQuantoCosta.text3}
            lineHeight="175%"
            size="f7"
          />
        </Row>
        <Row fluid margin="2em 0 0 0">
          <Text
            value={modalCertificazione.certificazioneAfterQuantoCosta}
            lineHeight="175%"
            size="f7"
          />
        </Row>
        <Column padding="0" margin="2em 0 0 0">
          <Text
            value={modalCertificazione.certificazioneDoveOttenere.title}
            color={color}
            transform="uppercase"
            weight="bold"
            lineHeight="175%"
            tag="div"
            size="f6"
            letterSpacing="0.05em"
          />
          <Text
            value={modalCertificazione.certificazioneDoveOttenere.text}
            lineHeight="175%"
            size="f7"
            tag="div"
            margin="0 0 2em 0"
          />
          {
            modalCertificazione.certificazioneDoveOttenere.list?.map((elementList, index) => (
              <div key={`listDoveOttenere-${index}`}>
                <AnchorLink
                  to={elementList.link}
                  align="left"
                  display="inline-block"
                  _blank
                >
                  <Text
                    value={elementList.text}
                    decoration="underline"
                    fontStyle="italic"
                    color="blueIcon"
                    lineHeight="175%"
                    size="f7"
                  />
                </AnchorLink>
              </div>
            ))
          }
        </Column>
      </Row>
    </Modal >
  );
});

ModalCertificazione.displayName = 'ModalCertificazioneNavigation';

export default ModalCertificazione;