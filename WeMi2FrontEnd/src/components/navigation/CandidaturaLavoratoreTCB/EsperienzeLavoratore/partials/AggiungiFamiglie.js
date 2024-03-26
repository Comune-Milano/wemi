/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { colors } from 'theme';
import { TCBConfig002 } from 'redux-modules/actions/authActions';
import { Row } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import { FieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { ENUM_TYPE } from '../constants';
import Tooltip from 'components/ui2/Tooltip';
import FaIcon from 'components/ui2/FaIcon';

const RelativeForm = styled.form`
  position: relative;
  width: 21em;
  > button {
    position: absolute;
    right: 0.5em;
    top: calc((100% - 33px)/2 + 3px);
    outline: none;
    height: 24px;
    border: none;
    background-color: transparent;
    padding: 0;
  }
`;

const InputButton = styled.button`
position: absolute;
    right: 0.5em;
    top: calc((100% - 33px)/2 + 3px);
    outline: none;
    height: 24px;
    border: none;
    background-color: transparent;
    padding: 0;
`

const AggiungiFamiglie = ({
  famiglie,
  setFamiglie,
  order
}) => {

  const [nuovaFamiglia, setNuovaFamiglia] = useState('');

  /**
   *  La singola esperienza del lavoratore viene persistita come
   *  se fosse una richiesta_ente, dunque il suo identificativo
   * corrisponde a un id_richiesta_ente sulla tabella richiesta_servizio_ente
   * con stato 9.
   */
  return (
    <Row fluid margin="2em 0 0 0" direction="column">
      <FieldTitle
        label={famiglie.length > 0 ? "Aggiungi esperienza" : "Inserisci esperienza (dalla più recente)"}
      />
      <RelativeForm>
      <Tooltip
          fluid
          position="bottom"
          color="white"
          bgcolor="blue"
          posAdjustment="20%"
          value="Inserisci l'esperienza e clicca sulla freccia">  
        <Input
          placeholder = "Es.Famiglia Rossi, nome azienda"
          onChange={(value) => {
            setNuovaFamiglia(value);
          }}
          inputValue={nuovaFamiglia}
        />
        <InputButton
          type="submit"
          onClick={async (event) => {
            event.preventDefault();
            if (nuovaFamiglia.trim().length > 0) {
              setFamiglie([{
                order: famiglie.length + 1,
                nome: nuovaFamiglia,
                type: ENUM_TYPE.INSERITA,
                new: true,
              }, ...famiglie]);
              setNuovaFamiglia('');
            }
          }}
        >
          <FaIcon
            fontSize="f7"
            padding="0 0.3em"
            icon="arrow-right"
            color={nuovaFamiglia.trim().length > 0 ? 'primary' : 'darkGrey'}
          />
        </InputButton>
        </Tooltip>
      </RelativeForm>
    </Row>
  );
};

AggiungiFamiglie.displayName = 'AggiungiFamiglie';

const mapDispatchToProps = ({
  TCBConfig002,
});

const mapStoreToProps = store => ({
  config002: store.requestTCB.config002,
  EstraiDati: store.graphql.EstraiDatiConfigurazioneRichiesta002,
  locale: store.locale,
})
export default connect(mapStoreToProps, mapDispatchToProps)(AggiungiFamiglie);