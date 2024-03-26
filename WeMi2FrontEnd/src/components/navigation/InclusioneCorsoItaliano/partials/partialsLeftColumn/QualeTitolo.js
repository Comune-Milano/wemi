import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import Button from 'components/ui2/Button';
import { List } from 'components/ui2/List';
import TextBottomTable from './TextBottomTable';
import { qualeTitolo, LEFT_ANCHORS } from './costants';

const QualeTitolo = ({
  color = 'blue',
  openModalAttestazione,
  setOpenModalAttestazione,
  openModalCertificazione,
  setOpenModalCertificazione
}) => (
  <div id={LEFT_ANCHORS.qualeTitolo}>
    <Row fluid>
      <BackgroundTitle
        bgColor={color}
        label={qualeTitolo.qualeTitoloTitle}
        size={bgTitleSizes.small}
      />
      <Column padding="0" margin="1em 0 0 0">
        <Text
          value={qualeTitolo.qualeTitoloSubTitle}
          color={color}
          transform="uppercase"
          weight="bold"
          lineHeight="175%"
          size="f6"
          letterSpacing="0.05em"
        />
      </Column>
      <Column padding="0">
        {
          qualeTitolo.qualeTitoloTextTop.map((text, index) => (
            <React.Fragment key={`textTop-${index.toString()}`}>
              <Text
                value={text.text}
                weight={text.bold ? 'bold' : ''}
                lineHeight="175%"
                tag={text.block ? 'div' : 'span'}
                size="f7"
              />
                &nbsp;
            </React.Fragment>
          ))
        }
      </Column>
      <Column padding="0">
        {
          qualeTitolo.qualeTitoloTextTopList.map((text, index) => (
            <React.Fragment key={`textTopList-${index.toString()}`}>
              <Text
                value={text.text}
                weight={text.bold ? 'bold' : ''}
                lineHeight="175%"
                size="f7"
              />
                &nbsp;
            </React.Fragment>
          ))
        }
      </Column>
      <Column padding="0">
        <List>
          {qualeTitolo.qualeTitoloList}
        </List>
      </Column>
      <Column padding="0">
        <AnchorLink
          to={qualeTitolo.qualeTitoloLink.to}
          _blank
          align="left"
          display="inline-block"
        >
          <Text
            value={qualeTitolo.qualeTitoloLink.value}
            decoration="underline"
            color={color}
            fontStyle="italic"
            size="f7"
          />
        </AnchorLink>
      </Column>
      <Column padding="0" margin="1.5em 0 0 0">
        <Row fluid>
          <Column padding="0" lg="5" md="11" sm="5" xs="11" sizemargin={{ sm: '0 1em 0 0', xs: '0 1em 1em 0' }}>
            <Button
              color="blue"
              label={qualeTitolo.qualeTitoloButton1}
              width="100%"
              weight="bold"
              padding="5px 30px"
              onClick={() => { setOpenModalCertificazione(!openModalCertificazione); }}
            />
          </Column>
          <Column padding="0" lg="5" md="11" sm="5" xs="11">
            <Button
              color="blue"
              label={qualeTitolo.qualeTitoloButton2}
              width="100%"
              padding="5px 30px"
              weight="bold"
              onClick={() => { setOpenModalAttestazione(!openModalAttestazione); }}
            />
          </Column>
        </Row>
      </Column>
      <Column padding="0" margin="1.5em 0 0 0">
        <TextBottomTable
          keyText="QualeTitolo"
        />
      </Column>
    </Row>
  </div>
);

QualeTitolo.displayName = 'QualeTitoloNavigation';

export default QualeTitolo;
