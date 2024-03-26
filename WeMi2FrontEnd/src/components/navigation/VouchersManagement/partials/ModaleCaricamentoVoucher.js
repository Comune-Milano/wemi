/** @format */

import React, { useState } from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { withRouter } from 'react-router-dom';
import { fileToBase64 } from 'utils/functions/fileToBase64';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Header from 'components/ui2/Header';
import Button from 'components/ui2/Button';
import { Row, Column } from 'components/ui/Grid';
import InputFile from 'components/ui/InputFile';
import Select from 'components/ui2/Select';
import Input from 'components/ui2/Input';
import { noop } from 'utils/functions/noop';
import { List } from 'components/ui2/List';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { estraiSostegnoEconomico as estraiSostegniEconomici, elaboraCsv as elaboraCsvR, confermaCsv as confermaCsvR } from '../graphql/graphql';
import EsitiNegativiCaricamentoTablePagination from './PaginatedTable/EsitiNegativiCaricamentoTablePagination';
import DownloadButton from './DownloadButton/DownloadButton';

const ModaleCaricamentoVoucher = ({
  openUploadVoucherModal,
  setOpenUploadVoucherModal,
  setOpenErrorModal,
  setOpenSuccessModal,
  getVoucherList,
}) => {
  const title = 'Caricamento Voucher';

  const [selectedFile, setSelectedFile] = useState({ name: '' });
  const [isSelected, setIsSelected] = useState(false);
  const [isElaborato, setIsElaborato] = useState(false);
  const [sostegnoSelected, setSostegnoSelected] = useState(false);

  const [listaSostegniEconomici] = useGraphQLRequest(
    undefined,
    estraiSostegniEconomici,
    undefined,
    true
  );

  const [fileLavorato, setFileLavorato] = useState();

  const [sostegnoEconomico, setSostegnoEconomico] = useState();

  const resetModal = () => {
    setSelectedFile({ name: '' });
    setIsSelected(false);
    setIsElaborato(false);
    setSostegnoSelected(false);
    setFileLavorato(null);
    setSostegnoEconomico(null);
  };
  const softResetModal = () => {
    setSelectedFile({ name: '' });
    setIsSelected(false);
    setIsElaborato(false);
    setFileLavorato(null);
  };

  const closeModal = () => {
    resetModal();
    setOpenUploadVoucherModal(false);
  };

  const uploadedFile = (event) => {
    softResetModal();
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const elaboraCsv = useStatelessGraphQLRequest(
    elaboraCsvR, undefined, undefined, undefined, true,
  );

  const onElaboraCsv = async () => {
    try {
      const file = selectedFile;

      const base64 = await fileToBase64(file);
      const media = {
        ty_mime_type_media: file.type,
        nm_nome_media: file.name,
        oj_media: base64,
      };
      const res = await elaboraCsv({
        sostegnoEconomico: sostegnoEconomico.id,
        media,
      });
      setFileLavorato(res);
      setIsElaborato(true);
    } catch (error) {
      setOpenErrorModal({ open: true });
    }
  };

  const confermaCsv = useStatelessGraphQLRequest(
    confermaCsvR, undefined, undefined, undefined, true,
  );

  const onConfermaCsv = async () => {
    try {
      confermaCsv({ idImportazione: fileLavorato.idImportazione });
      setOpenSuccessModal({
        open: true,
        message: 'Operazione effettuata con successo',
      });
      getVoucherList();
      resetModal();
      closeModal();
    } catch (error) {
      setOpenErrorModal({ open: true });
    }
  };

  const creaItems = (arr) => {
    const ris = [];
    if (!arr) {
      return ris;
    }
    arr.forEach(element => {
      ris.push({ id: element.value, value: element.textValue });
    });
    return ris;
  };

  const children = (
    <>
      <Row fluid>
        <Header fontSize="f3" title={title} color="blue" />
      </Row>
      <Row fluid>
        <Column xs="6" padding="0 1em">
          <Input
            material
            label="Nome File"
            name="nomeFile"
            disabled
            inputValue={selectedFile.name}
          />
        </Column>
        <Column xs="6" padding="0.6em 0">
          <InputFile
            onDone={uploadedFile}
            onError={noop}
            accept=".csv"
            id="upload-file"
            value="Cerca File"
            fontSize="f7"
            weight="bold"
          />
        </Column>
      </Row>
      <Row fluid>
        <Column xs="6" padding="0.6em 1em">
          <Select
            name="2"
            label="Sostegno Economico"
            items={listaSostegniEconomici.data ? creaItems(listaSostegniEconomici.data) : []}
            selectedValue={sostegnoEconomico}
            clickedSelectedItem={() => {
              setSostegnoEconomico(undefined);
              setSostegnoSelected(false);
            }}
            clickedItem={(value) => {
              setSostegnoEconomico(value);
              setSostegnoSelected(true);
            }}
          />
        </Column>
      </Row>
      <Row fluid justifycontent="center">
        <Column xs="4" padding="3em 0">
          <Button
            disabled={!isSelected || !sostegnoSelected || isElaborato}
            autowidth
            label="Elabora File Voucher"
            fontSize="f7"
            onClick={onElaboraCsv}
            color="primary"
            margin="0 0.5rem 0 0"
          />
        </Column>
      </Row>
      {isSelected && isElaborato && fileLavorato ? (
        <div>
          <Row justifycontent="center" padding="0">
            <Text
              value="Log Elaborazione"
              weight="bold"
              size="f6"
              letterSpacing="0.05em"
              borderBottom="2px solid grey"
              width="100%"
              lineHeight="1em"
              align="center"
              padding="0 0 0.6em 0"
            />
          </Row>
          <List>
            <Row fluid margin="1em 1em 0">
              <Text lineHeight="2em" value="Esito elaborazione:">
              </Text>
              <Text padding="0 1em" weight="bold" lineHeight="2em" color={fileLavorato.esito ? 'green' : 'red'} value={fileLavorato.esito ? 'OK' : 'KO'}>
              </Text>
            </Row>
          </List>
          {fileLavorato.esito ?
            (
              <List>
                <Row fluid margin="1em 1em 0">
                  <Text lineHeight="2em" value="Voucher caricati:">
                  </Text>
                  <Text padding="0 1em" weight="bold" lineHeight="2em" value={`${fileLavorato.numeroVoucher}`}>
                  </Text>
                </Row>
                <Row fluid margin="1em 1em 0">
                  <Text lineHeight="2em" value="Importo totale voucher caricati:">
                  </Text>
                  <Text padding="0 1em" weight="bold" lineHeight="2em" value={`${moneyFormat(fileLavorato.importoTotale, true)}`}>
                  </Text>
                </Row>
              </List>
            ) : (
              <List>
                <Row fluid margin="1em 1em 0">
                  <Text lineHeight="2em" value="Sono stati riscontrati ">
                  </Text>
                  <Text padding="0 1em" weight="bold" lineHeight="2em" value={`${fileLavorato.motivi.length}`}>
                  </Text>
                  <Text lineHeight="2em" value=" errori">
                  </Text>
                </Row>
              </List>
            )}
          {fileLavorato.esito ?
            (<></>) : (
              <>
                <Row fluid margin="0" padding="1em 0 0 0">
                  <EsitiNegativiCaricamentoTablePagination listaMotivi={fileLavorato.motivi} />
                </Row>
                <Row fluid margin="1em 1em 0" justifycontent="center">
                  <DownloadButton
                    dataCallback={fileLavorato.motivi}
                    idFile={fileLavorato.idImportazione}
                  />
                </Row>
              </>
            )}
          <Row margin="1em 1em 0" justifycontent="center">
            <Button
              autowidth
              label={fileLavorato.esito ? 'Conferma Caricamento Voucher' : 'Chiudi'}
              fontSize="f7"
              onClick={fileLavorato.esito ? onConfermaCsv : closeModal}
              color="primary"
              margin="0 0.5rem 0 0"
            />
          </Row>
        </div>
      ) : (
        <p>* Caricare il csv da cui ricavare i voucher.</p>
      )}
    </>
  );

  return (
    <>
      <Modal
        open={openUploadVoucherModal}
        setOpenModal={closeModal}
        color="primary"
        fontSize="f6"
      >
        {children}
      </Modal>
    </>

  );
};
ModaleCaricamentoVoucher.displayName = 'ModaleCaricamentoVoucher';

export default withRouter(ModaleCaricamentoVoucher);
