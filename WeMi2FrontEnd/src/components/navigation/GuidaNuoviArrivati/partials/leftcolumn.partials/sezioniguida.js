import { Row } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React from 'react';
import { SEZIONI_GUIDA } from '../../constants';
import { OrangeOrderedList } from '../components.styled';
import ListSection from './listsection';

const SezioniGuida = () => (
  <>
    <Row fluid margin="3.5em 0 2.5em 0">
      <BackgroundTitle size={bgTitleSizes.small} label="LE SEZIONI DELLA GUIDA" bgColor="orange" />
    </Row>
    <Row fluid>
      <OrangeOrderedList paddingStart="0" type="decimal" paddingLeft="0">
        {SEZIONI_GUIDA.map(sezione => (
          <ListSection
            title={sezione.title}
            text={sezione.text}
          />
        ))}
      </OrangeOrderedList>
    </Row>
  </>
  );

SezioniGuida.displayName = 'SezioniGuida';
export default SezioniGuida;
