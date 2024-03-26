import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row, Column } from 'components/ui/Grid';
import Table from './Table';
import { corsiTitle, LEFT_ANCHORS } from './costants';
import { contentTableTop, contentTableBottom } from './costants.corsi';

const Corsi = ({
  color = 'blue',
  setOpenModalAttestazione,
  setOpenModalCertificazione,
  setOpenModalCefr,
}) => (
  <div id={LEFT_ANCHORS.tabella}>
    <Row fluid>
      <BackgroundTitle
        bgColor={color}
        label={corsiTitle}
        size={bgTitleSizes.small}
      />
      <Column padding="0" margin="2em 0 0 0">
        <Table
          titleColumns="Pubblico"
          color="blue"
          content={contentTableTop(setOpenModalAttestazione, setOpenModalCertificazione, setOpenModalCefr)}
        />
      </Column>
      <Column padding="0" margin="2em 0 0 0">
        <Table
          titleColumnSx="TERZO SETTORE"
          titleColumnDx="PRIVATO"
          color="blue"
          content={contentTableBottom(setOpenModalAttestazione, setOpenModalCertificazione, setOpenModalCefr)}
        />
      </Column>
    </Row>
  </div>
);

Corsi.displayName = 'CorsiNavigation';

export default Corsi;