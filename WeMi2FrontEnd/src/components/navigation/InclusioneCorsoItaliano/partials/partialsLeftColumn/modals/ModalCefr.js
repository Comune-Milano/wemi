import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import useWindowSize from 'hooks/useWindowSize';
import { WINDOW_SIZE } from 'types/windowSize';
import Header from './Header';
import { modalCefr } from './costants';
import { RowBorder, WrapperVertical, ColumnBorder, WrapperText } from './CorsoItaliano.modals.styled';

const HeaderCefr = () => (
  <Header
    label={modalCefr.cefrTitle}
  />
);

HeaderCefr.displayName = 'HeaderCefr';

const ModalCefr = React.memo(({
  open,
  setOpen,
  color = 'blue',
}) => {
  const windowSize = useWindowSize();

  const isMobile = WINDOW_SIZE.windowSizesLarge.concat(WINDOW_SIZE.windowSizesMedium).indexOf(windowSize) === -1;
  return (
    <Modal
      customModal
      header={HeaderCefr}
      open={open}
      setOpenModal={() => setOpen(!open)}
      color="blue"
      width="90%"
      mobileFullScreen="true"
    >
      <RowBorder fluid>
        {
          modalCefr.cefrContent?.map((ele, index) => (
            <Row key={`cefrContent-${index}`} fluid>
              <ColumnBorder right={!isMobile} bottom={isMobile || ele.bottom} padding="0" md="1" flex justifycontent="center" alignitems="center">
                <WrapperVertical vertical={!isMobile} margin={isMobile ? ele.marginTitle : ""}>
                  <Text
                    value={ele.title}
                    color={color}
                    transform="uppercase"
                    weight="bold"
                    lineHeight="175%"
                    padding="2.5em 0 2.5em 0"
                    size="f6"
                    letterSpacing="0.05em"
                  />
                </WrapperVertical>
              </ColumnBorder>
              <Column padding="0" md="11">
                <WrapperText fluid height={!isMobile ? ele.heightTop || ele.height : ""}>
                  <ColumnBorder padding="0" md="1" sm="1" xs="1" right bottom flex justifycontent="center">
                    <Text
                      value={ele.topSubTitle}
                      color={color}
                      transform="uppercase"
                      weight="bold"
                      lineHeight="175%"
                      padding="0.8em"
                      size="f6"
                      letterSpacing="0.05em"
                    />
                  </ColumnBorder>
                  <ColumnBorder padding="0" md="11" sm="11" xs="11" bottom flex justifycontent="center">
                    <Text
                      value={ele.topText}
                      lineHeight="175%"
                      padding="0.8em"
                      size="f7"
                    />
                  </ColumnBorder>
                </WrapperText>
                <WrapperText fluid height={!isMobile ? ele.height : ""}>
                  <ColumnBorder padding="0" md="1" sm="1" xs="1" right bottom={ele.bottom} flex justifycontent="center">
                    <Text
                      value={ele.bottomSubTitle}
                      color={color}
                      transform="uppercase"
                      weight="bold"
                      lineHeight="175%"
                      padding="0.8em"
                      size="f6"
                      letterSpacing="0.05em"
                    />
                  </ColumnBorder>
                  <ColumnBorder padding="0" md="11" sm="11" xs="11" bottom={ele.bottom} flex justifycontent="center">
                    <Text
                      value={ele.bottomText}
                      lineHeight="175%"
                      padding="0.8em"
                      size="f7"
                    />
                  </ColumnBorder>
                </WrapperText>
              </Column>
            </Row>
          ))
        }
      </RowBorder>
    </Modal>
  );
});

ModalCefr.displayName = 'ModalCefrNavigation';

export default ModalCefr;