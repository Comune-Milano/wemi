import ComeFunzionaCarousel from 'components/shared/ComeFunzionaCarousel';
import React from 'react';
import { Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import GreyBoxContainer from 'components/shared/GreyBoxContainer';
import { RowContainer } from './components.styled';

const ComeFunzionaSottoHomePage = ({ color, stepList, text }) => (
  <>
    <ComeFunzionaCarousel stepList={stepList} color={color}>
      <Column padding="0 0 5.5rem 0">
        <Text
          value={text}
          color="black"
          size="f7"
        />
          &nbsp;
        <Text
          value="associazioni, cooperative e imprese sociali selezionate e qualificate dal Comune di Milano."
          color="black"
          size="f7"
          weight="bold"
        />
      </Column>
      <Column padding="0 0 1em 0">
        <Text
          value="Trova la soluzione ai tuoi bisogni in pochi e semplici passaggi:"
          color="black"
          decoration="underline"
          size="f7"
          letterSpacing="0.05em"
          lineHeight="175%"
          weight="bold"
          transform="uppercase"
        />
      </Column>
    </ComeFunzionaCarousel>
    <RowContainer fluid margin="5.5rem 0 0 0">
      <GreyBoxContainer color={color} />
    </RowContainer>
  </>
  );

ComeFunzionaSottoHomePage.displayName = 'ComeFunzionaSottoHomePage';
export default ComeFunzionaSottoHomePage;
