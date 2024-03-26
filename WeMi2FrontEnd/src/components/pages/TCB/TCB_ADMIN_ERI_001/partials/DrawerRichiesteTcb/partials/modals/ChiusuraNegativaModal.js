import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import Select from 'components/ui2/Select';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import Input from 'components/ui2/Input';
import { ID_SERVIZIO_BADANTE } from 'types/tcbConstants';
import styled from 'styled-components';
import {
  DominioTcbByTipoTcb as DominioTcbByTipoTcbQ,
  InserisciChiusuraNegativa as InserisciChiusuraNegativaMutation,
} from '../../../../backofficeTcbRichiesteGraphQL';

const CustomText = styled(Text)`
  overflow-wrap: break-word;
`;

const ChiusuraNegativaModal = ({ setOpenModal, data, updateTableDataCallback, userProfile }) => {
  const [checkBtnClicked, setCheckBtnClicked] = useState(false);
  const inserisciChiusuraNegativa = useStatelessGraphQLRequest(InserisciChiusuraNegativaMutation);

  const [dominioTcbMotivoChiusura, performRequestDominioTcbMotivoChiusura] = useGraphQLRequest(
    [],
    DominioTcbByTipoTcbQ,
    {
      ty_dominio_tcb: 1,
    },
    true,
    dominiTcb => dominiTcb.map(row => ({ id: row.value, value: row.textValue })).filter(row => {
      if (data.idServizio === ID_SERVIZIO_BADANTE) {
        return [1, 2, 3, 4, 5, 6, 0].indexOf(row.id) > -1;
      }
      return [3, 4, 5, 6, 0].indexOf(row.id) > -1;
    })
  );

  const [motivoChiusura, setMotivoChiusura] = useState(data.statoChiusuraRichiesta);
  const [{ showInputMotivoChiusura, descrizioneMotivoChiusura }, setInputMotivoChiusura] = useState({
    showInputMotivoChiusura: data.statoChiusuraRichiesta && data.statoChiusuraRichiesta.id === 0,
    descrizioneMotivoChiusura: data.notaChiusuraRichiesta
  });

  const handleChangeMotivoChiusura = event => {
    if (event.id === 0) {
      setInputMotivoChiusura({ showInputMotivoChiusura: true });
    } else {
      setInputMotivoChiusura({ showInputMotivoChiusura: false });
    }

    setMotivoChiusura(event || undefined);
  };

  const handleChangeInputMotivoChiusura = value => {
    setInputMotivoChiusura({ showInputMotivoChiusura: true, descrizioneMotivoChiusura: value || undefined });
  };

  const clickConfermaHandler = () => {
    if (!checkBtnClicked && motivoChiusura && ((motivoChiusura.id === 0 && descrizioneMotivoChiusura) || motivoChiusura.id !== 0)) {
      setCheckBtnClicked(true);
      inserisciChiusuraNegativa({
        input: {
          codiceRichiestaBase: data.codiceRichiestaBase,
          codiceRichiesta: data.codiceRichiesta,
          codiceMotivoChiusura: motivoChiusura.id,
          descrizioneMotivoChiusura: descrizioneMotivoChiusura || null,
        }
      }).then(() => {
        setCheckBtnClicked(false);
        setOpenModal({ openModal: false });
        updateTableDataCallback();
      });
    }
  };

  return (
    <>
      <Row fluid>
        <Column lg="4" md="4" xs="4" alignself="center">
          <Text
            intlFormatter
            tag="h3"
            value="Motivo della chiusura: "
            color="primary"
            weight="bold"
            transform="none"
            padding="0 0.2rem 0 0"
            size="f7"
          />
        </Column>
        <Column lg="8" md="8" xs="8" alignself="center">
          <Select
            material
            required
            clickedItem={handleChangeMotivoChiusura}
            items={dominioTcbMotivoChiusura.data}
            selectedValue={{ value: motivoChiusura && motivoChiusura.value }}
            placeholder="Seleziona il motivo di chiusura"
            intlFormatter
          />
        </Column>
      </Row>
      {showInputMotivoChiusura ? (
        <Row fluid>
          <Column xs="12" md="12">
            <Input
              material
              label="Descrizione Motivo Chiusura"
              onChange={handleChangeInputMotivoChiusura}
              inputValue={descrizioneMotivoChiusura}
              maxLength="255"
            />
          </Column>
        </Row>
      ) : null}
      <Row fluid justifycontent="center">
        <Column xs="6" md="6" alignself="center">
          <Button
            color="primary"
            label="Conferma Chiusura"
            value="Conferma Chiusura"
            fontSize="f7"
            onClick={clickConfermaHandler}
          />
        </Column>
        <Column xs="6" md="6" alignself="center">
          <Button
            color="primary"
            label="Annulla Operazione"
            value="Annulla Operazione"
            fontSize="f7"
            onClick={() => setOpenModal({ openModal: false })}
          />
        </Column>
      </Row>
    </>
  );
};

ChiusuraNegativaModal.displayName = 'ChiusuraNegativaModal';
export default ChiusuraNegativaModal;
