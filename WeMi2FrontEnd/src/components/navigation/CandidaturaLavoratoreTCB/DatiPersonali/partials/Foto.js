
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import InputFile from 'components/ui2/InputFile';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import styled from 'styled-components';
import { noop } from 'utils/functions/noop';
import { GroupFieldTitle, StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

const ColumnInput = styled(Column)`
  width: auto;
`;

const ColumnText = styled(Column)`
  display: flex;
  flex-grow: 1;
`;

const Foto = ({ dataset, setFormField }) => {
  const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const handleUpload = async (files) => {
    if (!files) {
      return;
    }

    const file = files[0];
    const fileBase64 = await fileToBase64(file);
    setFormField('foto', { file: fileBase64, type: file.type });
  };

  return (
    <>
      <Row fluid margin="0 0 1rem 0">
      <GroupFieldTitle
          title="Inserisci una tua fototessera"
          marginTop="0"
        />
      </Row>
      <Row fluid margin="0 0 1rem 0" alignitems="center">
        <ColumnInput padding="0 0.5em 0 0">
          <InputFile
            label="upload-file"
            id="upload-file"
            onChange={value => handleUpload(value)}
            onError={noop}
            icon="plus"
          />
        </ColumnInput>
        <ColumnText padding="0" md="10" lg="10" xs="9">
          <Text value="Carica la foto" />
        </ColumnText>
      </Row>
      {dataset.foto ? (
        <Row fluid alignitems="center">
          <ColumnInput padding="0 0.5em 0 0">
            <ButtonIcon
              icon="minus"
              color="red"
              aria-controls="filename"
              onClick={() => {
                setFormField("foto", undefined);
                setFormField("fotoCropped", undefined);
              }}
            />
          </ColumnInput>
          <ColumnText padding="0" md="10" lg="10" xs="9">
            <Text value="Rimuovi l' immagine" />
          </ColumnText>
        </Row>
      ) : null}
    </>
  );
};

Foto.displayName = 'Foto';

export default (Foto);
