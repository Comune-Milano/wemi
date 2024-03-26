/** @format */

import React from 'react';
import { colors } from 'theme';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import pittogrammaBabySitter from 'images2/homeTCB/Pittogramma-baby-sitter.png';
import pittogrammaColf from 'images2/homeTCB/Pittogramma-colf.png';
import pittogrammaBadante from 'images2/homeTCB/Pittogramma-badante.png';
import { Row, Column } from 'components/ui/Grid';
import { ID_SERVIZIO_TATA, ID_SERVIZIO_COLF, ID_SERVIZIO_BADANTE } from 'types/tcbConstants';

const Image = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 10rem;
`;

const Div = styled.div`
${props => !props.disabled ?
    ` cursor: pointer;
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1, 1.1);
    p {
      opacity: .9;
      color: ${colors.darkGrey}
    }
  }` :
    ` opacity: 0.5;
  color: ${colors.darkGrey};
  pointer-events: none;
`}`;

const MenuDisponibilitàChildren = ({ setDisponibilitaOrariaData, buttonsData }) => {
  const handleClickDisponibilitaTata = () => {
    setDisponibilitaOrariaData({
      show: true,
      servizio: 'Baby-sitter',
      idServizioRiferimento: ID_SERVIZIO_TATA,
    });
  };

  const handleClickDisponibilitaColf = () => {
    setDisponibilitaOrariaData({
      show: true,
      servizio: 'Colf',
      idServizioRiferimento: ID_SERVIZIO_COLF,
    });
  };

  const handleClickDisponibilitaBadante = () => {
    setDisponibilitaOrariaData({
      show: true,
      servizio: 'Badante',
      idServizioRiferimento: ID_SERVIZIO_BADANTE,
    });
  };

  return (
    <Row fluid margin="0" padding="0">
      <Column padding="0" justifycontent="center" alignitems="center" lg="4" md="4" sm="4">
        <Div onClick={handleClickDisponibilitaTata} disabled={!buttonsData.btnDispTataEnabled}>
          <Image src={pittogrammaBabySitter} />
        </Div>
        <Text
          value="DISPONIBILITÀ COME"
          transform="uppercase"
          color="darkGrey"
          tag="p"
          size="f7_5"
          align="center"
        />
        <Text
          value="BABY-SITTER"
          transform="uppercase"
          color="darkGrey"
          tag="p"
          size="f7_5"
          align="center"
        />
      </Column>
      <Column padding="0" justifycontent="center" alignitems="center" lg="4" md="4" sm="4">
        <Div onClick={handleClickDisponibilitaColf} disabled={!buttonsData.btnDispColfEnabled}>
          <Image src={pittogrammaColf} />
        </Div>
        <Text
          value="DISPONIBILITÀ COME"
          transform="uppercase"
          color="darkGrey"
          tag="p"
          size="f7_5"
          align="center"
        />
        <Text
          value="COLF"
          transform="uppercase"
          color="darkGrey"
          tag="p"
          size="f7_5"
          align="center"
        />
      </Column>
      <Column padding="0" justifycontent="center" alignitems="center" lg="4" md="4" sm="4">
        <Div onClick={handleClickDisponibilitaBadante} disabled={!buttonsData.btnDispBadanteEnabled}>
          <Image src={pittogrammaBadante} />
        </Div>
        <Text
          value="DISPONIBILITÀ COME"
          transform="uppercase"
          color="darkGrey"
          tag="p"
          size="f7_5"
          align="center"
        />
        <Text
          value="BADANTE"
          transform="uppercase"
          color="darkGrey"
          tag="p"
          size="f7_5"
          align="center"
        />
      </Column>
    </Row>
  );
};

MenuDisponibilitàChildren.displayName = 'MenuDisponibilitàChildren';
export default MenuDisponibilitàChildren;
