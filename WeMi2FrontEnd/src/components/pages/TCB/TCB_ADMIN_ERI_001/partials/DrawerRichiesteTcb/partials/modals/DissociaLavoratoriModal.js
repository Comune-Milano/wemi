import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import Input from 'components/ui2/Input';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Text from 'components/ui/Text';
import Select from 'components/ui2/Select';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import {
  DominioTcbByTipoTcb as DominioTcbByTipoTcbQ,
  DisassociaLavoratoriDomanda as DisassociaLavoratoriDomandaMutation,
} from '../../../../backofficeTcbRichiesteGraphQL';

const DissociaLavoratoriModal = ({ setOpenModal, data, updateTableDataCallback }) => {
  const disassociaLavoratoriDomanda = useStatelessGraphQLRequest(DisassociaLavoratoriDomandaMutation);
  const [checkBtnClicked, setCheckBtnClicked] = useState(false);

  const [dominioTcbNoteDisassocizione] = useGraphQLRequest(
    [],
    DominioTcbByTipoTcbQ,
    {
      ty_dominio_tcb: 56,
    },
    true,
    dominiTcb => dominiTcb.map(row => ({ id: row.value, value: row.textValue }))
  );

  const [motivoDisassociazione, setMotivoDisassocizione] = useState(data.statoDisassociazione);
  const [{ showInputMotivoDisassocizione, descrizioneMotivoDisassocizione }, setInputMotivoDisassocizione] = useState({
    showInputMotivoDisassocizione: null,
    descrizioneMotivoDisassocizione: null,
  });

  const handleChangeNoteDisassocizione = event => {
    if (event.id === 0) {
      setInputMotivoDisassocizione({ showInputMotivoDisassocizione: true });
    } else {
      setInputMotivoDisassocizione({ showInputMotivoDisassocizione: false });
    }

    setMotivoDisassocizione(event || undefined);
  };

  const handleChangeInputMotivoDisassociazione = value => {
    setInputMotivoDisassocizione({ showInputMotivoDisassocizione: true, descrizioneMotivoDisassocizione: value || undefined });
  };

  const clickConfermaHandler = () => {
    if (!checkBtnClicked) {
      setCheckBtnClicked(true);
      disassociaLavoratoriDomanda({
        input: {
          codiceRichiesta: data.codiceRichiesta,
          codiceMotivoDisassociazione: motivoDisassociazione.id,
          descrizioneMotivoDisassociazione: descrizioneMotivoDisassocizione || null,
        },
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
            value="Motivo Disassociazione: "
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
            clickedItem={handleChangeNoteDisassocizione}
            items={dominioTcbNoteDisassocizione.data}
            selectedValue={{ value: motivoDisassociazione && motivoDisassociazione.value }}
            placeholder="Seleziona il motivo della disassociazione"
            intlFormatter
          />
        </Column>
      </Row>
      {showInputMotivoDisassocizione ? (
        <Row fluid>
          <Column xs="12" md="12">
            <Input
              material
              label="Descrizione Motivo Disassociazione"
              onChange={handleChangeInputMotivoDisassociazione}
              inputValue={descrizioneMotivoDisassocizione}
              // maxLength="255"
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Column>
        </Row>
      ) : null}
      <Row fluid justifycontent="center">
        <Column xs="6" md="6" alignself="center">
          <Button
            color="primary"
            label="Disassocia"
            value="Disassocia"
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

DissociaLavoratoriModal.displayName = 'DissociaLavoratoriModal';
export default DissociaLavoratoriModal;
