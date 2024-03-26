
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { ColumnBackgroundBorder, ColumnBorderBottom, RowNowrap } from '../CorsoItaliano.modals.styled';
import LeftColumnCertificazione from './LeftColumnCertificazione';
import { modalCertificazione } from '../costants';

const TableDesktop = () => (
  <Row fluid margin="1.5em 0 0 0">
    <Column padding="0" md="1">
      <LeftColumnCertificazione />
    </Column>
    <Column padding="0" md="11">
      <RowNowrap fluid>
        {
          modalCertificazione.certificazioneQuantoCosta.table.heading?.map((title, index) => (
            <ColumnBackgroundBorder widthLg widthMd background bottom padding="0.8em 0 0.8em 0" sm="3" xs="6" textAlign="center" key={`headingTableChiRilascia-${index.toString()}`}>
              <AnchorLink
                to={title.link}
                align="left"
                display="inline-block"
                _blank
              >
                <Text
                  value={title.text}
                  decoration="underline"
                  color="blue"
                  lineHeight="175%"
                  size="f7"
                  letterSpacing="0.05em"
                />
              </AnchorLink>
            </ColumnBackgroundBorder>
          ))
        }
      </RowNowrap>
      <RowNowrap fluid>
        {
          modalCertificazione.certificazioneQuantoCosta.table.content.contentLIVELLI?.map((title, index) => (
            <ColumnBorderBottom padding="0.8em 0 0.8em 0" sm="3" xs="6" borderColor="grey" textAlign="center" key={`contentLIVELLITableChiRilascia-${index}`}>
              <Text
                value={title}
                lineHeight="175%"
                size="f7"
                padding="0.8em 0 0.8em 0"
              />
            </ColumnBorderBottom>
          ))
        }
      </RowNowrap>
      <RowNowrap fluid>
        {
          modalCertificazione.certificazioneQuantoCosta.table.content.contentCILS?.map((title, index) => (
            <ColumnBorderBottom padding="0.8em 0 0.8em 0" sm="3" xs="6" borderColor="grey" textAlign="center" key={`contentCILSTableChiRilascia-${index}`}>
              <Text
                value={title}
                lineHeight="175%"
                size="f7"
                padding="0.8em 0 0.8em 0"
              />
            </ColumnBorderBottom>
          ))
        }
      </RowNowrap>
      <RowNowrap fluid>
        {
          modalCertificazione.certificazioneQuantoCosta.table.content.contentCELIIMMIGRATI?.map((title, index) => (
            <ColumnBorderBottom padding="0.8em 0 0.8em 0" sm="3" xs="6" borderColor="grey" textAlign="center" key={`contentCELIIMMIGRATITableChiRilascia-${index}`}>
              <Text
                value={title}
                lineHeight="175%"
                size="f7"
                padding="0.8em 0 0.8em 0"
              />
            </ColumnBorderBottom>
          ))
        }
      </RowNowrap>
      <RowNowrap fluid>
        {
          modalCertificazione.certificazioneQuantoCosta.table.content.contentCELISTANDARD?.map((title, index) => (
            <ColumnBorderBottom padding="0.8em 0 0.8em 0" sm="3" xs="6" borderColor="grey" textAlign="center" key={`contentCELISTANDARDTableChiRilascia-${index}`}>
              <Text
                value={title}
                lineHeight="175%"
                size="f7"
                padding="0.8em 0 0.8em 0"
              />
            </ColumnBorderBottom>
          ))
        }
      </RowNowrap>
      <RowNowrap fluid>
        {
          modalCertificazione.certificazioneQuantoCosta.table.content.contentPLIDA?.map((title, index) => (
            <ColumnBorderBottom padding="0.8em 0 0.8em 0" sm="3" xs="6" borderColor="grey" textAlign="center" key={`contentPLIDATableChiRilascia-${index}`}>
              <Text
                value={title}
                lineHeight="175%"
                size="f7"
                padding="0.8em 0 0.8em 0"
              />
            </ColumnBorderBottom>
          ))
        }
      </RowNowrap>
      <RowNowrap fluid>
        {
          modalCertificazione.certificazioneQuantoCosta.table.content.contentCER?.map((title, index) => (
            <ColumnBorderBottom padding="0.8em 0 0.8em 0" sm="3" xs="6" borderColor="grey" textAlign="center" key={`contentROMA3TableChiRilascia-${index}`}>
              <Text
                value={title}
                lineHeight="175%"
                size="f7"
                padding="0.8em 0 0.8em 0"
              />
            </ColumnBorderBottom>
          ))
        }
      </RowNowrap>
    </Column>

  </Row>
);

TableDesktop.displayName = 'ModalCertificazioneNavigation';

export default TableDesktop;
