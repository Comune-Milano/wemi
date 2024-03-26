import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row, Column } from 'components/ui/Grid';
import TextAccordion from 'components/ui2/TextAccordion';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { withRouter } from 'react-router';
import { PAGE_COME_FUNZIONA_APPRENDIMENTO_LINGUA } from 'types/url';
import { domandeFrequenti } from './costants';

const DomandeFrequenti = ({
  color = 'blue',
  history,
}) => (
  <Row fluid>
    <BackgroundTitle
      bgColor={color}
      label={domandeFrequenti.domandeFrequentiTitle}
      size={bgTitleSizes.small}
    />
    <Column padding="0" margin="1.8em 0 0 0">
      {
        domandeFrequenti.domandeFrequentiArr.map?.((domanda, index) => (
          <TextAccordion
            label={domanda.title}
            size="f6"
            weight="bold"
            labelLetterSpacing="0.05em"
            color="blue"
            key={`domandeFrequentiArr-${index}`}
          >
            <Column padding="0">
              <Text
                value={domanda.value}
                lineHeight="175%"
                size="f7"
              />
            </Column>
          </TextAccordion>
        ))
      }
    </Column>
    <div style={{ margin: '3em 0 0 0' }}>
      <Button
        color="blue"
        label={domandeFrequenti.domandeFrequentiButton}
        width="auto"
        weight="bold"
        padding="5px 30px"
        onClick={() => { history.push(PAGE_COME_FUNZIONA_APPRENDIMENTO_LINGUA); }}
      />
    </div>
  </Row>
);

DomandeFrequenti.displayName = 'DomandeFrequentiNavigation';

export default withRouter(DomandeFrequenti);
