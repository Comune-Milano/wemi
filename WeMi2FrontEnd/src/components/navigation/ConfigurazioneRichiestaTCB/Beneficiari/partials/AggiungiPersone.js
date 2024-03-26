/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fonts, colors } from 'theme';
import { TCBConfig002 } from 'redux-modules/actions/authActions';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Row } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import FaIcon from 'components/ui2/FaIcon';
import Tooltip from 'components/ui2/Tooltip';
import FieldTitle from '../../partials/FieldTitle';
import {
  inserisciBeneficiarioTCB as inserisciBeneficiarioTCBM,
  inserisciModificaAttributoBeneficiarioTCB as inserisciModificaAttributoBeneficiarioTCBM,
} from './graphQLTCBIRI002';
import { capitalizeString } from 'utils/extensions/stringExtensions';

const RelativeForm = styled.form`
  position: relative;
  width: 21em;
  > button {
    position: absolute;
    right: 0.5em;
    top: calc((100% - 24px)/2 + 3px);
    outline: none;
    height: ${fonts.size.f5};
    border: none;
    background-color: transparent;
    padding: 0;
  }
`;

const InputButton = styled.button`
    position: absolute;
    right: 0.5em;
    top: 33%;
    outline: none;
    height: 24px;
    border: none;
    background-color: transparent;
    padding: 0;
`;

const AggiungiPersone = ({
  idRichiestaTcb,
  cdServizioTCB,
  datiRichiesta002,
  getDatiRichiesta002,
  onAddChangeVisibility,
}) => {
  const [nome, setNome] = useState('');
  const [pgBen, setPgBen] = useState(0);

  const [inserisciBeneficiario, inserisciBeneficiarioMutation] = useGraphQLRequest(
    [],
    inserisciBeneficiarioTCBM,
  );

  const inserisciNomeBeneficiario = useStatelessGraphQLRequest(
    inserisciModificaAttributoBeneficiarioTCBM,
  );

  const inserisciNomeBeneficiarioMutation = async () => {
    if (inserisciBeneficiario.data.action && inserisciBeneficiario.data.action === 'Inserito') {
      await inserisciNomeBeneficiario({
        input: {
          idRichiestaTcb,
          arrayBen: [
            {
              pgBen: inserisciBeneficiario.data.pgBen,
              arrayConfig: [
                {
                  cd_attributo: cdAttributo.TX_NOME_BENEFICIARIO,
                  cd_val_attributo: 1,
                  tx_val: capitalizeString(nome),
                },
              ],
            },
          ],
        },
      });
      onAddChangeVisibility();
      await getDatiRichiesta002();
      setNome('');
    }
  };

  const refInput = useRef();

  useEffect(() => {
    if (!inserisciBeneficiario.isLoading) {
      inserisciNomeBeneficiarioMutation();
    }
  }, [inserisciBeneficiario]);

  useEffect(() => {
    if (datiRichiesta002) {
      if (datiRichiesta002.beneficiari && datiRichiesta002.beneficiari.length > 0) {
        setPgBen(datiRichiesta002.beneficiari.length + 1);
      } else {
        setPgBen(1);
      }
    }
  }, [datiRichiesta002, datiRichiesta002 && datiRichiesta002.beneficiari]);

  useEffect(() => {
    if (datiRichiesta002 && datiRichiesta002.beneficiari && datiRichiesta002.beneficiari.length === 0) {
      window.scrollTo(0, refInput.current.offsetTop);
      refInput.current.focus();
    }
  }, [datiRichiesta002]);


  return (
    <Row fluid margin="2em 0 0 0" direction="column">
      <FieldTitle
        label={`Aggiungi un ${cdServizioTCB === 1 ? 'bambino o una bambina' : 'beneficiario'}`}
      />
      <RelativeForm>
        <Tooltip
          fluid
          position="bottom"
          color="white"
          bgcolor="blue"
          posAdjustment="20%"
          value="Inserisci il nome e clicca sulla freccia"
        >
          <Input
            label="Nome"
            onChange={(value) => { setNome(value); }}
            inputValue={nome}
            required
            innerRef={refInput}
          />
          <InputButton
            type="submit"
            aria-label="bottone di inserimento dei dettagli sul beneficiario"
            onClick={async (event) => {
              event.preventDefault();
              if (pgBen !== 0 && nome.trim().length > 0) {
                await setPgBen(0);
                await inserisciBeneficiarioMutation({
                  idRichiestaTcb,
                  pgBen,
                });
              }
            }}
          >
            <FaIcon
              fontSize="f7"
              padding="0.2em 0.3em 0 0"
              icon="arrow-right"
              color={nome.trim().length > 0 ? 'primary' : 'darkGrey'}
            />
          </InputButton>
        </Tooltip>
      </RelativeForm>
    </Row>
  );
};

AggiungiPersone.displayName = 'AggiungiPersone';

const mapDispatchToProps = ({
  TCBConfig002,
});

const mapStoreToProps = store => ({
  config002: store.requestTCB.config002,
  EstraiDati: store.graphql.EstraiDatiConfigurazioneRichiesta002,
  locale: store.locale,
});
export default connect(mapStoreToProps, mapDispatchToProps)(AggiungiPersone);
