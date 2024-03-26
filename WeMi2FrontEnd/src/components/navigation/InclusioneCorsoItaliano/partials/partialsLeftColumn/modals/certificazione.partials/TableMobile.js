
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { ColumnBackgroundBorder, ColumnBorderBottom } from '../CorsoItaliano.modals.styled';
import LeftColumnCertificazione from './LeftColumnCertificazione';
import { certificazioneTableMobile } from '../costants';

const TableMobile = () => (
  <Row fluid margin="1.5em 0 0 0">
    {certificazioneTableMobile.map((certificazione, indexCertificazione) => (
      <Row fluid margin="0 0 3em 0" key={`TableMobile-ModalCertificazione-${indexCertificazione.toString()}`}>
        <Column padding="0" sm="2" xs="3">
          <LeftColumnCertificazione />
        </Column>
        <Column padding="0" sm="9" xs="9">
          <ColumnBackgroundBorder background bottom padding="0.8em 0 0.8em 0" textAlign="center">
            <AnchorLink
              to={certificazione.heading.link}
              align="left"
              display="inline-block"
              _blank
            >
              <Text
                value={certificazione.heading.text}
                decoration="underline"
                color="blue"
                lineHeight="175%"
                size="f7"
                letterSpacing="0.05em"
              />
            </AnchorLink>
          </ColumnBackgroundBorder>
          {
            certificazione.content.map((content, indexContent) => (
              <ColumnBorderBottom padding="0.8em 0 0.8em 0" borderColor="grey" textAlign="center" key={`TableMobile-ModalCertificazione-Content-${certificazione.heading.text}-${indexContent.toString()}`}>
                <Text
                  value={content}
                  lineHeight="175%"
                  size="f7"
                  padding="0.8em 0 0.8em 0"
                />
              </ColumnBorderBottom>
            ))
        }
        </Column>
      </Row>
    ))}
  </Row>
);

TableMobile.displayName = 'ModalCertificazioneNavigation';

export default TableMobile;
