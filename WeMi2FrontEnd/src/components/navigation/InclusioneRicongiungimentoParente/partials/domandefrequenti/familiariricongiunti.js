import React from 'react';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import TextAccordion from 'components/ui2/TextAccordion';
import { StyledUl } from '../components.style';

export const FamiliariRicongiunti = () =>
(
  <Row fluid margin="0 0 1em">
    <TextAccordion
      label="QUALI FAMILIARI NON COMUNITARI POSSONO ESSERE RICONGIUNTI?"
      weight="bold"
      labelTransform="uppercase"
      labelLetterSpacing="0.05em"
      color="red"
      size="f6"
    >
      <StyledUl>
        <li>
          <Text
            value="Coniuge maggiorenne"
            lineHeight="175%"
            size="f7"
          />
        </li>
        <Row fluid>
          <li>
            <Text
              value="Partner Unito/a civilmente maggiorenne e non legalmente separato"
              lineHeight="175%"
              size="f7"
            />
          </li>
        </Row>
        <li>
          <Text
            value="Figli minori, anche del coniuge o nati fuori dal matrimonio, non coniugati, a condizione che l'altro genitore, qualora esistente, abbia dato il suo consenso"
            lineHeight="175%"
            size="f7"
          />
        </li>
        <li>
          <Text
            value="Figli maggiorenni a carico, che per invalidità totale documentata non siano in grado di mantenersi direttamente"
            lineHeight="175%"
            size="f7"
          />
        </li>
        <li>
          <Text
            value="Genitori a carico, qualora non abbiano altri figli nel paese di origine o di provenienza, ovvero genitori ultra sessantacinquenni, qualora gli altri figli siano impossibilitati al loro sostentamento per documentati gravi motivi di salute"
            lineHeight="175%"
            size="f7"
          />
        </li>
      </StyledUl>
    </TextAccordion>
  </Row>
);

FamiliariRicongiunti.displayName = 'FamiliariRicongiunti';
