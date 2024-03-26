import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import React from 'react';
import TextAccordion from 'components/ui2/TextAccordion';
import useWindowSize from 'hooks/useWindowSize';
import SchoolTable from './schooltable';
import SchoolTableMobile from './schooltablemobile';

const CicliScolastici = () => {
  const breakpoint = useWindowSize();
  return (
    <Row fluid margin="1em 0 0 0">
      <TextAccordion
        label="COME FUNZIONANO I CICLI SCOLASTICI IN ITALIA?"
        weight="bold"
        size="f6"
        labelTransform="uppercase"
        labelLetterSpacing="0.05em"
        color="purple"
      >
        <Text
          value="La scuola in Italia si divide in due cicli di istruzione: il primo ciclo di istruzione dura 8 anni, il secondo da 3 a 5 anni."
          size="f7"
          color="black"
          lineHeight="175%"
        />
        {['xs', 'sm', 'md'].indexOf(breakpoint) === -1 ?
          <SchoolTable />
            : <SchoolTableMobile />}
      </TextAccordion>
    </Row>
  );
};

CicliScolastici.displayName = 'CicliScolastici';
export default CicliScolastici;
