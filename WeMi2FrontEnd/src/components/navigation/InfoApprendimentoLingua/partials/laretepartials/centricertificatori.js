import { Row } from 'components/ui/Grid';
import React from 'react';
import AnchorLink from 'components/ui/AnchorLink';
import TextAccordion from 'components/ui2/TextAccordion';
import { TextSpan, UnderlineBlueTextSpan } from '../../components.style';

const CentriCertificatori = () => (
  <>
    <Row fluid margin="1em 0 0 0">
      <TextAccordion
        label="CENTRI CERTIFICATORI"
        size="f6"
        weight="bold"
        labelLetterSpacing="0.05em"
        color="blue"
      >
        <Row fluid>
          <TextSpan>
            Sono i Centri, in Italia e nel resto del Mondo, autorizzati e convenzionati con gli ENTI

            Certificatori dove è possibile effettuare l&apos;esame di Certificazione. Per sapere quali sono

          bisogna entrare nei siti delle certificazioni
          <ul>
            <li>
              <AnchorLink
                to="http://www.cvcl.it/ricercasedi/homericerca.aspx?qst=celi"
                _blank
                align="left"
                display="inline-block"
              >
                <UnderlineBlueTextSpan>Certificazione CELI</UnderlineBlueTextSpan>
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                to="https://plida.it/"
                _blank
                align="left"
                display="inline-block"
              >
                <UnderlineBlueTextSpan>Certificazione PLIDA</UnderlineBlueTextSpan>
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                to="https://cils.unistrasi.it/84/16/Le_sedi_di_esami.htm"
                _blank
                align="left"
                display="inline-block"
              >
                <UnderlineBlueTextSpan>Certificazione CILS</UnderlineBlueTextSpan>
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                to="http://www.certificazioneitaliano.uniroma3.it/CentriEsame.aspx"
                _blank
                align="left"
                display="inline-block"
              >
                <UnderlineBlueTextSpan>Certificazione CERT.IT L2</UnderlineBlueTextSpan>
              </AnchorLink>
            </li>
          </ul>
        </TextSpan>
        </Row>
      </TextAccordion>
    </Row>
  </>
  );

CentriCertificatori.displayName = 'CentriCertificatori';
export default CentriCertificatori;
